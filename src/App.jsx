import React, { useState } from 'react';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import MainContent from './components/MainContent';
import StatusBar from './components/StatusBar';
import { styles } from './styles/appStyles';

export default function App() {
  const [openMenu, setOpenMenu] = useState(null);
  const [hoverMenu, setHoverMenu] = useState(null);
  const [hoverItem, setHoverItem] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div style={styles.container} onClick={() => setOpenMenu(null)}>
      <Header />
      <MenuBar 
        openMenu={openMenu}
        hoverMenu={hoverMenu}
        hoverItem={hoverItem}
        toggleMenu={toggleMenu}
        setHoverMenu={setHoverMenu}
        setHoverItem={setHoverItem}
      />
      <MainContent />
      <StatusBar />
    </div>
  );
}