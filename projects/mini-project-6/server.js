const express = require('express')
const app = express()
const port = 3000 // glitch: const port = process.env.PORT
const magicWord = "Shazam";

app.use(express.static('public'));

app.get("/say-it", (req, res) => {
  let query = req.query;
  console.log(query);
  let guess = query.guess;

  if (guess == magicWord) {
    console.log("billy batson --> Shazam");
    // res.sendFile(__dirname + "/public/say-it-again/index.html")
    res.redirect("/shazam")
  } else {
    console.log("billy batson --> billy batson");
    res.redirect("/try-again")
  }

  console.log("--------")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
