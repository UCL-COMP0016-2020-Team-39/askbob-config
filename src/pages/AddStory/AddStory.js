import React from "react";
import { AddStoryForm } from "../../components";
import { Stories } from "../../components";

const AddStory = () => {
  return (
    <section className='section'>
      <AddStoryForm />
      <Stories />
    </section>
  );
};

export default AddStory;
