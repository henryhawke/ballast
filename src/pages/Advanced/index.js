/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */

/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-console */
// import _, { map } from "underscore";

import React, { useState, useEffect, useRef } from "react";

import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import ReactToPdf from "react-to-pdf";
import Calculations from "../../algorithms/Calculations";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

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
import Divider from "@material-ui/core/Divider";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
// import { noScrollbarsClassName } from "react-remove-scroll-bar";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
// changed to yarn add @mui/material @emotion/react @emotion/styled
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
import FormGroup from "@material-ui/core/FormGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Draggable from "react-draggable";

import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

import Backdrop from "@material-ui/core/Backdrop";

// import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Container from "@material-ui/core/Container";
// import LuckyExcel from "luckyexcel";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import hip from "../../static/Hip07.png";
import gable from "../../static/Gable07.png";
import pyramid from "../../static/Pyramid07.png";
// import labeled from "../../static/labeled.png";ConfigurationA
import ConfigurationA from "../../static/ConfigurationA.png";
import ConfigurationB from "../../static/ConfigurationB.png";
import ConfigurationB2 from "../../static/ConfigurationB2.png"; //FTPole
import ConfigurationC from "../../static/ConfigurationC.png";
import ConfigurationC2 from "../../static/ConfigurationC2.png"; //FTPlate
import ConfigurationD from "../../static/ConfigurationD.png";

import steel from "../../static/steelDrum.png";
import smoothConcrete from "../../static/smoothConcrete.png";
import roughConcrete from "../../static/roughConcrete.png";
import plasticBarrel from "../../static/plasticBarrel.png";
import gravel from "../../static/gravel.png";
import grass from "../../static/grass.png";
import dirt from "../../static/dirt.png";
import concreteBlock from "../../static/concreteBlock.png";
import asphalt from "../../static/asphalt.png";

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

/*
  `configureMeasurements` is a closure that accepts a directory
  of measures and returns a factory function (`convert`) that uses
  only those measures.
*/
// `allMeasures` includes all the measures packaged with this library
// import configureMeasurements, { allMeasures } from "convert-units";

// const convert = configureMeasurements(allMeasures);
var convert = require("convert-units");
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

//test
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

