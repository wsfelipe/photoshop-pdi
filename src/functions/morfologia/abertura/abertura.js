import { erosao } from '../erosao/erosao';
import { dilatacao } from '../dilatacao/dilatacao';

export function abertura(image, tamanho = 3, conexoes = 8) {
  const erodido = erosao(image, tamanho, conexoes);
  return dilatacao(erodido, tamanho, conexoes);
}
