const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// テンプレートエンジンにPugを設定（サーバーサイドレンダリング）
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// CSSやJSなどの静的ファイルを配信する設定
app.use(express.static(path.join(__dirname, 'public')));

// ルート（/）にアクセスされたらindex.pugをレンダリングして返す
app.get('/', (req, res) => {
  res.render('index', { title: 'サーバーサイド・マインスイーパー' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});