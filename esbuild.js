const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'lambda');
const distDir = path.join(__dirname, 'dist', 'lambda');

// Ensure the dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Read all directories in the src/lambda folder
const lambdaDirs = fs.readdirSync(srcDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// Determine if we're in watch mode
const watchMode = process.argv.includes('--watch');

// Build configuration
const buildOptions = {
  entryPoints: lambdaDirs.map(dir => path.join(srcDir, dir, 'index.ts')),
  bundle: true,
  platform: 'node',
  target: 'node20',
  outdir: distDir,
  outbase: srcDir,
  format: 'cjs',
  minify: !watchMode,
  sourcemap: watchMode,
  logLevel: 'info',
};

if (watchMode) {
  // Watch mode
  esbuild.context(buildOptions).then(context => {
    context.watch();
  });
} else {
  // Build mode
  esbuild.build(buildOptions);
}