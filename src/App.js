import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Home,
  About,
  Contact,
  Error,
  AddIntent,
  AddResponse,
  AddSkill,
} from "./pages";
import { Navbar } from "./components";

import { useSelector, useDispatch } from "react-redux";
import { loadIntents, storeIntents } from "./actions/intentsActions";
import { loadResponses, storeResponses } from "./actions/responsesActions";
import { loadSkills, storeSkills } from "./actions/skillsActions";

const App = () => {
  const dispatch = useDispatch();
  const intents = useSelector(state => state.intents);
  const responses = useSelector(state => state.responses);
  const skills = useSelector(state => state.skills);

  useEffect(() => {
    dispatch(loadIntents());
    dispatch(loadResponses());
    dispatch(loadSkills());
  }, [dispatch]);

  useEffect(() => {
    dispatch(storeIntents());
  }, [dispatch, intents]);

  useEffect(() => {
    dispatch(storeResponses());
  }, [dispatch, responses]);

  useEffect(() => {
    dispatch(storeSkills());
  }, [dispatch, skills]);

  const links = [
    { name: "Home", slug: "/" },
    { name: "Intents", slug: "/intents" },
    { name: "Responses", slug: "/responses" },
    { name: "Skills", slug: "/skills" },
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
            <Route path='/intents' exact component={AddIntent}></Route>
            <Route path='/responses' exact component={AddResponse}></Route>
            <Route path='/skills' exact component={AddSkill}></Route>
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
