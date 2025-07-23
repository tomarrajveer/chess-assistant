# ♟️ Chess AI Move Suggestion App

This is a web-based Chess engine assistant built using **React** for the frontend and **Node.js** with **Stockfish** for the backend. Users can input moves, track move history, view the current FEN, and get the best move suggestion calculated by Stockfish.

![Screenshot](https://your-screenshot-url-or-local-path.jpg) <!-- Replace with actual image if hosted -->

---

## 🚀 Features

- ✅ Move input in UCI format (e.g., `e2e4`)
- 🧠 Best move suggestion using Stockfish
- 🔁 Undo & 🔄 Reset functionality
- 📜 Move history tracker
- 🔍 Current FEN display
- 📏 Adjustable engine search depth
- ⚡ Real-time evaluation powered by Stockfish running via Node.js

---

## 🛠 Tech Stack

### Frontend
- React.js
- Chess.js
- CSS (custom-styled interface)

### Backend
- Node.js
- Express.js
- Stockfish (via `stockfish.exe` using `child_process`)

---

## 📦 Getting Started

### 🖥️ Local Setup

#### 1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

#### 2. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

#### 3. **Backend Setup**
```bash
cd ../backend
npm install
node server.js
```

> Make sure `stockfish.exe` is present in the backend directory.

---

## 📷 UI Preview

- **Move Input & Submission**
- **Depth Selection Dropdown**
- **Move History**
- **FEN String**
- **Best Move Display**
- **Undo / Reset Buttons**

---

## 📄 Project Structure

```
├── frontend
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
├── backend
│   ├── server.js
│   ├── stockfish.exe
```

---

## 📌 Sample `.env` (if needed)
You can configure environment variables if you plan to deploy.

```env
PORT=3001
```

---

## ⚠️ Notes
- Ensure `stockfish.exe` is executable and supported by your OS.
- The default Stockfish depth is 15 (can be adjusted from UI).
- Higher depth = better accuracy but longer computation time.

---

## 🙌 Acknowledgments

- [Stockfish](https://stockfishchess.org/) – The world's strongest open-source chess engine.
- [Chess.js](https://github.com/jhlywa/chess.js/) – JavaScript chess library used for move validation and FEN handling.

---

## 📜 License

MIT License

---

## 👤 Author

Made with ❤️ by [Your Name](https://github.com/YOUR_USERNAME)
