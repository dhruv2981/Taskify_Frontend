import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { createProjectApi } from "../../Apis/ProjectApi";
import { fetchUsers, selectUsers } from "../../app/features/userSlice";
import { useSelect } from "@mui/base";

const ProjectModal = () => {
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
  // const names = [
  //   "Oliver Hansen",
  //   "Van Henry",
  //   "April Tucker",
  //   "Ralph Hubbard",
  //   "Omar Alexander",
  //   "Carlos Abbott",
  //   "Miriam Wagner",
  //   "Bradley Wilkerson",
  //   "Virginia Andrews",
  //   "Kelly Snyder",
  // ];
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
  const users=useSelector(selectUsers);

  const createProject = () => {
    dispatch(createProject());
  };
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
            value={personName}
            onChange={handleChange}
            // input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {users.map((user) => (
              <MenuItem key={user.name} value={user.name}>
                <Checkbox checked={personName.indexOf(user.name) > -1} />
                <ListItemText primary={user.name} />
              </MenuItem>
            ))}
          </Select>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Visibility
          </Typography>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Year 1"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Year 2"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Year 3"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Year 4"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Year 5"
          />
          <Button
            variant="contained"
            onClick={() => {
              createProject();
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
