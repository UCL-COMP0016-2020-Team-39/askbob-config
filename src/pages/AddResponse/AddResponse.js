import React from "react";
import { Responses, WithForm } from "../../components";

import {
  addResponse,
  updateResponse,
  switchToResponseAddMode,
} from "../../actions/responsesActions";

import { EDIT_MODE_RESPONSE } from "../../actions/types";

import { useSelector } from "react-redux";

const AddResponse = () => {
  const {
    currentItem: currentResponse,
    mode: responseMode,
    items: responses,
  } = useSelector(state => state.responses);
  const responseNames = responses.map(item => item.name);

  const addResponseProps = {
    itemName: "response",
    currentItem: currentResponse,
    mode: responseMode,
    items: responses,
    itemNames: responseNames,
    updateItem: updateResponse,
    EDIT_MODE: EDIT_MODE_RESPONSE,
    switchToItemAddMode: switchToResponseAddMode,
    addItem: addResponse,
  };

  return (
    <section className='section'>
      <WithForm {...addResponseProps} />
      <Responses />
    </section>
  );
};

export default AddResponse;
