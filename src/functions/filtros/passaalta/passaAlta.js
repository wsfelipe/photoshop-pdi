import { applyConvolution } from '../../utils/convolution';

function getGrayscaleData(image) {
  const source = image instanceof HTMLCanvasElement ? image : document.createElement('canvas');
  const ctx = source.getContext('2d');

  if (!(image instanceof HTMLCanvasElement)) {
    source.width = image.width;
    source.height = image.height;
    ctx.drawImage(image, 0, 0);
  }

  return ctx.getImageData(0, 0, image.width, image.height).data;
}

function createNormalizedCanvasFromValues(image, values) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const output = ctx.createImageData(image.width, image.height);

  let maxValue = 0;
  for (const value of values) {
    maxValue = Math.max(maxValue, Math.abs(value));
  }

  for (let i = 0; i < values.length; i++) {
    const normalized = maxValue > 0 ? (values[i] / maxValue) * 255 : 0;
    const gray = Math.min(255, Math.max(0, Math.round(normalized)));
    const index = i * 4;

    output.data[index] = gray;
    output.data[index + 1] = gray;
    output.data[index + 2] = gray;
    output.data[index + 3] = 255;
  }

  canvas.width = image.width;
  canvas.height = image.height;
  ctx.putImageData(output, 0, 0);

  return canvas;
}

function applyDirectionalFilter(image, masks) {
  const data = getGrayscaleData(image);
  const width = image.width;
  const height = image.height;
  const values = new Float32Array(width * height);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let maxResponse = 0;

      for (const mask of masks) {
        let sum = 0;

        for (let ky = 0; ky < 3; ky++) {
          for (let kx = 0; kx < 3; kx++) {
            const px = x + kx - 1;
            const py = y + ky - 1;
            const idx = (py * width + px) * 4;
            const gray = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
            sum += gray * mask[ky][kx];
          }
        }

        maxResponse = Math.max(maxResponse, Math.abs(sum));
      }

      values[y * width + x] = maxResponse;
    }
  }

  return createNormalizedCanvasFromValues(image, values);
}

function applyGradientMagnitude(image, kernelX, kernelY) {
  const data = getGrayscaleData(image);
  const width = image.width;
  const height = image.height;
  const values = new Float32Array(width * height);
  const kernelHeight = kernelX.length;
  const kernelWidth = kernelX[0].length;
  const offsetY = Math.floor(kernelHeight / 2);
  const offsetX = Math.floor(kernelWidth / 2);

  for (let y = offsetY; y < height - offsetY; y++) {
    for (let x = offsetX; x < width - offsetX; x++) {
      let gx = 0;
      let gy = 0;

      for (let ky = 0; ky < kernelHeight; ky++) {
        for (let kx = 0; kx < kernelWidth; kx++) {
          const px = x + kx - offsetX;
          const py = y + ky - offsetY;
          const idx = (py * width + px) * 4;
          const gray = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;

          gx += gray * kernelX[ky][kx];
          gy += gray * kernelY[ky][kx];
        }
      }

      values[y * width + x] = Math.hypot(gx, gy);
    }
  }

  return createNormalizedCanvasFromValues(image, values);
}

export function passaAltaRoberts(image) {
  const kernelX = [
    [1, 0],
    [0, -1],
  ];
  const kernelY = [
    [0, 1],
    [-1, 0],
  ];

  return applyGradientMagnitude(image, kernelX, kernelY);
}

export function passaAltaSobel(image) {
  const kernelX = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1],
  ];
  const kernelY = [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1],
  ];

  return applyGradientMagnitude(image, kernelX, kernelY);
}

export function passaAltaPrewitt(image) {
  const kernelX = [
    [-1, 0, 1],
    [-1, 0, 1],
    [-1, 0, 1],
  ];
  const kernelY = [
    [-1, -1, -1],
    [0, 0, 0],
    [1, 1, 1],
  ];

  return applyGradientMagnitude(image, kernelX, kernelY);
}

