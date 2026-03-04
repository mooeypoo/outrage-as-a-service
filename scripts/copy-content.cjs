const fs = require('fs');
const path = require('path');

const rootDir = __dirname ? path.resolve(__dirname, '..') : process.cwd();
const srcDir = path.join(rootDir, 'content');
const destDir = path.join(rootDir, 'dist', 'content');

if (!fs.existsSync(srcDir)) {
  process.exit(0);
}

fs.mkdirSync(destDir, { recursive: true });

fs.cp
  ? fs.cp(srcDir, destDir, { recursive: true }, (err) => {
      if (err) {
        console.error('Failed to copy content directory:', err);
        process.exit(1);
      }
    })
  : fs.cpSync
  ? fs.cpSync(srcDir, destDir, { recursive: true })
  : (function copyDir(source, target) {
      const entries = fs.readdirSync(source, { withFileTypes: true });
      for (const entry of entries) {
        const srcPath = path.join(source, entry.name);
        const destPath = path.join(target, entry.name);
        if (entry.isDirectory()) {
          fs.mkdirSync(destPath, { recursive: true });
          copyDir(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    })(srcDir, destDir);

