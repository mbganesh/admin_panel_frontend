import {
  AppBar,
  Button,
  Paper,
  Card,
  Divider,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  tableCellClasses,
  Toolbar,
  Typography,
  IconButton,
  Dialog,
  TextField,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Helpers from "../Helpers";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import NextIcon from "@mui/icons-material/ArrowForward";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useStateRef from "react-usestateref";

const useStyles = makeStyles({
  appBarField: {
    flex: 1,
    fontSize: 28,
  },
  subContainer2: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "1%",
    paddingRight: "1%",
    margin: "1%",
  },
  headFontSize: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,

    // [theme.breakpoints.up("xl")]: {
    //   fontSize: 16,
    // },
  },
  tableContentSize: {
    marginLeft: "1%",
    fontSize: 14,
    width: "48vw",
    // [theme.breakpoints.up("lg")]: {
    //   fontSize: 16,
    // },
  },
  dialogBox: {
    width: "500px",
    padding: "2%",
    display: "flex",
    flexDirection: "column",
    // [theme.breakpoints.down("sm")]: {
    //   width: "90%",
    // },
    // [theme.breakpoints.down("md")]: {
    //   width: "80%",
    // },
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: Helpers().primaryColor,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function SubjectPage() {
  const classes = useStyles();
  const navigate = useNavigate();

  const location = useLocation();

  const [subjectList, setSubjectList] = useState([]);
  const [subjectName, setSubjectName] = useState("");

  const [myList, setMyList, myListRef] = useStateRef([]);

  const [prevData, setPrevData, prevRef] = useStateRef({});

  const [boarName, setBoardName, boardNameRef] = useStateRef("");

  const [open, setOpen] = useState(false);

  const handleAddSubjectDialog = () => {
    setOpen(!open);
    setSubjectName("");
  };

  const handleSubName = (e) => {
    let name = e.target.value;
    setSubjectName(name);
  };

  const handleAddSubject = () => {
    if (subjectName !== "") {
      setSubjectList([...subjectList, subjectName]);
      setOpen(!open);

      let TempObj = {
        subDetails: prevRef.current,
        subName: subjectName,
      };

      console.log(TempObj);

      axios.post(Helpers().api + "/subject_api", TempObj).then((res) => {
        console.log(res.data);
        getSubList();
      });
    } else {
      alert("Please Enter Subject Name");
    }
  };

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, myList.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleView = (name) => {
    navigate("/unitpage", {
      // board: 'State Board', medium: 'English Medium', class: 'class1th'
      state: {
        boardName: prevData.board,
        className: prevData.class,
        mediumName: prevData.medium,
        subjectName:name
      },
    });
  };

  const handleDelete = (name) => {
    // const newList = myList.filter((oldData) => oldData !== name);

    let TempObj = {
      subDetails: prevRef.current,
      subName: name,
    };

    axios.post(Helpers().api + "/subject_edit_api", TempObj).then((res) => {
      let upData = res.data;
      console.log(upData);
      getSubList();
    });
  };

  const handleSubjectPage = () => {
    setOpen(!open);
    setSubjectName("");
  };

  const getBoardName = (key) => {
    let boardArr = prevRef.current[key].split(" ");
    let b = boardArr.map((el) => el.charAt(0));
    let BOARD = "";
    for (let i = 0; i < b.length; i++) {
      BOARD = BOARD.concat(b[i]);
    }
    return BOARD.length < 2 ? BOARD + "B" : BOARD;
  };

  const getSubList = () => {
    let TempObj = {
      subDetails: prevRef.current,
      subName: "",
    };

    axios.post(Helpers().api + "/subject_list_api", TempObj).then((res) => {
      let lsData = res.data;
      console.log(lsData);
      setMyList(res.data.mySubject);
    });
  };

  useEffect(() => {
    setPrevData(location.state);

    let TempObj = {
      subDetails: prevRef.current,
      subName: "",
    };
    axios.post(Helpers().api + "/subject_api", TempObj).then((res) => {
      console.log(res.data);
    });

    getSubList();
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.appBarField}>
            Subject Page
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleSubjectPage()}
          >
            Add Subject
          </Button>
        </Toolbar>
      </AppBar>

      <div className={classes.subContainer2}>
        <div style={{ width: "100%", flex: 1, paddingTop: "0%" }}>
          <Card elevation={5}>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="left">
                      <Typography className={classes.headFontSize}>
                        Subject
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography className={classes.headFontSize}>
                        Actions
                      </Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>

                <TableBody>
                  {(rowsPerPage > 0
                    ? myList.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : myList
                  ).map((row) => (
                    <StyledTableRow>
                      <StyledTableCell>
                        <Typography className={classes.tableContentSize}>
                          {row}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        align="center"
                        className={classes.tableContentSize}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          <Card
                            elevation="3"
                            style={{ display: "flex", padding: "0.5%" }}
                          >
                            <IconButton onClick={() => handleView(row)}>
                              <NextIcon />
                            </IconButton>

                            <Divider orientation="vertical" flexItem />
                            <Button
                              startIcon={<DeleteIcon />}
                              variant="contained"
                              style={{
                                backgroundColor: "red",
                                color: "white",
                                marginLeft: "5px",
                                marginRight: "5px",
                              }}
                              onClick={() => handleDelete(row)}
                            >
                              Delete
                            </Button>
                          </Card>
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                  {emptyRows > 0 && (
                    <StyledTableRow style={{ height: 53 * emptyRows }}>
                      <StyledTableCell colSpan={6} />
                    </StyledTableRow>
                  )}
                </TableBody>
              </Table>

              <TableFooter
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={myList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </TableContainer>
          </Card>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleAddSubjectDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          style={{
            textAlign: "center",
            fontWeight: "bold",
            backgroundColor: Helpers().primaryColor,
            color: "white",
            padding: "10px",
          }}
          id="form-dialog-title"
        >
          Add Subject
        </DialogTitle>

        <DialogContent>
          <div className={classes.dialogBox}>
            <Typography style={{ margin: "2%", fontSize: "20px" }}>
              Subject Name
            </Typography>
            <TextField
              type="text"
              autoFocus
              style={{ margin: "2%" }}
              variant="outlined"
              placeholder="Enter Subject Name"
              value={subjectName}
              onChange={handleSubName}
            />
            <Button
              variant="contained"
              style={{
                color: "white",
                backgroundColor: Helpers().primaryColor,
                margin: "2%",
              }}
              onClick={handleAddSubject}
              type="submit"
            >
              Add and Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
