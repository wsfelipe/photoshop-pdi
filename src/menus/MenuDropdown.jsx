import React from 'react';
import { styles } from '../styles/appStyles';

export default function MenuDropdown({
  menuKey,
  label,
  items,
  isOpen,
  hoverMenu,
  hoverItem,
  onToggle,
  onHoverMenu,
  onHoverItem,
}) {
  return (
    <div style={{ position: 'relative' }}>
      <button
        style={{
          ...styles.menuButton,
          ...(isOpen || hoverMenu === menuKey ? styles.menuButtonHover : {})
        }}
        onMouseEnter={() => onHoverMenu(menuKey)}
        onMouseLeave={() => onHoverMenu(null)}
        onClick={() => onToggle(menuKey)}
      >
        {label}
      </button>
      
      {isOpen && (
        <div style={styles.menuDropdown}>
          {items.map((item, idx) => (
            <button
              key={idx}
              style={{
                ...styles.menuItem,
                ...(hoverItem === `${menuKey}-${idx}` ? styles.menuItemHover : {})
              }}
              onMouseEnter={() => onHoverItem(`${menuKey}-${idx}`)}
              onMouseLeave={() => onHoverItem(null)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
