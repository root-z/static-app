import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/static-app/virus-sim">Virus Simulator</Link> |{" "}
        <Link to="/static-app/maze-gen">Maze Generator</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
