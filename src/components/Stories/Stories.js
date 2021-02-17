import React from "react";
import Story from "./Story/Story";
import { useSelector } from "react-redux";

const Stories = () => {
  const stories = useSelector(state => state.stories.items);

  if (stories.length === 0) {
    return <div className='card'>No Stories</div>;
  }

  return (
    <ul>
      {stories.map(story => {
        return (
          <li key={story.id}>
            <Story {...story} />
          </li>
        );
      })}
    </ul>
  );
};

export default Stories;
