import React from "react";
import CardList from "../components/CardList";
import { cardLists } from "../utils/contentFilterHelper";

const Homepage = () => {
  const lists = cardLists.split("||");
  return (
    <React.Fragment>
      {lists.map((list) => {
        const [tag, title] = list.split("=");
        return (
          <CardList
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

export default Homepage;
