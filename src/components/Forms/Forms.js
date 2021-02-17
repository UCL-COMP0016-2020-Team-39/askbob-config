import React from "react";
import Form from "./Form/Form";
import { useSelector } from "react-redux";

const Forms = () => {
  const forms = useSelector(state => state.forms.items);

  if (forms.length === 0) {
    return <div className='card'>No Forms</div>;
  }

  return (
    <ul>
      {forms.map(form => {
        return (
          <li key={form.id}>
            <Form {...form} />
          </li>
        );
      })}
    </ul>
  );
};

export default Forms;
