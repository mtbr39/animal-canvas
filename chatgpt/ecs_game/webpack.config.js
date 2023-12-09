const path = require('path');

module.exports = {
  entry: './js/main.ts', // まとめたいファイルのエントリーポイント
  output: {
    filename: 'bundle.js', // バンドルされたファイル名
    path: path.resolve(__dirname, 'dist') // 出力先ディレクトリ
  }
};