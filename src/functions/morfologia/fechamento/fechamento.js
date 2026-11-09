import { dilatacao } from '../dilatacao/dilatacao';
import { erosao } from '../erosao/erosao';

export function fechamento(image, tamanho = 3, conexoes = 8) {
  const dilatado = dilatacao(image, tamanho, conexoes);
  return erosao(dilatado, tamanho, conexoes);
}
