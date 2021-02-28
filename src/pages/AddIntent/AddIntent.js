import React from "react";
import {
  Intents,
  Synonyms,
  Regexes,
  Lookups,
  WithForm,
} from "../../components";

import {
  addIntent,
  updateIntent,
  switchToIntentAddMode,
} from "../../actions/intentsActions";

import {
  addSynonym,
  updateSynonym,
  switchToSynonymAddMode,
} from "../../actions/synonymsActions";

import {
  addRegex,
  updateRegex,
  switchToRegexAddMode,
} from "../../actions/regexesActions";

import {
  addLookup,
  updateLookup,
  switchToLookupAddMode,
} from "../../actions/lookupsActions";

import {
  EDIT_MODE_INTENT,
  EDIT_MODE_SYNONYM,
  EDIT_MODE_REGEX,
  EDIT_MODE_LOOKUP,
} from "../../actions/types";

import { useSelector } from "react-redux";

const AddIntent = () => {
  const {
    currentItem: currentIntent,
    mode: intentMode,
    items: intents,
  } = useSelector(state => state.intents);
  const intentNames = intents.map(item => item.name);

  const {
    currentItem: currentSynonym,
    mode: synonymMode,
    items: synonyms,
  } = useSelector(state => state.synonyms);
  const synonymNames = synonyms.map(item => item.name);

  const {
    currentItem: currentRegex,
    mode: regexMode,
    items: regexes,
  } = useSelector(state => state.regexes);
  const regexNames = intents.map(item => item.name);

  const {
    currentItem: currentLookup,
    mode: lookupMode,
    items: lookups,
  } = useSelector(state => state.lookups);
  const lookupNames = lookups.map(item => item.name);

  const addIntentProps = {
    itemName: "intent",
    currentItem: currentIntent,
    mode: intentMode,
    items: intents,
    itemNames: intentNames,
    updateItem: updateIntent,
    EDIT_MODE: EDIT_MODE_INTENT,
    switchToItemAddMode: switchToIntentAddMode,
    addItem: addIntent,
  };

  const addSynonymProps = {
    itemName: "synonym",
    currentItem: currentSynonym,
    mode: synonymMode,
    items: synonyms,
    itemNames: synonymNames,
    updateItem: updateSynonym,
    EDIT_MODE: EDIT_MODE_SYNONYM,
    switchToItemAddMode: switchToSynonymAddMode,
    addItem: addSynonym,
  };

  const addRegexProps = {
    itemName: "regex",
    currentItem: currentRegex,
    mode: regexMode,
    items: regexes,
    itemNames: regexNames,
    updateItem: updateRegex,
    EDIT_MODE: EDIT_MODE_REGEX,
    switchToItemAddMode: switchToRegexAddMode,
    addItem: addRegex,
  };

  const addLookupsProps = {
    itemName: "lookup",
    currentItem: currentLookup,
    mode: lookupMode,
    items: lookups,
    itemNames: lookupNames,
    updateItem: updateLookup,
    EDIT_MODE: EDIT_MODE_LOOKUP,
    switchToItemAddMode: switchToLookupAddMode,
    addItem: addLookup,
  };

  return (
    <section className='section'>
      <WithForm {...addIntentProps} />
      <Intents />

      <WithForm {...addSynonymProps} />
      <Synonyms />

      <WithForm {...addRegexProps} />
      <Regexes />

      <WithForm {...addLookupsProps} />
      <Lookups />
    </section>
  );
};

export default AddIntent;
