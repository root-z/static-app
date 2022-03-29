import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App.js';
import Board from './Board.js';


ReactDOM.render(
  <HashRouter basename='/'>
    <Routes>
      <Route exact path="/" element={<App />}>
        <Route path="/virus-sim" element={<Board />} />
      </ Route>
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);