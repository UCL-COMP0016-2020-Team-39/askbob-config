import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Link } from "@material-ui/core";
const Home = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const questions = useSelector(state => state.questions);
  const responses = useSelector(state => state.responses);

  useEffect(() => {
    const jsonData = JSON.stringify({ questions, responses }, null, 4);
    setData(jsonData);
    const blob = new Blob([jsonData], { type: "application/json" });
    const fileDownloadUrl = URL.createObjectURL(blob);
    setDownloadLink(fileDownloadUrl);
  }, [questions, responses]);

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
          variant='contained'
          color='danger'
          download='config.json'
          style={{ color: "#f84" }}
          href={downloadLink}
        >
          download json
        </Link>
      </div>
    </section>
  );
};

export default Home;
