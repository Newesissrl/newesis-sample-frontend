import React from "react";
import CardList from "../components/CardList";
const Homepage = () => {
  return (
    <React.Fragment>
      <CardList
        title="Our Services"
        query={{
          "tags.slug": {
            in: "services",
          },
        }}
      />
      <CardList
        title="Our People"
        query={{
          "tags.slug": {
            in: "people",
          },
        }}
      />
    </React.Fragment>
  );
};

export default Homepage;
