import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { TextField, Button, Link, Checkbox, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import UseStyles from "./styles";
import { Slots, AddSlotForm } from "../../components";

const pluginDataKey = "AskBobPluginData";

const getPluginData = () => {
  try {
    console.log(localStorage.getItem(pluginDataKey));
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
const entityNames = [
  "CARDINAL",
  "DATE",
  "EVENT",
  "FAC",
  "GPE",
  "LANGUAGE",
  "LAW",
  "LOC",
  "MONEY",
  "NORP",
  "ORDINAL",
  "ORG",
  "PERCENT",
  "PERSON",
  "PRODUCT",
  "QUANTITY",
  "TIME",
  "WORK_OF_ART",
];

const FormCheckBox = ({ name, ...props }) => {
  return (
    <>
      <Checkbox value={name} {...props}></Checkbox>
      <label>{name}</label>
    </>
  );
};

const Home = () => {
  const [show, setShow] = useState(true);
  const [data, setData] = useState("");

  const [showAlert, setShowAlert] = useState(true);

  const [pluginData, setPluginData] = useState(getPluginData());

  const [entities, setEntities] = useState([]);

  const [errorText, setErrorText] = useState("");
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
    localStorage.setItem(pluginDataKey, JSON.stringify(pluginData));
  }, [pluginData]);
  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  });

  const validate = () => {
    let error = "";

    if (pluginData?.plugin && !pluginData?.plugin.match(/^[a-z|A-Z|0-9|_]+$/)) {
      error = "plugin name can only contain letters";
    }

    setErrorText(error);

    return error;
  };

  const handleSubmit = () => {
    const error = validate();
    if (error) {
      return;
    }

    downloadTag.current.click();
  };

  return (
    <section className='section'>
      {showAlert && (
        <Alert severity='info' className={classes.alert}>
          This App works offline!
        </Alert>
      )}
      <form
        className='card'
        onChange={validate}
        onSubmit={e => {
          e.preventDefault();
          validate();
        }}
      >
        <h2>Welcome</h2>
        <p className={classes.errorText}>{errorText}</p>

        <label htmlFor='pluginName'>Plugin Name</label>
        <div className={classes.formGroup}>
          <TextField
            id='pluginName'
            value={pluginData.plugin}
            onChange={e => {
              setPluginData(prev => ({ ...prev, plugin: e.target.value }));
            }}
          ></TextField>
        </div>

        <label htmlFor='Description'>Description</label>
        <div className={classes.formGroup}>
          <TextField
            id='Description'
            value={pluginData.description}
            onChange={e => {
              setPluginData(prev => ({ ...prev, description: e.target.value }));
            }}
          ></TextField>
        </div>

        <label htmlFor='Author'>Author</label>
        <div className={classes.formGroup}>
          <TextField
            id='Author'
            value={pluginData.author}
            onChange={e => {
              setPluginData(prev => ({ ...prev, author: e.target.value }));
            }}
          ></TextField>
        </div>
        <label>Entities</label>

        <Grid
          container
          direction='row'
          alignItems='flex-end'
          justify='flex-end'
          spacing={2}
        >
          {entityNames.map((entityName, index) => {
            return (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <FormCheckBox
                  name={entityName}
                  onChange={e => {
                    const value = e.target.value;
                    if (entities.includes(value)) {
                      setEntities(prev =>
                        prev.filter(entity => entity !== value)
                      );
                    } else {
                      setEntities(prev => [...prev, value]);
                    }
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </form>
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
            Show json
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
