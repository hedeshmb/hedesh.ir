import React from "react";
import { Switch, Route } from "react-router-dom";
import Wiki from "./components/Wiki";
import WikiForm from "./components/WikiForm";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/common/ProtectedRoute";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

function App() {
  return (
    <main className="container">
      <div className="d-flex bg-white align-items-center p-3 my-3 text-danger bg-purple rounded shadow-sm">
        <i className="fa fa-code" aria-hidden="true"></i>
        <div className="lh-1">
          <h1 className="h6 mb-0 text-dark lh-1">
            The challenge in writing code is beautiful
          </h1>
        </div>
      </div>

      <Switch>
        <Route path="/login" component={LoginForm} />
        <ProtectedRoute path="/add" component={WikiForm} />
        <Route path="/" exact component={Wiki} />
        <Route path="?page=:pageId" component={Wiki} />
      </Switch>
    </main>
  );
}

export default App;
