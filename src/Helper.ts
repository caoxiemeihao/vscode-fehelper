import http = require('http');

// like static class
module Helper {
  export function get(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log('----', url, '----');
      http.get(url, res => {
        res.setEncoding('utf8');
        res.on('error', e => reject(e));
        res.on('end', () => resolve(data));

        let data = '';
        res.on('data', chunk => data += chunk.toString());
      }).on('error', e => reject(e));
    });
  }
}

export default Helper;
