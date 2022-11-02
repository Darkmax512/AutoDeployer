const { exec } = require("child_process");
const express = require("express");
const app = express();

app.use(express.json());

app.post("/backend", (req, res) => {
  const { ref } = req.body;
  if (ref !== "refs/heads/main") return res.sendStatus(400);
  exec(
    `cd /root/webapp && git stash && git pull && npm i && npm run build && pm2 restart Tianzu`
  );
  res.sendStatus(200);
});

app.post("/frontend", (req, res) => {
  const { ref } = req.body;
  if (ref !== "refs/heads/main") return res.sendStatus(400);
  exec(
    `cd /root/webapp-fe && git stash && git pull && npm i --legacy-peer-deps > /var/log/frontend-install.log && npm run build > /var/log/frontend-build.log && pm2 restart Tianzu`
  );
  res.sendStatus(200);
});

const port = 5074;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
