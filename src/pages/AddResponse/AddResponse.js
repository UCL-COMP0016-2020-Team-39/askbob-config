import React from "react";
import { AddResponseForm } from "../../components";
import { Responses } from "../../components";

const AddResponse = () => {
  return (
    <section className='section'>
      <AddResponseForm />
      <Responses />
    </section>
  );
};

export default AddResponse;
