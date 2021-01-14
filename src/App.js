import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, About, Contact, Error, AddIntent } from "./pages";
import { Navbar } from "./components";
function App() {
  return (
    <Router>
      <div className='container'>
        <Navbar className='mb-2' />
        <main className='mt-3'>
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/intents' exact component={AddIntent}></Route>
            <Route path='/about' exact component={About}></Route>
            <Route path='/contact' exact component={Contact}></Route>
            <Route path='*' component={Error}></Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
