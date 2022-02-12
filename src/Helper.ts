import http = require('http');
import path = require('path');
import fs = require('fs');

// like static class
module Helper {
  export const root = path.join(__dirname, '..');
  export const rootResolve = (...paths: string[]) => path.join(Helper.root, ...paths);
  export const SOURCE_TAG = 'vscode-resource:';

  export function get(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      http.get(url, res => {
        res.setEncoding('utf8');
        res.on('error', e => reject(e));
        res.on('end', () => resolve(data));

        let data = '';
        res.on('data', chunk => data += chunk.toString());
      }).on('error', e => reject(e));
    });
  }
  
  export function readFile(filepath: string) {
    return fs.readFileSync(filepath, 'utf8');
  }
}

export default Helper;
