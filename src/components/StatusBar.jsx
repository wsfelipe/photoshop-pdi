import React from 'react';
import { styles } from '../styles/appStyles';

export default function StatusBar({ message = 'Pronto para processar imagens' }) {
  return (
    <div style={styles.statusBar}>
      <span>✓ {message}</span>
      <span>Sistema de Processamento v1.0</span>
    </div>
  );
}
