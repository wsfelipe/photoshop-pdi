import React, { useRef, useState } from 'react';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import MainContent from './components/MainContent';
import { styles } from './styles/appStyles';

export default function App() {
  const [openMenu, setOpenMenu] = useState(null);
  const [hoverMenu, setHoverMenu] = useState(null);
  const [hoverItem, setHoverItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  const showToast = (message) => {
    setToast(message);
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 2500);
  };

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
      showToast('Arquivo inválido. Selecione uma imagem.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
      showToast(`Imagem carregada: ${file.name}`);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const saveSelectedImage = () => {
    if (!selectedImage) {
      showToast('Nenhuma imagem foi adicionada para salvar.');
      return;
    }

    const link = document.createElement('a');
    link.href = selectedImage;
    link.download = 'imagem-processada.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Arquivo salvo com sucesso.');
  };

  const handleMenuAction = (item) => {
    switch (item) {
      case 'Adicionar arquivo':
        openFilePicker();
        break;
      case 'Salvar arquivo':
        saveSelectedImage();
        break;
      case 'Sobre':
        showToast('Sistema de processamento de imagens em desenvolvimento.');
        break;
      case 'Sair':
        showToast('Aplicação encerrada.');
        break;
      case 'Transladar':
      case 'Rotacionar':
      case 'Espelhar':
      case 'Aumentar':
      case 'Diminuir':
      case 'Grayscale':
      case 'Passa Baixa':
      case 'Passa Alta':
      case 'Threshold':
      case 'Dilatação':
      case 'Erosão':
      case 'Abertura':
      case 'Fechamento':
      case 'Afinamento':
      case 'DESAFIO':
        showToast(`${item} em desenvolvimento.`);
        break;
      default:
        break;
    }
  };

  return (
    <div style={styles.container} onClick={() => setOpenMenu(null)}>
      {toast && <div style={styles.toast}>{toast}</div>}
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
    </div>
  );
}