import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { fetchUsers, selectUsers } from "../../app/features/userSlice";
import { createProject } from "../../app/features/projectSlice";
import { singleUserSlice } from "./../../app/features/singleUserSlice";

const ProjectModal = (props) => {
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
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const currentUser = useSelector((state) => state.singleUser);

  const handleCreateProject = () => {
    const removedId = currentUser["id"];
    const newProject = {
      name: projectName,
      description: projectDescription,
      member: [...personId, removedId],
      year1_visibility: visibilityYear1,
      year2_visibility: visibilityYear2,
      year3_visibility: visibilityYear3,
      year4_visibility: visibilityYear4,
      year5_visibility: visibilityYear5,
    };
    console.log("ji");
    console.log([...personId, removedId]);
    dispatch(createProject(newProject));
    closeCreateProjectModal();

    console.log("vr");
  };

  const { fromChild } = props;

  const closeCreateProjectModal = () => {
    fromChild(false);
  };

  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const [personId, setPersonId] = React.useState([]);
  const [projectName, setProjectName] = React.useState("");
  const [projectDescription, setProjectDescription] = React.useState("");
  const [visibilityYear1, setVisibilityYear1] = React.useState(true);
  const [visibilityYear2, setVisibilityYear2] = React.useState(true);
  const [visibilityYear3, setVisibilityYear3] = React.useState(true);
  const [visibilityYear4, setVisibilityYear4] = React.useState(true);
  const [visibilityYear5, setVisibilityYear5] = React.useState(true);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonId(typeof value === "number" ? value.split(",") : value);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

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
            Project Name
          </Typography>
          <TextField
            required
            id="outline-required"
            className="input-name"
            onChange={(e) => {
              e.preventDefault();
              setProjectName(e.target.value);
            }}
            // onChange={handleName}
            label="Required"
            defaultValue=""
          />
          {/* <TextField id="filled-basic" label="Name" variant="filled" /> */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Project Desciption
          </Typography>
          <TextField
            required
            id="outline-required"
            className="input-description"
            onChange={(e) => {
              e.preventDefault();
              setProjectDescription(e.target.value);
            }}
            label="Required"
            defaultValue=""
          />
          {/* <TextField id="filled-basic" label="Description" variant="filled" /> */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Members
          </Typography>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personId}
            onChange={handleChange}
            // input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {users.map(
              (user) =>
                user.name !== currentUser.name && (
                  // eslint-disable-next-line no-sequences
                  <MenuItem key={user.name} value={user.id}>
                    <Checkbox checked={personId.indexOf(user.name) > -1} />
                    <ListItemText primary={user.name} />
                  </MenuItem>
                )
            )}
          </Select>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Visibility
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                onChange={(e) => {
                  e.preventDefault();
                  setVisibilityYear1(e.target.checked);
                }}
              />
            }
            // onChange={handleName}/>}
            label="Year 1"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                onChange={(e) => {
                  e.preventDefault();
                  setVisibilityYear2(e.target.checked);
                }}
              />
            }
            label="Year 2"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                onChange={(e) => {
                  e.preventDefault();
                  setVisibilityYear3(e.target.checked);
                }}
              />
            }
            label="Year 3"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                onChange={(e) => {
                  e.preventDefault();
                  setVisibilityYear4(e.target.checked);
                }}
              />
            }
            label="Year 4"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                onChange={(e) => {
                  e.preventDefault();
                  setVisibilityYear5(e.target.checked);
                }}
              />
            }
            label="Year 5"
          />
          <Button
            variant="contained"
            onClick={() => {
              handleCreateProject();
            }}
          >
            Create
          </Button>
        </Box>
        {}
      </Modal>
    </div>
  );
};
export default ProjectModal;
