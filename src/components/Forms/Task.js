/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */

/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-console */

import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useFirebase } from "rmw-shell/lib/providers/Firebase";
import clsx from "clsx";
import { display } from "@material-ui/system";
import { DataGrid } from "@material-ui/data-grid";
import Grid from "@material-ui/core/Grid";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/HelpOutlineOutlined";
import CloseIcon from "@material-ui/icons/Close";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Container from "@material-ui/core/Container";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";

import styles from "./Task.styles";
import { withStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(styles);

// eslint-disable-next-line
export default function ({ id, handleSubmit, sentValues, users = [] }) {
  const { firebaseApp } = useFirebase();

  const [getDialogVal, setDialogVal] = React.useState(1);
  const [results, setResults] = useState({
    title: "",
    content: "",
  });
  const resultsRef = useRef(results);
  const [openForm, setFormOpen] = React.useState(false);
  // Remember the latest callback.
  useEffect(() => {
    resultsRef.current = results;
  }, [results]);

  function handleFormOpen() {
    console.log(getDialogVal);
    const post = findArrayElementByTitle(posts, getDialogVal);
    console.log(post);
    setResults({ title: post.title, content: post.content });
    setFormOpen(true);
  }
  const handleFormClose = () => {
    setFormOpen(false);
  };
  function findArrayElementByTitle(array, id) {
    return array.find((element) => {
      return element.id === id;
    });
  }
  const location = useLocation();
  const v = location.state;
  const [values, setValues] = useState({
    openFX: v.openFX,
    openFY: v.openFY,
    openFZ: v.openFZ,
    openOML: v.openOML,
    openOMW: v.openOMW,
    partFX: v.partFX,
    partFY: v.partFY,
    partFZ: v.partFZ,
    partOML: v.partOML,
    partOMW: v.partOMW,
    encFX: v.encFX,
    encFY: v.encFY,
    encFZ: v.encFZ,
    encOML: v.encOML,
    encOMW: v.encOMW,
    windSpeed: v.windSpeed,
    windFlow: v.windFlow,
    tentWidth: v.tentWidth,
    tentLength: v.tentLength,
    eaveHeight: v.eaveHeight,
    bandHeight: v.bandHeight,
    roofType: v.roofType,
    ridgeLength: v.ridgeLength,
    roofHeight: v.roofHeight,
    postsPerWidth: v.postsPerWidth,
    postsPerLength: v.postsPerLength,
    ballastsPerIntermediate: v.ballastsPerIntermediate,
    ballastsPerCornerPost: v.ballastsPerCornerPost,
    totalBallasts: v.totalBallasts,
    openBallastWeight: v.openBallastWeight,
    partBallastWeight: v.partBallastWeight,
    encBallastWeight: v.encBallastWeight,
    calcID: v.calcID,
    title: v.title,
    time: v.time,
    share: v.share,
    notes: v.notes,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const [btnDisabled, setBtnDisabled] = useState(true);
  const handleSelectChange = (event) => {
    const name = event.target.name;
    console.log(name);
    if (name === "roofType") {
      console.log("is roof change");
      console.log(event.target.value);
      if (event.target.value === "2") {
        setBtnDisabled(false);
        console.log("is hip");
      } else {
        setBtnDisabled(true);
      }
    }
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = React.useState(false);

  const loadingClose = () => {
    setLoading(false);
  };
  const loadingToggle = () => {
    setLoading(!loading);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const posts = [
    { id: 1, title: "Wind speed (mph)", content: "Enter wind speed in mph" },
    {
      id: 2,
      title: "Wind flow",
      content:
        "Clear - unobstructed wind flow with no blockage (e.g., plain, grass land, beach). This is the worst case scenario.Partially obstructed - relatively unobstructed wind flow with blockage less than or equal to 50%. Obstructed - objects below roof inhibiting wind flow with >50% blockage (e.g., urban environment, high dense vegetation, high cliff)",
    },
    {
      id: 3,
      title: "Tent width (feet)",
      content:
        "Dimension perpendicular to ridge. Also, the width defines the Y-axis.",
    },
    {
      id: 4,
      title: "Tent length (feet)",
      content:
        "Dimension parallel to ridge. Also, the length defines the X-axis.",
    },
    {
      id: 5,
      title: "Heave height (feet)",
      content:
        "Vertical distance between the ground of the lowest part of the roof. The band is neglected.",
    },
    {
      id: 6,
      title: "Roof type",
      content: "Three options: Gable, Hip, Pyramid",
    },
    {
      id: 7,
      title: "Ridge length (feet)",
      content: "Define ridge length only if Hip roof is selected",
    },
    {
      id: 8,
      title: "Roof height (feet)",
      content:
        "Vertical distance between the lowest part of the roof (top of posts) and the highest part of the roof.",
    },
    {
      id: 9,
      title: "Number of intermediate posts in length",
      content:
        "Number of intermediate posts in length (Excluding corner posts)",
    },
    {
      id: 10,
      title: "Number of intermediate posts in width",
      content: "Number of intermediate posts in width (Excluding corner posts)",
    },
    {
      id: 11,
      title: "Number of Ballasts Per Corner Post",
      content: "The total number of ballasts per corner post",
    },
  ];

  const FormDialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant='h6'>{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label='close'
            className={classes.closeButton}
            onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const FormDialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

  const FormDialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);
  const [dialogResults, setResultsDialogResults] = useState({
    title: "",
    content: "",
  });
  const [calculationDataOpen, setCalculationDataOpen] = useState(false);
  const showResults = (result) => {
    console.log(result);
    const values = result.data;
    setValues(result.data);
    loadingClose();
    setCalculationDataOpen(true);
    ReactDOM.render(
      <Container className={classes.cardGrid}>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            overflow='scroll'
            textOverflow='clip'
            whiteSpace='normal'
            columns={[
              { field: "id", hide: true },
              {
                field: "Enclosure",
                headerName: "Enclosure",
                type: "string",
                width: 200,
                resizable: true,
              },
              {
                field: "ballastWeight",
                headerName: "Ballast Weight (lbs)",
                type: "number",
                width: 200,
                resizable: true,
              },
              {
                field: "overturnMomentLength",
                headerName: "Overturn moment about length (lbs.ft)",
                type: "number",
                width: 200,
                resizable: true,
              },
              {
                field: "overturnMomentWidth",
                headerName: "Overturn moment about width (lbs.ft)",
                type: "number",
                width: 200,
                resizable: true,
              },
              {
                field: "FX",
                headerName: "Horizontal Force in Length (lbs)",
                type: "number",
                width: 200,
                resizable: true,
              },
              {
                field: "FY",
                headerName: "Horizontal Force in Width (lbs)",
                type: "number",
                width: 200,
                resizable: true,
              },
              {
                field: "FZ",
                headerName: "Vertical Uplift Force (lbs)",
                type: "number",
                width: 200,
                resizable: true,
              },
            ]}
            rows={[
              {
                id: 1,
                Enclosure: "Open",
                overturnMomentLength: values.openOML,
                overturnMomentWidth: values.openOMW,
                FX: values.openFX,
                FY: values.openFY,
                FZ: values.openFZ,
                ballastWeight: values.openBallastWeight,
              },
              {
                id: 2,
                Enclosure: "Partially Enclosed",
                overturnMomentLength: values.partOML,
                overturnMomentWidth: values.partOMW,
                FX: values.partFX,
                FY: values.partFY,
                FZ: values.partFZ,
                ballastWeight: values.partBallastWeight,
              },
              {
                id: 3,
                Enclosure: "Enclosed",
                overturnMomentLength: values.encOML,
                overturnMomentWidth: values.encOMW,
                FX: values.encFX,
                FY: values.encFY,
                FZ: values.encFZ,
                ballastWeight: values.encBallastWeight,
              },
            ]}
            autoHeight={true}
            headerHeight={100}
            hideFooter={true}
            disableColumnMenu={false}
          />
        </div>
      </Container>,
      document.getElementById("calculationDataTable")
    );

    // if (result.data.windFlow === 1) {
    //   setResults({
    //     overturnMoment: result.data.openOM,
    //     verticalUpliftForce: result.data.openFZ,
    //   });
    // } else if (result.data.windFlow === 2) {
    //   setResults({
    //     overturnMoment: result.data.partOM,
    //     verticalUpliftForce: result.data.partFZ,
    //   });
    // } else {
    //   setResults({
    //     overturnMoment: result.data.encOM,
    //     verticalUpliftForce: result.data.encFZ,
    //   });
    // }

    //handleClickOpen();
  };

  function startCloudFunc() {
    loadingToggle();
    const httpsCalculationOnCall = firebaseApp
      .functions()
      .httpsCallable("httpsCalculationOnCall");
    // Add a new document in collection "cities"

    httpsCalculationOnCall({ values })
      .then((result) => {
        // Read result of the Cloud Function.
        console.log(values.calcID);
        showResults(result);
        // firebaseApp
        //   .firestore()
        //   .collection("members")
        //   .doc(firebaseApp.auth().currentUser.uid)
        //   .collection("saved")
        //   .doc(values.calcID)
        //   .onSnapshot(
        //     function (snapshot) {
        //       console.log(snapshot.data());
        //       // showResults(snapshot.data());
        //       return snapshot.data();
        //     },
        //     function (error) {
        //       console.log(error);
        //       return;
        //     }
        //   );
      })
      .catch((error) => {
        // Getting the Error details.
        var code = error.code;
        var message = error.message;
        var details = error.details;
        console.log(error);
        // ...
      });
    console.log("Document successfully written!");
  }
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Dialog
        onClose={handleFormClose}
        aria-labelledby='customized-dialog-title'
        open={openForm}>
        <FormDialogTitle id='customized-dialog-title' onClose={handleFormClose}>
          {resultsRef.current.title}
        </FormDialogTitle>
        <FormDialogContent dividers>
          <Typography gutterBottom>{resultsRef.current.content}</Typography>
        </FormDialogContent>
        <FormDialogActions>
          <Button autoFocus onClick={handleFormClose} color='primary'>
            Ok
          </Button>
        </FormDialogActions>
      </Dialog>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          {/* FORM */}
          <Container className={classes.cardGrid}>
            <form className={classes.root} onSubmit={handleSubmit}>
              <Grid
                container
                direction='row'
                justify='flex-start'
                alignItems='center'
                spacing={3}>
                {/* Title */}
                <Grid item xs={12}>
                  {/* Title */}
                  <FormControl
                    className={clsx(classes.textField)}
                    variant='filled'>
                    <InputLabel htmlFor='filled-age-native-simple'>
                      Enter Calculation Reference
                    </InputLabel>
                    <FilledInput
                      id='filled-adornment-weight'
                      value={values.title}
                      label='Calculation Title'
                      placeholder='Reference'
                      onChange={handleChange("title")}
                      aria-describedby='filled-weight-helper-text'
                      inputProps={{
                        name: "title",
                        "aria-label": "weight",
                      }}
                    />
                  </FormControl>
                </Grid>

                {/* NOTES */}
                {/* <Grid item sm={12} md={6}>
                      {" "}
                      <FormControl
                        fullWidth
                        className={classes.textField}
                        variant='outlined'>
                        <InputLabel htmlFor='outlined-adornment-amount'>
                          Notes
                        </InputLabel>
                        <OutlinedInput
                          label='Notes'
                          id='filled-adornment-weight'
                          value={values.notes}
                          onChange={handleChange("notes")}
                          rows={4}
                          multiline
                        />
                      </FormControl>
                    </Grid> */}
              </Grid>
              {/* Wind Speed */}
              <Grid item xs={6}>
                <FormControl
                  className={clsx(classes.formControl)}
                  variant='filled'>
                  <InputLabel htmlFor='filled-age-native-simple'>
                    Wind Speed (mph)
                  </InputLabel>
                  <Select
                    native
                    endAdornment={
                      <InputAdornment position='end'>
                        <InfoIcon
                          onClick={() => {
                            setDialogVal(1);
                            handleFormOpen();
                          }}
                        />
                      </InputAdornment>
                    }
                    defaultValue={20}
                    label='Wind Speed (mph)'
                    value={values.windSpeed}
                    onChange={handleSelectChange}
                    inputProps={{
                      name: "windSpeed",
                      id: "filled-age-native-simple",
                    }}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                    <option value={60}>60</option>
                    <option value={70}>70</option>
                    <option value={80}>80</option>
                    <option value={90}>90</option>
                    <option value={100}>100</option>
                    <option value={110}>110</option>
                    <option value={120}>120</option>
                    <option value={130}>130</option>
                    <option value={140}>140</option>
                    <option value={150}>150</option>
                  </Select>
                </FormControl>
              </Grid>
              {/* Wind Flow */}
              <Grid item xs={6}>
                <FormControl variant='filled' className={classes.formControl}>
                  <InputLabel htmlFor='filled-age-native-simple'>
                    Wind Flow
                  </InputLabel>
                  <Select
                    native
                    defaultValue={1}
                    label='Wind Flow'
                    endAdornment={
                      <InputAdornment position='end'>
                        <InfoIcon
                          onClick={() => {
                            setDialogVal(2);
                            handleFormOpen();
                          }}
                        />
                      </InputAdornment>
                    }
                    value={values.windFlow}
                    onChange={handleSelectChange}
                    inputProps={{
                      name: "windFlow",
                      id: "filled-age-native-simple",
                    }}>
                    <option value={1}>Clear</option>
                    <option value={2}>Semi-Obstructed</option>
                    <option value={3}>Obstructed</option>
                  </Select>
                </FormControl>
              </Grid>
              {/* Tent Width */}
              <Grid item xs={6}>
                {/* Tent Width */}
                <FormControl
                  className={clsx(classes.formControl)}
                  variant='filled'>
                  <InputLabel htmlFor='filled-age-native-simple'>
                    Tent Width (ft)
                  </InputLabel>
                  <Select
                    native
                    endAdornment={
                      <InputAdornment position='end'>
                        <InfoIcon
                          onClick={() => {
                            setDialogVal(3);
                            handleFormOpen();
                          }}
                        />
                      </InputAdornment>
                    }
                    defaultValue={20}
                    label='Tent Width (ft)'
                    value={values.tentWidth}
                    onChange={handleSelectChange}
                    inputProps={{
                      name: "tentWidth",
                      id: "filled-age-native-simple",
                    }}>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                  </Select>
                </FormControl>
              </Grid>
              {/* Tent Length */}
              <Grid item xs={6}>
                <FormControl
                  className={clsx(classes.formControl)}
                  variant='filled'>
                  <InputLabel htmlFor='filled-age-native-simple'>
                    Tent Length (ft)
                  </InputLabel>
                  <Select
                    native
                    endAdornment={
                      <InputAdornment position='end'>
                        <InfoIcon
                          onClick={() => {
                            setDialogVal(4);
                            handleFormOpen();
                          }}
                        />
                      </InputAdornment>
                    }
                    defaultValue={40}
                    label='Tent Length (ft)'
                    value={values.tentLength}
                    onChange={handleSelectChange}
                    inputProps={{
                      name: "tentLength",
                      id: "filled-age-native-simple",
                    }}>
                    /*60 ft., 65,70,75,80,85,90,95,100,105,110,115, and 120*/
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                    <option value={60}>60</option>
                    <option value={65}>65</option>
                    <option value={70}>70</option>
                    <option value={75}>75</option>
                    <option value={80}>80</option>
                    <option value={85}>85</option>
                    <option value={90}>90</option>
                    <option value={95}>95</option>
                    <option value={100}>100</option>
                    <option value={105}>105</option>
                    <option value={110}>110</option>
                    <option value={115}>115</option>
                    <option value={120}>120</option>
                    <option value={125}>125</option>
                    <option value={130}>130</option>
                    <option value={135}>135</option>
                    <option value={140}>140</option>
                    <option value={145}>145</option>
                    <option value={150}>150</option>
                    <option value={155}>155</option>
                    <option value={160}>160</option>
                  </Select>
                </FormControl>
              </Grid>
              {/* Eave Height */}

              <Grid item xs={6}>
                <FormControl
                  className={clsx(classes.formControl)}
                  variant='filled'>
                  {/* Eave Height */}
                  <InputLabel htmlFor='filled-age-native-simple'>
                    Eave Height (ft)
                  </InputLabel>
                  <Select
                    native
                    defaultValue={7}
                    label='Eave Height (ft)'
                    value={values.eaveHeight}
                    onChange={handleSelectChange}
                    endAdornment={
                      <InputAdornment position='end'>
                        <InfoIcon
                          onClick={() => {
                            setDialogVal(5);
                            handleFormOpen();
                          }}
                        />
                      </InputAdornment>
                    }
                    inputProps={{
                      name: "eaveHeight",
                      id: "filled-age-native-simple",
                    }}>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                  </Select>
                </FormControl>
              </Grid>

              {/* Roof Type */}
              <Grid item xs={6}>
                {/* Roof Type */}
                <FormControl variant='filled' className={classes.formControl}>
                  <InputLabel htmlFor='filled-age-native-simple'>
                    Roof Type
                  </InputLabel>
                  <Select
                    native
                    label='Roof Type'
                    defaultValue={1}
                    value={values.roofType}
                    onChange={handleSelectChange}
                    endAdornment={
                      <InputAdornment position='end'>
                        <InfoIcon
                          onClick={() => {
                            setDialogVal(6);
                            handleFormOpen();
                          }}
                        />
                      </InputAdornment>
                    }
                    inputProps={{
                      name: "roofType",
                      id: "filled-age-native-simple",
                    }}>
                    <option value={1}>Gable</option>
                    <option value={2}>Hip</option>
                    <option value={3}>Pyramid</option>
                  </Select>
                </FormControl>
              </Grid>
              {/* Ridge Length */}
              <Grid item xs={6}>
                <FormControl
                  className={clsx(classes.formControl)}
                  variant='filled'>
                  <InputLabel htmlFor='filled-age-native-simple'>
                    Ridge Length (ft)
                  </InputLabel>
                  <Select
                    native
                    defaultValue={5}
                    label='Ridge Length (ft)'
                    value={values.ridgeLength}
                    disabled={btnDisabled}
                    onChange={handleSelectChange}
                    endAdornment={
                      <InputAdornment position='end'>
                        <InfoIcon
                          onClick={() => {
                            setDialogVal(7);
                            handleFormOpen();
                          }}
                        />
                      </InputAdornment>
                    }
                    inputProps={{
                      name: "ridgeLength",
                      id: "filled-age-native-simple",
                    }}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                    <option value={30}>30</option>
                    <option value={35}>35</option>
                    <option value={40}>40</option>
                    <option value={45}>45</option>
                    <option value={50}>50</option>
                    <option value={55}>55</option>
                    <option value={60}>60</option>
                  </Select>
                </FormControl>
              </Grid>
              {/* Roof Height */}

              <Grid item xs={6}>
                <FormControl
                  className={clsx(classes.textField)}
                  variant='filled'>
                  <InputLabel htmlFor='filled-age-native-simple'>
                    Roof Height (ft)
                  </InputLabel>
                  <FilledInput
                    id='filled-adornment-weight'
                    value={values.roofHeight}
                    label='Roof Height (ft)'
                    defaultValue={2.5}
                    endAdornment={
                      <InputAdornment position='end'>
                        <InfoIcon
                          onClick={() => {
                            setDialogVal(8);
                            handleFormOpen();
                          }}
                        />
                      </InputAdornment>
                    }
                    onChange={handleChange("roofHeight")}
                    aria-describedby='filled-weight-helper-text'
                    inputProps={{
                      name: "Roof Height (ft)",
                      "aria-label": "weight",
                    }}
                  />
                </FormControl>
              </Grid>

              {/* Posts In Length */}
              <Grid item xs={6}>
                {/* Posts Per Length */}
                <FormControl
                  className={clsx(classes.formControl)}
                  variant='filled'>
                  <InputLabel htmlFor='filled-age-native-simple'>
                    # intermediate posts in length
                  </InputLabel>
                  <Select
                    native
                    defaultValue={3}
                    label='# intermediate posts in length (Including Corner Posts)'
                    value={values.postsPerLength}
                    onChange={handleSelectChange}
                    endAdornment={
                      <InputAdornment position='end'>
                        <InfoIcon
                          onClick={() => {
                            setDialogVal(9);
                            handleFormOpen();
                          }}
                        />
                      </InputAdornment>
                    }
                    inputProps={{
                      name: "postsPerLength",
                      id: "filled-age-native-simple",
                    }}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                    <option value={13}>13</option>
                    <option value={14}>14</option>
                    <option value={15}>15</option>
                  </Select>
                </FormControl>
              </Grid>

              {/* Posts in Width */}
              <Grid item xs={6}>
                {/* Posts Per Width */}
                <FormControl
                  className={clsx(classes.formControl)}
                  variant='filled'>
                  <InputLabel htmlFor='filled-age-native-simple'>
                    # intermediate posts in width
                  </InputLabel>
                  <Select
                    native
                    defaultValue={3}
                    label='# intermediate posts in width (Including Corner Posts)'
                    value={values.postsPerWidth}
                    onChange={handleSelectChange}
                    endAdornment={
                      <InputAdornment position='end'>
                        <InfoIcon
                          onClick={() => {
                            setDialogVal(10);
                            handleFormOpen();
                          }}
                        />
                      </InputAdornment>
                    }
                    inputProps={{
                      name: "postsPerWidth",
                      id: "filled-age-native-simple",
                    }}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                    <option value={13}>13</option>
                    <option value={14}>14</option>
                    <option value={15}>15</option>
                  </Select>
                </FormControl>
              </Grid>
              {/* Ballasts Per Corner */}
              <Grid item xs={6}>
                {/* ballastsPerCornerPost */}
                <FormControl
                  className={clsx(classes.formControl)}
                  variant='filled'>
                  <InputLabel htmlFor='filled-age-native-simple'>
                    number of ballast per leg
                  </InputLabel>
                  <Select
                    native
                    defaultValue={1}
                    label='number of ballast per leg'
                    value={values.ballastsPerCornerPost}
                    onChange={handleSelectChange}
                    endAdornment={
                      <InputAdornment position='end'>
                        <InfoIcon
                          onClick={() => {
                            setDialogVal(11);
                            handleFormOpen();
                          }}
                        />
                      </InputAdornment>
                    }
                    inputProps={{
                      name: "ballastsPerCornerPost",
                      id: "filled-age-native-simple",
                    }}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <ButtonGroup
                  variant='contained'
                  color='primary'
                  fullWidth={true}
                  aria-label='contained primary button group'>
                  <Button
                    onClick={() => {
                      startCloudFunc();
                      // handleFormOpen();
                    }}>
                    Calculate
                  </Button>
                  {/* <Button>Save</Button> */}
                </ButtonGroup>
              </Grid>
            </form>

            {/* End hero unit */}
          </Container>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          // style={{
          //   display: { calculationDataOpen } ? "inherit" : "none",
          // }}
          id='calculationDataTable'>
          <Container className={classes.cardGrid}>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                columns={[
                  { field: "id", hide: true },
                  {
                    field: "Enclosure",
                    headerName: "Enclosure",
                    type: "string",
                    width: 170,
                    resizable: true,
                  },
                  {
                    field: "ballastWeight",
                    headerName: "Ballast Weight (lbs)",
                    type: "number",
                    width: 170,
                    resizable: true,
                  },
                  {
                    field: "overturnMomentLength",
                    headerName: "Overturn moment about length (lbs.ft)",
                    type: "number",
                    width: 170,
                    resizable: true,
                  },
                  {
                    field: "overturnMomentWidth",
                    headerName: "Overturn moment about width (lbs.ft)",
                    type: "number",
                    width: 170,
                    resizable: true,
                  },
                  {
                    field: "FX",
                    headerName: "Horizontal Force in Length (lbs)",
                    type: "number",
                    width: 170,
                    resizable: true,
                  },
                  {
                    field: "FY",
                    headerName: "Horizontal Force in Width (lbs)",
                    type: "number",
                    width: 170,
                    resizable: true,
                  },
                  {
                    field: "FZ",
                    headerName: "Vertical Uplift Force (lbs)",
                    type: "number",
                    width: 170,
                    resizable: true,
                  },
                ]}
                rows={[
                  {
                    id: 1,
                    Enclosure: "Open",
                    overturnMomentLength: values.openOML,
                    overturnMomentWidth: values.openOMW,
                    FX: values.openFX,
                    FY: values.openFY,
                    FZ: values.openFZ,
                    ballastWeight: values.openBallastWeight,
                  },
                  {
                    id: 2,
                    Enclosure: "Partially Enclosed",
                    overturnMomentLength: values.partOML,
                    overturnMomentWidth: values.partOMW,
                    FX: values.partFX,
                    FY: values.partFY,
                    FZ: values.partFZ,
                    ballastWeight: values.partBallastWeight,
                  },
                  {
                    id: 3,
                    Enclosure: "Enclosed",
                    overturnMomentLength: values.encOML,
                    overturnMomentWidth: values.encOMW,
                    FX: values.encFX,
                    FY: values.encFY,
                    FZ: values.encFZ,
                    ballastWeight: values.encBallastWeight,
                  },
                ]}
                autoHeight={true}
                hideFooter={true}
                disableColumnMenu={false}
              />
            </div>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}
