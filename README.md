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

## リファクタリング
- 見通しが悪いというか、無理やり実装した箇所があるので綺麗にしたい。

## 機能概要
- FE, BEのwebsocketの結合はそれぞれでsocket.io, socket.io-clientライブラリを使用する。
- 入室機能（簡単なログイン的な）でユーザー名の情報を保持することができる。
- ルーム機能：FEからルーム情報を同じようにemitして、BE側でsocket.joinをして入室するだけ
