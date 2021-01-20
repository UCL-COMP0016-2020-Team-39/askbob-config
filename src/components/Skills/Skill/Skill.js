import React from "react";
import { IconButton } from "@material-ui/core";
import { Clear, Edit } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { deleteSkill } from "../../../actions/skillsActions";
import { switchToSkillEditMode } from "../../../actions/formActions";
import useStyles from "./styles";

const Skill = ({ id, description, intent, actions }) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const deleteThis = id => {
    dispatch(deleteSkill(id));
  };

  const editThis = () => {
    dispatch(switchToSkillEditMode({ id, description, intent, actions }));
    setTimeout(() => {
      window.scrollTo({
        top: 100,
        left: 100,
        behavior: "smooth",
      });
    }, 30);
  };

  return (
    <div className='card'>
      <header className={classes.header}>
        <h2> {description}</h2>
        <div className={classes.buttons}>
          <IconButton size='small' onClick={() => deleteThis(id)}>
            <Clear />
          </IconButton>
          <IconButton size='small' onClick={() => editThis(id)}>
            <Edit />
          </IconButton>
        </div>
      </header>
      <h2>intent</h2>
      <h4>{intent}</h4>
      <h2>responses</h2>
      {actions.map((response, index) => {
        return <h4 key={index}>{response}</h4>;
      })}
    </div>
  );
};

export default Skill;
