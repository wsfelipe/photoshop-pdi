import React, { useRef, useState } from 'react';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import MainContent from './components/MainContent';
import StatusBar from './components/StatusBar';
import { styles } from './styles/appStyles';

export default function App() {
  const [openMenu, setOpenMenu] = useState(null);
  const [hoverMenu, setHoverMenu] = useState(null);
  const [hoverItem, setHoverItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [statusMessage, setStatusMessage] = useState('Pronto para processar imagens');
  const fileInputRef = useRef(null);

  const toggleMenu = (menu) => {
    setOpenMenu((current) => (current === menu ? null : menu));
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelection = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setStatusMessage('Arquivo inválido. Selecione uma imagem.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
      setStatusMessage(`Imagem carregada: ${file.name}`);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const saveSelectedImage = () => {
    if (!selectedImage) {
      setStatusMessage('Nenhuma imagem foi adicionada para salvar.');
      return;
    }

    const link = document.createElement('a');
    link.href = selectedImage;
    link.download = 'imagem-processada.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setStatusMessage('Arquivo salvo com sucesso.');
  };

  const handleMenuAction = (item) => {
    if (item === 'Adicionar arquivo') {
      openFilePicker();
      return;
    }

    if (item === 'Salvar arquivo') {
      saveSelectedImage();
      return;
    }

    if (item === 'Sobre') {
      setStatusMessage('Sistema de processamento de imagens em desenvolvimento.');
      return;
    }

    if (item === 'Sair') {
      setStatusMessage('Aplicação encerrada.');
      return;
    }
  };

  return (
    <div style={styles.container} onClick={() => setOpenMenu(null)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileSelection}
      />
      <Header />
      <MenuBar
        openMenu={openMenu}
        hoverMenu={hoverMenu}
        hoverItem={hoverItem}
        toggleMenu={toggleMenu}
        setHoverMenu={setHoverMenu}
        setHoverItem={setHoverItem}
        onMenuAction={handleMenuAction}
      />
      <MainContent
        selectedImage={selectedImage}
        onOpenFilePicker={openFilePicker}
      />
      <StatusBar message={statusMessage} />
    </div>
  );
}