# Photoshop PDI
## Universidade Feevale - 2º Semestre 2026

Aplicativo web para processamento digital de imagens, construído com React. O projeto permite carregar uma imagem, aplicar transformações geométricas e filtros, visualizar o resultado e exportar a imagem processada.

---

## Funcionalidades já implementadas

As funções abaixo já estão presentes no projeto e acessíveis pela interface:

### Transformações geométricas
- `transladar` — desloca a imagem em X e Y
- `rotacionar` — gira a imagem em torno do centro
- `espelhar` — espelha horizontal ou verticalmente
- `aumentar` — amplia a imagem por escala
- `diminuir` — reduz a imagem por escala

### Filtros
- `grayscale` — converte imagem para tons de cinza
- `passaBaixa` — aplica suavização por filtros de baixa frequência
- `passaAlta` — realça bordas e detalhes por operadores de alta frequência
- `threshold` — binariza a imagem por limiar

### Passa baixa implementada
- `Média` — suavização por média local
- `Moda` — substitui pelo valor mais frequente no vizinho
- `Mediana` — remove ruído sal e pimenta
- `Gaussiana` — suavização por kernel gaussiano

### Passa alta implementada
- `Roberts` — detecção de bordas diagonais
- `Sobel` — gradiente horizontal e vertical
- `Prewitt` — detecção por gradiente simples
- `Kirsch` — 8 máscaras direcionais
- `Robinson` — 8 máscaras direcionais
- `Marr-Hildreth (LoG)` — laplaciana da gaussiana
- `Canny` — detecção de bordas por limiar
- `Laplaciano` — realce por segunda derivada

### Arquivos principais
- `src/functions/transformacoes/transladar/transladar.js`
- `src/functions/transformacoes/rotacionar/rotacionar.js`
- `src/functions/transformacoes/espelhar/espelhar.js`
- `src/functions/transformacoes/aumentar/aumentar.js`
- `src/functions/transformacoes/diminuir/diminuir.js`
- `src/functions/filtros/grayscale/grayscale.js`
- `src/functions/filtros/passabaixa/passaBaixa.js`
- `src/functions/filtros/passaalta/passaAlta.js`
- `src/functions/filtros/threshold/threshold.js`

---

## Estrutura do projeto

```bash
photoshop-pdi/
├── public/
├── src/
│   ├── components/
│   ├── functions/
│   │   ├── filtros/
│   │   │   ├── grayscale/
│   │   │   ├── passaalta/
│   │   │   ├── passabaixa/
│   │   │   └── threshold/
│   │   └── transformacoes/
│   │       ├── aumentar/
│   │       ├── diminuir/
│   │       ├── espelhar/
│   │       ├── rotacionar/
│   │       └── transladar/
│   ├── menus/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── README.md
└── .gitignore
```

---

## Como executar

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

3. Inicie o projeto:

```bash
npm run dev
```

4. Acesse a aplicação no navegador em:

```bash
http://localhost:5173
```

---

## Function Documentation

### 1. Transladar

**Arquivo:** `src/functions/transformacoes/transladar/transladar.js`

**Descrição:**
Desloca a imagem em um deslocamento específico nos eixos X e Y.

**Assinatura:**
```javascript
export function transladar(image, deltaX, deltaY)
```

**Parâmetros:**
- `image`: `HTMLCanvasElement`, `ImageData` ou `HTMLImageElement`
- `deltaX`: deslocamento horizontal
- `deltaY`: deslocamento vertical

**Retorno:**
- `Canvas` com a imagem deslocada

---

### 2. Rotacionar

**Arquivo:** `src/functions/transformacoes/rotacionar/rotacionar.js`

**Descrição:**
Gira a imagem em um ângulo informado, preservando a proporção da imagem e ajustando o tamanho do canvas de saída.

**Assinatura:**
```javascript
export function rotacionar(image, angle = 0)
```

**Parâmetros:**
- `image`: entrada da imagem
- `angle`: ângulo em graus

**Retorno:**
- `Canvas` rotacionado

---

### 3. Espelhar

**Arquivo:** `src/functions/transformacoes/espelhar/espelhar.js`

**Descrição:**
Espelha a imagem em sentido horizontal ou vertical.

**Assinatura:**
```javascript
export function espelhar(image, direction = 'horizontal')
```

**Parâmetros:**
- `image`: imagem de entrada
- `direction`: `'horizontal'` ou `'vertical'`

**Retorno:**
- `Canvas` espelhado

---

### 4. Aumentar

**Arquivo:** `src/functions/transformacoes/aumentar/aumentar.js`

**Descrição:**
Amplia a imagem por uma escala percentual, preservando qualidade via interpolação do canvas.

