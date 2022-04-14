import "./App.css";
import React from "react";
import Layout from "./components/Layout";
import { MathProvider } from "./contexts/calculate";
import Routers from "./routers/Routers";

function App() {
  return (
    <div className="App">
      <MathProvider>
        <Layout>
          <Routers />
        </Layout>
      </MathProvider>
    </div>
  );
}

export default App;
