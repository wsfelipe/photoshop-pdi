import React from 'react';
import { styles } from '../styles/appStyles';

export default function MainContent({ imageSrc, onOpenFilePicker }) {
  return (
    <div style={styles.mainContent}>
      <div style={styles.panel}>
        <div
          style={styles.panelContent}
          onClick={(event) => {
            event.stopPropagation();
            onOpenFilePicker?.();
          }}
        >
          {imageSrc ? (
            <img src={imageSrc} alt="Imagem resultante" style={styles.loadedImage} />
          ) : (
            <div style={styles.panelPlaceholder}>
              <div style={styles.placeholderIcon}>
                <img width="75" height="auto" src="src/assets/file.png" alt="" />
              </div>
              <p style={styles.placeholderText}>Clique em Arquivo</p>
              <p style={styles.placeholderText}>→ Adicionar arquivo</p>
              <p style={styles.placeholderSubtext}>ou clique nesta área</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
