const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

// Шлях до зібраного білду Angular (перевірте назву проєкту в шляху)
const distPath = path.resolve(__dirname, 'dist/angular-frontend/browser'); 

function walkDir(dir) {
    if (!fs.existsSync(dir)) {
        console.error(`Папку не знайдено: ${dir}`);
        return;
    }
    
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (file.endsWith('.js')) {
            console.log(`Обфускація файлу: ${fullPath}`);
            const code = fs.readFileSync(fullPath, 'utf8');
            
            const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 0.75,
                numbersToExpressions: true,
                simplify: true,
                stringArray: true,
                stringArrayEncoding: ['base64'],
                stringArrayThreshold: 0.75,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 0.4,
                selfDefending: true,
                disableConsoleOutput: false
            }).getObfuscatedCode();

            fs.writeFileSync(fullPath, obfuscatedCode, 'utf8');
        }
    });
}

console.log('Початок обфускації бандла...');
walkDir(distPath);
console.log('Обфускацію успішно завершено!');