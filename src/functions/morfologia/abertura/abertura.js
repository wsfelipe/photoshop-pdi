import { erodacao } from '../erodacao/erodacao';
import { dilatacao } from '../dilatacao/dilatacao';

export function abertura(image, tamanho = 3, conexoes = 8) {
  const erodido = erodacao(image, tamanho, conexoes);
  return dilatacao(erodido, tamanho, conexoes);
}
