// Mesma saída do `node referencia/qa/check-motor.cjs check`, mas para o motor portado (src/engine).
// Uso: npm run qa:motor
import { build } from 'esbuild';

const { outputFiles } = await build({ entryPoints: ['src/engine/index.ts'], bundle: true, format: 'esm', write: false });
const motor = await import('data:text/javascript;base64,' + Buffer.from(outputFiles[0].text).toString('base64'));
console.log(motor.check().join('\n'));
