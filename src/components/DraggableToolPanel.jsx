import React, { useEffect, useRef, useState } from 'react';
import { styles } from '../styles/appStyles';

export default function DraggableToolPanel({
  title,
  onClose,
  children,
  initialPosition,
  onPositionChange,
}) {
  const panelRef = useRef(null);
  const dragStateRef = useRef({ active: false, offsetX: 0, offsetY: 0 });
  const [position, setPosition] = useState(initialPosition || { x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (initialPosition) {
      setPosition((current) => {
        if (current.x === initialPosition.x && current.y === initialPosition.y) {
          return current;
        }

        return initialPosition;
      });
    }
  }, [initialPosition]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!dragStateRef.current.active || !panelRef.current) {
        return;
      }

      const panelWidth = panelRef.current.offsetWidth || 520;
      const panelHeight = panelRef.current.offsetHeight || 520;
      const nextX = event.clientX - dragStateRef.current.offsetX;
      const nextY = event.clientY - dragStateRef.current.offsetY;
      const maxX = Math.max(16, window.innerWidth - panelWidth - 16);
      const maxY = Math.max(16, window.innerHeight - panelHeight - 16);

      const nextPosition = {
        x: Math.min(Math.max(nextX, 16), maxX),
        y: Math.min(Math.max(nextY, 16), maxY),
      };

      setPosition(nextPosition);
      onPositionChange?.(nextPosition);
    };

    const handleMouseUp = () => {
      dragStateRef.current.active = false;
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleDragStart = (event) => {
    if (!panelRef.current) {
      return;
    }

    const rect = panelRef.current.getBoundingClientRect();
    dragStateRef.current = {
      active: true,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    };
    setIsDragging(true);
    event.preventDefault();
  };

  return (
    <div
      ref={panelRef}
      style={{
        ...styles.toolPanel,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        style={{
          ...styles.toolPanelHeader,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleDragStart}
      >
        <span style={styles.toolPanelTitle}>{title}</span>
        <button
          type="button"
          style={styles.closeButton}
          onMouseDown={(event) => event.stopPropagation()}
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      <div style={styles.toolPanelBody}>{children}</div>
    </div>
  );
}
