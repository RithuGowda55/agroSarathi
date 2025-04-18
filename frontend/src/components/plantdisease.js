import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import axios from 'axios';
import Back from "./Back";

import {
  Paper,
  CardActionArea,
  CardMedia,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
} from "@material-ui/core";
import image from "../css/bg.png";
import { DropzoneArea } from "material-ui-dropzone";
import { common } from "@material-ui/core/colors";
import Clear from "@material-ui/icons/Clear";
import styled from 'styled-components';


const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;  // This ensures vertical stacking
  gap: 10px;               // Adds space between the boxes
`;

const Box = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  background-color:rgba(249, 249, 249, 0.15);
`;

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    "&:hover": {
      backgroundColor: "#ffffff7a",
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  clearButton: {
    width: "-webkit-fill-available",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: 900,
  },
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 400,
  },
  paper: {
    // padding: theme.spacing(2),
    margin: 0,
    maxWidth: 1500,
  },
  gridContainer: {
    justifyContent: "center",
    padding: "3em 0em 0 0em",
  },
  mainContainer: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "140vh",
    display: "flex", // Use flexbox for layout
    flexDirection: "column", // Stack elements vertically
    justifyContent: "space-between", // Distribute space between the elements
    // marginTop: "80px",
  },
  imageCard: {
    margin: "auto",
    maxWidth: 400,
    height: 500,
    backgroundColor: "transparent",
    boxShadow: "0px 9px 70px 0px rgb(0 0 0 / 30%) !important",
    borderRadius: "15px",
  },
  imageCardEmpty: {
    height: "auto",
  },
  noImage: {
    margin: "auto",
    width: 400,
    height: "400 !important",
  },
  input: {
    display: "none",
  },
  uploadIcon: {
    background: "white",
  },
  tableContainer: {
    backgroundColor: "transparent !important",
    boxShadow: "none !important",
  },
  table: {
    backgroundColor: "transparent !important",
  },
  tableHead: {
    backgroundColor: "transparent !important",
  },
  tableRow: {
    backgroundColor: "transparent !important",
  },
  tableCell: {
    fontSize: "14px",
    backgroundColor: "transparent !important",
    borderColor: "transparent !important",
    color: "#000000a6 !important",
    fontWeight: "bolder",
    padding: "1px 24px 1px 16px",
  },
  tableCell1: {
    fontSize: "14px",
    backgroundColor: "transparent !important",
    borderColor: "transparent !important",
    color: "#000000a6 !important",
    fontWeight: "bolder",
    padding: "1px 24px 1px 16px",
  },
  tableBody: {
    backgroundColor: "transparent !important",
  },
  text: {
    color: "white !important",
    textAlign: "center",
  },
  buttonGrid: {
    maxWidth: "416px",
    width: "100%",
  },
  detail: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  appbar: {
    background: "#5F7D5A",
    boxShadow: "none",
    color: "white",
  },
  loader: {
    color: "#be6a77 !important",
  },
}));

export const DiseaseDetector = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [response, setResponse] = useState("");

  let confidence = 0;

  const sendFile = async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const res = await axios.post("http://127.0.0.1:5000/predict", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.status === 200) {
          setData(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsloading(false);
      }
    }
  };

  const sendQuestion = async () => {
    if (data?.class) {
      const query = `What are the pesticides for ${data.class} disease?`;
      try {
        const res = await axios.post(
          "http://127.0.0.1:5000/api/getResponse",
          { question: query }, // Send the disease-specific question
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 200) {
          setResponse(res.data.response); // Adjust based on backend structure
          console.log("respond:", res.data.response);
        }
      } catch (error) {
        console.error("Error sending question:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
        }
      }
    }
  };

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
    setResponse(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    sendFile();
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  return (
    <>
    <Back title= 'Plant Disease Detection'/>
    <React.Fragment>
      <Container
        maxWidth={false}
        className={classes.mainContainer}
        disableGutters={true}
      >
        <Grid
          className={classes.gridContainer}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <Card
              className={`${classes.imageCard} ${
                !image ? classes.imageCardEmpty : ""
              }`}
            >
              {image && (
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={preview}
                    component="image"
                    title="Uploaded Plant Leaf"
                  />
                </CardActionArea>
              )}
              {!image && (
                <CardContent className={classes.content}>
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    dropzoneText={
                      "Drag and drop an image of a diseased plant leaf to process"
                    }
                    onChange={onSelectFile}
                  />
                </CardContent>
              )}
              {data && (
                <CardContent className={classes.detail}>
                  <TableContainer
                    component={Paper}
                    className={classes.tableContainer}
                  >
                    <Table
                      className={classes.table}
                      size="small"
                      aria-label="simple table"
                    >
                      <TableHead className={classes.tableHead}>
                        <TableRow className={classes.tableRow}>
                          <TableCell className={classes.tableCell1}>
                            Label:
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {data.class}
                          </TableCell>
                        </TableRow>
                        <TableRow className={classes.tableRow}>
                          <TableCell className={classes.tableCell1}>
                            Confidence:
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {confidence}%
                          </TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </TableContainer>
                </CardContent>
              )}
              {isLoading && (
                <CardContent className={classes.detail}>
                  <CircularProgress
                    color="secondary"
                    className={classes.loader}
                  />
                  <Typography className={classes.title} variant="h6" noWrap>
                    Processing
                  </Typography>
                </CardContent>
              )}
            </Card>
          </Grid>
          <Grid item className={classes.buttonGrid}>
            <ColorButton className={classes.clearButton} onClick={sendQuestion}>
              Ask for pesticides
            </ColorButton>
          </Grid>
          {data && (
            <Grid item className={classes.buttonGrid}>
              <ColorButton
                variant="contained"
                className={classes.clearButton}
                color="primary"
                component="span"
                size="large"
                onClick={clearData}
                startIcon={<Clear fontSize="large" />}
              >
                Clear
              </ColorButton>
            </Grid>
          )}

{response && (
  <div
    className="response-container"
    style={{
      flex: 1, // Allow the content to take available space
      display: "flex",
      flexDirection: "column", // Stack content vertically
      justifyContent: "center",
      alignItems: "center",
      margin: "20px",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      maxWidth: "2200px",
      width: "100%",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <div
      className="response-card"
      style={{
        width: "100%",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h4 style={{ marginBottom: "20px", fontSize: "20px", color: "#333" }}>
        OpenAI Response:
      </h4>
      <div
        className="response-content"
        style={{
          textAlign: "justify",
          lineHeight: "1.6",
          color: "#555",
        }}
      >
        {/* Split the response into paragraphs and format */}
        {response.split("\n").map((paragraph, index) => {
          const isNumbered = /^[1-4]\./.test(paragraph); // Check if the paragraph starts with 1, 2, 3, or 4
          return (
            <p
              key={index}
              style={{
                marginBottom: "15px",
                fontSize: "16px",
                textIndent: "20px",
                fontWeight: isNumbered ? "bold" : "normal",
              }}
            >
              {paragraph.trim()}
            </p>
          );
        })}
      </div>
    </div>
  </div>
)}

          


        </Grid>
      </Container>
    </React.Fragment>
    </>
  );
};
export default DiseaseDetector;

