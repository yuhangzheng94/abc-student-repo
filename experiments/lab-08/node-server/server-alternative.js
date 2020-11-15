const express = require('express')
const app = express()
const port = 3000

console.log(__dirname);

app.use(express.static('public'));

let yuhangcount = 0;

app.get('/', (req, res) => {
  res.send('Hello Word!');
})

app.get('/yuhang', (req, res) => {
  yuhangcount += 1;
  console.log(yuhangcount,"people visited!");
  console.log("someone requested /yuhang.");
  res.sendFile(__dirname + "/yuhang/index.html");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
