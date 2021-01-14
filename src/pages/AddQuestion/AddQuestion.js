import React, { useState } from "react";
import { AddQuestionForm } from "../../components";
import { Questions } from "../../components";

const AddQuestion = () => {
  return (
    <section className='section'>
      <AddQuestionForm />
      <Questions />
    </section>
  );
};

export default AddQuestion;
