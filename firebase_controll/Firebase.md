# Cloud Firestore

## method

collection.add : データの追加 : ハッシュidを生成し、docを作成する

collection.doc.set : データの作成or上書き : docを指定する

## rule

resource : 参照しているデータを表す

`return request.auth != null;`によって認証を確認する

## tips

import文を使うにはscriptタグにtype="module"が必要

import文はローカルを参照できない

