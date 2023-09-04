## 概要
- FE, BEのwebsocketの結合はそれぞれでsocket.io, socket.io-clientライブラリを使用する。
- 入室機能（簡単なログイン的な）でユーザー名の情報を保持することができる。
- ルーム機能：FEからルーム情報を同じようにemitして、BE側でsocket.joinをして入室するだけ

##

webSocketディレクトリへ移動
```
cd webSocket
```

docker初回起動（起動時にclient, websocketサーバーが起動する）
```
docker-compose up -d --build
```

## 参考
- [React HooksでWebSocket通信を行うサンプル](https://qiita.com/yonetty/items/acc46afa59da1796a767)
- [チャットアプリに入室機能とユーザ名表示機能を追加する](https://tomiko0404.hatenablog.com/entry/2021/12/31/React-chatapp-2)
- [Socket.ioを使ったチャットルーム ロジックの実装](https://qiita.com/ynunokawa/items/564757fe6dbe43d172f8)
- [WebSocket実装: Server to Client 2 📤](https://zenn.dev/mfunyu/books/ft_transcendence/viewer/websocket3)

## 気になったこと
- .envや.env.localなど複数存在するプロジェクトを見かけるがどのように.env.localを使用する？勝手に読み込まれるのかな？
- vscode拡張機能：Name: ES7 React/Redux/GraphQL/React-Native snippets スニペットが楽に使えるから開発効率上がる
    ex, 「rafce」 などアロー関数コンポーネントの雛形が一瞬で作成される
- useEffectでsocketの受信はできるの？
- reactで謎にimportが失敗する時がある　パスは対して間違えていないのに

## 追加で必要な機能
- 新しく会話に入ってきた人には履歴が見えないのでメッセージをdbかlocalStorage, cache等に保存する必要がある。
- ルーム機能（ルームに入っているユーザーにのみ送信する機能はできたが、UI的に共通のルームにいるように見えるためUI的には改善点がある。



## docker間通信
  "proxy": "http://server_websocket:5001", 
  この書き方だとなぜかいけた。謎　他のコンテナから他のコンテナをみる場合には以下のように置き換える
  
  docker内部の通信 portはホスト名など```
  http => service name
  localhost => container_name
  portはdocker内部を見る。

  ホストマシンからdocker内部にアクセスすることはできなそう
  - × localhost => docker内部
  - ○  docker内部 => localhost
  - ◎  docker内部 => docker内部

なのでmigrateを行う際には、一回docker内部のexpressからdb を実行する必要がある。

## sequelize
    
### 疑問
 - config.jsonはdevelopment, test, productionは、developmentをlocal環境では実行されるけどなんで？
 - npx sequelize-cli db:migrate

docker + node.js + postgresqlを接続
 https://qiita.com/rockguitar67/items/0020d734201632077cb5

sequelizqをnpxをつけずに実行することできないの？
 
### ライブラリインストール
```
npm install --save pg pg-hstore sequelize sequelize-cli
```
### 初期化
```
 npx sequelize-cli init
```
### modelを作る（同時にカラムも作成
```
npx sequelize-cli model:generate --name user --attributes firstName:string,lastName:string,email:string
```
### マイグレーション
```
npx sequelize-cli db:migrate
```

試したいこと
```
- expressでsequelizeを使用する
- pg, seqluzeどちらかしかできないこと　seqluzeでストアどプロシージャーの登録できないのかな？
- npx sequelize-cli db:migrateの　npxを取り除くことはできなないの？
- 今までの開発では、modelを直に触ってdbから値を取得することをしたことがないため不識
- repository, entityを使った開発をしたいがどのように組み込めば良い？
```

```
npm scriptsに書く場合には ./node_modules/.binを省略することができる。
    // "db:migrate": "./node_modules/.bin/sequelize-cli db:migrate"
    "db:migrate": "sequelize-cli db:migrate"

```