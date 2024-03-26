import React from "react";
import StoryPageList from "../components/StoryPageList";
import { storyLists } from "../utils/contentFilterHelper";

const StoryList = () => {
  const lists = storyLists.split("||");
  return (
    <React.Fragment>
      {lists.map((list) => {
        const [tag, title] = list.split("=");
        return (
          <StoryPageList
            key={tag}
            title={title}
            query={{
              "tags.slug": {
                in: tag,
              },
            }}
          />
        );
      })}
    </React.Fragment>
  );
};

export default StoryList;
