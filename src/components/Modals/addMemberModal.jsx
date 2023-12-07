import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { fetchUsers, selectUsers } from "../../app/features/userSlice";
import { updateProject } from "../../app/features/singleProjectSlice";

const AddMemberModal = (props) => {
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
  //   const currentUser = useSelector((state) => state.singleUser);

  const handleCreateProject = async () => {
    const newProject = {
      ...project,
      member: [...project.member, ...personId],
    };
    console.log("ji");
    console.log([...project.member, ...personId]);
    console.log(newProject, "old");
    await dispatch(
      updateProject({ projectId: project.id, newProject: newProject })
    );
    fromChildMember(false);

    console.log("vr");
  };

  const { fromChildMember, project } = props;
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    fromChildMember(false);
  };
  const [personId, setPersonId] = React.useState([]);

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
            Add Member
          </Typography>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personId}
            onChange={handleChange}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {users.map(
              (user) =>
                !project.member.includes(user.id) && (
                  <MenuItem key={user.name} value={user.id}>
                    <Checkbox checked={personId.indexOf(user.id) > -1} />
                    <ListItemText primary={user.name} />
                  </MenuItem>
                )
            )}
          </Select>
          <Button
            variant="contained"
            onClick={() => {
              handleCreateProject();
            }}
          >
            Add
          </Button>
        </Box>
        {}
      </Modal>
    </div>
  );
};
export default AddMemberModal;
