import React, { useEffect, useState } from 'react';
import { espelhar } from './espelhar';

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

  optionGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },

  optionButton: {
    padding: '14px',
    backgroundColor: '#2d2d2d',
    border: '1px solid #555',
    color: '#fff',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.15s, border-color 0.15s',
  },

  optionButtonActive: {
    backgroundColor: '#1f6feb',
    border: '1px solid #1f6feb',
  },

  icon: {
    fontSize: '24px',
    display: 'block',
    marginBottom: '6px',
  },

  description: {
    fontSize: '11px',
    color: '#888',
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

export default function EspelharMenu({
  onPreview,
  onProcessar,
  initialImageSrc,
  onClose,
}) {
  const [direction, setDirection] = useState('horizontal');
  const [inputImage, setInputImage] = useState(null);

  const fillColor = 'transparent';

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

    const resultCanvas = espelhar(
      inputImage,
      direction,
      fillColor
    );

    if (onPreview) {
      onPreview(resultCanvas);
    }
  }, [direction, inputImage, onPreview]);

  const handleApply = () => {
    if (!inputImage) {
      alert('Por favor, carregue uma imagem primeiro');
      return;
    }

    const resultCanvas = espelhar(
      inputImage,
      direction,
      fillColor
    );

    if (onProcessar) {
      onProcessar(resultCanvas);
    }

    if (onClose) {
      onClose();
    }
  };

  const handleReset = () => {
    setDirection('horizontal');
  };

  const handleDownload = () => {
    if (!inputImage) {
      return;
    }

    const resultCanvas = espelhar(
      inputImage,
      direction,
      fillColor
    );

    const link = document.createElement('a');

    link.href = resultCanvas.toDataURL('image/png');

    link.download = `espelhada_${direction}.png`;

    link.click();
  };

  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <div style={styles.sectionTitle}>
          Direção do espelhamento
        </div>

        <div style={styles.optionGrid}>
          <button
            type="button"
            onClick={() => setDirection('horizontal')}
            style={{
              ...styles.optionButton,
              ...(direction === 'horizontal'
                ? styles.optionButtonActive
                : {}),
            }}
          >
            <span style={styles.icon}>↔</span>

            Horizontal

            <div style={styles.description}>
              Esquerda ↔ direita
            </div>
          </button>

          <button
            type="button"
            onClick={() => setDirection('vertical')}
            style={{
              ...styles.optionButton,
              ...(direction === 'vertical'
                ? styles.optionButtonActive
                : {}),
            }}
          >
            <span style={styles.icon}>↕</span>

            Vertical

            <div style={styles.description}>
              Cima ↕ baixo
            </div>
          </button>
        </div>

        <div style={styles.current}>
          Espelhamento atual:{' '}
          {direction === 'horizontal'
            ? 'Horizontal'
            : 'Vertical'}
        </div>
      </div>

      <div style={styles.buttons}>
        <button
          type="button"
          style={styles.button}
          onClick={handleApply}
        >
          ✓ Aplicar
        </button>

        <button
          type="button"
          style={{
            ...styles.button,
            ...styles.buttonSecondary,
          }}
          onClick={handleReset}
        >
          ↻ Resetar
        </button>

        <button
          type="button"
          style={{
            ...styles.button,
            ...styles.buttonSecondary,
          }}
          onClick={handleDownload}
        >
          ⬇ Baixar
        </button>
      </div>
    </div>
  );
}