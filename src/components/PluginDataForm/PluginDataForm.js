import React from "react";
import { TextField, Checkbox, Grid } from "@material-ui/core";

const entityNames = [
  "CARDINAL",
  "DATE",
  "EVENT",
  "FAC",
  "GPE",
  "LANGUAGE",
  "LAW",
  "LOC",
  "MONEY",
  "NORP",
  "ORDINAL",
  "ORG",
  "PERCENT",
  "PERSON",
  "PRODUCT",
  "QUANTITY",
  "TIME",
  "WORK_OF_ART",
];

const FormCheckBox = ({ name, ...props }) => {
  return (
    <>
      <Checkbox value={name} {...props}></Checkbox>
      <label>{name}</label>
    </>
  );
};

const PluginDataForm = ({
  pluginData,
  setPluginData,
  entities,
  setEntities,
}) => {
  return (
    <>
      <form
        className='card'
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <h2>Welcome</h2>

        <label htmlFor='pluginName'>Plugin Name</label>
        <div>
          <TextField
            id='pluginName'
            value={pluginData.plugin}
            fullWidth
            onChange={e => {
              setPluginData(prev => ({ ...prev, plugin: e.target.value }));
            }}
          ></TextField>
        </div>

        <label htmlFor='Description'>Description</label>
        <div>
          <TextField
            id='Description'
            value={pluginData.description}
            fullWidth
            onChange={e => {
              setPluginData(prev => ({ ...prev, description: e.target.value }));
            }}
          ></TextField>
        </div>

        <label htmlFor='Author'>Author</label>
        <div>
          <TextField
            id='Author'
            value={pluginData.author}
            fullWidth
            onChange={e => {
              setPluginData(prev => ({ ...prev, author: e.target.value }));
            }}
          ></TextField>
        </div>
        <label>Entities</label>

        <Grid
          container
          direction='row'
          alignItems='flex-end'
          justify='flex-end'
          spacing={2}
        >
          {entityNames.map((entityName, index) => {
            return (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <FormCheckBox
                  name={entityName}
                  onChange={e => {
                    const value = e.target.value;
                    if (entities.includes(value)) {
                      setEntities(prev =>
                        prev.filter(entity => entity !== value)
                      );
                    } else {
                      setEntities(prev => [...prev, value]);
                    }
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </form>
    </>
  );
};

export default PluginDataForm;
