const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// 【追加】JSONデータを受け取るための設定（これがないとデータが空になります）
app.use(express.json());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { title: 'サーバーサイド・マインスイーパー' });
});

// 【追加】ブラウザからのログを受け取り、サーバーのコンソールに出力するエンドポイント
app.post('/log', (req, res) => {
  const logMessage = req.body.message;
  // ここでDOS（サーバー側のコンソール）に出力されます
  console.log(`[Client Log] ${logMessage}`);
  res.status(200).send('Log received');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});