import React from "react";
import { AddIntentForm } from "../../components";
import { Intents } from "../../components";

const AddIntent = () => {
  return (
    <section className='section'>
      <AddIntentForm />
      <Intents />
    </section>
  );
};

export default AddIntent;
