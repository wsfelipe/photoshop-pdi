import { criarElemento } from '../elementoEstruturante';

export function dilatacao(image, tamanho = 3, conexoes = 8) {
  let sourceCanvas, width, height;

  if (image instanceof HTMLCanvasElement) {
    sourceCanvas = image;
    width = image.width; height = image.height;
  } else if (image instanceof ImageData) {
    sourceCanvas = document.createElement('canvas');
    sourceCanvas.width = image.width; sourceCanvas.height = image.height;
    width = image.width; height = image.height;
    sourceCanvas.getContext('2d').putImageData(image, 0, 0);
  } else if (image instanceof HTMLImageElement) {
    sourceCanvas = document.createElement('canvas');
    sourceCanvas.width = image.width; sourceCanvas.height = image.height;
    width = image.width; height = image.height;
    sourceCanvas.getContext('2d').drawImage(image, 0, 0);
  } else {
    throw new Error('Invalid image type');
  }

  const elemento = criarElemento(tamanho, conexoes);
  const offset = Math.floor(tamanho / 2);
  const sourceCtx = sourceCanvas.getContext('2d');
  const imageData = sourceCtx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const output = new ImageData(width, height);
  const out = output.data;

  // Inicializa com preto
  for (let i = 0; i < out.length; i++) out[i] = 0;

  // Conforme PPTX: percorre imagem com elemento estruturante sobreposto
  // Se encontrar pixel ativo na mesma posição da origem, ativa todos os pixels
  // do elemento estruturante na imagem resultante
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      // Se pixel original é branco (ativo)
      if (data[idx] > 128 || data[idx + 1] > 128 || data[idx + 2] > 128) {
        // Aplicar elemento estruturante centrado em (x,y)
        for (let ey = 0; ey < tamanho; ey++) {
          for (let ex = 0; ex < tamanho; ex++) {
            if (elemento[ey][ex] === 1) {
              const nx = x + ex - offset;
              const ny = y + ey - offset;
              if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                const outIdx = (ny * width + nx) * 4;
                out[outIdx] = 255;
                out[outIdx + 1] = 255;
                out[outIdx + 2] = 255;
                out[outIdx + 3] = 255;
              }
            }
          }
        }
      }
    }
  }

  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = width; outputCanvas.height = height;
  outputCanvas.getContext('2d').putImageData(output, 0, 0);
  return outputCanvas;
}
