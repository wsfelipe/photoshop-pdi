/**
 * Translates an image by moving all pixels by a specified offset
 * in the X and Y directions.
 * 
 * @param {CanvasImageSource} image - Input image (Canvas, ImageData, or Image)
 * @param {number} deltaX - Horizontal displacement (pixels, can be negative)
 * @param {number} deltaY - Vertical displacement (pixels, can be negative)
 * @param {string} fillColor - Background fill color when pixels move outside bounds
 *                            Options: 'black' (default), 'white', 'transparent'
 * @returns {Canvas} A new canvas with the translated image
 * 
 * @example
 * // Translate image 50 pixels right and 30 pixels down
 * const canvas = document.getElementById('myCanvas');
 * const translatedCanvas = transladar(canvas, 50, 30);
 * 
 * @example
 * // Translate image with white background
 * const translatedCanvas = transladar(canvas, -20, 40, 'white');
 */
export function transladar(image, deltaX, deltaY, fillColor = 'black') {
  // Step 1: Get image dimensions
  let sourceCanvas;
  let width, height;
  let sourceCtx;

  // Handle different input types
  if (image instanceof HTMLCanvasElement) {
    sourceCanvas = image;
    width = image.width;
    height = image.height;
    sourceCtx = image.getContext('2d');
  } else if (image instanceof ImageData) {
    // If ImageData is passed, create a canvas from it
    sourceCanvas = document.createElement('canvas');
    sourceCanvas.width = image.width;
    sourceCanvas.height = image.height;
    width = image.width;
    height = image.height;
    sourceCtx = sourceCanvas.getContext('2d');
    sourceCtx.putImageData(image, 0, 0);
  } else if (image instanceof HTMLImageElement) {
    sourceCanvas = document.createElement('canvas');
    sourceCanvas.width = image.width;
    sourceCanvas.height = image.height;
    width = image.width;
    height = image.height;
    sourceCtx = sourceCanvas.getContext('2d');
    sourceCtx.drawImage(image, 0, 0);
  } else {
    throw new Error('Invalid image type. Expected Canvas, ImageData, or HTMLImageElement');
  }

  // Step 2: Create output canvas with same dimensions
  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = width;
  outputCanvas.height = height;
  const outputCtx = outputCanvas.getContext('2d');

  // Step 3: Set background color based on fillColor parameter
  switch (fillColor) {
    case 'white':
      outputCtx.fillStyle = 'white';
      outputCtx.fillRect(0, 0, width, height);
      break;
    case 'transparent':
      // Canvas is transparent by default, do nothing
      break;
    case 'black':
    default:
      outputCtx.fillStyle = 'black';
      outputCtx.fillRect(0, 0, width, height);
  }

  // Step 4: Draw the source image at the translated position
  // When translating, we draw the original image at the new offset position
  outputCtx.drawImage(sourceCanvas, deltaX, deltaY);

  // Step 5: Handle wraparound for pixels that move outside bounds
  // This is optional - we're drawing the image at the offset position
  // Parts that go outside will be clipped automatically by Canvas API
  // If you want wraparound instead, use the alternative implementation below

  return outputCanvas;
}

/**
 * Alternative implementation using pixel-by-pixel manipulation
 * This allows for wraparound/toroidal translation
 * 
 * @param {CanvasImageSource} image - Input image
 * @param {number} deltaX - Horizontal displacement
 * @param {number} deltaY - Vertical displacement
 * @param {boolean} wraparound - If true, pixels that exit wrap to opposite side
 * @returns {Canvas} Translated image
 */
export function transladarPixelByPixel(image, deltaX, deltaY, wraparound = false) {
  // Get source image as ImageData
  let sourceImageData;
  let width, height;

  if (image instanceof HTMLCanvasElement) {
    const ctx = image.getContext('2d');
    sourceImageData = ctx.getImageData(0, 0, image.width, image.height);
    width = image.width;
    height = image.height;
  } else if (image instanceof ImageData) {
    sourceImageData = image;
    width = image.width;
    height = image.height;
  } else {
    throw new Error('This version only works with Canvas or ImageData');
  }

  // Create output ImageData
  const outputImageData = new ImageData(width, height);
  const sourceData = sourceImageData.data;
  const outputData = outputImageData.data;

  // Fill with black/transparent background
  // If fillColor is 'black', leave as zeros (default)
  // If fillColor is 'transparent', set alpha to 0 (already done)

  // Iterate through each pixel in the source image
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Calculate new position after translation
      let newX = x + deltaX;
      let newY = y + deltaY;

      // Handle wraparound or clipping
      if (wraparound) {
        // Wraparound: use modulo to wrap pixels to opposite side
        newX = ((newX % width) + width) % width;
        newY = ((newY % height) + height) % height;
      } else {
        // Clipping: if out of bounds, skip this pixel (leave background)
        if (newX < 0 || newX >= width || newY < 0 || newY >= height) {
          continue;
        }
      }

      // Copy pixel from source to output
      const sourceIndex = (y * width + x) * 4;
      const outputIndex = (newY * width + newX) * 4;

      outputData[outputIndex] = sourceData[sourceIndex];         // Red
      outputData[outputIndex + 1] = sourceData[sourceIndex + 1]; // Green
      outputData[outputIndex + 2] = sourceData[sourceIndex + 2]; // Blue
      outputData[outputIndex + 3] = sourceData[sourceIndex + 3]; // Alpha
    }
  }

  // Create canvas from ImageData
  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = width;
  outputCanvas.height = height;
  const ctx = outputCanvas.getContext('2d');
  ctx.putImageData(outputImageData, 0, 0);

  return outputCanvas;
}

/**
 * Get pixel value at given coordinates
 * Helper function for pixel-level operations
 */
function getPixel(imageData, x, y) {
  const index = (y * imageData.width + x) * 4;
  return {
    r: imageData.data[index],
    g: imageData.data[index + 1],
    b: imageData.data[index + 2],
    a: imageData.data[index + 3]
  };
}

/**
 * Set pixel value at given coordinates
 * Helper function for pixel-level operations
 */
function setPixel(imageData, x, y, r, g, b, a = 255) {
  const index = (y * imageData.width + x) * 4;
  imageData.data[index] = r;
  imageData.data[index + 1] = g;
  imageData.data[index + 2] = b;
  imageData.data[index + 3] = a;
}