import * as chokidar from 'chokidar';
import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';

import * as tsConfig from '../tsconfig.json';

const basePath = path.join(__dirname, '..');
const buildPath = path.join(basePath, tsConfig.compilerOptions.outDir);

const removeBuildFile = (globPattern: string) => {
  let searchPath = path.join(buildPath, globPattern.replace(basePath, ''));
  searchPath = searchPath.endsWith('ts')
    ? `${searchPath.slice(0, searchPath.length - 3)}.{js,js.map,d.ts}`
    : searchPath;
  glob(searchPath, (e, files) => {
    if (e) {
      console.error(e);
      return;
    }

    files
      .map((f) => path.join(f))
      .forEach((f) => {
        console.log(`Removing ${f}`);
        fs.unlink(f, (e) => e && console.error(e));
      });
  });
};

const watcher = chokidar.watch(basePath);
watcher.on('unlink', removeBuildFile);
console.log('Watching for removed files');
