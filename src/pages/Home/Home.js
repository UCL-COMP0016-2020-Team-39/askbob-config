import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Link } from "@material-ui/core";
const Home = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const intents = useSelector(state => state.intents);
  const responses = useSelector(state => state.responses);
  const skills = useSelector(state => state.skills);
  const stories = useSelector(state => state.stories);

  useEffect(() => {
    const jsonData = JSON.stringify(
      { intents, responses, skills, stories },
      null,
      4
    );
    setData(jsonData);
    const blob = new Blob([jsonData], { type: "application/json" });
    const fileDownloadUrl = URL.createObjectURL(blob);
    setDownloadLink(fileDownloadUrl);
  }, [intents, responses, skills, stories]);

  return (
    <section className='section'>
      <div className='card'>
        <h2>Welcome</h2>
        <br />

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
          style={{ color: "#080" }}
          href={downloadLink}
        >
          download json
        </Link>
      </div>
    </section>
  );
};

export default Home;
