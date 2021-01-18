import React from "react";
import Skill from "./Skill/Skill";
import { useSelector } from "react-redux";

const Skills = () => {
  const skills = useSelector(state => state.skills);

  if (skills.length === 0) {
    return <div className='card'>No Skills</div>;
  }

  return (
    <ul>
      {skills.map(skill => {
        return (
          <li key={skill.id}>
            <Skill {...skill} />
          </li>
        );
      })}
    </ul>
  );
};

export default Skills;
