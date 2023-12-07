import ProjectCard from "./ProjectCard";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  Card from './Card'
import { fetchCardsApi } from "../../../Apis/CardApi";
import UserProjects from "./userProjects";

const UserCards = () => {
  const heading = {
    fontSize: "2.4rem",
    marginBottom: "3rem",
    marginBlockStart: "0rem",
  };

  const userCards = {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    gap: "3%",
  };


  const [cards, setCards] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.singleUser);
  const fetchData = async () => {
    const response = await fetchCardsApi();
    setCards(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 style={heading}>My Cards</h2>
      <div style={userCards}>
        {/* <div style={projectCard}> */}
        {/* {console.log(projects, "A")} */}
        {cards.map((card) =>
          // Conditionally render ProjectCard based on whether currentUser.id is in the members array
          // Adjust the condition as per your project structure
          card.assignees.includes(currentUser.id) ? (
            <Card key={card.id} card={card} />
          ) : null
        )}
      </div>
    </div>
  );
};
export default UserCards;
