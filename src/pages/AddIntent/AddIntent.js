import React from "react";
import { WithForm, Items } from "../../components";
import { Typography } from "@material-ui/core";
import {
  addIntent,
  updateIntent,
  deleteIntent,
  switchToIntentAddMode,
  switchToIntentEditMode,
} from "../../actions/intentsActions";

import {
  addSynonym,
  updateSynonym,
  deleteSynonym,
  switchToSynonymAddMode,
  switchToSynonymEditMode,
} from "../../actions/synonymsActions";

import {
  addRegex,
  updateRegex,
  deleteRegex,
  switchToRegexAddMode,
  switchToRegexEditMode,
} from "../../actions/regexesActions";

import {
  addLookup,
  updateLookup,
  deleteLookup,
  switchToLookupAddMode,
  switchToLookupEditMode,
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

  const intentListProps = {
    items: intents,
    itemName: "intent",
    deleteItem: deleteIntent,
    switchToItemEditMode: switchToIntentEditMode,
  };

  const synonymListProps = {
    items: synonyms,
    itemName: "synonym",
    deleteItem: deleteSynonym,
    switchToItemEditMode: switchToSynonymEditMode,
  };

  const regexListProps = {
    items: regexes,
    itemName: "regex",
    deleteItem: deleteRegex,
    switchToItemEditMode: switchToRegexEditMode,
  };

  const lookupListProps = {
    items: lookups,
    itemName: "lookup",
    deleteItem: deleteLookup,
    switchToItemEditMode: switchToLookupEditMode,
  };

  return (
    <section className='section'>
      <WithForm {...addIntentProps} />
      <div
        style={{ background: "#ddf", padding: "0.5rem", marginBottom: "1rem" }}
      >
        <Typography variant='body2'>
          It is best to use as many examples as possible in your intents. Five
          is the recommended amount.
        </Typography>
      </div>
      <Items {...intentListProps} />
      <WithForm {...addSynonymProps} />
      <Items {...synonymListProps} />

      <WithForm {...addRegexProps} />
      <Items {...regexListProps} />

      <WithForm {...addLookupsProps} />
      <Items {...lookupListProps} />
    </section>
  );
};

export default AddIntent;
