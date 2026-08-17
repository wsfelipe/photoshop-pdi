# Digital Image Processing System
## Universidade Feevale - 2nd Semester 2026

Digital Image Processing System - A comprehensive web-based application developed for the Digital Image Processing course at Universidade Feevale (2nd semester 2026). This interactive platform enables students to explore and implement various image processing techniques including geometric transformations, filtering, mathematical morphology operations, and feature extraction. Built with React and designed with a modular architecture to facilitate learning and experimentation with digital image processing concepts.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Geometric Transformations](#geometric-transformations)
- [Filters](#filters)
- [Mathematical Morphology](#mathematical-morphology)
- [Feature Extraction](#feature-extraction)
- [Contributing](#contributing)

---

## Project Structure

```
src/
├── components/              # UI Components
├── menus/                   # Menu system
├── styles/                  # Application styles
├── transformacoes/          # Geometric transformation functions
├── filtros/                 # Filter functions
├── morfologia/              # Morphological operations
└── funcoes/                 # Utility functions
```

---

## Installation

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:5173`

---

# Function Documentation

## Geometric Transformations (Transformações Geométricas)

### 1. Translation (Transladar)

**File:** `src/transformacoes/transladar.js`

**Description:**
Translates an image by moving all pixels by a specified offset in the X and Y directions.

**Parameters:**
- `image`: Input image (ImageData or Canvas)
- `deltaX`: Horizontal displacement (pixels)
- `deltaY`: Vertical displacement (pixels)

**Expected Output:**
An image shifted by the given offsets. Areas outside the original image boundaries should be handled (padding with black or wraparound).

**Implementation:**

```javascript
export function transladar(image, deltaX, deltaY) {
  // TODO: Implement translation function
  // - Extract image data
  // - Create new canvas with translated content
  // - Handle boundary conditions
  // - Return processed image
}
```

---

### 2. Rotation (Rotacionar)

**File:** `src/transformacoes/rotacionar.js`

**Description:**
Rotates an image by a specified angle (in degrees) around its center.

**Parameters:**
- `image`: Input image (ImageData or Canvas)
- `angle`: Rotation angle in degrees (0-360)

**Expected Output:**
An image rotated by the specified angle. Consider interpolation methods for anti-aliasing.

**Implementation:**

```javascript
export function rotacionar(image, angle) {
  // TODO: Implement rotation function
  // - Convert angle to radians
  // - Calculate transformation matrix
  // - Apply bilinear or bicubic interpolation
  // - Return rotated image
}
```

---

### 3. Mirroring/Flip (Espelhar)

**File:** `src/transformacoes/espelhar.js`

**Description:**
Mirrors an image horizontally (flip left-right) or vertically (flip top-bottom).

**Parameters:**
- `image`: Input image (ImageData or Canvas)
- `direction`: "horizontal" or "vertical"

**Expected Output:**
A mirrored version of the input image.

**Implementation:**

```javascript
export function espelhar(image, direction) {
  // TODO: Implement mirroring function
  // - Support both horizontal and vertical flipping
  // - Reverse pixel order according to direction
  // - Return mirrored image
}
```

---

### 4. Zoom In (Aumentar)

**File:** `src/transformacoes/aumentar.js`

**Description:**
Enlarges an image by a specified scale factor using interpolation.

**Parameters:**
- `image`: Input image (ImageData or Canvas)
- `scaleFactor`: Enlargement factor (e.g., 2.0 for 2x zoom)

**Expected Output:**
An enlarged image with the specified scale factor.

**Implementation:**

```javascript
export function aumentar(image, scaleFactor) {
  // TODO: Implement zoom in function
  // - Calculate new dimensions
  // - Apply interpolation (nearest neighbor or bilinear)
  // - Resize image
  // - Return enlarged image
}
```

---

### 5. Zoom Out (Diminuir)

**File:** `src/transformacoes/diminuir.js`

**Description:**
Reduces an image size by a specified scale factor.

**Parameters:**
- `image`: Input image (ImageData or Canvas)
- `scaleFactor`: Reduction factor (e.g., 0.5 for 50% zoom)

**Expected Output:**
A reduced image with the specified scale factor.

**Implementation:**

```javascript
export function diminuir(image, scaleFactor) {
  // TODO: Implement zoom out function
  // - Calculate new dimensions
  // - Apply downsampling technique
  // - Return reduced image
}
```

---

## Filters (Filtros)

### 1. Grayscale

**File:** `src/filtros/grayscale.js`

**Description:**
Converts a color image to grayscale using the luminosity method or average method.

**Parameters:**
- `image`: Input image (ImageData or Canvas)
- `method`: "luminosity" or "average" (optional, default: "luminosity")

**Expected Output:**
A grayscale version of the input image.

**Implementation:**

```javascript
export function grayscale(image, method = "luminosity") {
  // TODO: Implement grayscale conversion
  // - Luminosity method: 0.299*R + 0.587*G + 0.114*B
  // - Average method: (R + G + B) / 3
  // - Apply to all pixels
  // - Return grayscale image
}
```

---

### 2. Low Pass Filter (Passa Baixa)

**File:** `src/filtros/passaBaixa.js`

**Description:**
Applies a low pass filter to blur/smooth the image by removing high-frequency components.

**Parameters:**
- `image`: Input image (ImageData or Canvas)
- `kernelSize`: Size of the convolution kernel (3, 5, 7, etc.)

**Expected Output:**
A blurred/smoothed version of the input image.

**Implementation:**

```javascript
export function passaBaixa(image, kernelSize = 5) {
  // TODO: Implement low pass filter
  // - Create averaging kernel
  // - Apply convolution
  // - Handle image boundaries
  // - Return filtered image
}
```

---

### 3. High Pass Filter (Passa Alta)

**File:** `src/filtros/passaAlta.js`

**Description:**
Applies a high pass filter to enhance edges and details by removing low-frequency components.

**Parameters:**
- `image`: Input image (ImageData or Canvas)
- `kernelSize`: Size of the convolution kernel (3, 5, 7, etc.)

**Expected Output:**
An edge-enhanced version of the input image.

**Implementation:**

```javascript
export function passaAlta(image, kernelSize = 3) {
  // TODO: Implement high pass filter
  // - Create edge detection kernel
  // - Apply convolution (e.g., Sobel, Laplacian)
  // - Handle boundaries
  // - Return filtered image
}
```

---

### 4. Threshold

**File:** `src/filtros/threshold.js`

**Description:**
Converts a grayscale image to binary (black and white) based on a threshold value.

**Parameters:**
- `image`: Input image (ImageData or Canvas, preferably grayscale)
- `thresholdValue`: Threshold intensity (0-255)

**Expected Output:**
A binary image where pixels below threshold are black (0) and above are white (255).

**Implementation:**

```javascript
export function threshold(image, thresholdValue = 128) {
  // TODO: Implement threshold function
  // - For each pixel, check intensity against threshold
  // - Set to 0 (black) if below threshold
  // - Set to 255 (white) if above threshold
  // - Return binary image
}
```

---

## Mathematical Morphology (Morfologia Matemática)

### 1. Dilation (Dilatação)

**File:** `src/morfologia/dilatacao.js`

**Description:**
Applies morphological dilation using a structuring element. Expands white regions in the image.

**Parameters:**
- `image`: Input binary image (ImageData or Canvas)
- `kernelSize`: Size of the structuring element (3, 5, 7, etc.)

**Expected Output:**
A dilated image where white regions are expanded.

**Implementation:**

```javascript
export function dilatacao(image, kernelSize = 3) {
  // TODO: Implement dilation
  // - Create structuring element
  // - For each pixel, check if any kernel element overlaps white region
  // - Set output pixel to white if overlap detected
  // - Return dilated image
}
```

---

### 2. Erosion (Erosão)

**File:** `src/morfologia/erosao.js`

**Description:**
Applies morphological erosion using a structuring element. Shrinks white regions in the image.

**Parameters:**
- `image`: Input binary image (ImageData or Canvas)
- `kernelSize`: Size of the structuring element (3, 5, 7, etc.)

**Expected Output:**
An eroded image where white regions are shrunk.

**Implementation:**

```javascript
export function erosao(image, kernelSize = 3) {
  // TODO: Implement erosion
  // - Create structuring element
  // - For each pixel, check if all kernel elements are white
  // - Set output to white only if entire kernel is white
  // - Return eroded image
}
```

---

### 3. Opening (Abertura)

**File:** `src/morfologia/abertura.js`

**Description:**
Applies opening (erosion followed by dilation) to remove small objects while preserving large ones.

**Parameters:**
- `image`: Input binary image (ImageData or Canvas)
- `kernelSize`: Size of the structuring element (3, 5, 7, etc.)

**Expected Output:**
An opened image with small objects removed.

**Implementation:**

```javascript
export function abertura(image, kernelSize = 3) {
  // TODO: Implement opening
  // - Apply erosion
  // - Apply dilation to the result
  // - Return opened image
}
```

---

### 4. Closing (Fechamento)

**File:** `src/morfologia/fechamento.js`

**Description:**
Applies closing (dilation followed by erosion) to fill small holes while preserving large structures.

**Parameters:**
- `image`: Input binary image (ImageData or Canvas)
- `kernelSize`: Size of the structuring element (3, 5, 7, etc.)

**Expected Output:**
A closed image with small holes filled.

**Implementation:**

```javascript
export function fechamento(image, kernelSize = 3) {
  // TODO: Implement closing
  // - Apply dilation
  // - Apply erosion to the result
  // - Return closed image
}
```

---

### 5. Thinning (Afinamento)

**File:** `src/morfologia/afinamento.js`

**Description:**
Applies thinning (skeletonization) to reduce objects to their skeletal structure while preserving connectivity.

**Parameters:**
- `image`: Input binary image (ImageData or Canvas)

**Expected Output:**
A thinned image representing the skeleton of objects.

**Implementation:**

```javascript
export function afinamento(image) {
  // TODO: Implement thinning
  // - Apply iterative thinning algorithm (Zhang-Suen or similar)
  // - Preserve connectivity
  // - Continue until no more pixels can be removed
  // - Return thinned image
}
```

---

## Feature Extraction (Extração de Características)

### Challenge (DESAFIO)

**File:** `src/caracteristicas/desafio.js`

**Description:**
[To be defined by instructor - Feature extraction challenge for students]

**Parameters:**
- `image`: Input image

**Expected Output:**
[To be defined]

**Implementation:**

```javascript
export function desafio(image) {
  // TODO: Implement challenge function
  // [Instructions to be provided by instructor]
}
```

---

## Utility Functions

### Canvas/ImageData Helper Functions

**File:** `src/funcoes/utils.js`

Create utility functions for common operations:

```javascript
// Convert Canvas to ImageData
export function canvasToImageData(canvas) {
  // TODO: Implement
}

// Convert ImageData to Canvas
export function imageDataToCanvas(imageData) {
  // TODO: Implement
}

// Get pixel at position
export function getPixel(imageData, x, y) {
  // TODO: Implement
}

// Set pixel at position
export function setPixel(imageData, x, y, r, g, b, a) {
  // TODO: Implement
}

// Apply convolution
export function convolve(imageData, kernel) {
  // TODO: Implement
}
```

---

## Testing & Validation

For each function, test with:
- Small test images (8x8, 16x16)
- Real photographs
- Edge cases (solid color, gradient)
- Boundary conditions

---

## References

- Digital Image Processing (Gonzalez & Woods)
- Image Processing with Python: Algorithms and Applications
- OpenCV Tutorials: https://docs.opencv.org/
- MDN Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

---

## Author

Felipe Wiebke Schons

---

**Course:** Digital Image Processing
**Institution:** Universidade Feevale
**Semester:** 2nd Semester, 2026
**Version:** 1.0.0