/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */

/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-console */
// import _, { map } from "underscore";

import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import Calculations from "../../algorithms/Calculations";
import { format } from "date-fns";
import { useAuth } from "base-shell/lib/providers/Auth/";
// import { Link } from 'react-router-dom'
import Paper from "@material-ui/core/Paper";
import { injectIntl } from "react-intl";
import Page from "material-ui-shell/lib/containers/Page/Page";
import { useFirebase } from "rmw-shell/lib/providers/Firebase";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
// import { noScrollbarsClassName } from "react-remove-scroll-bar";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { v4 as uuidv4 } from "uuid";
import Grid from "@material-ui/core/Grid";
import SpeedIcon from "@material-ui/icons/Speed";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
// import IconButton from '@material-ui/core/IconButton'
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import BuildIcon from "@material-ui/icons/Build";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import Switch from "@material-ui/core/Switch";
// import filledInput from '@material-ui/core/filledInput'
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { spacing } from "@material-ui/system";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Draggable from "react-draggable";

import Backdrop from "@material-ui/core/Backdrop";

// import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Container from "@material-ui/core/Container";
// import LuckyExcel from "luckyexcel";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import hip from "../../static/hip.png";
import gable from "../../static/gable.png";
import pyramid from "../../static/pyramid.png";
import labeled from "../../static/labeled.png";
import Axes01 from "../../static/Axes01.png";
import OverturnX01 from "../../static/OverturnX01.png";
import OverturnY01 from "../../static/OverturnY01.png";

import DialogContentText from "@material-ui/core/DialogContentText";

// import NativeSelect from '@material-ui/core/NativeSelect'

// import TextField from '@material-ui/core/TextField'
// import Visibility from '@material-ui/icons/Visibility'
// import VisibilityOff from '@material-ui/icons/VisibilityOff'

// import {
//   ACCOUNT_PATH,
//   LIST_PATH,
//   LOGIN_PATH,
//   SIGNUP_PATH,
//   FORM_PATH
// } from 'constants/paths'
import styles from "./Advanced.styles";
import { withStyles } from "@material-ui/core/styles";
import { isGranted } from "../../config/auth";

const useStyles = makeStyles(styles);

