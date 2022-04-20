import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { Chip, DialogActions, DialogContent, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addFunds, fetchFunds, pullAll } from "../../redux/appSlice";

function AddFundsDialog({ onClose, onChange, value, open }) {
  const inputRef = React.useRef();

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Enter funds</DialogTitle>
      <DialogContent>
        <TextField
          varient="outlined"
          inputRef={inputRef}
          defaultValue={value}
          autoFocus
          helperText="Enter funds"
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            onChange(inputRef.current.value);
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
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <Typography variant="subtitle1" component="div">
        Current Funds
      </Typography>
      <Chip label={`${funds} ₪`} />
      <br />
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
              alert("Take your " + pulledFunds);
            });
        }}
      >
        Pull funds
      </Button>
      <AddFundsDialog
        onChange={(newFunds) => dispatch(addFunds(newFunds))}
        value={funds}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
