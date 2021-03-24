import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Button, Link } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import UseStyles from "./styles";
import { Slots, AddSlotForm, PluginDataForm } from "../../components";

const pluginDataKey = "AskBobPluginData";

const getPluginData = () => {
  try {
    const pluginData = JSON.parse(localStorage.getItem(pluginDataKey));
    return (
      pluginData || {
        plugin: "",
        description: "",
        author: "",
      }
    );
  } catch (err) {
    return {
      plugin: "",
      description: "",
      author: "",
    };
  }
};

const Home = () => {
  const [show, setShow] = useState(true);
  const [data, setData] = useState("");

  const [showAlert, setShowAlert] = useState(true);

  const [pluginData, setPluginData] = useState(getPluginData());

  const [entities, setEntities] = useState([]);

  const [downloadLink, setDownloadLink] = useState("");

  const intents = useSelector(state => state.intents.items);
  const synonyms = useSelector(state => state.synonyms.items);
  const lookups = useSelector(state => state.lookups.items);
  const regexes = useSelector(state => state.regexes.items);

  const responses = useSelector(state => state.responses.items);
  const skills = useSelector(state => state.skills.items);
  const stories = useSelector(state => state.stories.items);
  const slots = useSelector(state => state.slots.items);

  const downloadTag = useRef(null);

  const classes = UseStyles();

  useEffect(() => {
    let actions = [];
    let formatedskills = skills.map(skill => {
      let action_ids = skill.actions.map(({ type, action_id }) => {
        if (type === "custom") {
          actions.push(action_id);
        }
        return action_id;
      });
      return { ...skill, actions: action_ids };
    });

    let formattedStories = stories.map(story => ({
      ...story,
      steps: story.steps.map(({ type, step_id }) => {
        if (type === "intent") {
          return { type, step_id };
        }
        if (!step_id.startsWith("utter_")) {
          actions.push(step_id);
        }
        return {
          type: "action",
          step_id,
        };
      }),
    }));

    actions = [...new Set(actions)];

    let formattedResponses = responses.map(response => {
      const formattedResponse = {
        ...response,
        text: [...response.examples],
      };

      delete formattedResponse.examples;

      return formattedResponse;
    });

    const json = {
      ...pluginData,
      entities,
      slots,
      actions,
      intents,
      synonyms,
      lookups,
      regexes,
      responses: formattedResponses,
      skills: formatedskills,
      stories: formattedStories,
    };
    const entries = Object.entries(json);
    entries.forEach(prop => {
      const [key, value] = prop;

      if (value.length === 0) {
        delete json[key];
      }
    });
    let jsonData = JSON.stringify(json, null, 4);

    setData(jsonData);
    const blob = new Blob([jsonData], { type: "application/json" });
    const fileDownloadUrl = URL.createObjectURL(blob);
    setDownloadLink(fileDownloadUrl);
  }, [
    pluginData,
    entities,
    slots,
    intents,
    synonyms,
    lookups,
    regexes,
    responses,
    skills,
    stories,
  ]);

  useEffect(() => {
    const hideAlert = () => {
      setShowAlert(false);
    };

    setTimeout(hideAlert, 5000);

    return () => clearTimeout(hideAlert);
  });

  useEffect(() => {
    localStorage.setItem(pluginDataKey, JSON.stringify(pluginData));
  }, [pluginData]);

  const handleSubmit = () => {
    downloadTag.current.click();
  };

  return (
    <section className='section'>
      {showAlert && (
        <Alert severity='info' className={classes.alert}>
          This App works offline!
        </Alert>
      )}
      <PluginDataForm
        pluginData={pluginData}
        setPluginData={setPluginData}
        entities={entities}
        setEntities={setEntities}
      />

      <AddSlotForm />
      <Slots />
      <div className='card'>
        <div className={classes.formGroup}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              setShow(prev => !prev);
            }}
            aria-label='show json'
          >
            {show ? "Hide JSON" : "Show JSON"}
          </Button>
        </div>
        <div className={classes.formGroup}>
          <Button
            className={classes.downloadBtn}
            variant='contained'
            color='primary'
            onClick={handleSubmit}
            aria-label='download'
          >
            download
          </Button>
        </div>

        {show && (
          <pre
            data-testid='dataJson'
            style={{
              overflowX: "scroll",
              backgroundColor: "white",
              padding: "1em",
            }}
          >
            {data}
          </pre>
        )}

        <Link
          download='config.json'
          style={{ display: "none" }}
          href={downloadLink}
          ref={downloadTag}
        >
          download json
        </Link>
      </div>
    </section>
  );
};

export default Home;
