import React, { useState, useRef, useEffect } from 'react';
import { transladar } from './transladar';

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

  inputGroup: {
    display: 'flex',
    gap: '12px',
  },

  coordinateBox: {
    flex: 1,
    backgroundColor: '#2d2d2d',
    border: '1px solid #444',
    borderRadius: '6px',
    padding: '10px',
  },

  coordinateLabel: {
    display: 'block',
    fontSize: '12px',
    color: '#999',
    marginBottom: '6px',
  },

  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '8px',
    backgroundColor: '#1e1e1e',
    border: '1px solid #555',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '14px',
  },

  directionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
  },

  directionRow: {
    display: 'flex',
    gap: '6px',
  },

  directionButton: {
    width: '48px',
    height: '42px',
    backgroundColor: '#2d2d2d',
    border: '1px solid #555',
    color: '#fff',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '20px',
    transition: 'background-color 0.15s',
  },

  centerButton: {
    width: '48px',
    height: '42px',
    backgroundColor: '#1f6feb',
    border: '1px solid #1f6feb',
    color: '#fff',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 'bold',
  },

  stepContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '12px',
  },

  stepInput: {
    width: '70px',
    padding: '7px',
    textAlign: 'center',
    backgroundColor: '#2d2d2d',
    border: '1px solid #444',
    color: '#fff',
    borderRadius: '4px',
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

  value: {
    fontSize: '12px',
    color: '#888',
    textAlign: 'center',
    marginTop: '8px',
  },
};

export default function TransladarMenu({
  onPreview,
  onProcessar,
  initialImageSrc,
  onClose
}) {
  const [deltaX, setDeltaX] = useState(0);
  const [deltaY, setDeltaY] = useState(0);
  const [step, setStep] = useState(10);
  const fillColor = 'transparent';

  const [inputImage, setInputImage] = useState(null);

  // Carrega a imagem inicial
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

    const resultCanvas = transladar(
      inputImage,
      deltaX,
      deltaY,
      fillColor
    );

    // Atualiza a imagem principal do editor
    if (onPreview) {
      onPreview(resultCanvas);
    }
  }, [deltaX, deltaY, inputImage, onPreview, fillColor]);

  // Altera o deslocamento horizontal
  const moveX = (amount) => {
    setDeltaX((current) => current + amount);
  };

  // Altera o deslocamento vertical
  const moveY = (amount) => {
    setDeltaY((current) => current + amount);
  };

  // Aplica a translação
  const handleTransladar = () => {
    if (!inputImage) {
      alert('Por favor, carregue uma imagem primeiro');
      return;
    }

    const resultCanvas = transladar(
      inputImage,
      deltaX,
      deltaY,
      fillColor
    );

    // Retorna resultado para o editor
    if (onProcessar) {
      onProcessar(resultCanvas);
    }

    if (onClose) {
      onClose();
    }
  };

  // Centraliza a imagem
  const handleCenter = () => {
    setDeltaX(0);
    setDeltaY(0);
  };

  // Reset
  const handleReset = () => {
    setDeltaX(0);
    setDeltaY(0);
    setStep(10);
  };

  // Download
  const handleDownload = () => {
    if (!inputImage) {
      return;
    }

    const resultCanvas = transladar(
      inputImage,
      deltaX,
      deltaY,
      fillColor
    );

    const link = document.createElement('a');
    link.href = resultCanvas.toDataURL('image/png');
    link.download = `transladada_X${deltaX}_Y${deltaY}.png`;
    link.click();
  };

  return (
    <div style={styles.container}>

      {/* Coordenadas */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>
          Deslocamento
        </div>

        <div style={styles.inputGroup}>

          <div style={styles.coordinateBox}>
            <label style={styles.coordinateLabel}>
              Horizontal (X)
            </label>

            <input
              type="number"
              value={deltaX}
              onChange={(e) =>
                setDeltaX(Number(e.target.value))
              }
              style={styles.input}
            />
          </div>

          <div style={styles.coordinateBox}>
            <label style={styles.coordinateLabel}>
              Vertical (Y)
            </label>

            <input
              type="number"
              value={deltaY}
              onChange={(e) =>
                setDeltaY(Number(e.target.value))
              }
              style={styles.input}
            />
          </div>

        </div>
      </div>

      {/* Controles direcionais */}
      <div style={styles.section}>

        <div style={styles.sectionTitle}>
          Mover imagem
        </div>

        <div style={styles.directionContainer}>

          {/* Cima */}
          <div style={styles.directionRow}>
            <button
              style={styles.directionButton}
              onClick={() => moveY(-step)}
              title={`Mover ${step}px para cima`}
            >
              ↑
            </button>
          </div>

          {/* Esquerda / Centro / Direita */}
          <div style={styles.directionRow}>

            <button
              style={styles.directionButton}
              onClick={() => moveX(-step)}
              title={`Mover ${step}px para esquerda`}
            >
              ←
            </button>

            <button
              style={styles.centerButton}
              onClick={handleCenter}
              title="Centralizar"
            >
              0
            </button>

            <button
              style={styles.directionButton}
              onClick={() => moveX(step)}
              title={`Mover ${step}px para direita`}
            >
              →
            </button>

          </div>

          {/* Baixo */}
          <div style={styles.directionRow}>
            <button
              style={styles.directionButton}
              onClick={() => moveY(step)}
              title={`Mover ${step}px para baixo`}
            >
              ↓
            </button>
          </div>

        </div>

        <div style={styles.stepContainer}>

          <span style={styles.value}>
            Passo:
          </span>

          <input
            type="number"
            min="1"
            value={step}
            onChange={(e) =>
              setStep(Math.max(1, Number(e.target.value)))
            }
            style={styles.stepInput}
          />

          <span style={styles.value}>
            px
          </span>

        </div>

        <div style={styles.value}>
          X: {deltaX}px &nbsp; | &nbsp; Y: {deltaY}px
        </div>

      </div>

      {/* Ações */}
      <div style={styles.buttons}>

        <button
          style={styles.button}
          onClick={handleTransladar}
        >
          ✓ Aplicar
        </button>

        <button
          style={{
            ...styles.button,
            ...styles.buttonSecondary
          }}
          onClick={handleReset}
        >
          ↻ Resetar
        </button>

        <button
          style={{
            ...styles.button,
            ...styles.buttonSecondary
          }}
          onClick={handleDownload}
        >
          ⬇ Baixar
        </button>

      </div>

    </div>
  );
}