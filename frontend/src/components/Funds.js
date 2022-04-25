import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import {
  Chip,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addFunds, fetchFunds, pullAll } from "../redux/appSlice";

function AddFundsDialog({ onClose, onChange, open }) {
  const [funds, setFunds] = React.useState(5);
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Enter funds");

  function handleOnChange(event) {
    const value = event.target.value;
    setFunds(value);
    setError(false);
    setHelperText("Enter funds");

    if (value > 100 || value < 0) {
      setError(true);
      setHelperText("Funds must be between 0 - 100");
    }
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Enter funds</DialogTitle>
      <DialogContent>
        <TextField
          varient="outlined"
          autoFocus
          helperText={helperText}
          value={funds}
          type="number"
          min="0"
          max="100"
          error={error}
          onChange={handleOnChange}
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          disabled={error}
          onClick={() => {
            onChange(funds);
            onClose();
          }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function AddFunds() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const funds = useSelector((state) => state.funds);

  React.useEffect(() => {
    dispatch(fetchFunds());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <Stack
      direction={"row"}
      spacing={2}
      p={2}
      alignItems="center"
      sx={{
        backgroundColor: "#e2d3f5",
        borderRadius: "6px",
      }}
    >
      <Typography variant="subtitle1" component="div">
        Current Funds
      </Typography>
      <Chip label={`${funds} ₪`} />
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Funds
      </Button>
      <Button
        disabled={funds === 0}
        variant="outlined"
        onClick={() => {
          dispatch(pullAll())
            .unwrap()
            .then((pulledFunds) => {
              alert(`Take your ${pulledFunds} ₪`);
            });
        }}
      >
        Pull funds
      </Button>
      {open && (
        <AddFundsDialog
          onChange={(newFunds) => dispatch(addFunds(newFunds))}
          open={open}
          onClose={handleClose}
        />
      )}
    </Stack>
  );
}
