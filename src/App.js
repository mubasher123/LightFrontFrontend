import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";
import "../src/assets/app.css";
import Dashboard from "./components/Dashboard";
class App extends Component {
  render() {
    return (
      <Router>
        <Dashboard />
      </Router>
    );
  }
}

export default App;
