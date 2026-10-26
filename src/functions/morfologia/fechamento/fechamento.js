import { dilatacao } from '../dilatacao/dilatacao';
import { erodacao } from '../erodacao/erodacao';

export function fechamento(image, tamanho = 3, conexoes = 8) {
  const dilatado = dilatacao(image, tamanho, conexoes);
  return erodacao(dilatado, tamanho, conexoes);
}
