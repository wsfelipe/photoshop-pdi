import React, { useEffect, useState } from 'react';
import { diminuir } from './diminuir';

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

  sliderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  rangeInput: {
    flex: 1,
    accentColor: '#1f6feb',
    cursor: 'pointer',
  },

  input: {
    width: '90px',
    boxSizing: 'border-box',
    padding: '8px',
    backgroundColor: '#1e1e1e',
    border: '1px solid #555',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '14px',
    textAlign: 'center',
  },

  presets: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
    marginTop: '14px',
  },

  presetButton: {
    padding: '9px 8px',
    backgroundColor: '#2d2d2d',
    border: '1px solid #555',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '13px',
  },

  presetButtonActive: {
    backgroundColor: '#1f6feb',
    borderColor: '#1f6feb',
  },

  dimensions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '14px',
    fontSize: '12px',
    color: '#888',
  },

  dimensionValue: {
    color: '#fff',
    fontWeight: '500',
  },

  value: {
    fontSize: '12px',
    color: '#888',
    textAlign: 'center',
    marginTop: '10px',
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

export default function DiminuirMenu({
  onPreview,
  onProcessar,
  initialImageSrc,
  onClose,
}) {
  const [scale, setScale] = useState(100);
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

    const resultCanvas = diminuir(
      inputImage,
      scale,
      fillColor
    );

    if (onPreview) {
      onPreview(resultCanvas);
    }
  }, [scale, inputImage, onPreview]);

  const handleScaleChange = (value) => {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return;
    }

    setScale(
      Math.max(1, Math.min(100, numericValue))
    );
  };

  const handleApply = () => {
    if (!inputImage) {
      alert('Por favor, carregue uma imagem primeiro');
      return;
    }

    const resultCanvas = diminuir(
      inputImage,
      scale,
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
    setScale(100);
  };

  useEffect(() => {
    return () => {
      handleReset();
    };
  }, []);

  const handleDownload = () => {
    if (!inputImage) {
      return;
    }

    const resultCanvas = diminuir(
      inputImage,
      scale,
      fillColor
    );

    const link = document.createElement('a');

    link.href = resultCanvas.toDataURL('image/png');

    link.download = `imagem_${scale}porcento.png`;

    link.click();
  };

  const currentWidth = inputImage
    ? Math.round(inputImage.width * (scale / 100))
    : 0;

  const currentHeight = inputImage
    ? Math.round(inputImage.height * (scale / 100))
    : 0;

  const presets = [75, 50, 25, 10];

  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <div style={styles.sectionTitle}>
          Tamanho da imagem
        </div>

        <div style={styles.sliderRow}>
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            value={scale}
            onChange={(e) =>
              handleScaleChange(e.target.value)
            }
            style={styles.rangeInput}
            title="Ajuste o tamanho da imagem"
          />

          <input
            type="number"
            min={1}
            max={100}
            value={scale}
            onChange={(e) =>
              handleScaleChange(e.target.value)
            }
            style={styles.input}
          />

          <span style={styles.value}>%</span>
        </div>

        <div style={styles.presets}>
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setScale(preset)}
              style={{
                ...styles.presetButton,
                ...(scale === preset
                  ? styles.presetButtonActive
                  : {}),
              }}
            >
              {preset}%
            </button>
          ))}
        </div>

        {inputImage && (
          <div style={styles.dimensions}>
            <span>
              Original:{' '}
              <span style={styles.dimensionValue}>
                {inputImage.width} × {inputImage.height}px
              </span>
            </span>

            <span>
              Novo:{' '}
              <span style={styles.dimensionValue}>
                {currentWidth} × {currentHeight}px
              </span>
            </span>
          </div>
        )}

        <div style={styles.value}>
          Tamanho atual: {scale}%
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