import React from 'react';
import { styles } from '../styles/appStyles';

export default function Header() {
  return (
    <div style={styles.header}>
      <h1 style={styles.headerTitle}>
        Sistema de Processamento de Imagens
      </h1>
      <p style={styles.headerSubtitle}>
        Autor: Felipe Wiebke Schons - PDI 2026
      </p>
    </div>
  );
}
