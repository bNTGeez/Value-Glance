import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { formatNumbersWithCommas } from "../util/formatNumbers";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Modal,
  Button,
  TextField,
  Box,
} from "@mui/material";

import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import Paper from "@mui/material/Paper";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const FinanceDashboard = () => {
  const [dataset, setDataset] = useState([]);
  const [minRevenue, setMinRevenue] = useState("");
  const [maxRevenue, setMaxRevenue] = useState("");
  const [minNetIncome, setMinNetIncome] = useState("");
  const [maxNetIncome, setMaxNetIncome] = useState("");

  const [filteredData, setFilteredData] = useState(dataset);
  const [sortStates, setSortStates] = useState({
    date: "asc",
    revenue: "asc",
    netIncome: "asc",
  });

  const [open, setOpen] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date("1925-01-01"),
    endDate: new Date("2045-12-31"),
    key: "selection",
  });

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
      .then((data) => {
        setDataset(data);
        setFilteredData(data);
      })
      .catch((err) => console.error("Error: ", err));
  }, []); // api

  const handleOpen = (e) => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleOpenDate = (e) => {
    setOpenDate(true);
  };

  const handleCloseDate = (e) => {
    setOpenDate(false);
  };

  {
    /* Date Range Picker */
  }

  const handleClear = () => {
    setFilteredData(dataset);
    setMinRevenue("");
    setMaxRevenue("");
    setMinNetIncome("");
    setMaxNetIncome("");
    setSelectionRange({
      startDate: new Date("1925-01-01"),
      endDate: new Date("2045-12-31"),
      key: "selection",
    });
  };

  const handleApply = (e) => {
    const startDate = new Date(selectionRange.startDate);
    const endDate = new Date(selectionRange.endDate);

    const filtered = dataset.filter((item) => {
      const itemDate = new Date(item.date);
      const revenue = item.revenue;
      const netIncome = Number(item.netIncome);

      return (
        itemDate >= startDate &&
        itemDate <= endDate &&
        (minRevenue === "" || revenue >= parseFloat(minRevenue)) &&
        (maxRevenue === "" || revenue <= parseFloat(maxRevenue)) &&
        (minNetIncome === "" || netIncome >= parseFloat(minNetIncome)) &&
        (maxNetIncome === "" || netIncome <= parseFloat(maxNetIncome))
      );
    });

    setFilteredData(filtered); //updating
    handleClose();
  };

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
    console.log("Selected Range:", ranges.selection);
  };

  const handleSort = (key) => {
    const direction = sortStates[key] === "asc" ? "desc" : "asc";
    const sortedData = [...filteredData].sort((a, b) => {
      if (key === "date") {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return direction === "asc" ? dateA - dateB : dateB - dateA;
        // dateA - dateB means earlier date comes first
        // dateB - dateA means later date comes first
      } else {
        const valueA = Number(a[key]);
        const valueB = Number(b[key]);
        return direction === "asc" ? valueA - valueB : valueB - valueA;
      }
    });

    setSortStates({ ...sortStates, [key]: direction });
    setFilteredData(sortedData);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="relative container mx-auto p-4">
        <h1 className="my-5 font-extrabold text-xl">Earnings Data for AAPL</h1>

        {/* Filter Section */}
        <div className="flex justify-end">
          <Button
            onClick={handleOpen}
            className="flex flex-row items-center bg-transparent text-black"
          >
            <SlidersHorizontal size={18} />
          </Button>
        </div>

        <Modal open={open} onClose={handleClose}>
          <div>
            <Box
              className="absolute top-1/2 left-1/2 
    transform -translate-x-1/2 -translate-y-1/2 
    w-[90%] max-w-[650px] 
    bg-white border-2 border-black shadow-xl p-4 rounded"
            >
              <h1>Dates</h1>

              {openDate ? (
                <div className="flex items-center justify-center flex-col">
                  <div className="w-full max-w-[320px]">
                    <DateRangePicker
                      ranges={[selectionRange]}
                      onChange={handleSelect}
                      direction="vertical"
                      months={1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex flex-row space-x-4">
                    <Button variant="contained" onClick={handleCloseDate}>
                      Close
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  className="mt-3 bg-slate-300 text-black"
                  variant="contained"
                  onClick={handleOpenDate}
                >
                  Choose Date
                </Button>
              )}

              <h1 className="mt-3">Revenue</h1>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <TextField
                  label="Min Revenue"
                  variant="outlined"
                  value={minRevenue}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!isNaN(value)) setMinRevenue(value);
                  }}
                >
                  Min Price
                </TextField>
                <TextField
                  label="Max Revenue"
                  variant="outlined"
                  value={maxRevenue}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!isNaN(value)) setMaxRevenue(value);
                  }}
                >
                  Max Price
                </TextField>
              </Box>
              <h1 className="mt-3">Net Income</h1>
              <Box className="grid grid-cols-2 gap-x-4">
                <TextField
                  label="Min Income"
                  variant="outlined"
                  value={minNetIncome}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!isNaN(value)) setMinNetIncome(value);
                  }}
                />
                <TextField
                  label="Max Income"
                  variant="outlined"
                  value={maxNetIncome}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!isNaN(value)) setMaxNetIncome(value);
                  }}
                />
              </Box>

              <Button
                className="mt-3 bg-slate-300 text-black"
                variant="contained"
                onClick={handleApply}
              >
                Apply
              </Button>
              <Button
                className="mt-3 mx-3 bg-slate-300 text-black"
                variant="contained"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                className="mt-3 bg-slate-300 text-black"
                variant="contained"
                onClick={handleClear}
              >
                Clear
              </Button>
            </Box>
          </div>
        </Modal>

        <TableContainer component={Paper} className="overflow-x-auto">
          <Table className="min-w-[600px]">
            <TableHead>
              <TableRow>
                <TableCell className="!font-semibold">
                  <div className="flex flex-row items-center">
                    Date{" "}
                    <Button onClick={() => handleSort("date")}>
                      {sortStates.date === "asc" ? (
                        <ChevronUp color="black" />
                      ) : (
                        <ChevronDown color="black" />
                      )}
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="!font-semibold">
                  <div className="flex flex-row items-center">
                    Revenue{" "}
                    <Button onClick={() => handleSort("revenue")}>
                      {sortStates.revenue === "asc" ? (
                        <ChevronUp color="black" />
                      ) : (
                        <ChevronDown color="black" />
                      )}
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="!font-semibold">
                  <div className="flex flex-row items-center">
                    Net Income{" "}
                    <Button onClick={() => handleSort("netIncome")}>
                      {sortStates.netIncome === "asc" ? (
                        <ChevronUp color="black" />
                      ) : (
                        <ChevronDown color="black" />
                      )}
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="!font-semibold">Gross Profit</TableCell>
                <TableCell className="!font-semibold">EPS</TableCell>
                <TableCell className="!font-semibold">
                  Operating Income
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((list, index) => (
                <TableRow key={index}>
                  {" "}
                  <TableCell>{list.date}</TableCell>
                  <TableCell>
                    ${formatNumbersWithCommas(list.revenue)}
                  </TableCell>
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
    </div>
  );
};

export default FinanceDashboard;
