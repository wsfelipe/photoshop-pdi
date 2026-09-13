import React, { useCallback, useRef, useState } from 'react';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import MainContent from './components/MainContent';
import DraggableToolPanel from './components/DraggableToolPanel';
import TransladarMenu from './functions/transformacoes/transladar/TransladarMenu';
import RotacionarMenu from './functions/transformacoes/rotacionar/RotacionarMenu';
import EspelharMenu from './functions/transformacoes/espelhar/EspelharMenu';
import AumentarMenu from './functions/transformacoes/aumentar/AumentarMenu';
import DiminuirMenu from './functions/transformacoes/diminuir/DiminuirMenu';
import GrayscaleMenu from './functions/filtros/grayscale/GrayscaleMenu';
import PassaAltaMenu from './functions/filtros/passaalta/PassaAltaMenu';
import PassaBaixaMenu from './functions/filtros/passabaixa/PassaBaixaMenu';
import ThresholdMenu from './functions/filtros/threshold/ThresholdMenu';
import { styles } from './styles/appStyles';

const getCenteredPanelPosition = () => {
  const panelWidth = 520;
  const panelHeight = 520;
  const maxX = Math.max(16, window.innerWidth - panelWidth - 16);
  const maxY = Math.max(16, window.innerHeight - panelHeight - 16);
  const x = Math.min(Math.max((window.innerWidth - panelWidth) / 2, 16), maxX);
  const y = Math.min(Math.max((window.innerHeight - panelHeight) / 2, 16), maxY);

  return { x, y };
};

