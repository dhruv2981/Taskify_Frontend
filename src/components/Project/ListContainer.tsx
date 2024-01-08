import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import listSlice from "../../app/features/listSlice";
import ListCard from "./listCard";

const listContainer = (props: any) => {
  const listContainerStyle = {
    display: "flex",
    flexDirection: "row" as "row",
    justifyContent: "flexStart",
    // border: "0.2rem solid black",
  };

  const { currentProject, fromChildCard, listToCard } = props;
  const lists = currentProject.lists;
  console.log(currentProject.lists,"v")

  return (
    <div>
      <div style={listContainerStyle}>
        {lists.map((list: any) => (
          <ListCard
            list={list}
            fromChildCard={fromChildCard}
            listToCard={listToCard}
            project={currentProject}
          />
        ))}
      </div>
    </div>
  );
};
export default listContainer;
