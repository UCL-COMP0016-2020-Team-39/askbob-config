import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Home,
  Error,
  AddIntent,
  AddResponse,
  AddSkill,
  AddStory,
  AddForm,
} from "./pages";
import { Navbar } from "./components";

import { useSelector, useDispatch } from "react-redux";
import { loadIntents, storeIntents } from "./actions/intentsActions";
import { loadResponses, storeResponses } from "./actions/responsesActions";
import { loadSkills, storeSkills } from "./actions/skillsActions";
import { loadStories, storeStories } from "./actions/storiesActions";
import { loadForms, storeForms } from "./actions/formsActions";

const App = () => {
  const dispatch = useDispatch();
  const intents = useSelector(state => state.intents);
  const responses = useSelector(state => state.responses);
  const skills = useSelector(state => state.skills);
  const stories = useSelector(state => state.stories);
  const forms = useSelector(state => state.forms);

  useEffect(() => {
    dispatch(loadIntents());
    dispatch(loadResponses());
    dispatch(loadSkills());
    dispatch(loadStories());
    dispatch(loadForms());
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

  useEffect(() => {
    dispatch(storeStories());
  }, [dispatch, stories]);

  useEffect(() => {
    dispatch(storeForms());
  }, [dispatch, forms]);

  const links = [
    { name: "Home", slug: "/" },
    { name: "Intents", slug: "/intents" },
    { name: "Responses", slug: "/responses" },
    { name: "Skills", slug: "/skills" },
    { name: "Stories", slug: "/stories" },
    { name: "Forms", slug: "/forms" },
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
            <Route path='/stories' component={AddStory}></Route>
            <Route path='/forms' component={AddForm}></Route>
            <Route path='*' component={Error}></Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
