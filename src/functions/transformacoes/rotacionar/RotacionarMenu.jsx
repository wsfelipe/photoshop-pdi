import React, { useEffect, useState } from 'react';
import { rotacionar } from './rotacionar';

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
  angleBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  sliderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
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
  rangeInput: {
    flex: 1,
    accentColor: '#1f6feb',
    cursor: 'pointer',
  },
  buttonRow: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    marginTop: '10px',
  },
  directionButton: {
    flex: 1,
    padding: '10px 14px',
    backgroundColor: '#2d2d2d',
    border: '1px solid #555',
    color: '#fff',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.15s',
  },
  centerButton: {
    flex: 1,
    padding: '10px 14px',
    backgroundColor: '#1f6feb',
    border: '1px solid #1f6feb',
    color: '#fff',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  stepContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '12px',
  },
  stepInput: {
    width: '80px',
    padding: '7px',
    textAlign: 'center',
    backgroundColor: '#2d2d2d',
    border: '1px solid #444',
    color: '#fff',
    borderRadius: '4px',
  },
  value: {
    fontSize: '12px',
    color: '#888',
    textAlign: 'center',
    marginTop: '8px',
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

export default function RotacionarMenu({
  onPreview,
  onProcessar,
  initialImageSrc,
  onClose,
}) {
  const [angle, setAngle] = useState(0);
  const [step, setStep] = useState(15);
  const [inputImage, setInputImage] = useState(null);
  const fillColor = 'transparent';

  useEffect(() => {
    if (!initialImageSrc) {
      return;
    }

    const img = new Image();
    img.onload = () => setInputImage(img);
    img.src = initialImageSrc;
  }, [initialImageSrc]);

  useEffect(() => {
    if (!inputImage) {
      return;
    }

    const resultCanvas = rotacionar(inputImage, angle, fillColor);

    if (onPreview) {
      onPreview(resultCanvas);
    }
  }, [angle, inputImage, onPreview, fillColor]);

  const rotateBy = (amount) => {
    setAngle((current) => current + amount);
  };

  const handleApply = () => {
    if (!inputImage) {
      alert('Por favor, carregue uma imagem primeiro');
      return;
    }

    const resultCanvas = rotacionar(inputImage, angle, fillColor);

    if (onProcessar) {
      onProcessar(resultCanvas);
    }

    if (onClose) {
      onClose();
    }
  };

  const handleReset = () => {
    setAngle(0);
    setStep(15);
  };

  const handleDownload = () => {
    if (!inputImage) {
      return;
    }

    const resultCanvas = rotacionar(inputImage, angle, fillColor);
    const link = document.createElement('a');
    link.href = resultCanvas.toDataURL('image/png');
    link.download = `rotacionada_${angle}deg.png`;
    link.click();
  };

  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Ângulo</div>

        <div style={styles.angleBox}>
          <div style={styles.sliderRow}>
            <input
              type="range"
              min={-180}
              max={180}
              step={1}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              style={styles.rangeInput}
              title="Arraste para ajustar o ângulo"
            />

            <input
              type="number"
              min={-180}
              max={180}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              style={styles.input}
            />
          </div>

          <div style={styles.buttonRow}>
            <button
              type="button"
              style={styles.directionButton}
              onClick={() => rotateBy(-step)}
              title={`Rotacionar ${step}° para a esquerda`}
            >
              ↺ {step}°
            </button>

            <button
              type="button"
              style={styles.centerButton}
              onClick={() => setAngle(0)}
              title="Resetar ângulo"
            >
              0°
            </button>

            <button
              type="button"
              style={styles.directionButton}
              onClick={() => rotateBy(step)}
              title={`Rotacionar ${step}° para a direita`}
            >
              ↻ {step}°
            </button>
          </div>
        </div>

        <div style={styles.stepContainer}>
          <span style={styles.value}>Passo:</span>
          <input
            type="number"
            min="1"
            value={step}
            onChange={(e) => setStep(Math.max(1, Number(e.target.value)))}
            style={styles.stepInput}
          />
          <span style={styles.value}>°</span>
        </div>

        <div style={styles.value}>Ângulo atual: {angle}°</div>
      </div>

      <div style={styles.buttons}>
        <button type="button" style={styles.button} onClick={handleApply}>
          ✓ Aplicar
        </button>

        <button
          type="button"
          style={{ ...styles.button, ...styles.buttonSecondary }}
          onClick={handleReset}
        >
          ↻ Resetar
        </button>

        <button
          type="button"
          style={{ ...styles.button, ...styles.buttonSecondary }}
          onClick={handleDownload}
        >
          ⬇ Baixar
        </button>
      </div>
    </div>
  );
}
