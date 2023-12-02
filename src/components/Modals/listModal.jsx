import React from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createList } from "../../app/features/listSlice";
import toast from "react-hot-toast";
import { updateProjectState } from "../../app/features/singleProjectSlice";
import { updateAddEditState ,selectAddEdit} from "../../app/features/addEditStateSlice";
import { useSelector } from "react-redux";
import { updateListApi } from "../../Apis/ListApi";


const ListModal = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  };

  const [listName, setListName] = React.useState("");
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    fromChild(false);
    const newAddEditState = {
      ...addEditState,
      editList: false,
      editListId: "",
    };
    dispatch(updateAddEditState({newAddEditState}))
  }
  const dispatch = useDispatch();
  const addEditState=useSelector(selectAddEdit);
  const { fromChild, project } = props;

  const handleEditList = async () => {
    const updatedList = {
      name: listName,
      project: project.id,
    };

    const response = await updateListApi(addEditState.editListId,updatedList);
    console.log(response.data, "o");
    
    const updatedProject = {
      ...project,
      lists: project.lists.map((list) =>
        list.id === addEditState.editListId ? response.data : list
      ),
    };
    const newAddEditState={
      ...addEditState,
      editList:false,
      editListId:'',    
    }
    console.log(updatedProject, "k");
    await dispatch(updateProjectState({ updatedProject }));
    await dispatch(updateAddEditState({newAddEditState}));

    fromChild(false);
    toast.success("List edited successfully");
  };

  const handleCreateList = async () => {
    const newList = {
      name: listName,
      project: project.id,
    };

    const response = await dispatch(createList(newList));
    console.log(response.payload, "o");
    const updatedProject = {
      ...project,
      lists: [...project.lists, response.payload],
    };
    console.log(updatedProject, "k");
    dispatch(updateProjectState({ updatedProject }));

    fromChild(false);
    toast.success("List created successfully");
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            List Name
          </Typography>
          <TextField
            required
            id="outline-required"
            className="input-name"
            onChange={(e) => {
              e.preventDefault();
              setListName(e.target.value);
            }}
            // onChange={handleName}
            label="Required"
            defaultValue=""
          />
          <Button
            variant="contained"
            onClick={() => {
              addEditState.editList ? handleEditList() : handleCreateList()
              
            }}
          >
            {addEditState.editList ? 'Edit' : 'Create'}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ListModal;
