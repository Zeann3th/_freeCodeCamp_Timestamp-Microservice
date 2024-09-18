import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.static('public'));
dotenv.config()

const __dirname = import.meta.dirname

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", (req, res) => {
  // Handle empty date
  if (!req.params.date) {
    return res.status(200).json({
      "utc": new Date().toUTCString(),
      "unix": Math.floor(new Date().getTime() / 1000)
    })
  }

  const dateStr = new Date(req.params.date)
  // Validate date
  if (isNaN(dateStr)) {
    return res.status(400).json({
      "err": "Invalid Date"
    })
  }
  // Response
  return res.status(200).json({
    "utc": dateStr.toUTCString(),
    "unix": Number(Math.floor(dateStr.getTime() / 1000))
  })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
});
