import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, About, Contact, Error, AddQuestion } from "./pages";
import { Navbar } from "./components";

import { useSelector, useDispatch } from "react-redux";
import { loadQuestions, storeQuestions } from "./actions/questionsActions";

const App = () => {
  const dispatch = useDispatch();
  const questions = useSelector(state => state.questions);

  useEffect(() => {
    dispatch(loadQuestions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(storeQuestions());
  }, [dispatch, questions]);

  return (
    <Router>
      <div className='container'>
        <Navbar className='mb-2' />
        <main className='mt-3'>
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/questions' exact component={AddQuestion}></Route>
            <Route path='/about' exact component={About}></Route>
            <Route path='/contact' exact component={Contact}></Route>
            <Route path='*' component={Error}></Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
