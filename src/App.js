import "./App.css";
import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components";

import { useSelector, useDispatch } from "react-redux";
import { loadIntents, storeIntents } from "./actions/intentsActions";
import { loadSynonyms, storeSynonyms } from "./actions/synonymsActions";
import { loadLookups, storeLookups } from "./actions/lookupsActions";
import { loadRegexes, storeRegexes } from "./actions/regexesActions";
import { loadResponses, storeResponses } from "./actions/responsesActions";
import { loadSkills, storeSkills } from "./actions/skillsActions";
import { loadStories, storeStories } from "./actions/storiesActions";
import { loadSlots, storeSlots } from "./actions/slotsActions";

const Home = lazy(() => import("./pages/Home/Home.js"));
const AddIntent = lazy(() => import("./pages/AddIntent/AddIntent.js"));
const AddResponse = lazy(() => import("./pages/AddResponse/AddResponse.js"));
const AddSkill = lazy(() => import("./pages/AddSkill/AddSkill.js"));
const AddStory = lazy(() => import("./pages/AddStory/AddStory.js"));

const App = () => {
  const dispatch = useDispatch();
  const intents = useSelector(state => state.intents.items);
  const synonyms = useSelector(state => state.synonyms.items);
  const lookups = useSelector(state => state.lookups.items);
  const regexes = useSelector(state => state.regexes.items);

  const responses = useSelector(state => state.responses.items);
  const skills = useSelector(state => state.skills.items);
  const stories = useSelector(state => state.stories.items);
  const slots = useSelector(state => state.slots.items);

  useEffect(() => {
    dispatch(loadIntents());
    dispatch(loadSynonyms());
    dispatch(loadLookups());
    dispatch(loadRegexes());
    dispatch(loadResponses());
    dispatch(loadSkills());
    dispatch(loadStories());
    dispatch(loadSlots());
  }, [dispatch]);

  useEffect(() => {
    dispatch(storeIntents());
  }, [dispatch, intents]);

  useEffect(() => {
    dispatch(storeSynonyms());
  }, [dispatch, synonyms]);

  useEffect(() => {
    dispatch(storeLookups());
  }, [dispatch, lookups]);

  useEffect(() => {
    dispatch(storeRegexes());
  }, [dispatch, regexes]);

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
    dispatch(storeSlots());
  }, [dispatch, slots]);

  const links = [
    { name: "Home", slug: "/" },
    { name: "Intents", slug: "/intents" },
    { name: "Responses", slug: "/responses" },
    { name: "Skills", slug: "/skills" },
    { name: "Stories", slug: "/stories" },
  ];

  return (
    <Router>
      <div className='container'>
        <Navbar links={links} className='mb-2' />
        <main className='mt-3'>
          <Suspense fallback={<div style={{ color: "white" }}>Loading...</div>}>
            <Switch>
              <Route path='/' exact component={Home}></Route>
              <Route path='/intents' exact component={AddIntent}></Route>
              <Route path='/responses' exact component={AddResponse}></Route>
              <Route path='/skills' exact component={AddSkill}></Route>
              <Route path='/stories' component={AddStory}></Route>
              <Route path='*' component={Home}></Route>
            </Switch>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