/*

  THIS IS WHERE THE TOOL FUNCTION ACTUALLY STARTS

 */
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
      () => setResults({ title: post.title, content: post.content }),
      500
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
      title: "# intermediate Posts in length",
      content: "postsPerLength",
    },
    {
      id: 10,
      title: "# intermediate Posts in width",
      content: "postsPerWidth",
    },
    {
      id: 11,
      title: "# Ballasts Per Corner Post",
      content: "ballastsPerCornerPost",
    },
    {
      id: 12,
      title: "Ballast Type",
      content: "ballastType",
    },
    {
      id: 13,
      title: "Friction coefficient btw plate & ground ",
      content: "b2mu3",
    },
    {
      id: 14,
      title: "Weight of steel plate ",
      content: "b2wplate",
    },
    {
      id: 15,
      title: "Friction coefficient btw ballast & ground",
      content: "c2mu1",
    },
    {
      id: 16,
      title: "d1 - Distance between center of ballast & upright ",
      content: "ad1",
    },
    {
      id: 17,
      title: "Distance between far end of plate & upright",
      content: "ad2",
    },
    {
      id: 18,
      title: "Friction coefficient btw plate & ground ",
      content: "amu3",
    },
    {
      id: 19,
      title: "Weight of steel plate ",
      content: "awplate",
    },
    {
      id: 20,
      title: "d1 - Distance between center of ballast & upright ",
      content: "bd1",
    },
    {
      id: 21,
      title: "Distance between far end of plate & upright ",
      content: "bd2",
    },
    {
      id: 22,
      title: "Ballast effective width ",
      content: "bd3",
    },
    {
      id: 23,
      title:
        "Horizontal Distance between ballast center & guy attachment point",
      content: "bd4",
    },
    {
      id: 24,
      title: "Vertical Distance between plate & guy attachment point",
      content: "bh4",
    },
    {
      id: 25,
      title: "Friction coefficient btw ballast & plate",
      content: "bmu2",
    },
    {
      id: 26,
      title: "Friction coefficient btw plate & ground",
      content: "bmu3",
    },
    {
      id: 27,
      title: "Weight of steel plate",
      content: "bwplate",
    },
    {
      id: 28,
      title: "d1 - Distance between center of ballast & upright",
      content: "cd1",
    },
    {
      id: 29,
      title: "Ballast effective width",
      content: "cd3",
    },
    {
      id: 30,
      title:
        "Horizontal Distance between ballast center & guy attachment point ",
      content: "cd4",
    },
    {
      id: 31,
      title: "Vertical Distance between plate & guy attachment point",
      content: "ch4",
    },
    {
      id: 32,
      title: "Friction coefficient btw ballast & ground ",
      content: "cmu1",
    },
    {
      id: 33,
      title: "Distance between far end of plate & upright",
      content: "dd2",
    },
    {
      id: 34,
      title:
        "Horizontal Distance between ballast center & guy attachment point",
      content: "dd4",
    },
    {
      id: 35,
      title: "Horizontal Distance between guy attachment point and upright",
      content: "dd5",
    },
    {
      id: 36,
      title: "Friction coefficient btw plate & ground  ",
      content: "dmu3",
    },
    {
      id: 37,
      title: "Weight of steel plate ",
      content: "dwplate",
    },
    // {
    //   id: 38,
    //   title: "",
    //   content: "",
    // },
  ];
  const [dialogResults, setResultsDialogResults] = useState({
    title: "",
    content: "",
  });

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const todaysDate = new Date();

  // DEFAULT VALUES FOR OPERATION OF THE TOOL
  const [values, setValues] = useState({
    companyName: "",
    project:
      "Data_" +
      todaysDate.toISOString().substr(0, 10) +
      "_" +
      todaysDate.toTimeString().split(" ")[0],
    location: "",
    projectDate: todaysDate.toISOString().substr(0, 10),
    unit: 0,
    openFX: 0,
    openFY: 0,
    openFZ: 0,
    openOML: 0,
    openOMW: 0,
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
    tentType: 1,
    roofType: 1,
    ridgeLength: 20,
    valenceHeight: 1,
    roofHeight: 6,
    postsPerWidth: 1,
    postsPerLength: 3,
    ballastsPerIntermediate: 1,
    ballastsPerCornerPost: 1,
    totalBallasts: 0,
    openBallastWeight: 0,
    encBallastWeight: 0,
    calcID: uuidv4(),
    title:
      "Data_" +
      todaysDate.toISOString().substr(0, 10) +
      "_" +
      todaysDate.toTimeString().split(" ")[0],
    pdfTitle:
      "Data_" +
      todaysDate.toISOString().substr(0, 10) +
      "_" +
      todaysDate.toTimeString().split(" ")[0] +
      ".pdf",
    time: 0,
    share: {},
    notes: "",
    ballastType: 2,
    b2mu3: 0.5,
    b2wplate: 50,
    b2open: 0,
    b2enclosed: 0,
    c2mu1: 0,
    c2open: 0,
    c2enclosed: 0,
    ad1: 2,
    ad2: 3,
    amu3: 0.5,
    awplate: 50,
    aopen: 0,
    aenclosed: 0,
    bd1: 2,
    bd2: 3,
    bd3: 1.5,
    bd4: 2,
    bh4: 1.5,
    bmu2: 0.5,
    bmu3: 0.5,
    bwplate: 50,
    bopen: 0,
    benclosed: 0,
    cd1: 2,
    cd3: 1.5,
    cd4: 2,
    ch4: 1.5,
    cmu1: 0.5,
    copen: 0,
    cenclosed: 0,
    dd2: 3,
    dd4: 2,
    dd5: 2,
    dmu3: 0.5,
    dwplate: 50,
    dopen: 0,
    denclosed: 0,
    advanced: true,
    groundSurface: 3,
    ballastMaterial: 3,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const calculateRef = useRef();

  const handleSwitchChange = (event) => {
    ReactDOM.render(
      <div></div>,
      document.getElementById("calculationDataTable")
    );

    setAdvancedBtnDisabled(event.target.checked);
    console.log("advanced set to" + event.target.checked);
    setValues({ ...values, advanced: event.target.checked });

    calculateRef.current.scrollIntoView();
  };

  const [radioUnitValue, setRadioUnitValue] = React.useState("Imperial");

  function handleUnitChange(e) {
    if (e.target.value === "Imperial") {
      // turning it into imperial

      setValues({
        ...values,
        unit: 0,
        windSpeed: convert(values.windSpeed).from("km/h").to("m/h"),
        tentWidth: convert(values.tentWidth).from("m").to("ft"),
        tentLength: convert(values.tentLength).from("m").to("ft"),
        eaveHeight: convert(values.eaveHeight).from("m").to("ft"),
        bandHeight: convert(values.bandHeight).from("m").to("ft"),
        postsPerWidth: convert(values.bandHeight).from("m").to("ft"),
        postsPerLength: convert(values.bandHeight).from("m").to("ft"),
        ridgeLength: convert(values.ridgeLength).from("m").to("ft"),
        roofHeight: convert(values.roofHeight).from("m").to("ft"),
        b2mu3: convert(values.b2mu3).from("m").to("ft"),
        b2wplate: convert(values.b2wplate).from("m").to("ft"),
        b2open: convert(values.b2open).from("m").to("ft"),
        b2enclosed: convert(values.b2enclosed).from("m").to("ft"),
        c2mu1: convert(values.c2mu1).from("m").to("ft"),
        c2open: convert(values.c2open).from("m").to("ft"),
        c2enclosed: convert(values.c2enclosed).from("m").to("ft"),
        ad1: convert(values.ad1).from("m").to("ft"),
        ad2: convert(values.ad2).from("m").to("ft"),
        amu3: convert(values.amu3).from("m").to("ft"),
        awplate: convert(values.awplate).from("m").to("ft"),
        aopen: convert(values.aopen).from("m").to("ft"),
        aenclosed: convert(values.aenclosed).from("m").to("ft"),
        bd1: convert(values.bd1).from("m").to("ft"),
        bd2: convert(values.bd2).from("m").to("ft"),
        bd3: convert(values.bd3).from("m").to("ft"),
        bd4: convert(values.bd4).from("m").to("ft"),
        bh4: convert(values.bh4).from("m").to("ft"),
        bmu2: convert(values.bmu2).from("m").to("ft"),
        bmu3: convert(values.bmu3).from("m").to("ft"),
        bwplate: convert(values.bwplate).from("m").to("ft"),
        bopen: convert(values.bopen).from("m").to("ft"),
        benclosed: convert(values.benclosed).from("m").to("ft"),
        cd1: convert(values.cd1).from("m").to("ft"),
        cd3: convert(values.cd3).from("m").to("ft"),
        cd4: convert(values.cd4).from("m").to("ft"),
        ch4: convert(values.ch4).from("m").to("ft"),
        cmu1: convert(values.cmu1).from("m").to("ft"),
        copen: convert(values.copen).from("m").to("ft"),
        cenclosed: convert(values.cenclosed).from("m").to("ft"),
        dd2: convert(values.dd2).from("m").to("ft"),
        dd4: convert(values.dd4).from("m").to("ft"),
        dd5: convert(values.dd5).from("m").to("ft"),
        dmu3: convert(values.dmu3).from("m").to("ft"),
        dwplate: convert(values.dwplate).from("m").to("ft"),
        dopen: convert(values.dopen).from("m").to("ft"),
        denclosed: convert(values.denclosed).from("m").to("ft"),
      });
    } else {
      setValues({
        ...values,
        unit: 1,
        windSpeed: convert(values.windSpeed).from("m/h").to("km/h"),
        tentWidth: convert(values.tentWidth).from("ft").to("m"),
        tentLength: convert(values.tentLength).from("ft").to("m"),
        eaveHeight: convert(values.eaveHeight).from("ft").to("m"),
        bandHeight: convert(values.bandHeight).from("ft").to("m"),
        postsPerWidth: convert(values.bandHeight).from("ft").to("m"),
        postsPerLength: convert(values.bandHeight).from("ft").to("m"),
        ridgeLength: convert(values.ridgeLength).from("ft").to("m"),
        roofHeight: convert(values.roofHeight).from("ft").to("m"),
        b2mu3: convert(values.b2mu3).from("ft").to("m"),
        b2wplate: convert(values.b2wplate).from("ft").to("m"),
        b2open: convert(values.b2open).from("ft").to("m"),
        b2enclosed: convert(values.b2enclosed).from("ft").to("m"),
        c2mu1: convert(values.c2mu1).from("ft").to("m"),
        c2open: convert(values.c2open).from("ft").to("m"),
        c2enclosed: convert(values.c2enclosed).from("ft").to("m"),
        ad1: convert(values.ad1).from("ft").to("m"),
        ad2: convert(values.ad2).from("ft").to("m"),
        amu3: convert(values.amu3).from("ft").to("m"),
        awplate: convert(values.awplate).from("ft").to("m"),
        aopen: convert(values.aopen).from("ft").to("m"),
        aenclosed: convert(values.aenclosed).from("ft").to("m"),
        bd1: convert(values.bd1).from("ft").to("m"),
        bd2: convert(values.bd2).from("ft").to("m"),
        bd3: convert(values.bd3).from("ft").to("m"),
        bd4: convert(values.bd4).from("ft").to("m"),
        bh4: convert(values.bh4).from("ft").to("m"),
        bmu2: convert(values.bmu2).from("ft").to("m"),
        bmu3: convert(values.bmu3).from("ft").to("m"),
        bwplate: convert(values.bwplate).from("ft").to("m"),
        bopen: convert(values.bopen).from("ft").to("m"),
        benclosed: convert(values.benclosed).from("ft").to("m"),
        cd1: convert(values.cd1).from("ft").to("m"),
        cd3: convert(values.cd3).from("ft").to("m"),
        cd4: convert(values.cd4).from("ft").to("m"),
        ch4: convert(values.ch4).from("ft").to("m"),
        cmu1: convert(values.cmu1).from("ft").to("m"),
        copen: convert(values.copen).from("ft").to("m"),
        cenclosed: convert(values.cenclosed).from("ft").to("m"),
        dd2: convert(values.dd2).from("ft").to("m"),
        dd4: convert(values.dd4).from("ft").to("m"),
        dd5: convert(values.dd5).from("ft").to("m"),
        dmu3: convert(values.dmu3).from("ft").to("m"),
        dwplate: convert(values.dwplate).from("ft").to("m"),
        dopen: convert(values.dopen).from("ft").to("m"),
        denclosed: convert(values.denclosed).from("ft").to("m"),
      });
    }
    setRadioUnitValue(e.target.value);
  }

  /* RENDER DATA TABLE */
  const [calculationDataOpen, setCalculationDataOpen] = useState(false);
  const showResults = (result) => {
    console.log(result);
    const vals = result.data;
    setValues(result.data);
    loadingClose();
    setCalculationDataOpen(true);

    var openEnclosureVal = "Open";
    var openOverturnMomentLength = vals.openOML;
    var openOverturnMomentWidth = vals.openOMW;
    var openFX = vals.openFX;
    var openFY = vals.openFY;
    var openFZ = vals.openFZ;
    var openBallastWeight = vals.openBallastWeight;
    var openEnclosed = false;

    var encEnclosureVal = "Enclosed";
    var encOverturnMomentLength = vals.encOML;
    var encOverturnMomentWidth = vals.encOMW;
    var encFX = vals.encFX;
    var encFY = vals.encFY;
    var encFZ = vals.encFZ;
    var encBallastWeight = vals.encBallastWeight;

    // if (values.windFlow !== 1) {
    //   enclosedEnclosed = true;
    // }

    var ballastName = "Fixed-to-plate";

    if (vals.ballastType === 2) {
      ballastName = "Fixed-to-pole";
    } else if (vals.ballastType === 3) {
      ballastName = "A";
    } else if (vals.ballastType === 4) {
      ballastName = "B";
    } else if (vals.ballastType === 5) {
      ballastName = "C";
    } else if (vals.ballastType === 6) {
      ballastName = "D";
    } else {
      ballastName = "Fixed-to-plate";
    }

    var ballastMaterial = "Concrete Block";

    if (vals.ballastMaterial === 1) {
      ballastMaterial = "Plastic Barrel";
    } else if (vals.ballastMaterial === 2) {
      ballastMaterial = "Steel Drum";
    } else if (vals.ballastMaterial === 3) {
      ballastMaterial = "Concrete Block";
    }

    var groundSurface = "Asphalt";

    if (vals.groundSurface === 1) {
      groundSurface = "Smooth Concrete";
    } else if (vals.groundSurface === 2) {
      groundSurface = "Rough Concrete";
    } else if (vals.groundSurface === 3) {
      groundSurface = "Asphalt";
    } else if (vals.groundSurface === 4) {
      groundSurface = "Gravel";
    } else if (vals.groundSurface === 5) {
      groundSurface = "Grass";
    } else if (vals.groundSurface === 6) {
      groundSurface = "Dirt";
    }

    var tentType = "Frame Tent";

    if (vals.tentType === 3) {
      tentType = "Pole Tent";
    }

    var roofTypeName = "Gable";
    var ridgeLength = vals.ridgeLength;
    var tentLength = vals.tentLength;

    if (vals.roofType === 1) {
      roofTypeName = "Gable";
      ridgeLength = tentLength;
    } else if (vals.roofType === 2) {
      roofTypeName = "Hip";
    } else if (vals.roofType === 3) {
      roofTypeName = "Pyramid";
      ridgeLength = 0;
    }

    var windExposure = "Fully Exposed";
    if (vals.windFlow === 2) {
      windExposure = "Partially Exposed";
    } else if (vals.windFlow === 3) {
      windExposure = "Sheltered";
    }

    const refPDF = React.createRef();
    const pdfTitle = vals.title + ".pdf";

    ReactDOM.render(
      <Container className={classes.cardGrid} hidden={calculationDataOpen}>
        <div style={{ height: 220, width: "80vw" }}>
          <ReactToPdf targetRef={refPDF} filename={pdfTitle}>
            {({ toPdf }) => (
              <Button
                variant='contained'
                color='primary'
                onClick={toPdf}
                className={classes.button}
                endIcon={<CloudDownloadIcon>Download PDF</CloudDownloadIcon>}>
                Download PDF
              </Button>
            )}
          </ReactToPdf>

          {/* SETUP
            VARIABLE NAME  INPUT  OUTPUT (Open)  OUTPUT (ENCLOSED)
            name   (isInput) otherwise put ()
         */}
          <DataGrid
            ref={refPDF}
            columns={[
              { field: "id", hide: true },
              {
                field: "description",
                headerName: "Description",
                type: "string",
                width: 300,
              },
              {
                field: "input",
                headerName: "Input Value",
                type: "string",
                width: 200,
              },
              {
                field: "outputOpen",
                headerName: "Ouput for 'Open'",
                type: "string",
                width: 120,
              },
              {
                field: "outputClosed",
                headerName: "Ouput for 'Enclosed'",
                type: "string",
                width: 120,
              },
              // {
              //   field: "Enclosure",
              //   headerName: "Enclosure",
              //   type: "string",
              //   width: 120,
              // },
              // {
              //   field: "ballastWeight",
              //   headerName: "Weight of each ballast including plate (lbs)",
              //   type: "number",
              //   width: 150,
              // },
              // {
              //   field: "overturnMomentLength",
              //   headerName: "Overturn moment about length (lbs.ft)",
              //   type: "number",
              //   width: 150,
              // },
              // {
              //   field: "overturnMomentWidth",
              //   headerName: "Overturn moment about width (lbs.ft)",
              //   type: "number",
              //   width: 150,
              // },
              // {
              //   field: "FX",
              //   headerName: "Horizontal Force in Length (lbs)",
              //   type: "number",
              //   width: 150,
              // },
              // {
              //   field: "FY",
              //   headerName: "Horizontal Force in Width (lbs)",
              //   type: "number",
              //   width: 150,
              // },
              // {
              //   field: "FZ",
              //   headerName: "Vertical Uplift Force (lbs)",
              //   type: "number",
              //   width: 150,
              // },
            ]}
            //             Company

            // Project

            // Location

            // Date

            // Tent type

            // Tent width

            // Tent length

            // Roof type

            // Ridge length

            // Eave height

            // Roof height

            // Valence height

            // # intermediate posts in length

            // # intermediate posts in width

            // # ballasts per corner post

            // Wind speed

            // Wind exposure

            // Ballast configuration

            // Ballast type

            // Ground surface

            // d1

            // d2

            // d3

            // d4

            // h4

            // d5

            // Weight of steel plate
            rows={[
              // {
              //   id: 28,
              //   description: "RESULTS",
              //   input: "",
              //   outputOpen: "",
              //   outputClosed: "",
              // },
              // {
              //   id: 2,
              //   Enclosure: encEnclosureVal,
              //   ballastWeight: encBallastWeight,
              //   overturnMomentLength: encOverturnMomentLength,
              //   overturnMomentWidth: vals.encOMW,
              //   FX: vals.encFX,
              //   FY: vals.encFY,
              //   FZ: vals.encFZ,
              // },
              {
                id: 29,
                description: "Total number of ballasts",
                input: "",
                outputOpen: vals.totalBallasts,
                outputClosed: vals.totalBallasts,
              },
              {
                id: 30,
                description: "Weight of each ballast (& plate if any) (lbs)",
                input: "",
                outputOpen: vals.openBallastWeight,
                outputClosed: vals.encBallastWeight,
              },
              {
                id: 31,
                description: "Horizontal force in length (lbs)",
                input: "",
                outputOpen: vals.openFX,
                outputClosed: vals.encFX,
              },

              {
                id: 32,
                description: "Horizontal force in width (lbs)",
                input: "",
                outputOpen: vals.openFY,
                outputClosed: vals.encFY,
              },
              {
                id: 33,
                description: "Vertical uplift force (lbs)",
                input: "",
                outputOpen: vals.openFZ,
                outputClosed: vals.encFZ,
              },
              {
                id: 34,
                description: "Overturn moment about length (lbs.ft)",
                input: "",
                outputOpen: vals.openOML,
                outputClosed: vals.encOML,
              },

              {
                id: 35,
                description: "Overturn moment about width (lbs.ft)",
                input: "",
                outputOpen: vals.openOMW,
                outputClosed: vals.encOMW,
              },
              {
                id: 98,
                description: "",
                input: "",
                outputOpen: "",
                outputClosed: "",
              },
              {
                id: 100,
                description: "INPUT VALUES",
                input: "",
                outputOpen: "",
                outputClosed: "",
              },
              {
                id: 1,
                description: "Company",
                input: vals.companyName,
                outputOpen: "",
                outputClosed: "",
              },
              {
                id: 2,
                description: "Project Name",
                input: vals.title,
                outputOpen: "",
                outputClosed: "",
              },
              {
                id: 3,
                description: "Location",
                input: vals.location,
                outputOpen: "",
                outputClosed: "",
              },

              {
                id: 4,
                description: "Date",
                input: vals.projectDate,
                outputOpen: "",
                outputClosed: "",
              },
              {
                id: 5,
                description: "Tent Type",
                input: tentType,
                outputOpen: "",
                outputClosed: "",
              },
              {
                id: 6,
                description: "Tent Width (ft)",
                input: values.tentWidth,
                outputOpen: "",
                outputClosed: "",
              },

              {
                id: 7,
                description: "Tent Length (ft)",
                input: tentLength,
                outputOpen: "",
                outputClosed: "",
              },
              {
                id: 8,
                description: "Roof Type",
                input: roofTypeName,
                outputOpen: "",
                outputClosed: "",
              },
              {
                id: 9,
                description: "Ridge Length (ft)",
                input: ridgeLength,
                outputOpen: "",
                outputClosed: "",
              },
              {
                id: 10,
                description: "Eave Height (ft)",
                input: values.eaveHeight,
                outputOpen: "",
                outputClosed: "",
              },
              {
                id: 11,
                description: "Roof Height (ft)",
                input: values.roofHeight,
                outputOpen: "",
                outputClosed: "",
              },
              {
                id: 12,
                description: "Valence Height (ft)",
                input: values.valenceHeight,
                outputOpen: "",
                outputClosed: "",
              },
              {
                id: 13,
                description: "# Intermediate Posts in Length",
                input: values.postsPerLength,
                outputOpen: "",
                outputClosed: "",
              },

              {
                id: 14,
                description: "# Intermediate Posts In Width",
                input: values.postsPerWidth,
                outputOpen: "",
                outputClosed: "",
              },
              {
                id: 15,
                description: "# Ballasts Per Corner Post",
                input: values.ballastsPerCornerPost,
                outputOpen: "",
                outputClosed: "",
              },
              {
                id: 16,
                description: "Wind Speed (mph)",
                input: values.windSpeed,
                outputOpen: "",
                outputClosed: "",
              },
              {
                id: 17,
                description: "Wind Exposure",
                input: windExposure,
                outputOpen: "",
                outputClosed: "",
              },
              {
                id: 18,
                description: "Ballast Configuration",
                input: ballastName,
                outputOpen: "",
                outputClosed: "",
              },
              {
                id: 19,
                description: "Ballast Type",
                input: ballastMaterial,
                outputOpen: "",
                outputClosed: "",
              },
              {
                id: 20,
                description: "Ground Surface",
                input: groundSurface,
                outputOpen: "",
                outputClosed: "",
              },

              // {
              //   id: 21,
              //   description: "D1",
              //   input: "",
              //   outputOpen: "",
              //   outputClosed: "",
              // },
              // {
              //   id: 22,
              //   description: "D2",
              //   input: "",
              //   outputOpen: "",
              //   outputClosed: "",
              // },
              // {
              //   id: 23,
              //   description: "D3",
              //   input: "",
              //   outputOpen: "",
              //   outputClosed: "",
              // },
              // {
              //   id: 24,
              //   description: "D4",
              //   input: "",
              //   outputOpen: "",
              //   outputClosed: "",
              // },

              // {
              //   id: 25,
              //   description: "H4",
              //   input: "",
              //   outputOpen: "",
              //   outputClosed: "",
              // },
              // {
              //   id: 26,
              //   description: "D5",
              //   input: "",
              //   outputOpen: "",
              //   outputClosed: "",
              // },
              // {
              //   id: 27,
              //   description: "Weight of Steel Plate (lbs)",
              //   input: "",
              //   outputOpen: "",
              //   outputClosed: "",
              // },
            ]}
            components={{
              Toolbar: CustomToolbar,
            }}
            autoHeight={true}
            hideFooter={true}
            headerHeight={50}
            alignItems='center'
            disableColumnSelector={true}
            disableColumnFilter={true}
            disableColumnMenu={true}
          />
        </div>
      </Container>,
      document.getElementById("calculationDataTable")
    );
  };

  const [value, setValue] = React.useState(10);

  // const { register, handleSubmit, errors } = useForm()
  // const onSubmit = (data) => console.log(data)
  // console.log(errors)

  const handleRadioChanged = (event) => {
    setValues(event.target.value);
  };

  const emails = ["Imperial", "Metric"];
  const [optionsOpen, setOptionsOpen] = React.useState(false);

  // 0 for imperial (feet), 1 for metric (meters)
  const [units, setUnits] = React.useState({
    size: ["feet", "meters"],
    speed: ["mph", "km/h"],
    weight: ["lbs", "kg"],
  });

  const [inputValues, setInputValues] = React.useState({});

  const [dataGridContainer, setGridResults] = React.useState(<div></div>);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [btnAdvancedDisabled, setAdvancedBtnDisabled] = useState(false);
  const [isPoleTent, setIsPoleTent] = useState(false);

  const [ballastTypeText, setBallastTypeText] = useState(
    "Ballast configurations for frame tents: Fixed-to-plate, Fixed-to-pole, A, B, C, D"
  );

  function changeBallast(ballastNumber) {
    setValues({
      ...values,
      ballastType: ballastNumber,
    });

    console.log(values.ballastType);
  }
  const handleSelectChange = (event) => {
    const name = event.target.name;
    const id = event.target;
    console.log(name);
    console.log(id);
    if (name === "tentType") {
      console.log("is tent type change");
      console.log(event.target.value);
      if (event.target.value === "1") {
        // FRAME TENT VERIFIED
        //setInfoImages({ ...infoImages, type: gable });
        //console.log("is gable");
        // setBallastTypeText(
        //   "Ballast configurations for frame tents: Fixed-to-plate, Fixed-to-pole, A, B, C, D"
        // );
        console.log("setting values for fixed-to-pole");
        // setSelectBallastType(2);
        // setInfoImages({
        //   ...infoImages,
        //   ballast: ConfigurationC2,
        // });
        // setBallastType({
        //   ...ballastType,
        //   fixedToPlate: false,
        //   fixedToPole: true,
        //   a: false,
        //   b: false,
        //   c: false,
        //   d: false,
        // });

        // changeBallast(2);
        setIsPoleTent(false);
      } else if (event.target.value === "2") {
        // POLE TENT VERIFIED
        //setBtnDisabled(false);
        //console.log("is hip");
        // setInfoImages({ ...infoImages, type: hip });

        // setBallastTypeText(
        //   "Ballast configurations for hybrid tents: Fixed-to-plate, Fixed-to-pole, A, B, C, D"
        // );
        setIsPoleTent(false);
        console.log("POLE TENT?!");
      } else {
        // SOMETHING ELSE?!?!
        console.log("setting values for fixed to plate.");
        //setInfoImages({ ...infoImages, type: pyramid });
        //console.log("is pyramid");
        // setBallastTypeText(
        //   "Ballast configurations for pole tents: Fixed-to-plate, B, D, C"
        // );

        if (ballastType.fixedToPole || ballastType.a) {
          setSelectBallastType(1);
          setInfoImages({
            ...infoImages,
            ballast: ConfigurationB2,
          });
          setBallastType({
            ...ballastType,
            fixedToPlate: true,
            fixedToPole: false,
            a: false,
            b: false,
            c: false,
            d: false,
          });

          changeBallast(1);
        }

        setIsPoleTent(true);
      }
    }
    if (name === "roofType") {
      console.log("is roof change");
      console.log(event.target.value);
      if (event.target.value === "1") {
        setInfoImages({ ...infoImages, type: gable });
        console.log("is gable");
        setBtnDisabled(true);
      } else if (event.target.value === "2") {
        setBtnDisabled(false);
        console.log("is hip");
        setInfoImages({ ...infoImages, type: hip });
      } else {
        setInfoImages({ ...infoImages, type: pyramid });
        console.log("is pyramid");
        setBtnDisabled(true);
      }
    }

    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const [infoImages, setInfoImages] = React.useState({
    type: gable,
    ballast: ConfigurationC2,
    groundSurface: asphalt,
    ballastMaterial: concreteBlock,
  });

  const [ballastType, setBallastType] = React.useState({
    fixedToPlate: false,
    fixedToPole: true,
    a: false,
    b: false,
    c: false,
    d: false,
  });

  const filter = createFilterOptions();

  const [selectBallastType, setSelectBallastType] = React.useState(2);

  const handleBallastSelectChange = (event) => {
    const name = event.target.name;

    console.log(name);
    if (name === "ballastType") {
      console.log("is ballastType changed");
      console.log(event.target.value);
      console.log(ballastType);
      if (event.target.value === "1") {
        setSelectBallastType(1);
        setInfoImages({ ...infoImages, ballast: ConfigurationB2 });
        setBallastType({
          ...ballastType,
          fixedToPlate: true,
          fixedToPole: false,
          a: false,
          b: false,
          c: false,
          d: false,
        });
      } else if (event.target.value === "2") {
        setInfoImages({ ...infoImages, ballast: ConfigurationC2 });
        setSelectBallastType(2);
        setBallastType({
          ...ballastType,
          fixedToPlate: false,
          fixedToPole: true,
          a: false,
          b: false,
          c: false,
          d: false,
        });
      } else if (event.target.value === "3") {
        setSelectBallastType(3);
        setInfoImages({ ...infoImages, ballast: ConfigurationA });
        console.log("A");
        setBallastType({
          ...ballastType,
          fixedToPlate: false,
          fixedToPole: false,
          a: true,
          b: false,
          c: false,
          d: false,
        });
      } else if (event.target.value === "4") {
        setSelectBallastType(4);
        setInfoImages({ ...infoImages, ballast: ConfigurationB });
        console.log("B");
        setBallastType({
          ...ballastType,
          fixedToPlate: false,
          fixedToPole: false,
          a: false,
          b: true,
          c: false,
          d: false,
        });
      } else if (event.target.value === "5") {
        setSelectBallastType(5);
        setInfoImages({ ...infoImages, ballast: ConfigurationC });
        console.log("C");
        setBallastType({
          ...ballastType,
          fixedToPlate: false,
          fixedToPole: false,
          a: false,
          b: false,
          c: true,
          d: false,
        });
      } else if (event.target.value === "6") {
        setSelectBallastType(6);
        setInfoImages({ ...infoImages, ballast: ConfigurationD });
        console.log("D");
        setBallastType({
          ...ballastType,
          fixedToPlate: false,
          fixedToPole: false,
          a: false,
          b: false,
          c: false,
          d: true,
        });
      }
    }
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const handleBallastMaterialSelectChange = (event) => {
    const name = event.target.name;

    console.log(name);
    if (name === "ballastMaterial") {
      console.log("is ballastMaterial changed");
      console.log(event.target.value);

      if (event.target.value === "1") {
        setInfoImages({ ...infoImages, ballastMaterial: plasticBarrel });

        console.log("Plastic Barrel");
      } else if (event.target.value === "2") {
        setInfoImages({ ...infoImages, ballastMaterial: steel });
        console.log("Steel Drum");
      } else if (event.target.value === "3") {
        setInfoImages({ ...infoImages, ballastMaterial: concreteBlock });
        console.log("Concrete Block");
      }

      setValues({
        ...values,
        [name]: event.target.value,
      });
    }
  };

  const handleGroundSurfaceSelectChange = (event) => {
    const name = event.target.name;

    console.log(name);
    if (name === "groundSurface") {
      console.log("is groundSurface changed");
      console.log(event.target.value);

      if (event.target.value === "1") {
        setInfoImages({ ...infoImages, groundSurface: smoothConcrete });
      } else if (event.target.value === "2") {
        setInfoImages({ ...infoImages, groundSurface: roughConcrete });
      } else if (event.target.value === "3") {
        setInfoImages({ ...infoImages, groundSurface: asphalt });
      } else if (event.target.value === "4") {
        setInfoImages({ ...infoImages, groundSurface: gravel });
      } else if (event.target.value === "5") {
        setInfoImages({ ...infoImages, groundSurface: dirt });
      } else if (event.target.value === "6") {
        setInfoImages({ ...infoImages, groundSurface: grass });
      }

      setValues({
        ...values,
        [name]: event.target.value,
      });
    }
  };

  function startCloudFunc() {
    loadingToggle();

    var didConvert = false;
    if (values.unit === 1 || values.unit === "1") {
      didConvert = true;
      setValues({
        ...values,
        windSpeed: convert(values.windSpeed).from("km/h").to("m/h"),
        tentWidth: convert(values.tentWidth).from("m").to("ft"),
        tentLength: convert(values.tentLength).from("m").to("ft"),
        eaveHeight: convert(values.eaveHeight).from("m").to("ft"),
        bandHeight: convert(values.bandHeight).from("m").to("ft"),
        postsPerWidth: convert(values.bandHeight).from("m").to("ft"),
        postsPerLength: convert(values.bandHeight).from("m").to("ft"),
        ridgeLength: convert(values.ridgeLength).from("m").to("ft"),
        roofHeight: convert(values.roofHeight).from("m").to("ft"),
        b2mu3: convert(values.b2mu3).from("m").to("ft"),
        b2wplate: convert(values.b2wplate).from("m").to("ft"),
        b2open: convert(values.b2open).from("m").to("ft"),
        b2enclosed: convert(values.b2enclosed).from("m").to("ft"),
        c2mu1: convert(values.c2mu1).from("m").to("ft"),
        c2open: convert(values.c2open).from("m").to("ft"),
        c2enclosed: convert(values.c2enclosed).from("m").to("ft"),
        ad1: convert(values.ad1).from("m").to("ft"),
        ad2: convert(values.ad2).from("m").to("ft"),
        amu3: convert(values.amu3).from("m").to("ft"),
        awplate: convert(values.awplate).from("m").to("ft"),
        aopen: convert(values.aopen).from("m").to("ft"),
        aenclosed: convert(values.aenclosed).from("m").to("ft"),
        bd1: convert(values.bd1).from("m").to("ft"),
        bd2: convert(values.bd2).from("m").to("ft"),
        bd3: convert(values.bd3).from("m").to("ft"),
        bd4: convert(values.bd4).from("m").to("ft"),
        bh4: convert(values.bh4).from("m").to("ft"),
        bmu2: convert(values.bmu2).from("m").to("ft"),
        bmu3: convert(values.bmu3).from("m").to("ft"),
        bwplate: convert(values.bwplate).from("m").to("ft"),
        bopen: convert(values.bopen).from("m").to("ft"),
        benclosed: convert(values.benclosed).from("m").to("ft"),
        cd1: convert(values.cd1).from("m").to("ft"),
        cd3: convert(values.cd3).from("m").to("ft"),
        cd4: convert(values.cd4).from("m").to("ft"),
        ch4: convert(values.ch4).from("m").to("ft"),
        cmu1: convert(values.cmu1).from("m").to("ft"),
        copen: convert(values.copen).from("m").to("ft"),
        cenclosed: convert(values.cenclosed).from("m").to("ft"),
        dd2: convert(values.dd2).from("m").to("ft"),
        dd4: convert(values.dd4).from("m").to("ft"),
        dd5: convert(values.dd5).from("m").to("ft"),
        dmu3: convert(values.dmu3).from("m").to("ft"),
        dwplate: convert(values.dwplate).from("m").to("ft"),
        dopen: convert(values.dopen).from("m").to("ft"),
        denclosed: convert(values.denclosed).from("m").to("ft"),
      });
    }

    const httpsAdvancedOnCall = firebaseApp
      .functions()
      .httpsCallable("httpsAdvancedOnCall");

    httpsAdvancedOnCall({ values })
      .then((result) => {
        // Read result of the Cloud Function.
        console.log(values.calcID);
        if (didConvert) {
          setValues({
            ...values,
            windSpeed: convert(values.windSpeed).from("m/h").to("km/h"),
            tentWidth: convert(values.tentWidth).from("ft").to("m"),
            tentLength: convert(values.tentLength).from("ft").to("m"),
            eaveHeight: convert(values.eaveHeight).from("ft").to("m"),
            bandHeight: convert(values.bandHeight).from("ft").to("m"),
            postsPerWidth: convert(values.bandHeight).from("ft").to("m"),
            postsPerLength: convert(values.bandHeight).from("ft").to("m"),
            ridgeLength: convert(values.ridgeLength).from("ft").to("m"),
            roofHeight: convert(values.roofHeight).from("ft").to("m"),
            b2mu3: convert(values.b2mu3).from("ft").to("m"),
            b2wplate: convert(values.b2wplate).from("ft").to("m"),
            b2open: convert(values.b2open).from("ft").to("m"),
            b2enclosed: convert(values.b2enclosed).from("ft").to("m"),
            c2mu1: convert(values.c2mu1).from("ft").to("m"),
            c2open: convert(values.c2open).from("ft").to("m"),
            c2enclosed: convert(values.c2enclosed).from("ft").to("m"),
            ad1: convert(values.ad1).from("ft").to("m"),
            ad2: convert(values.ad2).from("ft").to("m"),
            amu3: convert(values.amu3).from("ft").to("m"),
            awplate: convert(values.awplate).from("ft").to("m"),
            aopen: convert(values.aopen).from("ft").to("m"),
            aenclosed: convert(values.aenclosed).from("ft").to("m"),
            bd1: convert(values.bd1).from("ft").to("m"),
            bd2: convert(values.bd2).from("ft").to("m"),
            bd3: convert(values.bd3).from("ft").to("m"),
            bd4: convert(values.bd4).from("ft").to("m"),
            bh4: convert(values.bh4).from("ft").to("m"),
            bmu2: convert(values.bmu2).from("ft").to("m"),
            bmu3: convert(values.bmu3).from("ft").to("m"),
            bwplate: convert(values.bwplate).from("ft").to("m"),
            bopen: convert(values.bopen).from("ft").to("m"),
            benclosed: convert(values.benclosed).from("ft").to("m"),
            cd1: convert(values.cd1).from("ft").to("m"),
            cd3: convert(values.cd3).from("ft").to("m"),
            cd4: convert(values.cd4).from("ft").to("m"),
            ch4: convert(values.ch4).from("ft").to("m"),
            cmu1: convert(values.cmu1).from("ft").to("m"),
            copen: convert(values.copen).from("ft").to("m"),
            cenclosed: convert(values.cenclosed).from("ft").to("m"),
            dd2: convert(values.dd2).from("ft").to("m"),
            dd4: convert(values.dd4).from("ft").to("m"),
            dd5: convert(values.dd5).from("ft").to("m"),
            dmu3: convert(values.dmu3).from("ft").to("m"),
            dwplate: convert(values.dwplate).from("ft").to("m"),
            dopen: convert(values.dopen).from("ft").to("m"),
            denclosed: convert(values.denclosed).from("ft").to("m"),
          });
        }
        showResults(result);
        // SCROLL
        calculateRef.current.scrollIntoView();
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

  const { auth } = useAuth();
  // console.log(auth);
  // console.log(isGranted(auth, "member"));

  return isGranted(auth, "member") ? (
    <Page
      pageTitle={intl.formatMessage({
        id: "advanced",
        defaultMessage: "IFAI Ballast Tool",
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

        {/* DIALOG FOR CUSTOM INPUT OF FORM  variableS */}
        <Dialog onClose={handleFormClose} open={openForm}>
          <FormDialogTitle
            id='customized-dialog-title'
            onClose={handleFormClose}>
            {results.title}
          </FormDialogTitle>
          <FormDialogContent dividers>
            <TextField
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
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

        <div className={classes.fab}>
          <Fab
            variant='extended'
            onClick={async () => {
              // const handleClickOpen = () => {
              //   setOpen(true);
              // };

              startCloudFunc();

              // setLoading(true);
            }}
            size='large'
            color='primary'
            aria-label='Calculate'
            className={classes.margin}>
            {/* <EditRoundedIcon className={classes.extendedIcon} /> */}
            Calculate
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
              <div style={{ height: "200", width: "100%" }}></div>
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
          <Grid item sm={12} md={12}>
            {/* FORM */}
            <Container className={classes.cardGrid}>
              <form className={classes.root}>
                {/* Project */}
                <Grid item xs={6}>
                  {/* Project */}
                  <FormControl
                    className={clsx(classes.textField)}
                    variant='outlined'>
                    <InputLabel
                      shrink={true}
                      htmlFor='outlined-age-native-simple'>
                      Project
                    </InputLabel>
                    <OutlinedInput
                      id='outlined-adornment-weight'
                      value={values.project}
                      label='Project'
                      onChange={handleChange("project")}
                      aria-describedby='outlined-weight-helper-text'
                      inputProps={{
                        name: "project",
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
                      Company
                    </InputLabel>
                    <OutlinedInput
                      id='outlined-adornment-weight'
                      value={values.companyName}
                      label='Company'
                      onChange={handleChange("companyName")}
                      aria-describedby='outlined-weight-helper-text'
                      inputProps={{
                        name: "companyName",
                        "aria-label": "weight",
                      }}
                      InputLabelProps={{
                        shrink: true,
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
                    <GoogleMaps />
                    {/* <InputLabel htmlFor='outlined-age-native-simple'>
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
                    /> */}
                  </FormControl>
                </Grid>

                {/* Project Date */}
                <Grid item xs={6}>
                  {/* Project Date */}
                  <FormControl
                    className={clsx(classes.textField)}
                    variant='outlined'>
                    <TextField
                      onKeyPress={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                      id='date'
                      label='Project Date'
                      type='date'
                      value={values.projectDate}
                      onChange={handleChange("projectDate")}
                      className={classes.textField}
                      variant='outlined'
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                {/* Images */}
                <Grid item xs={12} md={12}>
                  <Paper elevation={2}>
                    <Zoom>
                      <img
                        src={infoImages.type}
                        className={classes.topInfoImage}
                        alt='test'
                      />
                    </Zoom>
                  </Paper>
                </Grid>

                <Grid item xs={6} md={5}>
                  <Grid
                    container
                    direction='row'
                    justify='space-around'
                    alignItems='center'
                    spacing={1}>
                    {/* UNITS */}
                    {/* <Grid item xs={6} md={3}>
                      <FormControl
                        component='fieldset'
                        // error={error}
                        className={classes.textField}>
                        <FormLabel component='legend'>Units</FormLabel>
                        <RadioGroup
                          aria-label='units'
                          name='units'
                          value={radioUnitValue}
                          color='primary'
                          //defaultValue={radioUnitValue}
                          onChange={handleUnitChange}>
                          <FormControlLabel
                            value='Imperial'
                            selected
                            control={<Radio />}
                            label='Imperial'
                            color='primary'
                          />
                          <FormControlLabel
                            value='Metric'
                            control={<Radio />}
                            label='Metric'
                            color='primary'
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid> */}

                    {/* Title */}
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                {/*Tent Type - 6*/}
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
                          Two options: Frame Tent, Pole Tent
                        </Typography>
                      </React.Fragment>
                    }>
                    <FormControl
                      variant='outlined'
                      className={classes.textField}>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Tent Type
                      </InputLabel>
                      <Select
                        native
                        label='Tent Type'
                        defaultValue={1}
                        value={values.tentType}
                        onChange={handleSelectChange}
                        helperText='Frame Tent, Pole Tent'
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
                          name: "tentType",
                          id: "outlined-age-native-simple",
                        }}>
                        <option value={1}>Frame Tent</option>
                        {/* <option value={2}>Hybrid Tent</option> */}
                        <option value={3}>Pole Tent</option>
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
                          Dimension perpendicular to ridge. The width defines
                          the Y-axis.
                        </Typography>
                      </React.Fragment>
                    }>
                    <FormControl
                      className={clsx(classes.textField)}
                      variant='outlined'>
                      <Autocomplete
                        id='tentWidth'
                        getOptionLabel={(option) => {
                          if (typeof option === "string") {
                            return option;
                          }
                          // Add "xxx" option created dynamically
                          if (option.inputValues) {
                            return option.inputValues;
                          }
                          return option.toString();
                        }}
                        freeSolo
                        selectOnFocus
                        handleHomeEndKeys
                        inputValue={inputValues["tentWidth"]}
                        onInputChange={(event, newInputValue) => {
                          setInputValues({
                            ...inputValues,
                            tentWidth: newInputValue,
                          });
                          setValues({
                            ...values,
                            tentWidth: newInputValue,
                          });
                        }}
                        //defaultValue={values.tentWidth}
                        value={values.tentWidth}
                        // endAdornment={
                        //   <InputAdornment position='end'>
                        //     <EditRoundedIcon
                        //       onClick={() => {
                        //         handleCustomDialog(9);
                        //       }}
                        //     />
                        //   </InputAdornment>
                        // }
                        onChange={(event, newValue) => {
                          setValues({
                            ...values,
                            tentWidth: newValue,
                          });
                        }}
                        options={[10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]}
                        renderInput={(params) => (
                          <TextField
                            onKeyPress={(e) => {
                              e.key === "Enter" && e.preventDefault();
                            }}
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              name: "tentWidth",
                            }}
                            label='Tent Width (ft)'
                            margin='normal'
                            variant='outlined'
                          />
                        )}
                      />
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
                          Dimension parallel to ridge. The length defines the
                          X-axis.
                        </Typography>
                      </React.Fragment>
                    }>
                    <FormControl
                      className={clsx(classes.textField)}
                      variant='outlined'>
                      <Autocomplete
                        id='tentLength'
                        getOptionLabel={(option) => {
                          if (typeof option === "string") {
                            return option;
                          }
                          // Add "xxx" option created dynamically
                          if (option.inputValues) {
                            return option.inputValues;
                          }
                          return option.toString();
                        }}
                        freeSolo
                        selectOnFocus
                        handleHomeEndKeys
                        inputValue={inputValues["tentLength"]}
                        onInputChange={(event, newInputValue) => {
                          setInputValues({
                            ...inputValues,
                            tentLength: newInputValue,
                          });
                          setValues({
                            ...values,
                            tentLength: newInputValue,
                          });
                        }}
                        //defaultValue={values.tentLength}
                        value={values.tentLength}
                        // endAdornment={
                        //   <InputAdornment position='end'>
                        //     <EditRoundedIcon
                        //       onClick={() => {
                        //         handleCustomDialog(9);
                        //       }}
                        //     />
                        //   </InputAdornment>
                        // }
                        onChange={(event, newValue) => {
                          setValues({
                            ...values,
                            tentLength: newValue,
                          });
                        }}
                        options={[10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]}
                        renderInput={(params) => (
                          <TextField
                            onKeyPress={(e) => {
                              e.key === "Enter" && e.preventDefault();
                            }}
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              name: "tentLength",
                            }}
                            label='Tent Length (ft)'
                            margin='normal'
                            variant='outlined'
                          />
                        )}
                      />
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
                      className={classes.textField}>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Roof Type
                      </InputLabel>
                      <Select
                        native
                        label='Roof Type'
                        defaultValue={1}
                        value={values.roofType}
                        onChange={handleSelectChange}
                        helperText='Gable, Hip, Pyramid'
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
                      className={clsx(classes.textField)}
                      variant='outlined'>
                      <Autocomplete
                        id='ridgeLength'
                        disabled={btnDisabled}
                        getOptionLabel={(option) => {
                          if (typeof option === "string") {
                            return option;
                          }
                          // Add "xxx" option created dynamically
                          if (option.inputValues) {
                            return option.inputValues;
                          }
                          return option.toString();
                        }}
                        freeSolo
                        selectOnFocus
                        handleHomeEndKeys
                        inputValue={inputValues["ridgeLength"]}
                        onInputChange={(event, newInputValue) => {
                          setInputValues({
                            ...inputValues,
                            ridgeLength: newInputValue,
                          });
                          setValues({
                            ...values,
                            ridgeLength: newInputValue,
                          });
                        }}
                        //defaultValue={values.roofHeight}
                        value={values.ridgeLength}
                        // endAdornment={
                        //   <InputAdornment position='end'>
                        //     <EditRoundedIcon
                        //       onClick={() => {
                        //         handleCustomDialog(9);
                        //       }}
                        //     />
                        //   </InputAdornment>
                        // }
                        onChange={(event, newValue) => {
                          setValues({
                            ...values,
                            ridgeLength: newValue,
                          });
                        }}
                        options={[
                          5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,
                        ]}
                        renderInput={(params) => (
                          <TextField
                            onKeyPress={(e) => {
                              e.key === "Enter" && e.preventDefault();
                            }}
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              name: "ridgeLength",
                            }}
                            label='Ridge Length (ft)'
                            margin='normal'
                            variant='outlined'
                          />
                        )}
                      />
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
                          Vertical Distance between the ground and the lowest
                          part of the roof.
                        </Typography>
                      </React.Fragment>
                    }>
                    {/* Eave Height */}
                    <FormControl
                      className={clsx(classes.textField)}
                      variant='outlined'>
                      <Autocomplete
                        id='eaveHeight'
                        getOptionLabel={(option) => {
                          if (typeof option === "string") {
                            return option;
                          }
                          // Add "xxx" option created dynamically
                          if (option.inputValues) {
                            return option.inputValues;
                          }
                          return option.toString();
                        }}
                        freeSolo
                        selectOnFocus
                        handleHomeEndKeys
                        inputValue={inputValues["eaveHeight"]}
                        onInputChange={(event, newInputValue) => {
                          setInputValues({
                            ...inputValues,
                            eaveHeight: newInputValue,
                          });
                          setValues({
                            ...values,
                            eaveHeight: newInputValue,
                          });
                        }}
                        //defaultValue={values.postsPerLength}
                        value={values.eaveHeight}
                        // endAdornment={
                        //   <InputAdornment position='end'>
                        //     <EditRoundedIcon
                        //       onClick={() => {
                        //         handleCustomDialog(9);
                        //       }}
                        //     />
                        //   </InputAdornment>
                        // }
                        onChange={(event, newValue) => {
                          setValues({
                            ...values,
                            eaveHeight: newValue,
                          });
                        }}
                        options={[7, 8, 9, 10]}
                        renderInput={(params) => (
                          <TextField
                            onKeyPress={(e) => {
                              e.key === "Enter" && e.preventDefault();
                            }}
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              name: "eaveHeight",
                            }}
                            label='Eave Height (ft)'
                            margin='normal'
                            variant='outlined'
                          />
                        )}
                      />
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
                        <Typography color='inherit'>Roof Height</Typography>
                      </React.Fragment>
                    }>
                    <FormControl
                      className={clsx(classes.textField)}
                      variant='outlined'>
                      <Autocomplete
                        id='roofHeight'
                        getOptionLabel={(option) => {
                          if (typeof option === "string") {
                            return option;
                          }
                          // Add "xxx" option created dynamically
                          if (option.inputValues) {
                            return option.inputValues;
                          }
                          return option.toString();
                        }}
                        freeSolo
                        selectOnFocus
                        handleHomeEndKeys
                        inputValue={inputValues["roofHeight"]}
                        onInputChange={(event, newInputValue) => {
                          setInputValues({
                            ...inputValues,
                            roofHeight: newInputValue,
                          });
                          setValues({
                            ...values,
                            roofHeight: newInputValue,
                          });
                        }}
                        //defaultValue={values.roofHeight}
                        value={values.roofHeight}
                        // endAdornment={
                        //   <InputAdornment position='end'>
                        //     <EditRoundedIcon
                        //       onClick={() => {
                        //         handleCustomDialog(9);
                        //       }}
                        //     />
                        //   </InputAdornment>
                        // }
                        onChange={(event, newValue) => {
                          setValues({
                            ...values,
                            roofHeight: newValue,
                          });
                        }}
                        options={[2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7.5, 10, 12.5]}
                        renderInput={(params) => (
                          <TextField
                            onKeyPress={(e) => {
                              e.key === "Enter" && e.preventDefault();
                            }}
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              name: "roofHeight",
                            }}
                            label='Roof Height (ft)'
                            margin='normal'
                            variant='outlined'
                          />
                        )}
                      />
                    </FormControl>
                    {/* <FormControl
                      className={clsx(classes.textField)}
                      variant='outlined'>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Roof Height ({units.size[values.unit]})
                      </InputLabel>
                      <Select
                        native
                        //defaultValue={5}
                        label='Roof Height '
                        value={values.roofHeight}
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
                    </FormControl> */}
                  </HtmlTooltip>
                </Grid>

                {/* Valence Height - 8*/}
                <Grid item xs={6}>
                  <HtmlTooltip
                    enterDelay={200}
                    leaveDelay={150}
                    interactive
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 300 }}
                    title={
                      <React.Fragment>
                        <Typography color='inherit'>Valence Height</Typography>
                      </React.Fragment>
                    }>
                    <FormControl
                      className={clsx(classes.textField)}
                      variant='outlined'>
                      <Autocomplete
                        id='valenceHeight'
                        getOptionLabel={(option) => {
                          if (typeof option === "string") {
                            return option;
                          }
                          // Add "xxx" option created dynamically
                          if (option.inputValues) {
                            return option.inputValues;
                          }
                          return option.toString();
                        }}
                        freeSolo
                        selectOnFocus
                        handleHomeEndKeys
                        inputValue={inputValues["valenceHeight"]}
                        onInputChange={(event, newInputValue) => {
                          setInputValues({
                            ...inputValues,
                            valenceHeight: newInputValue,
                          });
                          setValues({
                            ...values,
                            valenceHeight: newInputValue,
                          });
                        }}
                        //defaultValue={values.roofHeight}
                        value={values.valenceHeight}
                        // endAdornment={
                        //   <InputAdornment position='end'>
                        //     <EditRoundedIcon
                        //       onClick={() => {
                        //         handleCustomDialog(9);
                        //       }}
                        //     />
                        //   </InputAdornment>
                        // }
                        onChange={(event, newValue) => {
                          setValues({
                            ...values,
                            valenceHeight: newValue,
                          });
                        }}
                        options={[0.5, 1, 1.5, 2]}
                        renderInput={(params) => (
                          <TextField
                            onKeyPress={(e) => {
                              e.key === "Enter" && e.preventDefault();
                            }}
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              name: "valenceHeight",
                            }}
                            label='Valence Height (ft)'
                            margin='normal'
                            variant='outlined'
                          />
                        )}
                      />
                    </FormControl>
                    {/* <FormControl
                      className={clsx(classes.textField)}
                      variant='outlined'>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Roof Height ({units.size[values.unit]})
                      </InputLabel>
                      <Select
                        native
                        //defaultValue={5}
                        label='Roof Height '
                        value={values.roofHeight}
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
                    </FormControl> */}
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
                          Number of intermediate posts in length (excluding
                          corner posts)
                        </Typography>
                      </React.Fragment>
                    }>
                    <FormControl
                      className={clsx(classes.textField)}
                      variant='outlined'>
                      <Autocomplete
                        id='postsPerLength'
                        getOptionLabel={(option) => {
                          if (typeof option === "string") {
                            return option;
                          }
                          // Add "xxx" option created dynamically
                          if (option.inputValues) {
                            return option.inputValues;
                          }
                          return option.toString();
                        }}
                        freeSolo
                        selectOnFocus
                        handleHomeEndKeys
                        inputValue={inputValues["postsPerLength"]}
                        onInputChange={(event, newInputValue) => {
                          setInputValues({
                            ...inputValues,
                            postsPerLength: newInputValue,
                          });
                          setValues({
                            ...values,
                            postsPerLength: newInputValue,
                          });
                        }}
                        //defaultValue={values.postsPerLength}
                        value={values.postsPerLength}
                        // endAdornment={
                        //   <InputAdornment position='end'>
                        //     <EditRoundedIcon
                        //       onClick={() => {
                        //         handleCustomDialog(9);
                        //       }}
                        //     />
                        //   </InputAdornment>
                        // }
                        onChange={(event, newValue) => {
                          setValues({
                            ...values,
                            postsPerLength: newValue,
                          });
                        }}
                        options={[
                          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                        ]}
                        renderInput={(params) => (
                          <TextField
                            onKeyPress={(e) => {
                              e.key === "Enter" && e.preventDefault();
                            }}
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              name: "postsPerLength",
                            }}
                            label='# Intermediate Posts in Length'
                            margin='normal'
                            variant='outlined'
                          />
                        )}
                      />
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
                          Number of intermediate posts in width (excluding
                          corner posts)
                        </Typography>
                      </React.Fragment>
                    }>
                    <FormControl
                      className={clsx(classes.textField)}
                      variant='outlined'>
                      <Autocomplete
                        id='postsPerWidth'
                        getOptionLabel={(option) => {
                          if (typeof option === "string") {
                            return option;
                          }
                          // Add "xxx" option created dynamically
                          if (option.inputValues) {
                            return option.inputValues;
                          }
                          return option.toString();
                        }}
                        freeSolo
                        selectOnFocus
                        handleHomeEndKeys
                        inputValue={inputValues["postsPerWidth"]}
                        onInputChange={(event, newInputValue) => {
                          setInputValues({
                            ...inputValues,
                            postsPerWidth: newInputValue,
                          });
                          setValues({
                            ...values,
                            postsPerWidth: newInputValue,
                          });
                        }}
                        //defaultValue={values.postsPerLength}
                        value={values.postsPerWidth}
                        // endAdornment={
                        //   <InputAdornment position='end'>
                        //     <EditRoundedIcon
                        //       onClick={() => {
                        //         handleCustomDialog(9);
                        //       }}
                        //     />
                        //   </InputAdornment>
                        // }
                        onChange={(event, newValue) => {
                          setValues({
                            ...values,
                            postsPerWidth: newValue,
                          });
                        }}
                        options={[
                          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                        ]}
                        renderInput={(params) => (
                          <TextField
                            onKeyPress={(e) => {
                              e.key === "Enter" && e.preventDefault();
                            }}
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              name: "postsPerWidth",
                            }}
                            label='# Intermediate Posts in Width'
                            margin='normal'
                            variant='outlined'
                          />
                        )}
                      />
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
                          Number of ballasts per corner post
                        </Typography>
                      </React.Fragment>
                    }>
                    <FormControl
                      className={clsx(classes.textField)}
                      variant='outlined'>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        # Ballasts Per Corner Post
                      </InputLabel>
                      <Select
                        native
                        //defaultValue={1}
                        label='# ballasts per corner post'
                        value={values.ballastsPerCornerPost}
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
                      className={clsx(classes.textField)}
                      variant='outlined'>
                      <Autocomplete
                        id='windSpeed'
                        getOptionLabel={(option) => {
                          if (typeof option === "string") {
                            return option;
                          }
                          // Add "xxx" option created dynamically
                          if (option.inputValues) {
                            return option.inputValues;
                          }
                          return option.toString();
                        }}
                        freeSolo
                        selectOnFocus
                        handleHomeEndKeys
                        inputValue={inputValues["windSpeed"]}
                        onInputChange={(event, newInputValue) => {
                          setInputValues({
                            ...inputValues,
                            windSpeed: newInputValue,
                          });
                          setValues({
                            ...values,
                            windSpeed: newInputValue,
                          });
                        }}
                        //defaultValue={values.windSpeed}
                        value={values.windSpeed}
                        // endAdornment={
                        //   <InputAdornment position='end'>
                        //     <EditRoundedIcon
                        //       onClick={() => {
                        //         handleCustomDialog(9);
                        //       }}
                        //     />
                        //   </InputAdornment>
                        // }
                        onChange={(event, newValue) => {
                          setValues({
                            ...values,
                            windSpeed: newValue,
                          });
                        }}
                        options={[
                          10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120,
                          130, 140, 150, 160,
                        ]}
                        renderInput={(params) => (
                          <TextField
                            onKeyPress={(e) => {
                              e.key === "Enter" && e.preventDefault();
                            }}
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              name: "windSpeed",
                            }}
                            label='Wind Speed (mph)'
                            margin='normal'
                            variant='outlined'
                          />
                        )}
                      />
                    </FormControl>
                    {/* <FormControl
                      className={clsx(classes.textField)}
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
                        //defaultValue={20}
                        label='Wind Speed ({units.speed[values.unit]})'
                        value={values.windSpeed}
                        name='windSpeed'
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
                    </FormControl> */}
                  </HtmlTooltip>
                </Grid>

                {/* Wind Flow - 2*/}
                <Grid item xs={6}>
                  <HtmlTooltip
                    enterDelay={200}
                    leaveDelay={150}
                    interactive
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 300 }}
                    classes={{ tooltip: classes.windFlowWidth }}
                    title={
                      <React.Fragment>
                        <Typography color='inherit'>
                          Fully Exposed: wide-open space, rural environment, no
                          trees | Partially Exposed: urban and suburban
                          environment, some trees | Sheltered: urban environment
                          with large buildings nearby and dense trees
                        </Typography>
                      </React.Fragment>
                    }>
                    <FormControl
                      variant='outlined'
                      className={classes.textField}>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Wind Exposure
                      </InputLabel>
                      <Select
                        native
                        defaultValue={1}
                        label='Wind Exposure'
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
                        value={values.windFlow}
                        onChange={handleSelectChange}
                        helperText='Clear or Obstructed'
                        inputProps={{
                          name: "windFlow",
                          id: "outlined-age-native-simple",
                        }}>
                        <option value={1}>Fully Exposed</option>
                        <option value={2}>Partially Exposed</option>
                        <option value={3}>Sheltered</option>
                      </Select>
                    </FormControl>
                  </HtmlTooltip>
                </Grid>

                {/* Advanced Button Toggle */}

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                {/* <Grid item x
                
                s={6}>
                  <FormControl
                    component='fieldset'
                    // error={error}
                    className={classes.textField}>
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
                {/* Ballast Type - 12*/}
                <Grid item xs={12}>
                  <Grid
                    container
                    direction='row'
                    justify='space-around'
                    alignItems='center'
                    spacing={1}>
                    <Grid item xs={12} md={3}>
                      {/* <Typography variant='subtitle2' gutterBottom>
                        {ballastTypeText}
                      </Typography> */}

                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              Six options for Frame Tents: Fixed-to-plate,
                              Fixed-to-pole, A, B, C, D | Four options for Pole
                              Tents: Fixed-to-plate, B, C, D
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          variant='outlined'
                          className={classes.textField}>
                          <InputLabel
                            shrink={true}
                            htmlFor='outlined-age-native-simple'>
                            Ballast Configuration
                          </InputLabel>
                          <Select
                            InputLabelProps={{ shrink: true }}
                            native
                            label='Ballast Configuration'
                            defaultValue={2}
                            value={selectBallastType}
                            onChange={handleBallastSelectChange}
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
                              name: "ballastType",
                              id: "outlined-age-native-simple",
                            }}>
                            <option value={1}>Fixed-to-plate</option>
                            <option disabled={isPoleTent} value={2}>
                              Fixed-to-pole
                            </option>
                            <option disabled={isPoleTent} value={3}>
                              A
                            </option>
                            <option value={4}>B</option>
                            <option value={5}>C</option>
                            <option value={6}>D</option>
                          </Select>
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              Three options: Plastic Barrel, Steel Drum,
                              Concrete Block
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          variant='outlined'
                          className={classes.textField}>
                          <InputLabel
                            shrink={true}
                            htmlFor='outlined-age-native-simple'>
                            Ballast Type
                          </InputLabel>
                          <Select
                            native
                            InputLabelProps={{ shrink: true }}
                            label='Ballast Type'
                            defaultValue={3}
                            value={values.ballastMaterial}
                            onChange={handleBallastMaterialSelectChange}
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
                              name: "ballastMaterial",
                              id: "outlined-age-native-simple",
                            }}>
                            <option value={1}>Plastic Barrel</option>
                            <option value={2}>Steel Drum</option>
                            <option value={3}>Concrete Block</option>
                          </Select>
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              Six options: Smooth Concrete, Rough Concrete,
                              Asphalt, Gravel, Dirt, Grass
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          variant='outlined'
                          className={classes.textField}>
                          <InputLabel
                            shrink={true}
                            htmlFor='outlined-age-native-simple'>
                            Ground Surface
                          </InputLabel>
                          <Select
                            native
                            label='Ground Surface'
                            defaultValue={3}
                            value={values.groundSurface}
                            onChange={handleGroundSurfaceSelectChange}
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
                              name: "groundSurface",
                              id: "outlined-age-native-simple",
                            }}>
                            <option value={1}>Smooth Concrete</option>
                            <option value={2}>Rough Concrete</option>
                            <option value={3}>Asphalt</option>
                            <option value={4}>Gravel</option>
                            <option value={5}>Dirt</option>
                            <option value={6}>Grass</option>
                          </Select>
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>

                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid
                      container
                      direction='row'
                      justify='space-around'
                      alignItems='center'
                      spacing={1}>
                      <Grid item xs={3}>
                        <Paper elevation={2}>
                          <Zoom>
                            <img
                              type='text'
                              disabled='disabled'
                              src={infoImages.ballast}
                              className={classes.infoImage}
                              alt='Ballast Configuration'
                            />
                          </Zoom>
                        </Paper>
                      </Grid>

                      <Grid item xs={3}>
                        <Paper elevation={2}>
                          <Zoom>
                            <img
                              src={infoImages.ballastMaterial}
                              className={classes.infoImage}
                              alt='Ballast Type'
                            />
                          </Zoom>
                        </Paper>
                      </Grid>

                      <Grid item xs={3}>
                        <Paper elevation={2}>
                          <Zoom>
                            <img
                              src={infoImages.groundSurface}
                              className={classes.infoImage}
                              alt='Ground Surface'
                            />
                          </Zoom>
                        </Paper>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>

                    {/* b2wplate: 0,Weight of steel plate  14*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.fixedToPlate ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={400}
                        leaveDelay={300}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              Weight of steel plate (lbs)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <Autocomplete
                            id='b2wplate'
                            getOptionLabel={(option) => {
                              if (typeof option === "string") {
                                return option;
                              }
                              // Add "xxx" option created dynamically
                              if (option.inputValues) {
                                return option.inputValues;
                              }
                              return option.toString();
                            }}
                            freeSolo
                            selectOnFocus
                            handleHomeEndKeys
                            inputValue={inputValues["b2wplate"]}
                            onInputChange={(event, newInputValue) => {
                              setInputValues({
                                ...inputValues,
                                b2wplate: newInputValue,
                              });
                              setValues({
                                ...values,
                                b2wplate: newInputValue,
                              });
                            }}
                            //defaultValue={values.postsPerLength}
                            value={values.b2wplate}
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(9);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            onChange={(event, newValue) => {
                              setValues({
                                ...values,
                                b2wplate: newValue,
                              });
                            }}
                            options={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                            renderInput={(params) => (
                              <TextField
                                onKeyPress={(e) => {
                                  e.key === "Enter" && e.preventDefault();
                                }}
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                  name: "b2wplate",
                                }}
                                label='Weight of steel plate (lbs)'
                                margin='normal'
                                variant='outlined'
                              />
                            )}
                          />
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>

                    {/* A SELECTION */}
                    {/* ad1: 0, d1 - Distance between center of ballast & upright (ft)  16*/}

                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.a ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={400}
                        leaveDelay={300}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              d1 - Distance between center of ballast & upright
                              (ft)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <Autocomplete
                            id='ad1'
                            getOptionLabel={(option) => {
                              if (typeof option === "string") {
                                return option;
                              }
                              // Add "xxx" option created dynamically
                              if (option.inputValues) {
                                return option.inputValues;
                              }
                              return option.toString();
                            }}
                            freeSolo
                            selectOnFocus
                            handleHomeEndKeys
                            inputValue={inputValues["ad1"]}
                            onInputChange={(event, newInputValue) => {
                              setInputValues({
                                ...inputValues,
                                ad1: newInputValue,
                              });
                              setValues({
                                ...values,
                                ad1: newInputValue,
                              });
                            }}
                            //defaultValue={values.postsPerLength}
                            value={values.ad1}
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(9);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            onChange={(event, newValue) => {
                              setValues({
                                ...values,
                                ad1: newValue,
                              });
                            }}
                            options={[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4]}
                            renderInput={(params) => (
                              <TextField
                                onKeyPress={(e) => {
                                  e.key === "Enter" && e.preventDefault();
                                }}
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                  name: "ad1",
                                }}
                                label='d1 - Distance between center of ballast & upright (ft)'
                                margin='normal'
                                variant='outlined'
                              />
                            )}
                          />
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>

                    {/* ad2:0, Distance between far end of plate & upright (ft)  17*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.a ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={400}
                        leaveDelay={300}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              d2 - Distance between far end of plate & upright
                              (ft)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <Autocomplete
                            id='ad2'
                            getOptionLabel={(option) => {
                              if (typeof option === "string") {
                                return option;
                              }
                              // Add "xxx" option created dynamically
                              if (option.inputValues) {
                                return option.inputValues;
                              }
                              return option.toString();
                            }}
                            freeSolo
                            selectOnFocus
                            handleHomeEndKeys
                            inputValue={inputValues["ad2"]}
                            onInputChange={(event, newInputValue) => {
                              setInputValues({
                                ...inputValues,
                                ad2: newInputValue,
                              });
                              setValues({
                                ...values,
                                ad2: newInputValue,
                              });
                            }}
                            //defaultValue={values.postsPerLength}
                            value={values.ad2}
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(9);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            onChange={(event, newValue) => {
                              setValues({
                                ...values,
                                ad2: newValue,
                              });
                            }}
                            options={[2, 2.5, 3, 3.5, 4, 4.5, 5]}
                            renderInput={(params) => (
                              <TextField
                                onKeyPress={(e) => {
                                  e.key === "Enter" && e.preventDefault();
                                }}
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                  name: "ad2",
                                }}
                                label='d2 - Distance between far end of plate & upright (ft)'
                                margin='normal'
                                variant='outlined'
                              />
                            )}
                          />
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>
                    {/* awplate: 0, Weight of steel plate  19*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.a ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={400}
                        leaveDelay={300}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              Weight of steel plate (lbs)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <Autocomplete
                            id='awplate'
                            getOptionLabel={(option) => {
                              if (typeof option === "string") {
                                return option;
                              }

                              if (option.inputValues) {
                                return option.inputValues;
                              }
                              return option.toString();
                            }}
                            freeSolo
                            selectOnFocus
                            handleHomeEndKeys
                            inputValue={inputValues["awplate"]}
                            onInputChange={(event, newInputValue) => {
                              setInputValues({
                                ...inputValues,
                                awplate: newInputValue,
                              });
                              setValues({
                                ...values,
                                awplate: newInputValue,
                              });
                            }}
                            value={values.awplate}
                            onChange={(event, newValue) => {
                              setValues({
                                ...values,
                                awplate: newValue,
                              });
                            }}
                            options={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                            renderInput={(params) => (
                              <TextField
                                onKeyPress={(e) => {
                                  e.key === "Enter" && e.preventDefault();
                                }}
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                  name: "awplate",
                                }}
                                label='Weight of steel plate (lbs)'
                                margin='normal'
                                variant='outlined'
                              />
                            )}
                          />
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>

                    {/* 
                B SELECTION
                 */}
                    {/* bd1: 0, d1 - Distance between center of ballast & upright (ft)  20*/}

                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.b ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={400}
                        leaveDelay={300}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              d1 - Distance between center of ballast & upright
                              (ft)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <Autocomplete
                            id='bd1'
                            getOptionLabel={(option) => {
                              if (typeof option === "string") {
                                return option;
                              }
                              // Add "xxx" option created dynamically
                              if (option.inputValues) {
                                return option.inputValues;
                              }
                              return option.toString();
                            }}
                            freeSolo
                            selectOnFocus
                            handleHomeEndKeys
                            inputValue={inputValues["bd1"]}
                            onInputChange={(event, newInputValue) => {
                              setInputValues({
                                ...inputValues,
                                bd1: newInputValue,
                              });
                              setValues({
                                ...values,
                                bd1: newInputValue,
                              });
                            }}
                            //defaultValue={values.postsPerLength}
                            value={values.bd1}
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(9);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            onChange={(event, newValue) => {
                              setValues({
                                ...values,
                                bd1: newValue,
                              });
                            }}
                            options={[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4]}
                            renderInput={(params) => (
                              <TextField
                                onKeyPress={(e) => {
                                  e.key === "Enter" && e.preventDefault();
                                }}
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                  name: "bd1",
                                }}
                                label='d1 - Distance between center of ballast & upright (ft)'
                                margin='normal'
                                variant='outlined'
                              />
                            )}
                          />
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>

                    {/* bd2:0,Distance between far end of plate & upright (ft) 21*/}

                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.b ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={400}
                        leaveDelay={300}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              d2 - Distance between far end of plate & upright
                              (ft)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <Autocomplete
                            id='bd2'
                            getOptionLabel={(option) => {
                              if (typeof option === "string") {
                                return option;
                              }
                              // Add "xxx" option created dynamically
                              if (option.inputValues) {
                                return option.inputValues;
                              }
                              return option.toString();
                            }}
                            freeSolo
                            selectOnFocus
                            handleHomeEndKeys
                            inputValue={inputValues["bd2"]}
                            onInputChange={(event, newInputValue) => {
                              setInputValues({
                                ...inputValues,
                                bd2: newInputValue,
                              });
                              setValues({
                                ...values,
                                bd2: newInputValue,
                              });
                            }}
                            //defaultValue={values.postsPerLength}
                            value={values.bd2}
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(9);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            onChange={(event, newValue) => {
                              setValues({
                                ...values,
                                bd2: newValue,
                              });
                            }}
                            options={[2, 2.5, 3, 3.5, 4, 4.5, 5]}
                            renderInput={(params) => (
                              <TextField
                                onKeyPress={(e) => {
                                  e.key === "Enter" && e.preventDefault();
                                }}
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                  name: "bd2",
                                }}
                                label='d2 - Distance between far end of plate & upright (ft)'
                                margin='normal'
                                variant='outlined'
                              />
                            )}
                          />
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>

                    {/* bd3: 0,Ballast effective width (ft) 22*/}

                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.b ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={400}
                        leaveDelay={300}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              d3 - Ballast effective width (ft)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <Autocomplete
                            id='bd3'
                            getOptionLabel={(option) => {
                              if (typeof option === "string") {
                                return option;
                              }
                              // Add "xxx" option created dynamically
                              if (option.inputValues) {
                                return option.inputValues;
                              }
                              return option.toString();
                            }}
                            freeSolo
                            selectOnFocus
                            handleHomeEndKeys
                            inputValue={inputValues["bd3"]}
                            onInputChange={(event, newInputValue) => {
                              setInputValues({
                                ...inputValues,
                                bd3: newInputValue,
                              });
                              setValues({
                                ...values,
                                bd3: newInputValue,
                              });
                            }}
                            //defaultValue={values.postsPerLength}
                            value={values.bd3}
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(9);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            onChange={(event, newValue) => {
                              setValues({
                                ...values,
                                bd3: newValue,
                              });
                            }}
                            options={[1, 1.5, 2, 2.5, 3]}
                            renderInput={(params) => (
                              <TextField
                                onKeyPress={(e) => {
                                  e.key === "Enter" && e.preventDefault();
                                }}
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                  name: "bd3",
                                }}
                                label='d3 - Ballast effective width (ft)'
                                margin='normal'
                                variant='outlined'
                              />
                            )}
                          />
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>

                    {/* bd4: 0,Horizontal Distance between guy attachment point and upright (ft)  23*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.b ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={400}
                        leaveDelay={300}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              d4 - Horizontal Distance between guy attachment
                              point and upright (ft)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <Autocomplete
                            id='bd4'
                            getOptionLabel={(option) => {
                              if (typeof option === "string") {
                                return option;
                              }
                              // Add "xxx" option created dynamically
                              if (option.inputValues) {
                                return option.inputValues;
                              }
                              return option.toString();
                            }}
                            freeSolo
                            selectOnFocus
                            handleHomeEndKeys
                            inputValue={inputValues["bd4"]}
                            onInputChange={(event, newInputValue) => {
                              setInputValues({
                                ...inputValues,
                                bd4: newInputValue,
                              });
                              setValues({
                                ...values,
                                bd4: newInputValue,
                              });
                            }}
                            //defaultValue={values.postsPerLength}
                            value={values.bd4}
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(9);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            onChange={(event, newValue) => {
                              setValues({
                                ...values,
                                bd4: newValue,
                              });
                            }}
                            options={[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4]}
                            renderInput={(params) => (
                              <TextField
                                onKeyPress={(e) => {
                                  e.key === "Enter" && e.preventDefault();
                                }}
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                  name: "bd4",
                                }}
                                label='d4 - Horizontal Distance between guy attachment point
                              and upright (ft)'
                                margin='normal'
                                variant='outlined'
                              />
                            )}
                          />
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>

                    {/* bh4 - Vertical Distance between plate & guy attachment point (ft) 24*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.b ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={400}
                        leaveDelay={300}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              h4 - Vertical Distance between plate & guy
                              attachment point (ft)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <Autocomplete
                            id='bh4'
                            getOptionLabel={(option) => {
                              if (typeof option === "string") {
                                return option;
                              }
                              // Add "xxx" option created dynamically
                              if (option.inputValues) {
                                return option.inputValues;
                              }
                              return option.toString();
                            }}
                            freeSolo
                            selectOnFocus
                            handleHomeEndKeys
                            inputValue={inputValues["bh4"]}
                            onInputChange={(event, newInputValue) => {
                              setInputValues({
                                ...inputValues,
                                bh4: newInputValue,
                              });
                              setValues({
                                ...values,
                                bh4: newInputValue,
                              });
                            }}
                            //defaultValue={values.postsPerLength}
                            value={values.bh4}
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(9);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            onChange={(event, newValue) => {
                              setValues({
                                ...values,
                                bh4: newValue,
                              });
                            }}
                            options={[0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0]}
                            renderInput={(params) => (
                              <TextField
                                onKeyPress={(e) => {
                                  e.key === "Enter" && e.preventDefault();
                                }}
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                  name: "bh4",
                                }}
                                label='h4 - Vertical Distance between plate & guy attachment point (ft)'
                                margin='normal'
                                variant='outlined'
                              />
                            )}
                          />
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>

                    {/* bwplate: 0,Weight of steel plate  27*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.b ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={400}
                        leaveDelay={300}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              Weight of steel plate (lbs)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <Autocomplete
                            id='bwplate'
                            getOptionLabel={(option) => {
                              if (typeof option === "string") {
                                return option;
                              }
                              // Add "xxx" option created dynamically
                              if (option.inputValues) {
                                return option.inputValues;
                              }
                              return option.toString();
                            }}
                            freeSolo
                            selectOnFocus
                            handleHomeEndKeys
                            inputValue={inputValues["bwplate"]}
                            onInputChange={(event, newInputValue) => {
                              setInputValues({
                                ...inputValues,
                                bwplate: newInputValue,
                              });
                              setValues({
                                ...values,
                                bwplate: newInputValue,
                              });
                            }}
                            //defaultValue={values.postsPerLength}
                            value={values.bwplate}
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(9);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            onChange={(event, newValue) => {
                              setValues({
                                ...values,
                                bwplate: newValue,
                              });
                            }}
                            options={[
                              10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120,
                              130, 140, 150,
                            ]}
                            renderInput={(params) => (
                              <TextField
                                onKeyPress={(e) => {
                                  e.key === "Enter" && e.preventDefault();
                                }}
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                  name: "bwplate",
                                }}
                                label='Weight of steel plate (lbs)'
                                margin='normal'
                                variant='outlined'
                              />
                            )}
                          />
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>
                    {/* 
                C SELECTION
                 */}
                    {/* cd1: 0,d1 - Distance between center of ballast & upright (ft) 28*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.c ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={400}
                        leaveDelay={300}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              d1 - Distance between center of ballast & upright
                              (ft)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <Autocomplete
                            id='cd1'
                            getOptionLabel={(option) => {
                              if (typeof option === "string") {
                                return option;
                              }
                              // Add "xxx" option created dynamically
                              if (option.inputValues) {
                                return option.inputValues;
                              }
                              return option.toString();
                            }}
                            freeSolo
                            selectOnFocus
                            handleHomeEndKeys
                            inputValue={inputValues["cd1"]}
                            onInputChange={(event, newInputValue) => {
                              setInputValues({
                                ...inputValues,
                                cd1: newInputValue,
                              });
                              setValues({
                                ...values,
                                cd1: newInputValue,
                              });
                            }}
                            //defaultValue={values.postsPerLength}
                            value={values.cd1}
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(9);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            onChange={(event, newValue) => {
                              setValues({
                                ...values,
                                cd1: newValue,
                              });
                            }}
                            options={[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4]}
                            renderInput={(params) => (
                              <TextField
                                onKeyPress={(e) => {
                                  e.key === "Enter" && e.preventDefault();
                                }}
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                  name: "cd1",
                                }}
                                label='d1 - Distance between  center of ballast & upright (ft)'
                                margin='normal'
                                variant='outlined'
                              />
                            )}
                          />
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>
                    {/* cd3:0,Ballast effective width (ft) 29*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.c ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={400}
                        leaveDelay={300}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              d3 - Ballast effective width (ft)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <Autocomplete
                            id='cd3'
                            getOptionLabel={(option) => {
                              if (typeof option === "string") {
                                return option;
                              }
                              // Add "xxx" option created dynamically
                              if (option.inputValues) {
                                return option.inputValues;
                              }
                              return option.toString();
                            }}
                            freeSolo
                            selectOnFocus
                            handleHomeEndKeys
                            inputValue={inputValues["cd3"]}
                            onInputChange={(event, newInputValue) => {
                              setInputValues({
                                ...inputValues,
                                cd3: newInputValue,
                              });
                              setValues({
                                ...values,
                                cd3: newInputValue,
                              });
                            }}
                            //defaultValue={values.postsPerLength}
                            value={values.cd3}
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(9);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            onChange={(event, newValue) => {
                              setValues({
                                ...values,
                                cd3: newValue,
                              });
                            }}
                            options={[1, 1.5, 2, 2.5, 3]}
                            renderInput={(params) => (
                              <TextField
                                onKeyPress={(e) => {
                                  e.key === "Enter" && e.preventDefault();
                                }}
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                  name: "cd3",
                                }}
                                label='d3 - Ballast effective width (ft)'
                                margin='normal'
                                variant='outlined'
                              />
                            )}
                          />
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>
                    {/* cd4: 0,Horizontal Distance between guy attachment point and upright (ft) 30*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.c ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={400}
                        leaveDelay={300}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              d4 - Horizontal Distance between guy attachment
                              point and upright (ft)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <Autocomplete
                            id='cd4'
                            getOptionLabel={(option) => {
                              if (typeof option === "string") {
                                return option;
                              }
                              // Add "xxx" option created dynamically
                              if (option.inputValues) {
                                return option.inputValues;
                              }
                              return option.toString();
                            }}
                            freeSolo
                            selectOnFocus
                            handleHomeEndKeys
                            inputValue={inputValues["cd4"]}
                            onInputChange={(event, newInputValue) => {
                              setInputValues({
                                ...inputValues,
                                cd4: newInputValue,
                              });
                              setValues({
                                ...values,
                                cd4: newInputValue,
                              });
                            }}
                            //defaultValue={values.postsPerLength}
                            value={values.cd4}
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(9);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            onChange={(event, newValue) => {
                              setValues({
                                ...values,
                                cd4: newValue,
                              });
                            }}
                            options={[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4]}
                            renderInput={(params) => (
                              <TextField
                                onKeyPress={(e) => {
                                  e.key === "Enter" && e.preventDefault();
                                }}
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                  name: "cd4",
                                }}
                                label='d4 - Horizontal Distance between guy attachment point
                              and upright (ft)'
                                margin='normal'
                                variant='outlined'
                              />
                            )}
                          />
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>
                    {/* ch4:Vertical Distance between plate & guy attachment point
                (ft) 31*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.c ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={400}
                        leaveDelay={300}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              h4 - Vertical Distance between plate & guy
                              attachment point (ft)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <Autocomplete
                            id='ch4'
                            getOptionLabel={(option) => {
                              if (typeof option === "string") {
                                return option;
                              }
                              // Add "xxx" option created dynamically
                              if (option.inputValues) {
                                return option.inputValues;
                              }
                              return option.toString();
                            }}
                            freeSolo
                            selectOnFocus
                            handleHomeEndKeys
                            inputValue={inputValues["ch4"]}
                            onInputChange={(event, newInputValue) => {
                              setInputValues({
                                ...inputValues,
                                ch4: newInputValue,
                              });
                              setValues({
                                ...values,
                                ch4: newInputValue,
                              });
                            }}
                            //defaultValue={values.postsPerLength}
                            value={values.ch4}
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(9);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            onChange={(event, newValue) => {
                              setValues({
                                ...values,
                                ch4: newValue,
                              });
                            }}
                            options={[0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0]}
                            renderInput={(params) => (
                              <TextField
                                onKeyPress={(e) => {
                                  e.key === "Enter" && e.preventDefault();
                                }}
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                  name: "ch4",
                                }}
                                label='h4 - Vertical Distance between plate & guy attachment point (ft)'
                                margin='normal'
                                variant='outlined'
                              />
                            )}
                          />
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>

                    {/* 
                D SELECTION
                 */}
                    {/* dd2: 0,Distance between far end of plate & upright (ft) 33*/}

                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.d ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={400}
                        leaveDelay={300}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              d2 - Distance between far end of plate & upright
                              (ft)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <Autocomplete
                            id='dd2'
                            getOptionLabel={(option) => {
                              if (typeof option === "string") {
                                return option;
                              }
                              // Add "xxx" option created dynamically
                              if (option.inputValues) {
                                return option.inputValues;
                              }
                              return option.toString();
                            }}
                            freeSolo
                            selectOnFocus
                            handleHomeEndKeys
                            inputValue={inputValues["dd2"]}
                            onInputChange={(event, newInputValue) => {
                              setInputValues({
                                ...inputValues,
                                dd2: newInputValue,
                              });
                              setValues({
                                ...values,
                                dd2: newInputValue,
                              });
                            }}
                            //defaultValue={values.postsPerLength}
                            value={values.bd2}
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(9);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            onChange={(event, newValue) => {
                              setValues({
                                ...values,
                                dd2: newValue,
                              });
                            }}
                            options={[2, 2.5, 3, 3.5, 4, 4.5, 5]}
                            renderInput={(params) => (
                              <TextField
                                onKeyPress={(e) => {
                                  e.key === "Enter" && e.preventDefault();
                                }}
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                  name: "dd2",
                                }}
                                label='d2 - Distance between far end of plate & upright (ft)'
                                margin='normal'
                                variant='outlined'
                              />
                            )}
                          />
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>
                    {/* dd4: 0,Horizontal Distance between guy attachment point and upright (ft) 34 */}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.d ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={400}
                        leaveDelay={300}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              d4 - Horizontal Distance between guy attachment
                              point and upright (ft)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <Autocomplete
                            id='dd4'
                            getOptionLabel={(option) => {
                              if (typeof option === "string") {
                                return option;
                              }
                              // Add "xxx" option created dynamically
                              if (option.inputValues) {
                                return option.inputValues;
                              }
                              return option.toString();
                            }}
                            freeSolo
                            selectOnFocus
                            handleHomeEndKeys
                            inputValue={inputValues["dd4"]}
                            onInputChange={(event, newInputValue) => {
                              setInputValues({
                                ...inputValues,
                                dd4: newInputValue,
                              });
                              setValues({
                                ...values,
                                dd4: newInputValue,
                              });
                            }}
                            //defaultValue={values.postsPerLength}
                            value={values.dd4}
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(9);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            onChange={(event, newValue) => {
                              setValues({
                                ...values,
                                dd4: newValue,
                              });
                            }}
                            options={[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4]}
                            renderInput={(params) => (
                              <TextField
                                onKeyPress={(e) => {
                                  e.key === "Enter" && e.preventDefault();
                                }}
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                  name: "dd4",
                                }}
                                label='d4 - Horizontal Distance between guy attachment point
                              and upright (ft)'
                                margin='normal'
                                variant='outlined'
                              />
                            )}
                          />
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>
                    {/* dd5: 0,Horizontal Distance between ballast center & guy attachment point (ft) (ft)Horizontal Distance between guy attachment point and upright (ft)  35*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.d ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={400}
                        leaveDelay={300}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              d5 - Horizontal Distance between ballast center &
                              guy attachment point (ft)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <Autocomplete
                            id='dd5'
                            getOptionLabel={(option) => {
                              if (typeof option === "string") {
                                return option;
                              }
                              // Add "xxx" option created dynamically
                              if (option.inputValues) {
                                return option.inputValues;
                              }
                              return option.toString();
                            }}
                            freeSolo
                            selectOnFocus
                            handleHomeEndKeys
                            inputValue={inputValues["dd5"]}
                            onInputChange={(event, newInputValue) => {
                              setInputValues({
                                ...inputValues,
                                dd5: newInputValue,
                              });
                              setValues({
                                ...values,
                                dd5: newInputValue,
                              });
                            }}
                            //defaultValue={values.postsPerLength}
                            value={values.dd5}
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(9);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            onChange={(event, newValue) => {
                              setValues({
                                ...values,
                                dd5: newValue,
                              });
                            }}
                            options={[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4]}
                            renderInput={(params) => (
                              <TextField
                                onKeyPress={(e) => {
                                  e.key === "Enter" && e.preventDefault();
                                }}
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                  name: "dd5",
                                }}
                                label='d5 - Horizontal Distance between ballast center & guy attachment point (ft)'
                                margin='normal'
                                variant='outlined'
                              />
                            )}
                          />
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>

                    {/* dwplate: 0,Weight of steel plate  37*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.d ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={400}
                        leaveDelay={300}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              Weight of steel plate (lbs)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <Autocomplete
                            id='dwplate'
                            getOptionLabel={(option) => {
                              if (typeof option === "string") {
                                return option;
                              }
                              // Add "xxx" option created dynamically
                              if (option.inputValues) {
                                return option.inputValues;
                              }
                              return option.toString();
                            }}
                            freeSolo
                            selectOnFocus
                            handleHomeEndKeys
                            inputValue={inputValues["dwplate"]}
                            onInputChange={(event, newInputValue) => {
                              setInputValues({
                                ...inputValues,
                                dwplate: newInputValue,
                              });
                              setValues({
                                ...values,
                                dwplate: newInputValue,
                              });
                            }}
                            //defaultValue={values.postsPerLength}
                            value={values.dwplate}
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(9);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            onChange={(event, newValue) => {
                              setValues({
                                ...values,
                                dwplate: newValue,
                              });
                            }}
                            options={[
                              10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120,
                              130, 140, 150,
                            ]}
                            renderInput={(params) => (
                              <TextField
                                onKeyPress={(e) => {
                                  e.key === "Enter" && e.preventDefault();
                                }}
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                  name: "dwplate",
                                }}
                                label='Weight of steel plate (lbs)'
                                margin='normal'
                                variant='outlined'
                              />
                            )}
                          />
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>

                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  </Grid>
                </Grid>
              </form>

              {/* End hero unit */}
            </Container>
          </Grid>

          <div
            ref={calculateRef}
            style={{
              display: { calculationDataOpen } ? "inherit" : "none",
            }}>
            <Grid item xs={12} id='calculationDataTable'></Grid>
            {/* <React.Fragment>
              <Typography color='inherit'>Download results</Typography>
            </React.Fragment> */}
          </div>

          <Grid item xs={12}>
            {/* <Divider /> */}
          </Grid>
        </div>
      </div>
      {/* Calculations Results Table
      <Grid container spacing={1}></Grid> */}
    </Page>
  ) : (
    <Page
      pageTitle={intl.formatMessage({
        id: "calculate",
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

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

function GoogleMaps() {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBEHfOrxt6np-feXWg3VzZ3GQGhz_wYoDM&libraries=places",
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      id='google-map-demo'
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          onKeyPress={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
          {...params}
          label='Add a location'
          variant='outlined'
          fullWidth
        />
      )}
      renderOption={(option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        );

        return (
          <Grid container alignItems='center'>
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}

              <Typography variant='body2' color='textSecondary'>
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}
