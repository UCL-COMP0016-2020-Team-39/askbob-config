import React from "react";
import { Items, WithForm } from "../../components";

import {
  addResponse,
  updateResponse,
  deleteResponse,
  switchToResponseAddMode,
  switchToResponseEditMode,
} from "../../actions/responsesActions";

import { EDIT_MODE_RESPONSE } from "../../actions/types";

import { useSelector } from "react-redux";

const AddResponse = () => {
  const {
    currentItem: currentResponse,
    mode: responseMode,
    items: responses,
  } = useSelector(state => state.responses);
  const responseNames = responses.map(item => item.response_id);

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

  const responseListProps = {
    items: responses,
    itemName: "response",
    deleteItem: deleteResponse,
    switchToItemEditMode: switchToResponseEditMode,
  };

  return (
    <section className='section'>
      <WithForm {...addResponseProps} />
      <Items {...responseListProps} />
    </section>
  );
};

export default AddResponse;
