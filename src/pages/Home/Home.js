import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
const Home = () => {
  const [show, setShow] = useState(false);
  const questions = useSelector(state => state.questions);

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
          get json?
        </Button>
        <br />
        <br />
        {show && <pre>{JSON.stringify({ questions }, null, 2)}</pre>}
      </div>
    </section>
  );
};

export default Home;
