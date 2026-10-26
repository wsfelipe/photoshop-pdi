export function applyConvolution(image, kernel) {
  let sourceCanvas;
  let width;
  let height;

  if (image instanceof HTMLCanvasElement) {
    sourceCanvas = image;
    width = image.width;
    height = image.height;
  } else if (image instanceof ImageData) {
    sourceCanvas = document.createElement('canvas');
    sourceCanvas.width = image.width;
    sourceCanvas.height = image.height;

    width = image.width;
    height = image.height;

    const sourceCtx = sourceCanvas.getContext('2d');
    sourceCtx.putImageData(image, 0, 0);
  } else if (image instanceof HTMLImageElement) {
    sourceCanvas = document.createElement('canvas');
    sourceCanvas.width = image.width;
    sourceCanvas.height = image.height;

    width = image.width;
    height = image.height;

    const sourceCtx = sourceCanvas.getContext('2d');
    sourceCtx.drawImage(image, 0, 0);
  } else {
    throw new Error(
      'Invalid image type. Expected Canvas, ImageData, or HTMLImageElement'
    );
  }

  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = width;
  outputCanvas.height = height;

  const sourceCtx = sourceCanvas.getContext('2d');
  const outputCtx = outputCanvas.getContext('2d');

  const imageData = sourceCtx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const output = new ImageData(width, height);

  const kernelSize = kernel.length;
  const offset = Math.floor(kernelSize / 2);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0;
      let g = 0;
      let b = 0;

      for (let ky = 0; ky < kernelSize; ky++) {
        for (let kx = 0; kx < kernelSize; kx++) {
          const px = Math.min(width - 1, Math.max(0, x + kx - offset));
          const py = Math.min(height - 1, Math.max(0, y + ky - offset));

          const index = (py * width + px) * 4;
          const weight = kernel[ky][kx];

          r += data[index] * weight;
          g += data[index + 1] * weight;
          b += data[index + 2] * weight;
        }
      }

      const outputIndex = (y * width + x) * 4;

      output.data[outputIndex] = Math.max(0, Math.min(255, r));
      output.data[outputIndex + 1] = Math.max(0, Math.min(255, g));
      output.data[outputIndex + 2] = Math.max(0, Math.min(255, b));
      output.data[outputIndex + 3] = data[outputIndex + 3];
    }
  }

  outputCtx.putImageData(output, 0, 0);

  return outputCanvas;
}
