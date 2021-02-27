import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { TextField, Button, Link, Checkbox, Grid } from "@material-ui/core";
import UseStyles from "./styles";

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
  const [show, setShow] = useState(false);
  const [data, setData] = useState("");

  const [pluginName, setPluginName] = useState("");
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
  const forms = useSelector(state => state.forms.items);

  const downloadTag = useRef(null);

  const classes = UseStyles();

  useEffect(() => {
    const jsonData = JSON.stringify(
      {
        plugin: pluginName,
        entities,
        intents,
        synonyms,
        lookups,
        regexes,
        responses,
        skills,
        stories,
        forms,
      },
      null,
      4
    );
    setData(jsonData);
    const blob = new Blob([jsonData], { type: "application/json" });
    const fileDownloadUrl = URL.createObjectURL(blob);
    setDownloadLink(fileDownloadUrl);
  }, [
    pluginName,
    entities,
    intents,
    synonyms,
    lookups,
    regexes,
    responses,
    skills,
    stories,
    forms,
  ]);

  const validate = () => {
    let error = "";

    if (!pluginName || !pluginName.trim()) {
      error = "plugin name is needed";
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
      <div className='card'>
        <h2>Welcome</h2>
        <p className={classes.errorText}>{errorText}</p>

        <label htmlFor='pluginName'>Plugin Name</label>
        <div className={classes.formGroup}>
          <TextField
            id='pluginName'
            value={pluginName}
            onChange={e => {
              setPluginName(e.target.value);
              validate();
            }}
            onBlur={() => validate()}
          ></TextField>
        </div>
        <label htmlFor='pluginName'>Entities</label>

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
