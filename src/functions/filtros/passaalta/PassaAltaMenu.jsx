import { useEffect, useState } from 'react';
import {
  passaAltaRoberts,
  passaAltaSobel,
  passaAltaPrewitt,
  passaAltaKirsch,
  passaAltaRobinson,
  passaAltaLoG,
  passaAltaCanny,
  passaAltaLaplaciano,
} from './passaAlta';

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    color: '#fff',
    fontFamily: 'Segoe UI, sans-serif',
    width: '100%',
    maxWidth: '700px',
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
    fontWeight: '600',
  },

  methodsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
    marginBottom: '12px',
  },

  methodButton: {
    padding: '12px',
    backgroundColor: '#2d2d2d',
    border: '1px solid #444',
    color: '#ddd',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'center',
  },

  methodButtonActive: {
    backgroundColor: '#1f6feb',
    borderColor: '#1f6feb',
    color: '#fff',
    fontWeight: '600',
  },

  methodButtonHover: {
    backgroundColor: '#3d3d3d',
    borderColor: '#555',
  },

  methodName: {
    fontWeight: '600',
    marginBottom: '4px',
    fontSize: '13px',
  },

  current: {
    fontSize: '12px',
    color: '#888',
    textAlign: 'center',
    marginTop: '12px',
    padding: '10px',
    backgroundColor: '#2a2a2a',
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
    transition: 'all 0.2s ease',
  },

  buttonSecondary: {
    backgroundColor: '#444',
  },
};

const METHODS = [
  {
    id: 'roberts',
    name: 'Roberts',
    func: passaAltaRoberts,
  },
  {
    id: 'sobel',
    name: 'Sobel',
    func: passaAltaSobel,
  },
  {
    id: 'prewitt',
    name: 'Prewitt',
    func: passaAltaPrewitt,
  },
  {
    id: 'kirsch',
    name: 'Kirsch',
    func: passaAltaKirsch,
  },
  {
    id: 'robinson',
    name: 'Robinson',
    func: passaAltaRobinson,
  },
  {
    id: 'log',
    name: 'Marr-Hildreth (LoG)',
    func: passaAltaLoG,
  },
  {
    id: 'canny',
    name: 'Canny',
    func: passaAltaCanny,
  },
  {
    id: 'laplaciano',
    name: 'Laplaciano',
    func: passaAltaLaplaciano,
  },
];

export default function PassaAltaMenu({
  onPreview,
  onProcessar,
  initialImageSrc,
  onClose,
}) {
  const [inputImage, setInputImage] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [hoveredMethod, setHoveredMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

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
    if (!inputImage || !selectedMethod) {
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const method = METHODS.find(m => m.id === selectedMethod);
      if (!method) {
        setIsProcessing(false);
        return;
      }

      const resultCanvas = method.func(inputImage);

      if (onPreview) {
        onPreview(resultCanvas);
      }

      setIsProcessing(false);
    }, 10);
  }, [inputImage, selectedMethod, onPreview]);

  const handleApply = () => {
    if (!inputImage) {
      alert('Por favor, carregue uma imagem primeiro');
      return;
    }

    if (!selectedMethod) {
      alert('Selecione um método antes de aplicar.');
      return;
    }

    const method = METHODS.find(m => m.id === selectedMethod);
    const resultCanvas = method.func(inputImage);

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

  const currentMethod = METHODS.find(m => m.id === selectedMethod);

  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <div style={styles.sectionTitle}>
          Métodos de Passa Alta ({METHODS.length})
        </div>

        <div style={styles.methodsGrid}>
          {METHODS.map(method => (
            <button
              key={method.id}
              type="button"
              disabled={isProcessing}
              style={{
                ...styles.methodButton,
                ...(selectedMethod === method.id && styles.methodButtonActive),
                ...(hoveredMethod === method.id && selectedMethod !== method.id && styles.methodButtonHover),
                opacity: isProcessing ? 0.6 : 1,
              }}
              onClick={() => setSelectedMethod(method.id)}
              onMouseEnter={() => setHoveredMethod(method.id)}
              onMouseLeave={() => setHoveredMethod(null)}
            >
              <div style={styles.methodName}>
                {method.name}
              </div>
            </button>
          ))}
        </div>

        <div style={styles.current}>
          Método selecionado: <strong>{currentMethod ? currentMethod.name : 'Nenhum'}</strong>
          <br />
          <span style={{ fontSize: '11px', color: '#666' }}>
            {currentMethod ? currentMethod.description : 'Escolha um método para visualizar o resultado.'}
            {isProcessing && ' (processando...)'}
          </span>
        </div>
      </div>

      <div style={styles.buttons}>
        <button
          type="button"
          style={styles.button}
          onClick={handleApply}
          disabled={isProcessing}
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
          disabled={isProcessing}
        >
          Resetar
        </button>
      </div>
    </div>
  );
}