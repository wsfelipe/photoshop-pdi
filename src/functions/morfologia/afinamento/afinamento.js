export function afinamento(image) {
  let sourceCanvas, width, height;
  if (image instanceof HTMLCanvasElement) { sourceCanvas = image; width = image.width; height = image.height; }
  else if (image instanceof ImageData) { sourceCanvas = document.createElement('canvas'); sourceCanvas.width = image.width; sourceCanvas.height = image.height; width = image.width; height = image.height; sourceCanvas.getContext('2d').putImageData(image, 0, 0); }
  else if (image instanceof HTMLImageElement) { sourceCanvas = document.createElement('canvas'); sourceCanvas.width = image.width; sourceCanvas.height = image.height; width = image.width; height = image.height; sourceCanvas.getContext('2d').drawImage(image, 0, 0); }
  else throw new Error('Invalid image type');

  const ctx = sourceCanvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // Binarizar
  const bin = new Uint8Array(width * height);
  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    bin[i] = ((data[idx] + data[idx+1] + data[idx+2]) / 3 > 128) ? 1 : 0;
  }

  let changed = true;
  while (changed) {
    changed = false;
    const toRemove = [];

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const i = y * width + x;
        if (bin[i] === 0) continue;

        const n = [
          bin[(y-1)*width + x],
          bin[(y-1)*width + x+1],
          bin[y*width + x+1],
          bin[(y+1)*width + x+1],
          bin[(y+1)*width + x],
          bin[(y+1)*width + x-1],
          bin[y*width + x-1],
          bin[(y-1)*width + x-1],
        ];

        let transitions = 0;
        for (let k = 0; k < 8; k++) {
          if (n[k] === 0 && n[(k+1)%8] === 1) transitions++;
        }

        const whiteNeighbors = n.reduce((s, v) => s + v, 0);

        const orthZero = (n[0] === 0 || n[2] === 0 || n[4] === 0 || n[6] === 0);
        const diagZero = (n[1] === 0 || n[3] === 0 || n[5] === 0 || n[7] === 0);

        if (whiteNeighbors >= 2 && whiteNeighbors <= 6 &&
            transitions >= 1 && transitions <= 2 &&
            orthZero && diagZero) {
          toRemove.push(i);
        }
      }
    }

    if (toRemove.length > 0) {
      changed = true;
      for (const idx of toRemove) bin[idx] = 0;
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (bin[y * width + x] === 1) {
        data[i] = 255; data[i+1] = 255; data[i+2] = 255; data[i+3] = 255;
      } else {
        data[i] = 0; data[i+1] = 0; data[i+2] = 0; data[i+3] = 255;
      }
    }
  }

  const outCanvas = document.createElement('canvas');
  outCanvas.width = width; outCanvas.height = height;
  outCanvas.getContext('2d').putImageData(imageData, 0, 0);
  return outCanvas;
}
