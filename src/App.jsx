import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import MainContent from './components/MainContent';
import TransladarMenu from './functions/transformacoes/transladar/TransladarMenu';
import { styles } from './styles/appStyles';

export default function App() {
  const [openMenu, setOpenMenu] = useState(null);
  const [hoverMenu, setHoverMenu] = useState(null);
  const [hoverItem, setHoverItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [activeTool, setActiveTool] = useState(null);
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);
  const toastTimeoutRef = useRef(null);
  const toolPanelRef = useRef(null);
  const dragStateRef = useRef({ active: false, offsetX: 0, offsetY: 0 });

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
      case 'Transladar':
        if (!selectedImage) {
          showToast('Selecione uma imagem antes de aplicar a translação.');
          return;
        }
        setProcessedImage(null);
        setActiveTool('transladar');
        break;
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
        setActiveTool(null);
        showToast(`${item} em desenvolvimento.`);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (activeTool !== 'transladar' || !selectedImage) {
      return;
    }

    const panelWidth = toolPanelRef.current?.offsetWidth || 520;
    const panelHeight = toolPanelRef.current?.offsetHeight || 520;
    const maxX = Math.max(16, window.innerWidth - panelWidth - 16);
    const maxY = Math.max(16, window.innerHeight - panelHeight - 16);
    const initialX = Math.min(Math.max((window.innerWidth - panelWidth) / 2, 16), maxX);
    const initialY = Math.min(Math.max((window.innerHeight - panelHeight) / 2, 16), maxY);

    setPanelPosition({ x: initialX, y: initialY });
  }, [activeTool, selectedImage]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!dragStateRef.current.active || !toolPanelRef.current) {
        return;
      }

      const panelWidth = toolPanelRef.current.offsetWidth || 520;
      const panelHeight = toolPanelRef.current.offsetHeight || 520;
      const nextX = event.clientX - dragStateRef.current.offsetX;
      const nextY = event.clientY - dragStateRef.current.offsetY;
      const maxX = Math.max(16, window.innerWidth - panelWidth - 16);
      const maxY = Math.max(16, window.innerHeight - panelHeight - 16);

      setPanelPosition({
        x: Math.min(Math.max(nextX, 16), maxX),
        y: Math.min(Math.max(nextY, 16), maxY),
      });
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
    if (!toolPanelRef.current) {
      return;
    }

    const rect = toolPanelRef.current.getBoundingClientRect();
    dragStateRef.current = {
      active: true,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    };
    setIsDragging(true);
    event.preventDefault();
  };

  const handleProcessedImage = (resultCanvas) => {
    if (!resultCanvas) {
      return;
    }

    if (typeof resultCanvas.toDataURL === 'function') {
      setProcessedImage(resultCanvas.toDataURL('image/png'));
    } else {
      setProcessedImage(resultCanvas);
    }

    setActiveTool(null);
  };

  const handlePreviewImage = (resultCanvas) => {
    if (!resultCanvas) {
      return;
    }

    if (typeof resultCanvas.toDataURL === 'function') {
      setProcessedImage(resultCanvas.toDataURL('image/png'));
    } else {
      setProcessedImage(resultCanvas);
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
      {activeTool === 'transladar' && selectedImage && (
        <div
          ref={toolPanelRef}
          style={{
            ...styles.toolPanel,
            left: `${panelPosition.x}px`,
            top: `${panelPosition.y}px`,
          }}
        >
          <div
            style={{
              ...styles.toolPanelHeader,
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
            onMouseDown={handleDragStart}
          >
            <span style={styles.toolPanelTitle}>Transladar imagem</span>
            <button
              type="button"
              style={styles.closeButton}
              onMouseDown={(event) => event.stopPropagation()}
              onClick={() => setActiveTool(null)}
            >
              ✕
            </button>
          </div>
          <div style={styles.toolPanelBody}>
            <TransladarMenu
              initialImageSrc={selectedImage}
              onPreview={handlePreviewImage}
              onProcessar={handleProcessedImage}
              onClose={() => setActiveTool(null)}
            />
          </div>
        </div>
      )}

      <MainContent
        selectedImage={selectedImage}
        transformedImage={processedImage}
        activeTool={activeTool}
        onOpenFilePicker={openFilePicker}
        onProcessImage={handleProcessedImage}
      />
    </div>
  );
}