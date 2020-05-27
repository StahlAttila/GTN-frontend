const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const publicpath = path.join(__dirname, '..', 'public')

app.use(express.static(publicpath));

app.get('*', function (req, res) {
  res.sendFile(path.join(publicpath, 'index.html'));
});

app.listen(PORT, () => {
  console.log("app is running on port: " + PORT);
});