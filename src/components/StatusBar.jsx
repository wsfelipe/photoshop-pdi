import React from 'react';
import { styles } from '../styles/appStyles';

export default function StatusBar() {
  return (
    <div style={styles.statusBar}>
      <span>✓ Pronto para processar imagens</span>
      <span>Sistema de Processamento v1.0</span>
    </div>
  );
}
