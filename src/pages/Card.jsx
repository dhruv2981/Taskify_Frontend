import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCard, selectCard } from "../app/features/singleCardSlice";
import { Box } from "@mui/system";
import { fetchUsers, selectUsers } from "../app/features/userSlice";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { AiFillCaretRight } from "react-icons/ai";
import { updateCardState } from "./../app/features/singleCardSlice";
import toast from "react-hot-toast";
import CurrentUser from "../CurrentUser/CurrentUser";
import { createCommentApi } from "../Apis/CommentApi";

function Card() {
  const boxStyle = {
    // position: "absolute",
    // top: "30%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "1rem",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    padding: "2rem 3rem 2rem 3rem",
    gap: "1.2rem",
    backgroundColor: "lightgrey",
  };

  const cardPageStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "6rem 0rem 0rem 0rem",
  };

  const assigneeBaseStyle = {
    border: "0.1rem solid white",
    borderRadius: "0.5rem",
    padding: "1rem 2rem 1rem 2rem",
    backgroundColor: "#EEEEEE",
    fontSize: "1rem",
  };

  const deadlineStyle = {
    display: "flex",
    gap: "2rem",
  };
  const commentSection = {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
  };

  const commentStyle = {
    display: "flex",
    width: "100%",
    gap: "1rem",
    border: "0.2rem solid black",
    borderRadius: "0.4rem",
    padding: "0rem 0rem",
  };

  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.singleCard.loading);
  const loadingUser = useSelector((state) => state.users.loading);
  console.log(loading, "u");
  const card = useSelector(selectCard);
  const users = useSelector(selectUsers);
  const currentUser = useSelector((state) => state.singleUser);
  // const socket = new WebSocket("ws://localhost:8000/ws/some_path/");
  const [comments,setComments]=useState(card.comments);
  const [socketMessage,setSocketMessage]=useState('');
  const [text, setText] = useState("");
  console.log(users);
  console.log(card,"card");

  const fetchData = async () => {
    console.log("Checkkkk")
    await dispatch(fetchCard(`${id}`));
    await dispatch(fetchUsers());
  };
  const checkStatus = () => {
    if (
      loading == "idle" ||
      loading == "pending" ||
      loadingUser == "idle" ||
      loadingUser == "pending"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const sendComment = async () => {
    console.log("called");
    const newComment = {
      text: text,
      author: currentUser.id,
      card: card.id,
    };
    // setSocketMessage(newComment);
    const updatedCard = {
      ...card,
      comments: [...card.comments, newComment],
    };
    console.log(updatedCard, "new");
    await createCommentApi(newComment);
    // socket.send(JSON.stringify({ message: socketMessage}));
    // setSocketMessage("");
    await dispatch(updateCardState({ updatedCard }));
  };

  useEffect(() => {
    fetchData();
  //   try{
  //     console.log("Attempting to open WebSocket connection...");
  //   socket.addEventListener("open", (event) => {
  //     console.log("WebSocket connection opened:", event);
  //   });
  // }catch(error){
  //   toast.error("WebSocket Connection Failed");
  //   console.log("fail",error);
  // }
  //   socket.addEventListener("close", (event) => {
  //     console.log("WebSocket connection closed:", event);
  //   });
  //   socket.addEventListener("message", (event) => {
  //     const data = JSON.parse(event.data);
  //     // Update comments state with the received comment
  //     setComments((prevComments) => [...prevComments, data.message]);
  //   });
  //   return () => {
  //     socket.close();
  //   };
  }, []);

  return (
    <div>
      <CurrentUser></CurrentUser>
      <div style={cardPageStyle}>
        {!checkStatus() && (
          <Box fontStyle={boxStyle}>
            <Typography id="modal-modal-title" variant="h3" component="h2">
              {card.title}
            </Typography>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              {card.description}
            </Typography>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Assignees
            </Typography>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                gap: "1rem",
              }}
            >
              {card.assignees.map((assignee) => {
                const user = users.find((user) => user.id === assignee);
                return <span style={assigneeBaseStyle}>{user.name}</span>;
              })}
            </div>
            <div style={deadlineStyle}>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                Deadline:
              </Typography>
              <span style={assigneeBaseStyle}>{card.deadline}</span>
            </div>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Comments
            </Typography>
            <div style={commentSection}>
              {card.comments.map((comment) => {
                const user = users.find((user) => user.id == comment.author);
                return (
                  <div style={commentStyle}>
                    <span
                      style={{
                        fontSize: "1.2rem",
                        border: "0.1rem solid black",
                        backgroundColor: "black",
                        color: "white",
                        padding: "0.3rem",
                        borderRadius: "0.3rem",
                      }}
                    >
                      {user.name}
                    </span>
                    <span style={{ fontSize: "1.1rem", alignSelf: "center" }}>
                      {comment.text}
                    </span>
                  </div>
                );
              })}
            </div>
            <div>
              <TextField
                id="input"
                label=""
                style={{ width: "90%" }}
                defaultValue="Type your comment here"
                onChange={(e) => {
                  e.preventDefault();
                  setText(e.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
              <div
                style={{ display: "inline", margin: "2.4rem 0rem 0rem 0rem" }}
                onClick={sendComment}
              >
                <AiFillCaretRight style={{ width: "2em", height: "2em" }} />
              </div>
            </div>
          </Box>
        )}
      </div>
    </div>
  );
}

export default Card;
