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
import ViewIcon from '@mui/icons-material/RemoveRedEye';
import React, { useEffect, useState } from "react";
import Helpers from "../Helpers";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
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

  const [topicList, setTopicList , topicListRef] = useStateRef([]);
  const [topicDetails, setTopicDetails] = useState({
    topicName:'',
    topicUrl:''
  });

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
        // prevRef.current['topicName'] = topicDetails

        let obj = {
          collectionName:prevRef.current.collectionName,
          unitDetail:{
            unitName:prevRef.current.unitName.unitName,
            unitNo:prevRef.current.unitName.unitNo,
          },
          topicDetails:topicDetails
        }
    
        console.log(obj);
    
        axios.post(Helpers().api + '/list_topic_edit_api' , obj ).then(result => {
          let res = result.data
          console.log(res);
          getTopicList() 
        })

      setTopicList([...topicList, topicDetails]);
      setOpen(!open);
    } else {
      alert("Field cannot be empty");
    }
  };

  const handleTopicName = (e) => {
    let text = e.target.value;
    setTopicDetails({...topicDetails , topicName:text})
  };

  const handleTopicUrl = (e) => {
    let text = e.target.value;
    setTopicDetails({...topicDetails , topicUrl:text})
  };

  const handleView = (row) => {

    setTopicDetails({
      topicName:row.topicName,
      topicUrl:row.topicUrl
    })

    setOpen(!open)

    // // navigate("/topicpage", {
    // //   // board: 'State Board', medium: 'English Medium', class: 'class1th'
    // //   state: {
    // //     boardName: prevData.board,
    // //     className: prevData.class,
    // //     mediumName: prevData.medium,
    // //     subjectName:name
    // //   },
    // // });

    // let obj = {
    //   boardName: prevData.board,
    //   className: prevData.class,
    //   mediumName: prevData.medium,
    //   subjectName: name,
    // };

    // console.log(obj);
  
  };

  const handleDelete = (name) => {
    const newList = topicList.filter((oldData) => oldData !== name);
    setTopicList(newList);
  };

  const getTopicList = () => {
    axios.post(Helpers().api + "/list_topic_api",prevRef.current).then(res => {
      let data = res.data
      
      setTopicList(data.message.unitTopics)
      console.log(topicListRef.current);
    })
  }


  useEffect(() => {
    setPrevData(location.state)
    console.log(prevRef.current);

    getTopicList() 


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
                    ? topicListRef.current.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : topicListRef.current
                  ).map((row) => (
                    <StyledTableRow>
                      <StyledTableCell>
                        <Typography className={classes.tableContentSize}>
                          {row.topicName}
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
                              startIcon={<ViewIcon />}
                              variant="contained"
                              style={{
                                backgroundColor: "green",
                                color: "white",
                                marginLeft: "5px",
                                marginRight: "5px",
                              }}
                              onClick={() => handleView(row)}
                            >
                              View
                            </Button>


                            <Divider orientation="vertical" flexItem />


                            <Button
                              startIcon={<EditIcon />}
                              variant="contained"
                              style={{
                                backgroundColor: "orange",
                                color: "white",
                                marginLeft: "5px",
                                marginRight: "5px",
                              }}
                              // onClick={() => handleDelete(row)}
                            >
                              Edit
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

                      {/* <StyledTableCell
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
                      </StyledTableCell> */}
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
                    count={topicListRef.current.length}
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
            <div style={{ display: "flex" , justifyContent:'center' ,alignItems:'center' }}>
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
                value={topicDetails.topicName}
                onChange={handleTopicName}
              />
            </div>
            <div style={{ display: "flex" , justifyContent:'center' ,alignItems:'center' }}>
              <Typography
                style={{
                  margin: "2%",
                  fontSize: "20px",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                Topic Url
              </Typography>
              <TextField
                type="url"
                fullWidth
                style={{ margin: "2%" }}
                variant="outlined"
                placeholder="Enter Topic Url"
                value={topicDetails.topicUrl}
                onChange={handleTopicUrl}
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
