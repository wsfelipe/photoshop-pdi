import React, { useEffect, useState } from 'react';
import { dilatacao, erodacao, abertura, fechamento, afinamento } from './morfologia';

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

  operationButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#2d2d2d',
    border: '1px solid #555',
    color: '#fff',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    boxSizing: 'border-box',
    marginBottom: '8px',
    transition: 'background-color 0.15s, border-color 0.15s',
  },

  operationButtonActive: {
    backgroundColor: '#1f6feb',
    borderColor: '#1f6feb',
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

  status: {
    fontSize: '12px',
    color: '#888',
    textAlign: 'center',
    marginTop: '12px',
  },
};

export default function MorfologiaMenu({
  onPreview,
  onProcessar,
  initialImageSrc,
  onClose,
}) {
  const [inputImage, setInputImage] = useState(null);
  const [currentOperation, setCurrentOperation] = useState(null);
  const [operationStatus, setOperationStatus] = useState('');

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
    if (!inputImage || !currentOperation) {
      return;
    }

    setOperationStatus(`Aplicando ${currentOperation}...`);

    try {
      let resultCanvas;

      switch (currentOperation) {
        case 'Dilatação':
          resultCanvas = dilatacao(inputImage);
          break;
        case 'Erosão':
          resultCanvas = erodacao(inputImage);
          break;
        case 'Abertura':
          resultCanvas = abertura(inputImage);
          break;
        case 'Fechamento':
          resultCanvas = fechamento(inputImage);
          break;
        case 'Afinamento':
          resultCanvas = afinamento(inputImage);
          break;
        default:
          return;
      }

      if (onPreview) {
        onPreview(resultCanvas);
      }

      setOperationStatus(`Pronto: ${currentOperation} concluído`);
    } catch (error) {
      console.error(`Erro ao aplicar ${currentOperation}:`, error);
      setOperationStatus(`Erro ao aplicar ${currentOperation}`);
    }
  }, [currentOperation, inputImage, onPreview]);

  const handleOperation = (operation) => {
    if (!inputImage) {
      alert('Por favor, carregue uma imagem primeiro');
      return;
    }

    setCurrentOperation(operation);
  };

  const handleApply = () => {
    if (!inputImage || !currentOperation) {
      alert('Selecione uma operação e certifique-se de que a imagem está carregada');
      return;
    }

    let resultCanvas;

    try {
      switch (currentOperation) {
        case 'Dilatação':
          resultCanvas = dilatacao(inputImage);
          break;
        case 'Erosão':
          resultCanvas = erodacao(inputImage);
          break;
        case 'Abertura':
          resultCanvas = abertura(inputImage);
          break;
        case 'Fechamento':
          resultCanvas = fechamento(inputImage);
          break;
        case 'Afinamento':
          resultCanvas = afinamento(inputImage);
          break;
        default:
          return;
      }

      if (onProcessar) {
        onProcessar(resultCanvas);
      }

      if (onClose) {
        onClose();
      }

      setOperationStatus(`Concluído: ${currentOperation} aplicado`);

      setTimeout(() => setOperationStatus(''), 2000);
    } catch (error) {
      console.error(`Erro ao aplicar ${currentOperation}:`, error);
      setOperationStatus(`Erro ao aplicar ${currentOperation}`);
    }
  };

  const handleReset = () => {
    setCurrentOperation(null);
    setOperationStatus('');
  };

  const operations = [
    {
      name: 'Dilatação',
      description: 'Expande regiões brancas em imagens binárias',
    },
    {
      name: 'Erosão',
      description: 'Reduz regiões brancas em imagens binárias',
    },
    {
      name: 'Abertura',
      description: 'Combina erosão e dilatação - remove pequenos objetos',
    },
    {
      name: 'Fechamento',
      description: 'Combina dilatação e erosão - preenche buracos',
    },
    {
      name: 'Afinamento',
      description: 'Reduz objetos a esqueletos de largura de um pixel (Zhang-Suen)',
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Morfológicas</div>

        {operations.map((op) => (
          <button
            key={op.name}
            type="button"
            style={{
              ...styles.operationButton,
              ...(currentOperation === op.name ? styles.operationButtonActive : {}),
            }}
            onClick={() => handleOperation(op.name)}
          >
            {op.name}
            <div style={styles.description}>{op.description}</div>
          </button>
        ))}

        <div style={styles.current}>
          Operação atual: {currentOperation || 'Nenhuma selecionada'}
        </div>
      </div>

      {operationStatus && (
        <div style={styles.status}>{operationStatus}</div>
      )}

      <div style={styles.buttons}>
        <button
          type="button"
          style={styles.button}
          onClick={handleApply}
          disabled={!currentOperation}
        >
          Aplicar
        </button>

        <button
          type="button"
          style={{ ...styles.button, ...styles.buttonSecondary }}
          onClick={handleReset}
        >
          Resetar
        </button>
      </div>
    </div>
  );
}