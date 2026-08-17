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
  onSelectItem,
}) {
  return (
    <div
      style={{ position: 'relative' }}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        style={{
          ...styles.menuButton,
          ...(isOpen || hoverMenu === menuKey ? styles.menuButtonHover : {})
        }}
        onMouseEnter={() => onHoverMenu(menuKey)}
        onMouseLeave={() => onHoverMenu(null)}
        onClick={(event) => {
          event.stopPropagation();
          onToggle(menuKey);
        }}
      >
        {label}
      </button>

      {isOpen && (
        <div style={styles.menuDropdown} onClick={(event) => event.stopPropagation()}>
          {items.map((item, idx) => (
            <button
              key={idx}
              style={{
                ...styles.menuItem,
                ...(hoverItem === `${menuKey}-${idx}` ? styles.menuItemHover : {})
              }}
              onMouseEnter={() => onHoverItem(`${menuKey}-${idx}`)}
              onMouseLeave={() => onHoverItem(null)}
              onClick={(event) => {
                event.stopPropagation();
                onSelectItem?.(item);
                onToggle(menuKey);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
