import React from "react";
import { AddSkillForm } from "../../components";
import { Skills } from "../../components";

const AddSkill = () => {
  return (
    <section className='section'>
      <AddSkillForm />
      <Skills />
    </section>
  );
};

export default AddSkill;
