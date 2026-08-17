import React from 'react';
import MenuDropdown from '../menus/MenuDropdown';
import { menuItems } from '../menus/menuItems';
import { styles } from '../styles/appStyles';

export default function MenuBar({
  openMenu,
  hoverMenu,
  hoverItem,
  toggleMenu,
  setHoverMenu,
  setHoverItem,
}) {
  const menuConfig = [
    { key: 'arquivo', label: 'Arquivo' },
    { key: 'transformacoes', label: 'Transformações Geométricas' },
    { key: 'filtros', label: 'Filtros' },
    { key: 'morfologia', label: 'Morfologia Matemática' },
    { key: 'caracteristicas', label: 'Extração de Características' },
  ];

  return (
    <div style={styles.menuBar}>
      {menuConfig.map((menu) => (
        <MenuDropdown
          key={menu.key}
          menuKey={menu.key}
          label={menu.label}
          items={menuItems[menu.key]}
          isOpen={openMenu === menu.key}
          hoverMenu={hoverMenu}
          hoverItem={hoverItem}
          onToggle={toggleMenu}
          onHoverMenu={setHoverMenu}
          onHoverItem={setHoverItem}
        />
      ))}
    </div>
  );
}
