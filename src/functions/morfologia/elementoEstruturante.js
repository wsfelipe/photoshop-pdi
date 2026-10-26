export const ELEMENTOS = {
  N4_3x3: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  N8_3x3: [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ],
  N4_5x5: [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0],
  ],
  N8_5x5: [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
  ],
};

export function criarElemento(tamanho = 3, conexoes = 8) {
  const tipo = conexoes === 4 ? 'N4' : 'N8';
  const chave = `${tipo}_${tamanho}x${tamanho}`;

  if (ELEMENTOS[chave]) {
    return ELEMENTOS[chave];
  }

  const elemento = [];
  const centro = Math.floor(tamanho / 2);
  for (let y = 0; y < tamanho; y++) {
    const linha = [];
    for (let x = 0; x < tamanho; x++) {
      if (conexoes === 4) {
        const dist = Math.abs(y - centro) + Math.abs(x - centro);
        linha.push(dist <= 2 ? 1 : 0);
      } else {
        linha.push(1);
      }
    }
    elemento.push(linha);
  }
  return elemento;
}
