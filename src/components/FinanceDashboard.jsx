import { useState, useEffect } from "react";
import { formatNumbersWithCommas } from "../util/formatNumbers";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Modal,
  Button,
  Typography,
  TextField,
  Box,
} from "@mui/material";

import Paper from "@mui/material/Paper";

const FinanceDashboard = () => {
  const [dataset, setDataset] = useState([]);
  const [filterSetting, setFilterSetting] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [minRevenue, setMinRevenue] = useState("");
  const [maxRevenue, setMaxRevenue] = useState("");
  const [minNetIncome, setMinNetIncome] = useState("");
  const [maxNetIncome, setmaxNetIncome] = useState("");

  const [filteredData, setFilteredData] = useState(dataset);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();

  const api = `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${
    import.meta.env.VITE_VALUEGLANCE_API_KEY
  }`;

  useEffect(() => {
    fetch(api)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setDataset(data))
      .catch((err) => console.error("Error: ", err));
  }, [api]);

  const handleChange = (e) => {
    return;
  };

  const handleOpen = (e) => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  return (
    <div className="relative container mx-auto p-4">
      <h1 className="flex justify-center my-5 font-extrabold text-xl">
        Earnings Data for AAPL
      </h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="!font-semibold">Date</TableCell>
              <TableCell className="!font-semibold">Revenue</TableCell>
              <TableCell className="!font-semibold">Net Income</TableCell>
              <TableCell className="!font-semibold">Gross Profit</TableCell>
              <TableCell className="!font-semibold">EPS</TableCell>
              <TableCell className="!font-semibold">Operating Income</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataset.map((list, index) => (
              <TableRow key={index}>
                {" "}
                <TableCell>{list.date}</TableCell>
                <TableCell>${formatNumbersWithCommas(list.revenue)}</TableCell>
                <TableCell>
                  ${formatNumbersWithCommas(list.netIncome)}
                </TableCell>
                <TableCell>
                  ${formatNumbersWithCommas(list.grossProfit)}
                </TableCell>
                <TableCell>{list.eps}</TableCell>
                <TableCell>
                  ${formatNumbersWithCommas(list.operatingIncome)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FinanceDashboard;
