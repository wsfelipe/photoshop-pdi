import { criarElemento } from '../elementoEstruturante';

export function erodacao(image, tamanho = 3, conexoes = 8) {
  let sourceCanvas, width, height;

  if (image instanceof HTMLCanvasElement) {
    sourceCanvas = image; width = image.width; height = image.height;
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

  for (let i = 0; i < out.length; i++) out[i] = 0;

  // Conforme PPTX: erosão é inverso da dilatação
  // Pixel permanece branco apenas se o elemento estruturante inteiro
  // encaixar dentro da região branca (todos os pixels do elemento estão ativos)
  for (let y = offset; y < height - offset; y++) {
    for (let x = offset; x < width - offset; x++) {
      const idx = (y * width + x) * 4;
      let encaixa = true;

      // Verifica se todos os pixels do elemento estão ativos na original
      for (let ey = 0; ey < tamanho; ey++) {
        for (let ex = 0; ex < tamanho; ex++) {
          if (elemento[ey][ex] === 1) {
            const nx = x + ex - offset;
            const ny = y + ey - offset;
            const nIdx = (ny * width + nx) * 4;
            if (data[nIdx] <= 128 && data[nIdx + 1] <= 128 && data[nIdx + 2] <= 128) {
              encaixa = false;
            }
          }
        }
      }

      if (encaixa) {
        out[idx] = 255; out[idx + 1] = 255; out[idx + 2] = 255; out[idx + 3] = 255;
      }
    }
  }

  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = width; outputCanvas.height = height;
  outputCanvas.getContext('2d').putImageData(output, 0, 0);
  return outputCanvas;
}
