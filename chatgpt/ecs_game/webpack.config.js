const path = require('path');

module.exports = {
  mode: 'development', // モードを設定（developmentまたはproduction）
  entry: './js/main.ts', // TypeScriptファイルのエントリーポイント
  output: {
    filename: 'bundle.js', // 出力ファイルの名前
    path: path.resolve(__dirname, 'dist') // 出力先ディレクトリ
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // TypeScriptファイルを対象にする
        use: 'ts-loader', // ts-loaderを使ってTypeScriptを処理する
        exclude: /node_modules/ // node_modulesディレクトリは除外する
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'] // import時の拡張子省略
  }
};
