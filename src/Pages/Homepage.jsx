import React from "react";
import CardList from "../components/CardList";
import {
  topCardListTitle,
  topCardListTag,
  bottomCardListTitle,
  bottomCardListTag,
} from "../utils/contentFilterHelper";

const Homepage = () => {
  return (
    <React.Fragment>
      <CardList
        title={topCardListTitle}
        query={{
          "tags.slug": {
            in: topCardListTag,
          },
        }}
      />
      <CardList
        title={bottomCardListTitle}
        query={{
          "tags.slug": {
            in: bottomCardListTag,
          },
        }}
      />
    </React.Fragment>
  );
};

export default Homepage;
