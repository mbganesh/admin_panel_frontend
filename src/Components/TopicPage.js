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
  IconButton,
} from "@mui/material";
import NextIcon from "@mui/icons-material/ArrowForward";
import React, { useEffect, useState } from "react";
import Helpers from "../Helpers";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import VideoIcon from "@mui/icons-material/VideoLibrary";
import MarkIcon from "@mui/icons-material/QuestionAnswer";
import { useLocation, useNavigate } from "react-router-dom";
import useStateRef from "react-usestateref";
import axios from "axios";

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

export default function TopicPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const [prevData, setPrevData, prevRef] = useStateRef({});
  const [collectionName, setCollectionName, colNameRef] = useStateRef("");

  const [topicList, setTopicList] = useState([]);
  const [topicDetails, setTopicDetails] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, topicList.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [open, setOpen] = useState(false);

  const handleAddTopicDialog = () => {
    setOpen(!open);
    setTopicDetails("");
  };

  const handleAddTopic = () => {



    if (topicDetails !== "") {
        prevRef.current['topicName'] = topicDetails
        axios.post(Helpers().api + '/list_edit_api' , prevRef.current).then(re => {
            let res = re.data
            console.log(res);
        })

      setTopicList([...topicList, topicDetails]);
      setOpen(!open);
    } else {
      alert("Field cannot be empty");
    }
  };

  const handleTopicName = (e) => {
    let text = e.target.value;
    setTopicDetails(text);
  };

  const handleVideo = (name) => {
    navigate("/videos"); //{ state : {subName : name} }
    // alert('not yet developed')
  };

  const handleOneMark = (name) => {
    // navigate('/onemarks' , { state : {subName : name} })
    alert("not yet developed");
  };

  const handleTwoMark = (name) => {
    // navigate('/twomarks' , { state : {subName : name} })
    alert("not yet developed");
  };

  const handleView = (name) => {
    // navigate("/topicpage", {
    //   // board: 'State Board', medium: 'English Medium', class: 'class1th'
    //   state: {
    //     boardName: prevData.board,
    //     className: prevData.class,
    //     mediumName: prevData.medium,
    //     subjectName:name
    //   },
    // });

    let obj = {
      boardName: prevData.board,
      className: prevData.class,
      mediumName: prevData.medium,
      subjectName: name,
    };

    console.log(obj);
  };

  const handleDelete = (name) => {
    const newList = topicList.filter((oldData) => oldData !== name);
    setTopicList(newList);
  };

  useEffect(() => {
    setPrevData(location.state)
    console.log(prevRef.current);
  }, []);
  

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.appBarField}>
            Topic Page
          </Typography>

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
            color="secondary"
            onClick={handleAddTopicDialog}
          >
            Add Topic
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
                        Topic Name
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
                    ? topicList.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : topicList
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
                            <Button
                              startIcon={<VideoIcon />}
                              variant="contained"
                              onClick={() => handleVideo(row)}
                              style={{
                                backgroundColor: "#041562",
                                marginLeft: "5px",
                                marginRight: "5px",
                                color: "white",
                              }}
                            >
                              Videos
                            </Button>
                            <Divider orientation="vertical" flexItem />
                            <Button
                              startIcon={<MarkIcon />}
                              variant="contained"
                              onClick={() => handleOneMark(row)}
                              style={{
                                backgroundColor: "#519259",
                                marginLeft: "5px",
                                marginRight: "5px",
                                color: "white",
                              }}
                            >
                              One Mark
                            </Button>
                            <Divider orientation="vertical" flexItem />
                            <Button
                              startIcon={<MarkIcon />}
                              variant="contained"
                              style={{
                                backgroundColor: "#519259",
                                color: "white",
                                marginLeft: "5px",
                                marginRight: "5px",
                              }}
                              onClick={() => handleTwoMark(row)}
                            >
                              Two Mark
                            </Button>
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
                    count={topicList.length}
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
        onClose={handleAddTopicDialog}
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
          Add Topic
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
                Topic Name
              </Typography>
              <TextField
                type="text"
                autoFocus
                fullWidth
                style={{ margin: "2%" }}
                variant="outlined"
                placeholder="Enter Topic Name"
                value={topicDetails}
                onChange={handleTopicName}
              />
            </div>
            
            <Button
              variant="contained"
              style={{
                color: "white",
                backgroundColor: Helpers().primaryColor,
                margin: "2%",
              }}
              onClick={handleAddTopic}
              type="submit"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
