export function threshold(image, value = 128) {
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

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
    const result = gray >= value ? 255 : 0;

    data[i] = result;
    data[i + 1] = result;
    data[i + 2] = result;
  }

  outputCtx.putImageData(imageData, 0, 0);

  return outputCanvas;
}
