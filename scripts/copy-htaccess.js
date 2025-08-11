import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminhos dos arquivos
const sourceHtaccess = path.join(__dirname, '..', '.htaccess');
const distHtaccess = path.join(__dirname, '..', 'dist', '.htaccess');

// Copiar .htaccess para dist
try {
    if (fs.existsSync(sourceHtaccess)) {
        fs.copyFileSync(sourceHtaccess, distHtaccess);
        console.log('✅ .htaccess copiado para dist/');
    } else {
        console.log('⚠️ Arquivo .htaccess não encontrado na raiz');
    }
} catch (error) {
    console.error('❌ Erro ao copiar .htaccess:', error.message);
}
