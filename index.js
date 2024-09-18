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
      "unix": Math.floor(new Date().getTime()),
      "utc": new Date().toUTCString()
    })
  }

  let dateStr = req.params.date
  if (isInt(dateStr)) {
    dateStr = Number(dateStr * 1000)
  }
  const parsedDate = new Date(dateStr)
  // Validate date
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({
      "err": "Invalid Date"
    })
  }
  // Response
  return res.status(200).json({
    "unix": Number(Math.floor(parsedDate.getTime())),
    "utc": parsedDate.toUTCString()
  })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
});

function isInt(str) {
  const num = parseInt(str, 10);
  return !isNaN(num) && num.toString() === str;
}
