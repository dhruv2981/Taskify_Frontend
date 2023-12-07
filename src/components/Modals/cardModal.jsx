import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { fetchUsers, selectUsers } from "../../app/features/userSlice";
import { createCard } from "../../app/features/cardSlice";
import { updateProjectState } from "../../app/features/singleProjectSlice";
import {
  selectAddEdit,
  updateAddEditState,
} from "../../app/features/addEditStateSlice";
import { fetchCardApi, updateCardApi } from "../../Apis/CardApi";
import toast from "react-hot-toast";

const CardModal = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const { fromChildCard, project, list } = props;
  console.log(list, "list");
  // const listToCard = list.list;
  // console.log(listToCard);
  const loading = useSelector((state) => state.users.loading);
  const addEditState = useSelector(selectAddEdit);

  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    fromChildCard(false);
    const newAddEditState = {
      ...addEditState,
      editCard: false,
      editCardId: "",
    };
    dispatch(updateAddEditState({ newAddEditState }));
  };
  const [cardTitle, setCardTitle] = React.useState("");
  const [cardDescription, setCardDescription] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const [priority, setPriority] = React.useState("");
  const [assignees, setAssignees] = React.useState([]);

  const handleChange = (event) => {
    event.preventDefault();
    setPriority(event.target.value);
  };

  const handleAssigneeChange = (event) => {
    const {
      target: { value },
    } = event;
    setAssignees(typeof value === "number" ? value.split(",") : value);
    console.log(assignees);
  };

  const handleDeadline = (e) => {
    setDeadline(e);
  };

  const handleEditCard = async () => {
    const updatedCard = {
      title: cardTitle,
      description: cardDescription,
      assignees: assignees,
      priority: priority,
      deadline: deadline,
      list: list.id,
    };
    console.log(updatedCard, "new");
    const response = await updateCardApi(addEditState.editCardId, updatedCard);
    fromChildCard(false);
    const updatedLists = project.lists.map((listItem) => {
      if (listItem.id === updatedCard.list) {
        // Update the selected list by updating the selected card
        return {
          ...listItem,
          cards: list.cards.map((card) =>
            card.id === addEditState.editCardId ? response.data : card
          ),
        };
      } else {
        return listItem;
      }
    });
    const newAddEditState = {
      ...addEditState,
      editCard: false,
      editCardId: "",
    };
    dispatch(updateAddEditState({ newAddEditState }));
    const updatedProject = {
      ...project,
      lists: updatedLists,
    };
    dispatch(updateProjectState({ updatedProject }));
    toast.success("Card edited successfully");
  };

  const handleCreateCard = async () => {
    const newCard = {
      title: cardTitle,
      description: cardDescription,
      assignees: assignees,
      priority: priority,
      deadline: deadline,
      list: list.id,
    };
    console.log(newCard, "new");
    const response = await dispatch(createCard(newCard));
    fromChildCard(false);
    const updatedLists = project.lists.map((listItem) => {
      if (listItem.id === newCard.list) {
        // Update the selected list by adding the new card
        return {
          ...listItem,
          cards: [...listItem.cards, newCard],
        };
      } else {
        return listItem;
      }
    });

    const updatedProject = {
      ...project,
      lists: updatedLists,
    };
    dispatch(updateProjectState({ updatedProject }));
    toast.success("Card created successfully");
  };

  const checkStatus = () => {
    if (loading == "idle" || loading == "pending") {
      return true;
    } else {
      return false;
    }
  };

  const fetchData = async () => {
    await dispatch(fetchUsers());
    if (addEditState.editCard) {
      const editCardResponse = await fetchCardApi(addEditState.editCardId);
      console.log(editCardResponse.data, "edited card old data");
    }
    setOpen(true);
  };
  useEffect(() => {
    fetchData();
  }, [dispatch]);

  return (
    <div>
      {!checkStatus() && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Card Title
            </Typography>
            <TextField
              required
              id="outline-required"
              className="input-title"
              onChange={(e) => {
                e.preventDefault();
                setCardTitle(e.target.value);
              }}
              // onChange={handleName}
              label="Required"
              defaultValue=""
            />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Card Desciption
            </Typography>
            <TextField
              required
              id="outline-required"
              className="input-description"
              onChange={(e) => {
                e.preventDefault();
                setCardDescription(e.target.value);
              }}
              label="Required"
              defaultValue=""
            />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Assignees
            </Typography>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={assignees}
              onChange={handleAssigneeChange}
              // input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {project.member.map((memberId) => {
                const user = users.find((user) => user.id === memberId);
                return (
                  // eslint-disable-next-line no-sequences
                  <MenuItem key={memberId} value={memberId}>
                    <Checkbox checked={assignees.indexOf(memberId) > -1} />
                    <ListItemText primary={user["name"]} />
                  </MenuItem>
                );
              })}
            </Select>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Deadline
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker onAccept={handleDeadline} />
            </LocalizationProvider>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Priority Choices
            </Typography>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={priority}
              onChange={handleChange}
            >
              <MenuItem value={"h"}>High</MenuItem>
              <MenuItem value={"m"}>Medium</MenuItem>
              <MenuItem value={"l"}>Low</MenuItem>
            </Select>
            <Button
              variant="contained"
              onClick={() => {
                addEditState.editCard ? handleEditCard() : handleCreateCard();
              }}
            >
              {addEditState.editCard ? "Edit" : "Create"}
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  );
};
export default CardModal;