export function passaAltaKirsch(image) {
  const masks = [
    [[5, 5, 5], [-3, 0, -3], [-3, -3, -3]],
    [[-3, 5, 5], [-3, 0, 5], [-3, -3, -3]],
    [[-3, -3, 5], [-3, 0, 5], [-3, -3, 5]],
    [[-3, -3, -3], [-3, 0, 5], [-3, 5, 5]],
    [[-3, -3, -3], [-3, 0, -3], [5, 5, 5]],
    [[-3, -3, -3], [5, 0, -3], [5, 5, -3]],
    [[5, -3, -3], [5, 0, -3], [5, -3, -3]],
    [[5, 5, -3], [5, 0, -3], [-3, -3, -3]],
  ];

  return applyDirectionalFilter(image, masks);
}

export function passaAltaRobinson(image) {
  const masks = [
    [[-1, -2, -1], [0, 0, 0], [1, 2, 1]],
    [[0, -1, -2], [1, 0, -1], [2, 1, 0]],
    [[1, 0, -1], [2, 0, -2], [1, 0, -1]],
    [[2, 1, 0], [1, 0, -1], [0, -1, -2]],
    [[1, 2, 1], [0, 0, 0], [-1, -2, -1]],
    [[0, 1, 2], [-1, 0, 1], [-2, -1, 0]],
    [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]],
    [[-2, -1, 0], [-1, 0, 1], [0, 1, 2]],
  ];

  return applyDirectionalFilter(image, masks);
}

export function passaAltaLoG(image) {
  const gaussianKernel = [
    [1 / 16, 2 / 16, 1 / 16],
    [2 / 16, 4 / 16, 2 / 16],
    [1 / 16, 2 / 16, 1 / 16],
  ];

  const blurred = applyConvolution(image, gaussianKernel);
  const data = getGrayscaleData(blurred);
  const width = blurred.width;
  const height = blurred.height;
  const values = new Float32Array(width * height);

  const laplacianKernel = [
    [0, -1, 0],
    [-1, 4, -1],
    [0, -1, 0],
  ];

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let response = 0;

      for (let ky = 0; ky < 3; ky++) {
        for (let kx = 0; kx < 3; kx++) {
          const px = x + kx - 1;
          const py = y + ky - 1;
          const idx = (py * width + px) * 4;
          const gray = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
          response += gray * laplacianKernel[ky][kx];
        }
      }

      values[y * width + x] = Math.abs(response);
    }
  }

  return createNormalizedCanvasFromValues(blurred, values);
}

export function passaAltaCanny(image) {
  const blur = applyConvolution(image, [
    [1 / 16, 2 / 16, 1 / 16],
    [2 / 16, 4 / 16, 2 / 16],
    [1 / 16, 2 / 16, 1 / 16],
  ]);

  const data = getGrayscaleData(blur);
  const width = blur.width;
  const height = blur.height;
  const magnitude = new Float32Array(width * height);
  const gradient = new Float32Array(width * height);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      let gx = 0;
      let gy = 0;

      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const neighborIndex = ((y + ky) * width + (x + kx)) * 4;
          const value = (data[neighborIndex] + data[neighborIndex + 1] + data[neighborIndex + 2]) / 3;
          const sx = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
          const sy = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
          const kernelIndex = (ky + 1) * 3 + (kx + 1);

          gx += value * sx[kernelIndex];
          gy += value * sy[kernelIndex];
        }
      }

      const response = Math.hypot(gx, gy);
      magnitude[idx] = response;
      gradient[y * width + x] = response;
    }
  }

  let maxMagnitude = 0;
  for (const value of gradient) {
    maxMagnitude = Math.max(maxMagnitude, value);
  }

  const threshold = maxMagnitude * 0.35;
  const output = new Float32Array(width * height);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const index = y * width + x;
      const value = gradient[index];
      output[index] = value >= threshold ? value : 0;
    }
  }

  return createNormalizedCanvasFromValues(blur, output);
}

export function passaAltaLaplaciano(image) {
  const kernel = [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1],
  ];

  return applyConvolution(image, kernel);
}

export function passaAlta(image) {
  return passaAltaLaplaciano(image);
}