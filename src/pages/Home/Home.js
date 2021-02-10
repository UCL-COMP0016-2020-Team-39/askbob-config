import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { TextField, Button, Link } from "@material-ui/core";
import UseStyles from "./styles";

const Home = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState("");
  const [pluginName, setPluginName] = useState("");
  const [errorText, setErrorText] = useState("");
  const [downloadLink, setDownloadLink] = useState("");

  const intents = useSelector(state => state.intents);
  const responses = useSelector(state => state.responses);
  const skills = useSelector(state => state.skills);
  const stories = useSelector(state => state.stories);

  const downloadTag = useRef(null);

  const classes = UseStyles();

  useEffect(() => {
    const jsonData = JSON.stringify(
      { plugin: pluginName, intents, responses, skills, stories },
      null,
      4
    );
    setData(jsonData);
    const blob = new Blob([jsonData], { type: "application/json" });
    const fileDownloadUrl = URL.createObjectURL(blob);
    setDownloadLink(fileDownloadUrl);
  }, [pluginName, intents, responses, skills, stories]);

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
        <br />
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
            variant='contained'
            color='primary'
            onClick={handleSubmit}
            aria-label='submit'
          >
            submit
          </Button>
        </div>
        <br />
        <br />
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
        <br />
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
