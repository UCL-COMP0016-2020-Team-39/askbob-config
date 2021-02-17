import React from "react";
import {
  AddIntentForm,
  AddSynonymForm,
  AddRegexForm,
  AddLookupForm,
  Intents,
  Synonyms,
  Regexes,
  Lookups,
} from "../../components";

const AddIntent = () => {
  return (
    <section className='section'>
      <AddIntentForm />
      <Intents />
      <AddSynonymForm />
      <Synonyms />
      <AddRegexForm />
      <Regexes />
      <AddLookupForm />
      <Lookups />
    </section>
  );
};

export default AddIntent;
