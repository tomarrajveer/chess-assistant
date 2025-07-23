const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post("/best-move", (req, res) => {
  const { fen, depth } = req.body;

  if (!fen) {
    return res.status(400).json({ error: "FEN not provided" });
  }

  // Validate depth (default to 24 if invalid)
  const searchDepth = Math.min(Math.max(parseInt(depth), 5), 30) || 24;

  const engine = spawn("./stockfish.exe");

  engine.stdin.write("uci\n");
  engine.stdin.write("ucinewgame\n");
  engine.stdin.write(`position fen ${fen}\n`);
  engine.stdin.write(`go depth ${searchDepth}\n`);

  engine.stdout.on("data", (data) => {
    const lines = data.toString().split("\n");
    for (const line of lines) {
      if (line.startsWith("bestmove")) {
        const bestMove = line.split(" ")[1];
        res.json({ bestMove });
        engine.kill();
      }
    }
  });

  engine.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
  });
});

app.listen(port, () => {
  console.log(`Chess backend running at http://localhost:${port}`);
});
