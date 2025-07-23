import { useState } from "react";
import { Chess } from "chess.js";
import "./App.css";

function App() {
  const [chess] = useState(new Chess());
  const [moveInput, setMoveInput] = useState("");
  const [moveHistory, setMoveHistory] = useState([]);
  const [fen, setFen] = useState(chess.fen());
  const [error, setError] = useState("");
  const [bestMove, setBestMove] = useState("");
  const [depth, setDepth] = useState(15);

  const fetchBestMove = async (fen) => {
    try {
      const res = await fetch("http://localhost:3001/best-move", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fen, depth }),
      });

      const data = await res.json();
      setBestMove(data.bestMove || "No suggestion");
    } catch (err) {
      setBestMove("Error fetching move");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const move = moveInput.trim().toLowerCase();

    const result = chess.move({
      from: move.slice(0, 2),
      to: move.slice(2, 4),
      promotion: "q",
    });

    if (result) {
      const newHistory = [...moveHistory, move];
      setMoveHistory(newHistory);
      const newFen = chess.fen();
      setFen(newFen);
      setError("");
      setMoveInput("");
      fetchBestMove(newFen);
    } else {
      setError("Invalid move. Please try again.");
      setMoveInput("");
    }
  };

  const handleUndo = () => {
    if (moveHistory.length === 0) return;

    chess.undo();
    const newHistory = [...moveHistory];
    newHistory.pop();
    setMoveHistory(newHistory);
    const updatedFen = chess.fen();
    setFen(updatedFen);
    fetchBestMove(updatedFen);
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="container">
      <h1>Chess Engine</h1>

      <form className="move-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="move-input"
          value={moveInput}
          onChange={(e) => setMoveInput(e.target.value)}
          placeholder="Enter move like e2e4"
        />
        <button type="submit" className="submit-btn">Submit Move</button>
      </form>

      <div className="depth-selector">
        <label htmlFor="depth">Select Depth:</label>
        <select id="depth" value={depth} onChange={(e) => setDepth(Number(e.target.value))}>
          {Array.from({ length: 26 }, (_, i) => i + 5).map((d) => (
            <option key={d} value={d}>Depth {d}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
        <button className="submit-btn" onClick={handleUndo}>Undo Move</button>
        <button className="submit-btn" onClick={handleReset}>Reset Game</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="info-box">
        <h2>Move History</h2>
        <p>{moveHistory.join(", ") || "No moves yet"}</p>
      </div>

      <div className="info-box">
        <h2>Current FEN</h2>
        <p className="fen-display">{fen}</p>
      </div>

      <div className="info-box">
        <h2>Suggested Best Move</h2>
        <p className="best-move">{bestMove}</p>
      </div>
      <footer style={{ marginTop: "40px", fontSize: "0.85rem", color: "#666" }}>
        <p>More depth will give better results and take more time to compute</p>
      </footer>
    </div>
  );
}

export default App;
