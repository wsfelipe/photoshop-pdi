import { applyConvolution } from '../../utils/convolution';

function getImageDataArray(image) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = image.width;
  canvas.height = image.height;

  if (image instanceof HTMLCanvasElement) {
    ctx.drawImage(image, 0, 0);
  } else if (image instanceof HTMLImageElement) {
    ctx.drawImage(image, 0, 0);
  }

  return ctx.getImageData(0, 0, image.width, image.height);
}

function createCanvasFromValues(image, values) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const output = ctx.createImageData(image.width, image.height);

  let maxValue = 0;
  values.forEach(value => {
    maxValue = Math.max(maxValue, Math.abs(value));
  });

  for (let i = 0; i < values.length; i++) {
    const normalized = maxValue > 0 ? (values[i] / maxValue) * 255 : 0;
    const value = Math.min(255, Math.max(0, Math.round(normalized)));
    const index = i * 4;

    output.data[index] = value;
    output.data[index + 1] = value;
    output.data[index + 2] = value;
    output.data[index + 3] = 255;
  }

  canvas.width = image.width;
  canvas.height = image.height;
  ctx.putImageData(output, 0, 0);

  return canvas;
}

export function passaBaixaMedia(image) {
  const kernel = [
    [1 / 9, 1 / 9, 1 / 9],
    [1 / 9, 1 / 9, 1 / 9],
    [1 / 9, 1 / 9, 1 / 9],
  ];

  return applyConvolution(image, kernel);
}

export function passaBaixaModa(image) {
  const source = getImageDataArray(image);
  const data = source.data;
  const output = new Uint8ClampedArray(data);

  for (let y = 1; y < image.height - 1; y++) {
    for (let x = 1; x < image.width - 1; x++) {
      const counts = new Map();

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const idx = ((y + dy) * image.width + (x + dx)) * 4;
          const gray = Math.round((data[idx] + data[idx + 1] + data[idx + 2]) / 3);
          counts.set(gray, (counts.get(gray) || 0) + 1);
        }
      }

      let mode = 0;
      let maxCount = -1;

      for (const [gray, count] of counts.entries()) {
        if (count > maxCount || (count === maxCount && gray < mode)) {
          maxCount = count;
          mode = gray;
        }
      }

      const idx = (y * image.width + x) * 4;
      output[idx] = mode;
      output[idx + 1] = mode;
      output[idx + 2] = mode;
      output[idx + 3] = 255;
    }
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const result = new ImageData(image.width, image.height);
  result.data.set(output);

  canvas.width = image.width;
  canvas.height = image.height;
  ctx.putImageData(result, 0, 0);

  return canvas;
}

export function passaBaixaMediana(image) {
  const source = getImageDataArray(image);
  const data = source.data;
  const output = new Uint8ClampedArray(data);

  for (let y = 1; y < image.height - 1; y++) {
    for (let x = 1; x < image.width - 1; x++) {
      const idx = (y * image.width + x) * 4;
      const channels = [[], [], []];

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const neighborIndex = ((y + dy) * image.width + (x + dx)) * 4;
          channels[0].push(data[neighborIndex]);
          channels[1].push(data[neighborIndex + 1]);
          channels[2].push(data[neighborIndex + 2]);
        }
      }

      for (let c = 0; c < 3; c++) {
        channels[c].sort((a, b) => a - b);
        const median = channels[c][Math.floor(channels[c].length / 2)];
        output[idx + c] = median;
      }

      output[idx + 3] = 255;
    }
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const result = new ImageData(image.width, image.height);
  result.data.set(output);

  canvas.width = image.width;
  canvas.height = image.height;
  ctx.putImageData(result, 0, 0);

  return canvas;
}

export function passaBaixaGaussiana(image) {
  const kernel = [
    [1 / 16, 2 / 16, 1 / 16],
    [2 / 16, 4 / 16, 2 / 16],
    [1 / 16, 2 / 16, 1 / 16],
  ];

  return applyConvolution(image, kernel);
}

export function passaBaixa(image) {
  return passaBaixaMedia(image);
}