**Assinatura:**
```javascript
export function aumentar(image, scale = 100)
```

**Parâmetros:**
- `image`: imagem de entrada
- `scale`: porcentagem de ampliação, ex.: `200` para 2x

**Retorno:**
- `Canvas` ampliado

---

### 5. Diminuir

**Arquivo:** `src/functions/transformacoes/diminuir/diminuir.js`

**Descrição:**
Reduz a imagem para uma escala percentual, ajustando largura e altura do resultado.

**Assinatura:**
```javascript
export function diminuir(image, scale = 100)
```

**Parâmetros:**
- `image`: imagem de entrada
- `scale`: porcentagem de redução, ex.: `50` para metade do tamanho

**Retorno:**
- `Canvas` reduzido

---

### 6. Grayscale

**Arquivo:** `src/functions/filtros/grayscale/grayscale.js`

**Descrição:**
Converte a imagem para tons de cinza utilizando a fórmula luminância.

**Assinatura:**
```javascript
export function grayscale(image)
```

**Parâmetros:**
- `image`: imagem de entrada

**Retorno:**
- `Canvas` em escala de cinza

---

### 7. Passa Baixa

**Arquivo:** `src/functions/filtros/passabaixa/passaBaixa.js`

**Descrição:**
Suaviza a imagem por filtros de baixa frequência. Os métodos disponíveis são:

- `passaBaixaMedia` — média local
- `passaBaixaModa` — valor mais frequente no vizinho
- `passaBaixaMediana` — mediana do vizinho
- `passaBaixaGaussiana` — suavização gaussiana

**Assinatura:**
```javascript
export function passaBaixa(image)
```

**Parâmetros:**
- `image`: imagem de entrada

**Retorno:**
- `Canvas` com suavização

---

### 8. Passa Alta

**Arquivo:** `src/functions/filtros/passaalta/passaAlta.js`

**Descrição:**
Realça bordas e detalhes usando operadores de alta frequência. Os métodos disponíveis são:

- `passaAltaRoberts`
- `passaAltaSobel`
- `passaAltaPrewitt`
- `passaAltaKirsch`
- `passaAltaRobinson`
- `passaAltaLoG`
- `passaAltaCanny`
- `passaAltaLaplaciano`

**Assinatura:**
```javascript
export function passaAlta(image)
```

**Parâmetros:**
- `image`: imagem de entrada

**Retorno:**
- `Canvas` com realce de bordas

---

### 9. Threshold

**Arquivo:** `src/functions/filtros/threshold/threshold.js`

**Descrição:**
Binariza a imagem usando um valor de limiar, convertendo pixels acima do limite para branco e abaixo para preto.

**Assinatura:**
```javascript
export function threshold(image, value = 128)
```

**Parâmetros:**
- `image`: imagem de entrada
- `value`: valor de limiar, de `0` a `255`

**Retorno:**
- `Canvas` binarizado

---

## Funcionalidades em desenvolvimento

As operações abaixo ainda não foram implementadas no projeto, mas já estão previstas para evolução do sistema:

```javascript
// Dilatação
// export function dilatacao(image, kernelSize = 3) {
//   // Aplicar operação morfológica de dilatação
//   // Expandir regiões brancas da imagem
//   // Retornar imagem processada
// }

// Erosão
// export function erosao(image, kernelSize = 3) {
//   // Aplicar operação morfológica de erosão
//   // Reduzir regiões brancas da imagem
//   // Retornar imagem processada
// }

// Abertura
// export function abertura(image, kernelSize = 3) {
//   // Aplicar erosão seguida de dilatação
//   // Remover pequenos objetos
//   // Retornar resultado final
// }

// Fechamento
// export function fechamento(image, kernelSize = 3) {
//   // Aplicar dilatação seguida de erosão
//   // Preencher pequenos buracos
//   // Retornar resultado final
// }

// Afinamento
// export function afinamento(image) {
//   // Reduzir objetos à estrutura esquelética
//   // Preservar conectividade
//   // Retornar imagem afinada
// }
```

---

## Observações

- A interface atual contempla as operações já desenvolvidas em `src/App.jsx` e no menu de ferramentas.
- O sistema foi pensado em módulos para facilitar a expansão de novos filtros e transformações.
- A exportação da imagem processada é feita diretamente pelo navegador após a edição.

---

## Observações finais

- O projeto está em fase de desenvolvimento prático de processamento digital de imagens.
- A estrutura está organizada por módulos para facilitar a expansão futura.
- As operações atuais já estão integradas à interface e funcionando na aplicação.

---

## Autor

Felipe Wiebke Schons

---

**Curso:** Processamento Digital de Imagens
**Instituição:** Universidade Feevale
**Semestre:** 2º semestre de 2026
**Versão:** 1.2.0