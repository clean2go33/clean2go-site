// Crée clean2go-site-dist.zip à partir de dist/ (à décompresser dans public_html chez l'hébergeur).
import { execSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
if (!existsSync('dist')) { console.error('Lancez « npm run build » d’abord.'); process.exit(1); }
rmSync('clean2go-site-dist.zip', { force: true });
execSync('cd dist && zip -qr ../clean2go-site-dist.zip . -x ".DS_Store"', { stdio: 'inherit' });
console.log('✓ clean2go-site-dist.zip créé');