export default function App() {
  const [openMenu, setOpenMenu] = useState(null);
  const [hoverMenu, setHoverMenu] = useState(null);
  const [hoverItem, setHoverItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeTool, setActiveTool] = useState(null);
  const [panelPosition, setPanelPosition] = useState(() => getCenteredPanelPosition());
  const [toast, setToast] = useState(null);
  const currentImage = processedImage || selectedImage;
  const displayImage = previewImage || processedImage || selectedImage;
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
      setProcessedImage(null);
      setPreviewImage(null);
      showToast(`Imagem carregada: ${file.name}`);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const saveSelectedImage = () => {
    const imageToSave = displayImage || selectedImage;

    if (!imageToSave) {
      showToast('Nenhuma imagem foi adicionada para salvar.');
      return;
    }

    const link = document.createElement('a');
    link.href = imageToSave;
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
        showToast('Photoshop PDI - Versão 1.2.0');
        break;
      case 'Sair':
        showToast('Saindo do aplicativo...');
        setTimeout(() => {
          window.close();
        }, 1000);
        break;
      case 'Transladar':
        if (!currentImage) {
          showToast('Selecione uma imagem antes de aplicar a translação.');
          return;
        }
        setActiveTool('transladar');
        break;
      case 'Rotacionar':
        if (!currentImage) {
          showToast('Selecione uma imagem antes de aplicar a rotação.');
          return;
        }
        setActiveTool('rotacionar');
        break;
      case 'Espelhar':
        if (!currentImage) {
          showToast('Selecione uma imagem antes de aplicar o espelhamento.');
          return;
        }
        setActiveTool('espelhar');
        break;
      case 'Aumentar':
        if (!currentImage) {
          showToast('Selecione uma imagem antes de aplicar o aumento.');
          return;
        }
        setActiveTool('aumentar');
        break;
      case 'Diminuir':
        if (!currentImage) {
          showToast('Selecione uma imagem antes de aplicar a diminuição.');
          return;
        }
        setActiveTool('diminuir');
        break;
      case 'Grayscale':
        if (!currentImage) {
          showToast('Selecione uma imagem antes de aplicar a escala de cinza.');
          return;
        }
        setActiveTool('grayscale');
        break;
      case 'Passa Baixa':
        if (!currentImage) {
          showToast('Selecione uma imagem antes de aplicar a passa-baixa.');
          return;
        }
        setActiveTool('passabaixa');
        break;
      case 'Passa Alta':
        if (!currentImage) {
          showToast('Selecione uma imagem antes de aplicar a passa-alta.');
          return;
        }
        setActiveTool('passaalta');
        break;
      case 'Threshold':
        if (!currentImage) {
          showToast('Selecione uma imagem antes de aplicar o threshold.');
          return;
        }
        setActiveTool('threshold');
        break;
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


  const normalizeImageSource = useCallback((resultCanvas) => {
    if (!resultCanvas) {
      return null;
    }

    if (typeof resultCanvas.toDataURL === 'function') {
      return resultCanvas.toDataURL('image/png');
    }

    return resultCanvas;
  }, []);

  const handleProcessedImage = useCallback((resultCanvas) => {
    const normalized = normalizeImageSource(resultCanvas);

    if (!normalized) {
      return;
    }

    setProcessedImage(normalized);
    setPreviewImage(null);
    setActiveTool(null);
  }, [normalizeImageSource]);

  const handlePreviewImage = useCallback((resultCanvas) => {
    const normalized = normalizeImageSource(resultCanvas);

    if (!normalized) {
      return;
    }

    setPreviewImage(normalized);
  }, [normalizeImageSource]);

  const closeActiveTool = useCallback(() => {
    setActiveTool(null);
    setPreviewImage(null);
  }, []);

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
      {activeTool === 'transladar' && currentImage && (
        <DraggableToolPanel
          title="Transladar imagem"
          initialPosition={panelPosition}
          onPositionChange={setPanelPosition}
          onClose={closeActiveTool}
        >
          <TransladarMenu
            initialImageSrc={currentImage}
            onPreview={handlePreviewImage}
            onProcessar={handleProcessedImage}
            onClose={closeActiveTool}
          />
        </DraggableToolPanel>
      )}

      {activeTool === 'rotacionar' && currentImage && (
        <DraggableToolPanel
          title="Rotacionar imagem"
          initialPosition={panelPosition}
          onPositionChange={setPanelPosition}
          onClose={closeActiveTool}
        >
          <RotacionarMenu
            initialImageSrc={currentImage}
            onPreview={handlePreviewImage}
            onProcessar={handleProcessedImage}
            onClose={closeActiveTool}
          />
        </DraggableToolPanel>
      )}

      {activeTool === 'espelhar' && currentImage && (
        <DraggableToolPanel
          title="Espelhar imagem"
          initialPosition={panelPosition}
          onPositionChange={setPanelPosition}
          onClose={closeActiveTool}
        >
          <EspelharMenu
            initialImageSrc={currentImage}
            onPreview={handlePreviewImage}
            onProcessar={handleProcessedImage}
            onClose={closeActiveTool}
          />
        </DraggableToolPanel>
      )}

      {activeTool === 'aumentar' && currentImage && (
        <DraggableToolPanel
          title="Aumentar imagem"
          initialPosition={panelPosition}
          onPositionChange={setPanelPosition}
          onClose={closeActiveTool}
        >
          <AumentarMenu
            initialImageSrc={currentImage}
            onPreview={handlePreviewImage}
            onProcessar={handleProcessedImage}
            onClose={closeActiveTool}
          />
        </DraggableToolPanel>
      )}

      {activeTool === 'diminuir' && currentImage && (
        <DraggableToolPanel
          title="Diminuir imagem"
          initialPosition={panelPosition}
          onPositionChange={setPanelPosition}
          onClose={closeActiveTool}
        >
          <DiminuirMenu
            initialImageSrc={currentImage}
            onPreview={handlePreviewImage}
            onProcessar={handleProcessedImage}
            onClose={closeActiveTool}
          />
        </DraggableToolPanel>
      )}

      {activeTool === 'grayscale' && currentImage && (
        <DraggableToolPanel
          title="Escala de cinza"
          initialPosition={panelPosition}
          onPositionChange={setPanelPosition}
          onClose={closeActiveTool}
        >
          <GrayscaleMenu
            initialImageSrc={currentImage}
            onPreview={handlePreviewImage}
            onProcessar={handleProcessedImage}
            onClose={closeActiveTool}
          />
        </DraggableToolPanel>
      )}

      {activeTool === 'passaalta' && currentImage && (
        <DraggableToolPanel
          title="Passa-alta"
          initialPosition={panelPosition}
          onPositionChange={setPanelPosition}
          onClose={closeActiveTool}
        >
          <PassaAltaMenu
            initialImageSrc={currentImage}
            onPreview={handlePreviewImage}
            onProcessar={handleProcessedImage}
            onClose={closeActiveTool}
          />
        </DraggableToolPanel>
      )}

      {activeTool === 'passabaixa' && currentImage && (
        <DraggableToolPanel
          title="Passa-baixa"
          initialPosition={panelPosition}
          onPositionChange={setPanelPosition}
          onClose={closeActiveTool}
        >
          <PassaBaixaMenu
            initialImageSrc={currentImage}
            onPreview={handlePreviewImage}
            onProcessar={handleProcessedImage}
            onClose={closeActiveTool}
          />
        </DraggableToolPanel>
      )}

      {activeTool === 'threshold' && currentImage && (
        <DraggableToolPanel
          title="Threshold"
          initialPosition={panelPosition}
          onPositionChange={setPanelPosition}
          onClose={closeActiveTool}
        >
          <ThresholdMenu
            initialImageSrc={currentImage}
            onPreview={handlePreviewImage}
            onProcessar={handleProcessedImage}
            onClose={closeActiveTool}
          />
        </DraggableToolPanel>
      )}

      <MainContent
        imageSrc={displayImage}
        onOpenFilePicker={openFilePicker}
      />
    </div>
  );
}