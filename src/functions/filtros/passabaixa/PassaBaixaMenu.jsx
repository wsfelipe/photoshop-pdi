import { useEffect, useState } from 'react';
import { passaBaixa } from './passabaixa';

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    color: '#fff',
    fontFamily: 'Segoe UI, sans-serif',
    width: '100%',
    maxWidth: '600px',
    boxSizing: 'border-box',
  },

  section: {
    marginBottom: '20px',
  },

  sectionTitle: {
    fontSize: '13px',
    color: '#aaa',
    marginBottom: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },

  optionButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#1f6feb',
    border: '1px solid #1f6feb',
    color: '#fff',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'default',
    boxSizing: 'border-box',
  },

  icon: {
    fontSize: '24px',
    display: 'block',
    marginBottom: '6px',
  },

  description: {
    fontSize: '11px',
    color: '#ddd',
    marginTop: '4px',
  },

  current: {
    fontSize: '12px',
    color: '#888',
    textAlign: 'center',
    marginTop: '12px',
  },

  buttons: {
    display: 'flex',
    gap: '8px',
    marginTop: '20px',
  },

  button: {
    flex: 1,
    padding: '10px 16px',
    backgroundColor: '#1f6feb',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  },

  buttonSecondary: {
    backgroundColor: '#444',
  },
};

export default function PassaBaixaMenu({
  onPreview,
  onProcessar,
  initialImageSrc,
  onClose,
}) {
  const [inputImage, setInputImage] = useState(null);

  useEffect(() => {
    if (!initialImageSrc) {
      return;
    }

    const img = new Image();

    img.onload = () => {
      setInputImage(img);
    };

    img.src = initialImageSrc;
  }, [initialImageSrc]);

  useEffect(() => {
    if (!inputImage) {
      return;
    }

    const resultCanvas = passaBaixa(inputImage);

    if (onPreview) {
      onPreview(resultCanvas);
    }
  }, [inputImage, onPreview]);

  const handleApply = () => {
    if (!inputImage) {
      alert('Por favor, carregue uma imagem primeiro');
      return;
    }

    const resultCanvas = passaBaixa(inputImage);

    if (onProcessar) {
      onProcessar(resultCanvas);
    }

    if (onClose) {
      onClose();
    }
  };

  const handleReset = () => {
    if (initialImageSrc && onPreview) {
      onPreview(initialImageSrc);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <div style={styles.sectionTitle}>
          Filtro
        </div>

        <div style={styles.optionButton}>
          <span style={styles.icon}>▦</span>

          Passa Baixa

          <div style={styles.description}>
            Suaviza a imagem e reduz detalhes
          </div>
        </div>

        <div style={styles.current}>
          Filtro atual: Passa Baixa
        </div>
      </div>

      <div style={styles.buttons}>
        <button
          type="button"
          style={styles.button}
          onClick={handleApply}
        >
          Aplicar
        </button>

        <button
          type="button"
          style={{
            ...styles.button,
            ...styles.buttonSecondary,
          }}
          onClick={handleReset}
        >
          Resetar
        </button>
      </div>
    </div>
  );
}
