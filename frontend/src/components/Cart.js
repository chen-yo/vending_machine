import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  TableBody,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { cartTotal } from "../redux/appSlice";

export default function Cart() {
  const total = useSelector((state) => cartTotal(state));
  const { cart, drinks } = useSelector((state) => state);

  return (
    <div>
      <Typography variant="subtitle1" component={"div"}>
        Your cart:
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Units</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(cart).map((drinkId) => {
              const { name, cost } = drinks[drinkId];

              return (
                <TableRow
                  key={`${drinkId}-${cart[drinkId]}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell align="right">{cost * cart[drinkId]}</TableCell>
                  <TableCell align="right">{cart[drinkId]}</TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{`${total} ₪`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
