import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CgAdd } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateProjectState } from "../../app/features/singleProjectSlice";
import { deleteList } from "../../app/features/listSlice";
import { Link } from "react-router-dom";

const ListCard = (props) => {
  const { list, project } = props;
  const cards = list.cards;

  const listCardStyle = {
    display: "flex",
    flexDirection: "column",
    borderRadius: "0.8rem",
    border: "0.2rem solid white",
    width: "350px",
  };
  const listHeadingStyle = {
    background: `${list.color}`,
    display: "inline",
    // background: `white`,
    // color:'white',
    fontSize: "2rem",
    padding: "0.3rem 0.8rem 0.3rem 0.8rem",
    borderRadius: "0.5rem",
  };

  const cardStyle = {
    // border:'0.2rem solid black',
    borderRadius: "0.8rem",
    padding: "0.4rem 0rem 0.4rem 0.6rem",
    margin: "0.2rem",
    fontSize: "2rem",
    backgroundColor: "#e3e6ea",
  };
  const addCardStyle = {
    // border:'0.2rem solid black',
    borderRadius: "0.8rem",
    padding: "0.4rem 0rem 0.4rem 0.6rem",
    margin: "0.2rem",
    fontSize: "2rem",
    backgroundColor: "#e3e6ea",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  };
  const listNameDiv = {
    display: "flex",
    justifyContent: "spaceBetween",
    width: "100%",
    // gap:'6rem',
  };
  const iconDiv = {
    display: "flex",
    gap: "1rem",
    padding: "0.8rem 0.8rem 0.3rem 0.8rem",
    // width:'10rem',
  };

  const { fromChildCard, listToCard } = props;
  const dispatch = useDispatch();

  const handleEditList = () => {};
  const handleDeleteList = async () => {
    await dispatch(deleteList(list.id));
    const updatedLists = project.lists.filter(
      (listItem) => listItem.id !== list.id
    );

    const updatedProject = {
      ...project,
      lists: updatedLists,
    };

    await dispatch(updateProjectState({ updatedProject }));
  };

  return (
    <div style={listCardStyle}>
      <div style={listNameDiv}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={listHeadingStyle}
        >
          {list.name}
        </Typography>
        <div style={iconDiv}>
          <CiEdit
            style={{ width: "30", height: "30" }}
            onClick={handleEditList}
          />
          <MdOutlineDeleteOutline
            style={{ width: "30", height: "30" }}
            onClick={handleDeleteList}
          />
        </div>
      </div>
      <div>
        {cards.map((card) => (
          <Link
            to={`/project/${project.id}/card/${card.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div style={cardStyle}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{ fontSize: "1.6rem" }}
              >
                {card.title}
              </Typography>
            </div>
          </Link>
        ))}
      </div>
      <div
        style={addCardStyle}
        onClick={() => {
          fromChildCard(true);
          listToCard({ list });
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Card
        </Typography>
        <CgAdd />
      </div>
    </div>
  );
};
export default ListCard;
