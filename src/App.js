import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, About, Contact, Error, AddQuestion, AddResponse } from "./pages";
import { Navbar } from "./components";

import { useSelector, useDispatch } from "react-redux";
import { loadQuestions, storeQuestions } from "./actions/questionsActions";
import { loadResponses, storeResponses } from "./actions/responsesActions";

const App = () => {
  const dispatch = useDispatch();
  const questions = useSelector(state => state.questions);
  const responses = useSelector(state => state.responses);

  useEffect(() => {
    dispatch(loadQuestions());
    dispatch(loadResponses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(storeQuestions());
  }, [dispatch, questions]);

  useEffect(() => {
    dispatch(storeResponses());
  }, [dispatch, responses]);

  const links = [
    { name: "Home", slug: "/" },
    { name: "Questions", slug: "/questions" },
    { name: "Responses", slug: "/responses" },
    { name: "About", slug: "/about" },
    { name: "Contact", slug: "/contact" },
  ];

  return (
    <Router>
      <div className='container'>
        <Navbar links={links} className='mb-2' />
        <main className='mt-3'>
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/questions' exact component={AddQuestion}></Route>
            <Route path='/responses' exact component={AddResponse}></Route>
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