const DialogTitle = withStyles(styles)((props) => {
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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    marginTop: 0,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const Tools = ({ intl }) => {
  const classes = useStyles();
  const history = useHistory();
  const { firebaseApp } = useFirebase();

  const [loading, setLoading] = React.useState(false);
  const loadingClose = () => {
    setLoading(false);
  };
  const loadingToggle = () => {
    setLoading(!loading);
  };
  // Generic Loading and Opening Variables Used for Popup Results
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [currentMessage, setCurrentMessage] = useState("Success");
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  // Allows for Draggable Components
  function PaperComponent(props) {
    return (
      <Draggable
        handle='#draggable-dialog-title'
        cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }
  // For the Custom Input Dialog, FormDialogTitle, FormDialogContent, and FormDialogActions
  // allows stylization from the declaration
  // openForn and setFormOpen control the open and closing of the form.
  // setDialogVal changes the default dialogValue
  // handleFormOpen opens the form by calling setFormOpen
  const FormDialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        {/* <Typography variant='h6'>{children}</Typography> */}
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

  const [openForm, setFormOpen] = React.useState(false);

  const [getDialogVal, setDialogVal] = React.useState(1);

  function handleCustomDialog(valueID) {
    console.log(valueID);
    const post = findArrayElementByTitle(posts, valueID);
    console.log(post);
    setTimeout(
      () => setResults({ title: post.content, content: post.content }),
      1000
    );
    setFormOpen(true);
  }

  // Finds the Element in Posts Corresponding to the id value sent from the editicon handleCustomDialog()
  function findArrayElementByTitle(array, id) {
    return array.find((element) => {
      return element.id === id;
    });
  }

  /*
    Posts are the title names and variable names for the input items.
    Title appears in the custom input dialog
    content is the variable name to manipulate the stored value of the variable stored in values by name
  */
  const [results, setResults] = useState({
    title: "",
    content: "",
  });
  const posts = [
    {
      id: 1,
      title: "Wind speed",
      content: "windSpeed",
    },
    {
      id: 2,
      title: "Wind flow",
      content: "windFlow",
    },
    {
      id: 3,
      title: "Tent width (ft)",
      content: "tentWidth",
    },
    {
      id: 4,
      title: "Tent length (ft)",
      content: "tentLength",
    },
    {
      id: 5,
      title: "Eave height (ft)",
      content: "eaveHeight",
    },
    {
      id: 6,
      title: "Roof Type",
      content: "Three options: Gable, Hip, Pyramid",
    },
    {
      id: 7,
      title: "Ridge length (ft)",
      content: "ridgeLength",
    },
    {
      id: 8,
      title: "Roof height (feet)",
      content: "roofHeight",
    },
    {
      id: 9,
      title: "Number of intermediate posts in length",
      content: "postsPerLength",
    },
    {
      id: 10,
      title: "Number of intermediate posts in width",
      content: "postsPerWidth",
    },
    {
      id: 11,
      title: "Number of Ballasts Per Corner Post",
      content: "ballastsPerCornerPost",
    },
  ];
  const [dialogResults, setResultsDialogResults] = useState({
    title: "",
    content: "",
  });

  const handleFormClose = () => {
    setFormOpen(false);
  };

  // This controls whether a PDF is generated on the Server for the user to print.
  const [switchState, setSwitchState] = React.useState({
    checkedA: false,
    checkedB: true,
  });
  const handleSwitchChange = (event) => {
    setSwitchState({
      ...switchState,
      [event.target.name]: event.target.checked,
    });
  };

  /* 
    All of the variables sent, modified and saved by the form.
    When creating a new variable you want to be stored on Firebase Database, it is necessary to 
    store it here
  */
  const [values, setValues] = useState({
    companyName: "",
    project: "",
    location: "",
    projectDate: new Date().toString(),
    unit: 0,
    openFX: 0,
    openFY: 0,
    openFZ: 0,
    openOML: 0,
    openOMW: 0,
    partFX: 0,
    partFY: 0,
    partFZ: 0,
    partOML: 0,
    partOMW: 0,
    encFX: 0,
    encFY: 0,
    encFZ: 0,
    encOML: 0,
    encOMW: 0,
    windSpeed: 20,
    windFlow: 1,
    tentWidth: 20,
    tentLength: 40,
    eaveHeight: 8,
    bandHeight: 1,
    roofType: 1,
    ridgeLength: 6,
    roofHeight: 6,
    postsPerWidth: 1,
    postsPerLength: 1,
    ballastsPerIntermediate: 1,
    ballastsPerCornerPost: 1,
    totalBallasts: 0,
    openBallastWeight: 0,
    partBallastWeight: 0,
    encBallastWeight: 0,
    calcID: uuidv4(),
    title: "",
    time: 0,
    share: {},
    notes: "",
    b2mu3: 0,
    b2wplate: 0,
    b2open: 0,
    b2enclosed: 0,
    c2mu1: 0,
    c2open: 0,
    c2enclosed: 0,
    ad1: 0,
    ad2: 0,
    amu3: 0,
    awplate: 0,
    aopen: 0,
    aenclosed: 0,
    bd1: 0,
    bd2: 0,
    bd3: 0,
    bd4: 0,
    bh4: 0,
    bmu2: 0,
    bmu3: 0,
    bwplate: 0,
    bopen: 0,
    benclosed: 0,
    cd1: 0,
    cd3: 0,
    cd4: 0,
    ch4: 0,
    cmu1: 0,
    copen: 0,
    cenclosed: 0,
    dd2: 0,
    dd4: 0,
    dd5: 0,
    dmu3: 0,
    dwplate: 0,
    dopen: 0,
    denclosed: 0,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [radioUnitValue, setRadioUnitValue] = React.useState(
    "Imperial System (ft)"
  );

  const handleUnitChange = (event) => {
    if (event.target.value === "Imperial System (ft)") {
      setValues({ ...values, unit: 0 });
    } else {
      setValues({ ...values, unit: 1 });
    }
    setRadioUnitValue(event.target.value);
  };

  /* RENDER DATA TABLE */
  const [calculationDataOpen, setCalculationDataOpen] = useState(false);
  const showResults = (result) => {
    console.log(result);
    const vals = result.data;
    setValues(result.data);
    loadingClose();
    setCalculationDataOpen(true);
    ReactDOM.render(
      <Container className={classes.cardGrid}>
        <div style={{ height: 220 }}>
          <DataGrid
            columns={[
              { field: "id", hide: true },
              {
                field: "Enclosure",
                headerName: "Enclosure",
                type: "string",
                width: 200,
              },
              {
                field: "ballastWeight",
                headerName: "Ballast weight per leg/upright (lbs)",
                type: "number",
                width: 120,
              },
              {
                field: "overturnMomentLength",
                headerName: "Overturn moment about length (lbs.ft)",
                type: "number",
                width: 120,
              },
              {
                field: "overturnMomentWidth",
                headerName: "Overturn moment about width (lbs.ft)",
                type: "number",
                width: 120,
              },
              {
                field: "FX",
                headerName: "Horizontal Force in Length (lbs)",
                type: "number",
                width: 120,
              },
              {
                field: "FY",
                headerName: "Horizontal Force in Width (lbs)",
                type: "number",
                width: 120,
              },
              {
                field: "FZ",
                headerName: "Vertical Uplift Force (lbs)",
                type: "number",
                width: 120,
              },
            ]}
            rows={[
              {
                id: 1,
                Enclosure: "Open",
                overturnMomentLength: vals.openOML,
                overturnMomentWidth: vals.openOMW,
                FX: vals.openFX,
                FY: vals.openFY,
                FZ: vals.openFZ,
                ballastWeight: vals.openBallastWeight,
              },
              {
                id: 2,
                Enclosure: "Partially Enclosed",
                overturnMomentLength: vals.partOML,
                overturnMomentWidth: vals.partOMW,
                FX: vals.partFX,
                FY: vals.partFY,
                FZ: vals.partFZ,
                ballastWeight: vals.partBallastWeight,
              },
              {
                id: 3,
                Enclosure: "Enclosed",
                overturnMomentLength: vals.encOML,
                overturnMomentWidth: vals.encOMW,
                FX: vals.encFX,
                FY: vals.encFY,
                FZ: vals.encFZ,
                ballastWeight: vals.encBallastWeight,
              },
            ]}
            components={{
              Toolbar: CustomToolbar,
            }}
            autoHeight={true}
            hideFooter={true}
            headerHeight={100}
            disableColumnMenu={true}
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

  const [value, setValue] = React.useState(10);

  // const { register, handleSubmit, errors } = useForm()
  // const onSubmit = (data) => console.log(data)
  // console.log(errors)

  const handleRadioChanged = (event) => {
    setValues(event.target.value);
  };

  const emails = ["Imperial System (ft)", "Metric System (m)"];
  const [optionsOpen, setOptionsOpen] = React.useState(false);

  // 0 for imperial (feet), 1 for metric (meters)
  const [units, setUnits] = React.useState({
    size: ["ft", "m"],
    speed: ["mph", "km/h"],
    weight: ["lbs", "kg"],
  });

  const [dataGridContainer, setGridResults] = React.useState(<div></div>);
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

  function startCloudFunc() {
    loadingToggle();
    const httpsAdvancedOnCall = firebaseApp
      .functions()
      .httpsCallable("httpsAdvancedOnCall");

    httpsAdvancedOnCall({ values })
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

  const [resultValuesGrid, setValuesGrid] = React.useState([]);

  const tileData = [
    {
      img: labeled,
      title: "Input Variables",
      author: "",
      featured: true,
    },
    {
      img: Axes01,
      title: "Axes",
      author: "author",
      featured: false,
    },
    {
      img: OverturnX01,
      title: "Overturn about X-Axis",
      author: "author",
      featured: false,
    },
    {
      img: OverturnY01,
      title: "Overturn about Y-Axis",
      author: "author",
      featured: false,
    },
    {
      img: pyramid,
      title: "Pyramid Roof",
      author: "author",
      featured: false,
    },
    {
      img: hip,
      title: "Hip Roof",
      author: "author",
      featured: false,
    },
    {
      img: gable,
      title: "Gable Roof",
      author: "author",
      featured: false,
    },
  ];
  const { auth } = useAuth();
  // console.log(auth);
  // console.log(isGranted(auth, "member"));
  return isGranted(auth, "member") ? (
    <Page
      pageTitle={intl.formatMessage({
        id: "advanced",
        defaultMessage: "IFAI Ballast Tool - Advanced Load Calculation",
      })}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success'>
          {currentMessage}
        </Alert>
      </Snackbar>
      <div className={classes.root}>
        <Backdrop
          className={classes.backdrop}
          open={loading}
          onClick={loadingClose}>
          <CircularProgress color='inherit' />
        </Backdrop>

        {/* DIALOG FOR CUSTOM INPUT OF FORM VARIABLES */}
        <Dialog onClose={handleFormClose} open={openForm}>
          <FormDialogTitle
            id='customized-dialog-title'
            onClose={handleFormClose}>
            {results.title}
          </FormDialogTitle>
          <FormDialogContent dividers>
            <TextField
              autoFocus
              margin='dense'
              id='customValueInput'
              value={values[results.content]}
              onChange={handleChange(results.content)}
              label='Input Custom Value'
              type='number'
              inputProps={{
                name: values[results.content],
                "aria-label": "weight",
              }}
              fullWidth
            />
          </FormDialogContent>
          <FormDialogActions>
            <Button onClick={handleFormClose} color='primary'>
              Done
            </Button>
          </FormDialogActions>
        </Dialog>

        {/* FLOATER BUTTON */}
        <div className={classes.fab}>
          <Fab
            variant='extended'
            onClick={async () => {
              // const handleClickOpen = () => {
              //   setOpen(true);
              // };

              startCloudFunc();

              // setLoading(true);
              history.push("/about");
            }}
            size='large'
            color='primary'
            aria-label='Help'
            className={classes.margin}>
            <EditRoundedIcon className={classes.extendedIcon} />
            Help
          </Fab>
        </div>

        {/* Popup for results of the calculation */}
        <div>
          <Dialog
            fullScreen
            TransitionComponent={Transition}
            onClose={handleClose}
            aria-labelledby='customized-dialog-title'
            open={open}>
            <DialogTitle id='customized-dialog-title' onClose={handleClose}>
              Results for {values.title}
            </DialogTitle>
            <DialogContent>
              <div style={{ height: "200", width: "100%" }}>
                {/* <DataGrid
                  columns={[
                    { field: "id", hide: true },
                    {
                      field: "Enclosure",
                      type: "string",
                      width: 200,
                      resizable: true,
                    },
                    {
                      field: "overturnMoment",
                      type: "number",
                      width: 200,
                      resizable: true,
                    },
                    {
                      field: "ballastWeight",
                      type: "number",
                      width: 200,
                      resizable: true,
                    },
                    { field: "FX", type: "number", resizable: true },
                    { field: "FY", type: "number", resizable: true },
                    { field: "FZ", type: "number", resizable: true },
                    // { field: "Wind Speed" },
                    // { field: "Wind Flow" },
                    // { field: "Tent Width" },
                    // { field: "Tent Length" },
                    // { field: "Eave Height" },
                    // { field: "Eave Height" },
                    // { field: "Band Height" },
                    // { field: "Ridge Length" },
                    // { field: "Roof Height" },
                    // { field: "Posts Per Width" },
                    // { field: "Posts Per Length" },
                    // { field: "Ballasts Per Intermediate Post" },
                    // { field: "Ballasts Per Corner Post" },
                  ]}
                  rows={[
                    {
                      id: 1,
                      Enclosure: "Open",
                      overturnMoment: values.openOM,
                      FX: values.openFX,
                      FY: values.openFY,
                      FZ: values.openFZ,
                      ballastWeight: values.openBallastWeight,
                    },
                    {
                      id: 2,
                      Enclosure: "Partially Enclosed",
                      overturnMoment: values.partOM,
                      FX: values.partFX,
                      FY: values.partFY,
                      FZ: values.partFZ,
                      ballastWeight: values.partBallastWeight,
                    },
                    {
                      id: 3,
                      Enclosure: "Enclosed",
                      overturnMoment: values.encOM,
                      FX: values.encFX,
                      FY: values.encFY,
                      FZ: values.encFZ,
                      ballastWeight: values.encBallastWeight,
                    },
                  ]}
                  disableColumnMenu={false}
                /> */}
              </div>
              {/* <Typography variant='h4' gutterBottom>
                Overturn moment = {results.overturnMoment} {units.weight[values.unit]}.{units.size[values.unit]}
              </Typography>
              <Typography variant='h4' gutterBottom>
                Vertical uplift force per guy = {results.verticalUpliftForce}{" "}
                lbs
              </Typography> */}

              {/* <Typography gutterBottom>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
                dolor auctor.
              </Typography>
              <Typography gutterBottom>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
                cursus magna, vel scelerisque nisl consectetur et. Donec sed
                odio dui. Donec ullamcorper nulla non metus auctor fringilla.
              </Typography> */}
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color='primary'>
                Save changes
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div className={classes.root}>
          {/* Form */}
          <Grid item sm={12} md={6}>
            {/* FORM */}
            <Container className={classes.cardGrid}>
              <form className={classes.root}>
                <Grid
                  container
                  direction='row'
                  justify='flex-start'
                  alignItems='center'
                  spacing={3}>
                  {/* UNITS */}
                  <Grid item xs={12}>
                    <FormControl
                      component='fieldset'
                      // error={error}
                      className={classes.formControl}>
                      <FormLabel component='legend'>Units</FormLabel>
                      <RadioGroup
                        aria-label='units'
                        name='units'
                        value={radioUnitValue}
                        defaultValue={radioUnitValue}
                        onChange={handleUnitChange}>
                        <FormControlLabel
                          value='Imperial System (ft)'
                          selected
                          control={<Radio />}
                          label='Imperial System (ft)'
                        />
                        <FormControlLabel
                          value='Metric System (m)'
                          control={<Radio />}
                          label='Metric System (m)'
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  {/* DOWNLOAD PRINTABLE */}

                  {/* Title */}

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
                        <filledInput
                          label='Notes'
                          id='outlined-adornment-weight'
                          value={values.notes}
                          onChange={handleChange("notes")}
                          rows={4}
                          multiline
                        />
                      </FormControl>
                    </Grid> */}
                </Grid>
                <Grid item xs={6}>
                  {/* Title */}
                  <FormControl
                    className={clsx(classes.textField)}
                    variant='outlined'>
                    <InputLabel htmlFor='outlined-age-native-simple'>
                      Calculation Title
                    </InputLabel>
                    <OutlinedInput
                      id='outlined-adornment-weight'
                      value={values.title}
                      label='Calculation Title'
                      placeholder='Calculation Title'
                      onChange={handleChange("title")}
                      aria-describedby='outlined-weight-helper-text'
                      inputProps={{
                        name: "title",
                        "aria-label": "weight",
                      }}
                    />
                  </FormControl>
                </Grid>
                {/* Company Name */}
                <Grid item xs={6}>
                  {/* Company Name */}
                  <FormControl
                    className={clsx(classes.textField)}
                    variant='outlined'>
                    <InputLabel htmlFor='outlined-age-native-simple'>
                      Company Name
                    </InputLabel>
                    <OutlinedInput
                      id='outlined-adornment-weight'
                      value={values.companyName}
                      label='Company Name'
                      placeholder='Company Name'
                      onChange={handleChange("companyName")}
                      aria-describedby='outlined-weight-helper-text'
                      inputProps={{
                        name: "title",
                        "aria-label": "weight",
                      }}
                    />
                  </FormControl>
                </Grid>

                {/* Project */}
                <Grid item xs={6}>
                  {/* Project */}
                  <FormControl
                    className={clsx(classes.textField)}
                    variant='outlined'>
                    <InputLabel htmlFor='outlined-age-native-simple'>
                      Project
                    </InputLabel>
                    <OutlinedInput
                      id='outlined-adornment-weight'
                      value={values.project}
                      label='Project'
                      placeholder='Project'
                      onChange={handleChange("project")}
                      aria-describedby='outlined-weight-helper-text'
                      inputProps={{
                        name: "project",
                        "aria-label": "weight",
                      }}
                    />
                  </FormControl>
                </Grid>
                {/* Location */}
                <Grid item xs={6}>
                  {/* Location */}
                  <FormControl
                    className={clsx(classes.textField)}
                    variant='outlined'>
                    <InputLabel htmlFor='outlined-age-native-simple'>
                      Location
                    </InputLabel>
                    <OutlinedInput
                      id='outlined-adornment-weight'
                      value={values.location}
                      label='Location'
                      placeholder='Location'
                      onChange={handleChange("location")}
                      aria-describedby='outlined-weight-helper-text'
                      inputProps={{
                        name: "location",
                        "aria-label": "weight",
                      }}
                    />
                  </FormControl>
                </Grid>

                {/* Project Date */}
                <Grid item xs={6}>
                  {/* Project Date */}
                  <FormControl
                    className={clsx(classes.textField)}
                    variant='outlined'>
                    <TextField
                      id='date'
                      label='Project Date'
                      type='date'
                      value={values.projectDate}
                      onChange={handleChange("projectDate")}
                      defaultValue={format(new Date(), "yyyy-mmmm-Do")}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </Grid>

                {/* Wind Speed - 1*/}
                <Grid item xs={6}>
                  <HtmlTooltip
                    enterDelay={200}
                    leaveDelay={150}
                    interactive
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 300 }}
                    title={
                      <React.Fragment>
                        <Typography color='inherit'>
                          Maximum Wind Speed expected while tent is setup
                        </Typography>
                      </React.Fragment>
                    }>
                    <FormControl
                      className={clsx(classes.formControl)}
                      variant='outlined'>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Wind Speed ({units.speed[values.unit]})
                      </InputLabel>
                      <Select
                        native
                        endAdornment={
                          <InputAdornment position='end'>
                            <EditRoundedIcon
                              onClick={() => {
                                handleCustomDialog(1);
                              }}
                            />
                          </InputAdornment>
                        }
                        defaultValue={20}
                        label='Wind Speed ({units.speed[values.unit]})'
                        value={value.windSpeed}
                        onChange={handleSelectChange}
                        inputProps={{
                          name: "windSpeed",
                          id: "outlined-age-native-simple",
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
                  </HtmlTooltip>
                </Grid>
                {/* Wind Flow - 2*/}
                <Grid item xs={6}>
                  <HtmlTooltip
                    enterDelay={200}
                    leaveDelay={150}
                    maxWidth={400}
                    interactive
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 300 }}
                    classes={{ tooltip: classes.windFlowWidth }}
                    title={
                      <React.Fragment>
                        <Typography color='inherit'>
                          Clear - unobstructed wind flow with no blockage (e.g.,
                          plain, grass land, beach). This is the worst case
                          scenario.Partially obstructed - relatively
                          unobstructed wind flow with blockage less than or
                          equal to 50%. Obstructed - objects below roof
                          inhibiting wind flow with >50% blockage (e.g., urban
                          environment, high dense vegetation, high cliff)
                        </Typography>
                      </React.Fragment>
                    }>
                    <FormControl
                      variant='outlined'
                      className={classes.formControl}>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Wind Flow
                      </InputLabel>
                      <Select
                        native
                        defaultValue={1}
                        label='Wind Flow'
                        // endAdornment={
                        //   <InputAdornment position='end'>
                        //     <EditRoundedIcon
                        //       onClick={() => {
                        //         handleCustomDialog(2);
                        //         handleFormOpen();
                        //       }}
                        //     />
                        //   </InputAdornment>
                        // }
                        value={value.windFlow}
                        onChange={handleSelectChange}
                        inputProps={{
                          name: "windFlow",
                          id: "outlined-age-native-simple",
                        }}>
                        <option value={1}>Clear</option>
                        <option value={2}>Semi-Obstructed</option>
                        <option value={3}>Obstructed</option>
                      </Select>
                    </FormControl>
                  </HtmlTooltip>
                </Grid>

                {/* Tent Width - 3*/}
                <Grid item xs={6}>
                  {/* Tent Width */}
                  <HtmlTooltip
                    enterDelay={200}
                    leaveDelay={150}
                    interactive
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 300 }}
                    title={
                      <React.Fragment>
                        <Typography color='inherit'>
                          Dimension perpendicular to ridge. Also, the width
                          defines the Y-axis.
                        </Typography>
                      </React.Fragment>
                    }>
                    <FormControl
                      className={clsx(classes.formControl)}
                      variant='outlined'>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Tent Width ({units.size[values.unit]})
                      </InputLabel>
                      <Select
                        native
                        endAdornment={
                          <InputAdornment position='end'>
                            <EditRoundedIcon
                              onClick={() => {
                                handleCustomDialog(3);
                              }}
                            />
                          </InputAdornment>
                        }
                        defaultValue={20}
                        label='Tent Width'
                        value={value.tentWidth}
                        onChange={handleSelectChange}
                        inputProps={{
                          name: "tentWidth",
                          id: "outlined-age-native-simple",
                        }}>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={50}>50</option>
                      </Select>
                    </FormControl>
                  </HtmlTooltip>
                </Grid>

                {/* Tent Length - 4*/}
                <Grid item xs={6}>
                  <HtmlTooltip
                    enterDelay={200}
                    leaveDelay={150}
                    interactive
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 300 }}
                    title={
                      <React.Fragment>
                        <Typography color='inherit'>
                          Dimension parallel to ridge. Also, the length defines
                          the X-axis.
                        </Typography>
                      </React.Fragment>
                    }>
                    <FormControl
                      className={clsx(classes.formControl)}
                      variant='outlined'>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Tent Length ({units.size[values.unit]})
                      </InputLabel>
                      <Select
                        native
                        endAdornment={
                          <InputAdornment position='end'>
                            <EditRoundedIcon
                              onClick={() => {
                                handleCustomDialog(4);
                              }}
                            />
                          </InputAdornment>
                        }
                        defaultValue={40}
                        label='Tent Length'
                        value={value.tentLength}
                        onChange={handleSelectChange}
                        inputProps={{
                          name: "tentLength",
                          id: "outlined-age-native-simple",
                        }}>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={50}>50</option>
                        <option value={60}>60</option>
                      </Select>
                    </FormControl>
                  </HtmlTooltip>
                </Grid>

                {/* Eave Height - 5*/}
                <Grid item xs={6}>
                  <HtmlTooltip
                    enterDelay={200}
                    leaveDelay={150}
                    interactive
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 300 }}
                    title={
                      <React.Fragment>
                        <Typography color='inherit'>
                          Vertical distance between the ground of the lowest
                          part of the roof. The band is neglected.
                        </Typography>
                      </React.Fragment>
                    }>
                    <FormControl
                      className={clsx(classes.formControl)}
                      variant='outlined'>
                      {/* Eave Height */}
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Eave Height ({units.size[values.unit]})
                      </InputLabel>
                      <Select
                        native
                        defaultValue={7}
                        label='Eave Height'
                        value={value.eaveHeight}
                        onChange={handleSelectChange}
                        endAdornment={
                          <InputAdornment position='end'>
                            <EditRoundedIcon
                              onClick={() => {
                                handleCustomDialog(5);
                              }}
                            />
                          </InputAdornment>
                        }
                        inputProps={{
                          name: "eaveHeight",
                          id: "outlined-age-native-simple",
                        }}>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                      </Select>
                    </FormControl>
                  </HtmlTooltip>
                </Grid>

                {/* Roof Type - 6*/}
                <Grid item xs={6}>
                  {/* Roof Type */}
                  <HtmlTooltip
                    enterDelay={200}
                    leaveDelay={150}
                    interactive
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 300 }}
                    title={
                      <React.Fragment>
                        <Typography color='inherit'>
                          Three options: Gable, Hip, Pyramid
                        </Typography>
                      </React.Fragment>
                    }>
                    <FormControl
                      variant='outlined'
                      className={classes.formControl}>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Roof Type
                      </InputLabel>
                      <Select
                        native
                        label='Roof Type'
                        defaultValue={1}
                        value={value.roofType}
                        onChange={handleSelectChange}
                        // endAdornment={
                        //   <InputAdornment position='end'>
                        //     <EditRoundedIcon
                        //       onClick={() => {
                        //         handleCustomDialog(6);
                        //         handleFormOpen();
                        //       }}
                        //     />
                        //   </InputAdornment>
                        // }
                        inputProps={{
                          name: "roofType",
                          id: "outlined-age-native-simple",
                        }}>
                        <option value={1}>Gable</option>
                        <option value={2}>Hip</option>
                        <option value={3}>Pyramid</option>
                      </Select>
                    </FormControl>
                  </HtmlTooltip>
                </Grid>

                {/* Ridge Length - 7*/}
                <Grid item xs={6}>
                  <HtmlTooltip
                    enterDelay={200}
                    leaveDelay={150}
                    interactive
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 300 }}
                    title={
                      <React.Fragment>
                        <Typography color='inherit'>
                          Define ridge length only if Hip roof is selected
                        </Typography>
                      </React.Fragment>
                    }>
                    <FormControl
                      className={clsx(classes.formControl)}
                      variant='outlined'>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Ridge Length ({units.size[values.unit]})
                      </InputLabel>
                      <Select
                        native
                        defaultValue={5}
                        label='Ridge Length'
                        value={value.ridgeLength}
                        disabled={btnDisabled}
                        onChange={handleSelectChange}
                        endAdornment={
                          <InputAdornment position='end'>
                            <EditRoundedIcon
                              onClick={() => {
                                handleCustomDialog(7);
                              }}
                            />
                          </InputAdornment>
                        }
                        inputProps={{
                          name: "ridgeLength",
                          id: "outlined-age-native-simple",
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
                  </HtmlTooltip>
                </Grid>

                {/* Roof Height - 8*/}
                <Grid item xs={6}>
                  <HtmlTooltip
                    enterDelay={200}
                    leaveDelay={150}
                    interactive
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 300 }}
                    title={
                      <React.Fragment>
                        <Typography color='inherit'>
                          Vertical distance between the lowest part of the roof
                          (top of posts) and the highest part of the roof.
                        </Typography>
                      </React.Fragment>
                    }>
                    <FormControl
                      className={clsx(classes.formControl)}
                      variant='outlined'>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Roof Height ({units.size[values.unit]})
                      </InputLabel>
                      <Select
                        native
                        defaultValue={5}
                        label='Roof Height '
                        value={value.roofHeight}
                        onChange={handleSelectChange}
                        endAdornment={
                          <InputAdornment position='end'>
                            <EditRoundedIcon
                              onClick={() => {
                                handleCustomDialog(8);
                              }}
                            />
                          </InputAdornment>
                        }
                        inputProps={{
                          name: "roofHeight",
                          id: "outlined-age-native-simple",
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
                  </HtmlTooltip>
                </Grid>

                {/* Posts In Length - 9*/}
                <Grid item xs={6}>
                  {/* Posts Per Length */}
                  <HtmlTooltip
                    enterDelay={400}
                    leaveDelay={300}
                    interactive
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    title={
                      <React.Fragment>
                        <Typography color='inherit'>
                          Number of intermediate posts in length (Excluding
                          corner posts)
                        </Typography>
                      </React.Fragment>
                    }>
                    <FormControl
                      className={clsx(classes.formControl)}
                      variant='outlined'>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Number Intermediate posts in length
                      </InputLabel>
                      <Select
                        native
                        defaultValue={3}
                        label='Number intermediate posts in length (Including Corner Posts)'
                        value={value.postsPerLength}
                        onChange={handleSelectChange}
                        endAdornment={
                          <InputAdornment position='end'>
                            <EditRoundedIcon
                              onClick={() => {
                                handleCustomDialog(9);
                              }}
                            />
                          </InputAdornment>
                        }
                        inputProps={{
                          name: "postsPerLength",
                          id: "outlined-age-native-simple",
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
                  </HtmlTooltip>
                </Grid>

                {/* Posts in Width - 10*/}
                <Grid item xs={6}>
                  <HtmlTooltip
                    enterDelay={400}
                    leaveDelay={300}
                    interactive
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    title={
                      <React.Fragment>
                        <Typography color='inherit'>
                          Number of intermediate posts in width (Excluding
                          corner posts)
                        </Typography>
                      </React.Fragment>
                    }>
                    <FormControl
                      className={clsx(classes.formControl)}
                      variant='outlined'>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Number of intermediate posts in width
                      </InputLabel>
                      <Select
                        native
                        defaultValue={3}
                        label='Number of intermediate posts in width (Excluding corner posts)'
                        value={value.postsPerWidth}
                        onChange={handleSelectChange}
                        endAdornment={
                          <InputAdornment position='end'>
                            <EditRoundedIcon
                              onClick={() => {
                                handleCustomDialog(10);
                              }}
                            />
                          </InputAdornment>
                        }
                        inputProps={{
                          name: "postsPerWidth",
                          id: "outlined-age-native-simple",
                        }}>
                        <option value={0}>0</option>
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
                  </HtmlTooltip>
                </Grid>

                {/* Ballasts Per Corner - 11*/}
                <Grid item xs={6}>
                  {/* ballastsPerCornerPost */}
                  <HtmlTooltip
                    enterDelay={200}
                    leaveDelay={150}
                    interactive
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 300 }}
                    title={
                      <React.Fragment>
                        <Typography color='inherit'>
                          The total number of ballasts per corner post
                        </Typography>
                      </React.Fragment>
                    }>
                    <FormControl
                      className={clsx(classes.formControl)}
                      variant='outlined'>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Ballasts per corner post
                      </InputLabel>
                      <Select
                        native
                        defaultValue={1}
                        label='# ballasts per corner post'
                        value={value.ballastsPerCornerPost}
                        onChange={handleSelectChange}
                        // endAdornment={
                        //   <InputAdornment position='end'>
                        //     <EditRoundedIcon
                        //       onClick={() => {
                        //         handleCustomDialog(11);
                        //       }}
                        //     />
                        //   </InputAdornment>
                        // }
                        inputProps={{
                          name: "ballastsPerCornerPost",
                          id: "outlined-age-native-simple",
                        }}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                      </Select>
                    </FormControl>
                  </HtmlTooltip>
                </Grid>

                {/* <Grid item xs={6}>
                  <FormControl
                    component='fieldset'
                    // error={error}
                    className={classes.formControl}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={switchState.checkedA}
                          onChange={handleChange}
                          name='checkedA'
                        />
                      }
                      label='Raw Data'
                    />

                  </FormControl>
                </Grid> */}

                <Grid item xs={6}>
                  <ButtonGroup
                    className={clsx(classes.calculateButton)}
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

          {/* Infograph */}
          <Grid item sm={12} md={6}>
            {/* {" "}
              <Paper className={classes.mainFeaturedPost}>
                <div className={classes.overlay} />
                <Grid container>
                  <Grid item md={5}>
                    <div className={classes.mainFeaturedPostContent}>
                      <Typography
                        component='h2'
                        variant='h4'
                        color='inherit'
                        styles={{ textShadow: "2px 2px 5px black" }}
                        gutterBottom>
                        Calculation of overturn moment due to horizontal wind
                      </Typography>
                      <Typography variant='h5' color='inherit' paragraph>
                        This tool calculates the load at each guy to resist
                        overturn due to horizontal wind force
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Paper> */}
            <div className={classes.gridRoot}>
              <GridList
                cellHeight={200}
                spacing={1}
                className={classes.gridImageList}>
                {tileData.map((tile) => (
                  <GridListTile
                    key={tile.img}
                    cols={tile.featured ? 2 : 1}
                    rows={tile.featured ? 2 : 1}>
                    <img
                      src={tile.img}
                      class={classes.tileImage}
                      alt={tile.title}
                    />
                    <GridListTileBar
                      title={tile.title}
                      titlePosition='top'
                      // actionIcon={
                      //   <IconButton
                      //     aria-label={`star ${tile.title}`}
                      //     className={classes.icon}>
                      //     <EditRoundedIcon />
                      //   </IconButton>
                      // }
                      actionPosition='left'
                      className={classes.titleImageBar}
                    />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              display: { calculationDataOpen } ? "inherit" : "none",
            }}
            id='calculationDataTable'></Grid>
        </div>
      </div>
      {/* Calculations Results Table
      <Grid container spacing={1}></Grid> */}
    </Page>
  ) : (
    <Page
      pageTitle={intl.formatMessage({
        id: "tools",
        defaultMessage: "IFAI Ballast Tool",
      })}>
      <Typography variant='h6'>
        Account Membership Required for Full Access. Please contact support for
        access.
      </Typography>
    </Page>
  );
};

export default injectIntl(Tools);
