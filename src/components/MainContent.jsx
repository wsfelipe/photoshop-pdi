import React from 'react';
import { styles } from '../styles/appStyles';

export default function MainContent() {
  return (
    <div style={styles.mainContent}>
      {/* Imagem Original */}
      <div style={styles.panel}>
        <div style={styles.panelHeader}>
          <h2 style={styles.panelTitle}>Imagem Original</h2>
        </div>
        <div style={styles.panelContent}>
          <div style={styles.panelPlaceholder}>
            <div style={styles.placeholderIcon}>
              <img width="75" height="auto" src="src/assets/file.png" alt="" />
            </div>
            <p style={styles.placeholderText}>Clique em Arquivo</p>
            <p style={styles.placeholderText}>→ Abrir imagem</p>
            <p style={styles.placeholderSubtext}>ou arraste a imagem aqui</p>
          </div>
        </div>
      </div>

      {/* Imagem Transformada */}
      <div style={styles.panel}>
        <div style={styles.panelHeader}>
          <h2 style={styles.panelTitle}>Imagem Transformada</h2>
        </div>
        <div style={styles.panelContent}>
          <div style={styles.panelPlaceholder}>
            <div style={styles.placeholderIcon}>
              <img width="75" height="auto" src="src/assets/image.png" alt="" />
            </div>
            <p style={styles.placeholderText}>Selecione uma</p>
            <p style={styles.placeholderText}>transformação</p>
            <p style={styles.placeholderSubtext}>para processar a imagem</p>
          </div>
        </div>
      </div>
    </div>
  );
}
