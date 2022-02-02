import {
    AppBar,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
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
    TextField,
    tableCellClasses,
    Toolbar,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useLocation } from "react-router-dom";
  import Helpers from "../Helpers";
  import { styled } from "@mui/material/styles";
  import { makeStyles } from "@mui/styles";
  import { useNavigate } from "react-router-dom";

  
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
      width: "33vw",
      // [theme.breakpoints.up("lg")]: {
      //   fontSize: 16,
      // },
    },
    dialogBox: {
      width: "550px",
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

export default function TwoMark() {
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();
    const [subName, setSubName] = useState("");

    const [twoMark, setTwoMark] = useState({
        question: "",
        answer: "",
      });

      const [twoMarkList, setTwoMarkList] = useState([]);

      
  const [open, setOpen] = useState(false);

  const handleAddTwoMarktDialog = () => {
    setOpen(!open);
    setTwoMark({question: "",answer: "",});
  };

  
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, twoMarkList.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleQuestion = (e) => {
    let text = e.target.value;
    setTwoMark({ ...twoMark, question: text });
}

  const handleAnswer = (e) => {
    let text = e.target.value;
    setTwoMark({ ...twoMark, answer: text });
  }

  const handleSaveQuestion = () => {
    if (twoMark.answer !== "" || twoMark.question !== "") {
        setTwoMarkList([...twoMarkList, twoMark]);
        setOpen(!open);
      } else if (twoMark.answer === "") {
        alert("Answer Field cannot be Empty.");
      } else if (twoMark.question === "") {
        alert("Question Field cannot be Empty.");
      }
  }


    useEffect(() => {
        console.log(location.state);
        setSubName(location.state.subName);
      }, []);


  return (<div>
      <AppBar position='static'>
          <Toolbar>
              <Typography style={{flex:1}} > {subName} - Two Mark handler </Typography>
              
              <Button
            variant="outlined"
            color="secondary"
            style={{ color: "white", margin: "5px" }}
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>

          <Button
            variant="contained"
            style={{ backgroundColor: "orange", margin: "5px" }}
            onClick={handleAddTwoMarktDialog}
          >
            Add Two Marks
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
                        Answer
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      <Typography className={classes.headFontSize}>
                        Question
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
                    ? twoMarkList.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : twoMarkList
                  ).map((row) => (
                    <StyledTableRow>
                      <StyledTableCell>
                        <Typography className={classes.tableContentSize}>
                          {row.question}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell>
                        <Typography className={classes.tableContentSize}>
                          {row.answer}
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
                            <Button
                              //   startIcon={<MarkIcon />}
                              variant="contained"
                              style={{
                                backgroundColor: "#519259",
                                margin: "5px",
                                color: "white",
                              }}
                            //   onClick={() => handleView(row)}
                            >
                              View
                            </Button>
                            <Divider orientation="vertical" flexItem />
                            <Button
                              //   startIcon={<MarkIcon />}
                              variant="contained"
                              style={{
                                backgroundColor: "#D67D3E",
                                color: "white",
                                margin: "5px",
                              }}
                            >
                              Edit
                            </Button>
                            <Divider orientation="vertical" flexItem />
                            <Button
                              // startIcon={ <DeleteIcon/> }
                              variant="contained"
                              style={{
                                backgroundColor: "red",
                                color: "white",
                                margin: "5px",
                              }}
                            //   onClick={() => handleDelete(row)}
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
                    count={twoMarkList.length}
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
        onClose={handleAddTwoMarktDialog}
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
          Add Videos
        </DialogTitle>

        <DialogContent>
          <div className={classes.dialogBox}>
            <div style={{ display: "flex" }}>
              <Typography
                style={{
                  margin: "2%",
                  fontSize: "20px",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                Question
              </Typography>
              <TextField
                type="text"
                maxRows={4}
                multiline
                autoFocus
                fullWidth
                style={{ margin: "2%" }}
                variant="outlined"
                placeholder="Enter Question"
                value={twoMark.question}
                onChange={handleQuestion}
              />
            </div>
            <div style={{ display: "flex" }}>
              <Typography
                style={{
                  margin: "2%",
                  fontSize: "20px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                Answer
              </Typography>
              <TextField
                type="text"
                fullWidth
                maxRows={4}
                multiline
                style={{ margin: "2%" }}
                variant="outlined"
                placeholder="Enter Answer"
                value={twoMark.answer}
                onChange={handleAnswer}
              />
            </div>
            <Button
              variant="contained"
              style={{
                color: "white",
                backgroundColor: Helpers().primaryColor,
                margin: "2%",
              }}
              onClick={handleSaveQuestion}
              type="submit"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
  </div>);
}
