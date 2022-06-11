const { exec } = require("child_process");
const express = require("express");
const app = express();

app.post("/backend", (_, res) => {
  exec(`cd /root/egycards-back && git pull && pm2 restart egy`);
  res.sendStatus(200);
});

app.post("/frontend", (_, res) => {
  exec(`cd /root/Gift-Cards-App && git pull`);
  res.sendStatus(200);
});

const port = process.env.PORT || 5074;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
