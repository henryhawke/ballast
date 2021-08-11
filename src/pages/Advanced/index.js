/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */

/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-console */
// import _, { map } from "underscore";

import React, { useState, useEffect, useRef } from "react";

import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
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
      title: "# intermediate posts in length",
      content: "postsPerLength",
    },
    {
      id: 10,
      title: "# intermediate posts in width",
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
      title: "Weight of plate ",
      content: "b2wplate",
    },
    {
      id: 15,
      title: "Friction coefficient btw ballast & ground",
      content: "c2mu1",
    },
    {
      id: 16,
      title: "d1 - Distance btw center of ballast & upright ",
      content: "ad1",
    },
    {
      id: 17,
      title: "Distance btw far end of plate & upright",
      content: "ad2",
    },
    {
      id: 18,
      title: "Friction coefficient btw plate & ground ",
      content: "amu3",
    },
    {
      id: 19,
      title: "Weight of plate ",
      content: "awplate",
    },
    {
      id: 20,
      title: "d1 - Distance btw center of ballast & upright ",
      content: "bd1",
    },
    {
      id: 21,
      title: "Distance btw far end of plate & upright ",
      content: "bd2",
    },
    {
      id: 22,
      title: "Ballast effective width ",
      content: "bd3",
    },
    {
      id: 23,
      title: "Horizontal distance btw ballast center & guy attachment point",
      content: "bd4",
    },
    {
      id: 24,
      title: "Vertical distance btw plate & guy attachment point",
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
      title: "Weight of plate",
      content: "bwplate",
    },
    {
      id: 28,
      title: "d1 - Distance btw center of ballast & upright",
      content: "cd1",
    },
    {
      id: 29,
      title: "Ballast effective width",
      content: "cd3",
    },
    {
      id: 30,
      title: "Horizontal distance btw ballast center & guy attachment point ",
      content: "cd4",
    },
    {
      id: 31,
      title: "Vertical distance btw plate & guy attachment point",
      content: "ch4",
    },
    {
      id: 32,
      title: "Friction coefficient btw ballast & ground ",
      content: "cmu1",
    },
    {
      id: 33,
      title: "Distance btw far end of plate & upright",
      content: "dd2",
    },
    {
      id: 34,
      title: "Horizontal distance btw ballast center & guy attachment point",
      content: "dd4",
    },
    {
      id: 35,
      title: "Horizontal distance btw guy attachment point and upright",
      content: "dd5",
    },
    {
      id: 36,
      title: "Friction coefficient btw plate & ground  ",
      content: "dmu3",
    },
    {
      id: 37,
      title: "Weight of plate ",
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

  const [values, setValues] = useState({
    companyName: "",
    project: "",
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
    roofType: 1,
    ridgeLength: 6,
    valenceHeight: 1,
    roofHeight: 6,
    postsPerWidth: 1,
    postsPerLength: 1,
    ballastsPerIntermediate: 1,
    ballastsPerCornerPost: 1,
    totalBallasts: 0,
    openBallastWeight: 0,
    encBallastWeight: 0,
    calcID: uuidv4(),
    title: "",
    time: 0,
    share: {},
    notes: "",
    ballastType: 1,
    b2mu3: 0.5,
    b2wplate: 20,
    b2open: 0,
    b2enclosed: 0,
    c2mu1: 0,
    c2open: 0,
    c2enclosed: 0,
    ad1: 0,
    ad2: 0,
    amu3: 0.5,
    awplate: 20,
    aopen: 0,
    aenclosed: 0,
    bd1: 0,
    bd2: 0,
    bd3: 0,
    bd4: 0,
    bh4: 0,
    bmu2: 0.5,
    bmu3: 0.5,
    bwplate: 20,
    bopen: 0,
    benclosed: 0,
    cd1: 0,
    cd3: 0,
    cd4: 0,
    ch4: 0,
    cmu1: 0.5,
    copen: 0,
    cenclosed: 0,
    dd2: 5,
    dd4: 0,
    dd5: 2,
    dmu3: 0.5,
    dwplate: 20,
    dopen: 0,
    denclosed: 0,
    advanced: false,
    groundSurface: 1,
    ballastMaterial: 1,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const calculateRef = useRef();

  const handleSwitchChange = (event) => {
    setAdvancedBtnDisabled(event.target.checked);
    setValues({ ...values, advanced: event.target.checked });
    setCalculationDataOpen(false);
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

    var ballastName = "Fixed-To-Plate";

    if (vals.ballastType === 2) {
      ballastName = "Fixed-To-Pole";
      encBallastWeight = vals.c2enclosed;
      openBallastWeight = vals.c2open;
    } else if (values.ballastType === 3) {
      ballastName = "A";
      encBallastWeight = vals.aenclosed;
      openBallastWeight = vals.aopen;
    } else if (values.ballastType === 3) {
      ballastName = "B";
      encBallastWeight = vals.benclosed;
      openBallastWeight = vals.bopen;
      // ballastWeight = enclosed ? vals.benclosed : vals.bopen;
    } else if (values.ballastType === 3) {
      ballastName = "C";
      encBallastWeight = vals.cenclosed;
      openBallastWeight = vals.copen;
      //ballastWeight = enclosed ? vals.cenclosed : vals.copen;
    } else if (values.ballastType === 3) {
      ballastName = "D";
      encBallastWeight = vals.denclosed;
      openBallastWeight = vals.dopen;
      // ballastWeight = enclosed ? vals.denclosed : vals.dopen;
    } else {
      ballastName = "Fixed-To-Plate";
      encBallastWeight = vals.b2enclosed;
      openBallastWeight = vals.b2open;
      //ballastWeight = enclosed ? vals.b2enclosed : vals.b2open;
    }

    var roofTypeName = "Gable";
    if (values.roofType === 1) {
      roofTypeName = "Gable";
    } else if (values.roofType === 2) {
      roofTypeName = "Hip";
    } else if (values.roofType === 3) {
      roofTypeName = "Pyramid";
    }

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
                width: 120,
              },
              {
                field: "ballastWeight",
                headerName: "Ballast weight per leg/upright (lbs)",
                type: "number",
                width: 150,
              },
              {
                field: "overturnMomentLength",
                headerName: "Overturn moment about length (lbs.ft)",
                type: "number",
                width: 150,
              },
              {
                field: "overturnMomentWidth",
                headerName: "Overturn moment about width (lbs.ft)",
                type: "number",
                width: 150,
              },
              {
                field: "FX",
                headerName: "Horizontal Force in Length (lbs)",
                type: "number",
                width: 150,
              },
              {
                field: "FY",
                headerName: "Horizontal Force in Width (lbs)",
                type: "number",
                width: 150,
              },
              {
                field: "FZ",
                headerName: "Vertical Uplift Force (lbs)",
                type: "number",
                width: 150,
              },
            ]}
            rows={[
              {
                id: 1,
                Enclosure: openEnclosureVal,
                ballastWeight: openBallastWeight,
                overturnMomentLength: openOverturnMomentLength,
                overturnMomentWidth: openOverturnMomentWidth,
                FX: openFX,
                FY: openFY,
                FZ: openFZ,
              },
              {
                id: 2,
                Enclosure: encEnclosureVal,
                ballastWeight: encBallastWeight,
                overturnMomentLength: encOverturnMomentLength,
                overturnMomentWidth: vals.encOMW,
                FX: vals.encFX,
                FY: vals.encFY,
                FZ: vals.encFZ,
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
  const handleSelectChange = (event) => {
    const name = event.target.name;
    const id = event.target;
    console.log(name);
    console.log(id);
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
    ballast: ConfigurationA,
    groundSurface: smoothConcrete,
    ballastMaterial: plasticBarrel,
  });

  const [ballastType, setBallastType] = React.useState({
    fixedToPlate: true,
    fixedToPole: false,
    a: false,
    b: false,
    c: false,
    d: false,
  });

  const filter = createFilterOptions();

  const handleBallastSelectChange = (event) => {
    const name = event.target.name;

    console.log(name);
    if (name === "ballastType") {
      console.log("is ballastType changed");
      console.log(event.target.value);
      console.log(ballastType);
      if (event.target.value === "1") {
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
        console.log("Fixed-To-Plate");
      } else if (event.target.value === "2") {
        setInfoImages({ ...infoImages, ballast: ConfigurationC2 });
        console.log("Fixed-To-Pole");
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

        console.log("Plastic");
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
        calculateRef.current.scrollIntoView();
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
      img: ConfigurationA,
      title: "", //"Ballast Type A",
      author: "",
      featured: true,
    },
    {
      img: ConfigurationB,
      title: "", //"Ballast Type B",
      author: "",
      featured: true,
    },
    {
      img: ConfigurationB2,
      title: "", //"Ballast Type B2",
      author: "",
      featured: true,
    },
    {
      img: ConfigurationC,
      title: "", //"Ballast Type C",
      author: "",
      featured: true,
    },
    {
      img: ConfigurationC2,
      title: "", //"Ballast Type C2",
      author: "",
      featured: true,
    },
    {
      img: ConfigurationD,
      title: "", //"Ballast Type D",
      author: "",
      featured: true,
    },
    {
      img: pyramid,
      title: "", //"Pyramid Roof",
      author: "",
      featured: true,
    },
    {
      img: hip,
      title: "", //"Hip Roof",
      author: "",
      featured: true,
    },
    {
      img: gable,
      title: "", //"Gable Roof",
      author: "",
      featured: true,
    },
  ];
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

        {/* DIALOG FOR CUSTOM INPUT OF FORM VARIABLES */}
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
                Overturn moment = {results.overturnMoment} lbs.{units.size[values.unit]}
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
                    <InputLabel htmlFor='outlined-age-native-simple'>
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
                  {/* <div className={classes.gridRoot}>
                      <ImageList
                        className={classes.imageList}
                        rowHeight={350}
                        cols={2}>
                        {tileData.map((item) => (
                          <ImageListItem key={item.img}>
                            <img
                              src={item.img}
                              alt={item.title}
                              className={classes.imgFullHeight}
                            />
                            <ImageListItemBar
                              title={item.title}
                              classes={{
                                root: classes.titleBar,
                                title: classes.title,
                              }}
                              // actionIcon={
                              //   <IconButton aria-label={`star ${item.title}`}>
                              //     <StarBorderIcon className={classes.title} />
                              //   </IconButton>
                              // }
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </div> */}
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
                          Clear - unobstructed wind flow with no blockage (e.g.,
                          plain, grass land, beach). This is the worst case
                          scenario. \n Obstructed - objects below roof
                          inhibiting wind flow with >50% blockage (e.g., urban
                          environment, high dense vegetation, high cliff)
                        </Typography>
                      </React.Fragment>
                    }>
                    <FormControl
                      variant='outlined'
                      className={classes.textField}>
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
                        value={values.windFlow}
                        onChange={handleSelectChange}
                        helperText='Clear or Obstructed'
                        inputProps={{
                          name: "windFlow",
                          id: "outlined-age-native-simple",
                        }}>
                        <option value={1}>Clear</option>
                        <option value={3}>Obstructed</option>
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
                          Maximum Wind Speed expected while tent is setup (
                          {units.speed[values.unit]})
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
                        autoSelect
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        inputValue={inputValues["windSpeed"]}
                        onInputChange={(event, newInputValue) => {
                          setInputValues({
                            ...inputValues,
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
                          Tent Width ({units.size[values.unit]})
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
                        autoSelect
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        inputValue={inputValues["tentWidth"]}
                        onInputChange={(event, newInputValue) => {
                          setInputValues({
                            ...inputValues,
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
                          Dimension parallel to ridge. Also, the length defines
                          the X-axis.
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
                        autoSelect
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        inputValue={inputValues["tentLength"]}
                        onInputChange={(event, newInputValue) => {
                          setInputValues({
                            ...inputValues,
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
                          Vertical distance btw the ground of the lowest part of
                          the roof. The band is neglected.
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
                        autoSelect
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        inputValue={inputValues["eaveHeight"]}
                        onInputChange={(event, newInputValue) => {
                          setInputValues({
                            ...inputValues,
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
                        autoSelect
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        inputValue={inputValues["ridgeLength"]}
                        onInputChange={(event, newInputValue) => {
                          setInputValues({
                            ...inputValues,
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
                        autoSelect
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        inputValue={inputValues["roofHeight"]}
                        onInputChange={(event, newInputValue) => {
                          setInputValues({
                            ...inputValues,
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
                        autoSelect
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        inputValue={inputValues["valenceHeight"]}
                        onInputChange={(event, newInputValue) => {
                          setInputValues({
                            ...inputValues,
                            roofHeight: newInputValue,
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
                            roofHeight: newValue,
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
                          # Intermediate Posts in length (Excluding corner
                          posts)
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
                        autoSelect
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        inputValue={inputValues["postsPerLength"]}
                        onInputChange={(event, newInputValue) => {
                          setInputValues({
                            ...inputValues,
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
                            label='# Intermediate posts in Length'
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
                          # intermediate posts in width (Excluding corner posts)
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
                        autoSelect
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        inputValue={inputValues["postsPerWidth"]}
                        onInputChange={(event, newInputValue) => {
                          setInputValues({
                            ...inputValues,
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
                            label='# Intermediate posts in Width'
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
                          The total number of ballasts per corner post
                        </Typography>
                      </React.Fragment>
                    }>
                    <FormControl
                      className={clsx(classes.textField)}
                      variant='outlined'>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        # Ballasts per corner post
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

                {/* Advanced Button Toggle */}

                <Grid item xs={1} md={1}>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={btnAdvancedDisabled}
                          onChange={handleSwitchChange}
                          name='advanced'
                          color='primary'
                        />
                      }
                      label='Advanced'
                    />
                  </FormGroup>
                  {/* <ButtonGroup
                      row
                      className={clsx(classes.calculateButton)}
                      variant='contained'
                      color='primary'
                      fullWidth={true}
                      aria-label='contained primary button group'>
                      <Button
                        onClick={async () => {
                          // const handleClickOpen = () => {
                          //   setOpen(true);
                          // };

                          startCloudFunc();

                          // setLoading(true);
                          history.push("/about");
                        }}>
                        Help
                      </Button>
                      //<Button>Save</Button>
                    </ButtonGroup> */}
                </Grid>

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
                <Grid item hidden={!btnAdvancedDisabled} xs={12}>
                  <Grid
                    container
                    direction='row'
                    justify='space-around'
                    alignItems='center'
                    spacing={1}>
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
                              Six options: Fixed-to-plate, Fixed-to-pole, A, B,
                              C, D
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
                            defaultValue={1}
                            value={values.ballastType}
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
                            <option value={1}>Fixed-To-Plate</option>
                            <option value={2}>Fixed-To-Pole</option>
                            <option value={3}>A</option>
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
                              Plastic barrel, Steel drum, Concrete block
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
                            defaultValue={1}
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
                            <option value={1}>Plastic</option>
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
                              Smooth concrete, Rough concrete, Asphalt, Gravel,
                              Dirt, Grass
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
                            defaultValue={1}
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

                    {/* <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.fixedToPlate ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              Friction coefficient btw plate & ground
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            Friction coefficient btw plate & ground
                          </InputLabel>
                          <Select
                            native
                            endAdornment={
                              <InputAdornment position='end'>
                                <EditRoundedIcon
                                  onClick={() => {
                                    handleCustomDialog(13);
                                  }}
                                />
                              </InputAdornment>
                            }
                            hidden={ballastType.fixedToPlate}
                            //defaultValue={20}
                            label='Friction coefficient btw plate & ground '
                            value={values.b2mu3}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "b2mu3",
                              id: "outlined-age-native-simple",
                            }}>
                            <option value={0.5}>0.5</option>
                          </Select>
                        </FormControl>
                      </HtmlTooltip>
                    </Grid> */}
                    {/* b2wplate: 0,Weight of plate  14*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.fixedToPlate ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              b2wplate - Weight of plate
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            b2wplate - Weight of plate (lbs)
                          </InputLabel>
                          <Select
                            native
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(14);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            //defaultValue={20}
                            hidden={ballastType.fixedToPlate}
                            label='b2wplate - Weight of plate (lbs)'
                            value={values.b2wplate}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "b2wplate",
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
                    {/* 
                C2 SELECTION
                 */}
                    {/* c2mu1: 0,Friction coefficient btw ballast & ground (if applicable) 
                15*/}
                    {/* <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.fixedToPole ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              Friction coefficient btw ballast & ground (if
                              applicable)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            Friction coefficient btw ballast & ground
                          </InputLabel>
                          <Select
                            native
                            endAdornment={
                              <InputAdornment position='end'>
                                <EditRoundedIcon
                                  onClick={() => {
                                    handleCustomDialog(15);
                                  }}
                                />
                              </InputAdornment>
                            }
                            //defaultValue={20}
                            hidden={ballastType.fixedToPole}
                            label='Friction coefficient btw ballast & ground (if applicable)'
                            value={values.c2mu1}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "c2mu1",
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
                    </Grid> */}
                    {/* A SELECTION */}
                    {/* ad1: 0, d1 - Distance btw center of ballast & upright (ft)  16*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.a ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              d1 - Distance btw center of ballast & upright (ft)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            d1 - Distance btw center of ballast & upright (ft)
                          </InputLabel>
                          <Select
                            native
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(16);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            //defaultValue={20}
                            hidden={ballastType.a}
                            label='d1 - Distance btw center of ballast & upright (ft)'
                            value={values.ad1}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "ad1",
                              id: "outlined-age-native-simple",
                            }}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                          </Select>
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>
                    {/* ad2:0, Distance btw far end of plate & upright (ft)  17*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.a ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              d2 - Distance btw far end of plate & upright
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            d2 - Distance btw far end of plate & upright (ft)
                          </InputLabel>
                          <Select
                            native
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(17);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            //defaultValue={20}
                            hidden={ballastType.a}
                            label='d2 - Distance btw far end of plate & upright (ft)'
                            value={values.ad2}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "ad2",
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
                    {/* amu3: 0,Friction coefficient btw plate & ground  18*/}
                    {/* <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.a ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              Friction coefficient btw plate & ground
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            Friction coefficient btw plate & ground
                          </InputLabel>
                          <Select
                            native
                            endAdornment={
                              <InputAdornment position='end'>
                                <EditRoundedIcon
                                  onClick={() => {
                                    handleCustomDialog(18);
                                  }}
                                />
                              </InputAdornment>
                            }
                            //defaultValue={20}
                            hidden={ballastType.a}
                            label=' Friction coefficient btw plate & ground '
                            value={values.amu3}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "amu3",
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
                    </Grid> */}
                    {/* awplate: 0, Weight of plate  19*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.a ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              mu3 - Weight of plate (lbs)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            mu3 - Weight of plate (lbs)
                          </InputLabel>
                          <Select
                            native
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(19);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            //defaultValue={20}
                            hidden={ballastType.a}
                            label='mu3 - Weight of plate (lbs)'
                            value={values.awplate}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "awplate",
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
                    {/* 
                B SELECTION
                 */}
                    {/* bd1: 0, d1 - Distance btw center of ballast & upright (ft)  20*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.b ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              d1 - Distance btw center of ballast & upright
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            d1 - Distance btw center of ballast & upright (
                            {units.size[values.unit]})
                          </InputLabel>
                          <Select
                            native
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(20);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            //defaultValue={20}
                            hidden={ballastType.b}
                            label='d1 - Distance btw center of ballast & upright ({units.size[values.unit]})'
                            value={values.bd1}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "bd1",
                              id: "outlined-age-native-simple",
                            }}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                          </Select>
                        </FormControl>
                      </HtmlTooltip>
                    </Grid>
                    {/* bd2:0,Distance btw far end of plate & upright (ft) 21*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.b ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              d2 - Distance btw far end of plate & upright
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            d2- Distance btw far end of plate & upright(ft)
                          </InputLabel>
                          <Select
                            native
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(21);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            //defaultValue={20}
                            hidden={ballastType.b}
                            label='d2 - Distance btw far end of plate & upright (ft)'
                            value={values.bd2}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "bd2",
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
                    {/* bd3: 0,Ballast effective width (ft) 22*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.b ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
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
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            d3 - Ballast effective width (ft)
                          </InputLabel>
                          <Select
                            native
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(22);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            //defaultValue={20}
                            hidden={ballastType.b}
                            label='d3 - Ballast effective width (ft)'
                            value={values.bd3}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "bd3",
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
                    {/* bd4: 0,Horizontal distance btw ballast center & guy attachment point (ft)  23*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.b ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              d4 - Horizontal distance btw ballast center & guy
                              attachment point (ft)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            d4 - Horizontal distance btw ballast center & guy
                            attachment point (ft)
                          </InputLabel>
                          <Select
                            native
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(23);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            //defaultValue={20}
                            hidden={ballastType.b}
                            label='d4 - Horizontal distance btw ballast center & guy attachment point (ft)'
                            value={values.bd4}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "bd4",
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
                    {/* bh4: 0, Vertical distance btw plate & guy attachment point (ft) 24*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.b ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              h4 - Vertical distance btw plate & guy attachment
                              point (ft)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            h4 - Vertical distance btw plate & guy attachment
                            point (ft)
                          </InputLabel>
                          <Select
                            native
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(24);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            //defaultValue={20}
                            hidden={ballastType.b}
                            label='h4 - Vertical distance btw plate & guy attachment point (ft)'
                            value={values.bh4}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "bh4",
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
                    {/* bmu2: 0,Friction coefficient btw ballast & plate  25*/}
                    {/* <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.b ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              Friction coefficient btw ballast & plate
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            Friction coefficient btw ballast & plate
                          </InputLabel>
                          <Select
                            native
                            endAdornment={
                              <InputAdornment position='end'>
                                <EditRoundedIcon
                                  onClick={() => {
                                    handleCustomDialog(25);
                                  }}
                                />
                              </InputAdornment>
                            }
                            //defaultValue={20}
                            hidden={ballastType.b}
                            label='Friction coefficient btw ballast & plate '
                            value={values.bmu2}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "bmu2",
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
                    </Grid> */}
                    {/* bmu3: 0,Friction coefficient btw plate & ground  26*/}
                    {/* <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.b ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              Friction coefficient btw plate & ground
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            Friction coefficient btw plate & ground
                          </InputLabel>
                          <Select
                            native
                            endAdornment={
                              <InputAdornment position='end'>
                                <EditRoundedIcon
                                  onClick={() => {
                                    handleCustomDialog(26);
                                  }}
                                />
                              </InputAdornment>
                            }
                            //defaultValue={20}
                            hidden={ballastType.b}
                            label='Friction coefficient btw plate & ground '
                            value={values.bmu3}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "bmu3",
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
                    </Grid> */}
                    {/* bwplate: 0,Weight of plate  27*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.b ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              wplate - Weight of plate (lbs)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            wplate - Weight of plate (lbs)
                          </InputLabel>
                          <Select
                            native
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(27);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            //defaultValue={20}
                            hidden={ballastType.b}
                            label='wplate - Weight of plate  (lbs)'
                            value={values.bwplate}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "bwplate",
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
                    {/* 
                C SELECTION
                 */}
                    {/* cd1: 0,d1 - Distance btw center of ballast & upright (ft) 28*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.c ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              d1 - Distance btw center of ballast & upright
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            d1 - Distance btw center of ballast & upright (
                            {units.size[values.unit]})
                          </InputLabel>
                          <Select
                            native
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(28);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            //defaultValue={20}
                            hidden={ballastType.c}
                            label='d1 - Distance btw center of ballast & upright ({units.size[values.unit]})'
                            value={values.cd1}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "cd1",
                              id: "outlined-age-native-simple",
                            }}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                          </Select>
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
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
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
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            d3 - Ballast effective width (ft)
                          </InputLabel>
                          <Select
                            native
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(29);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            //defaultValue={20}
                            hidden={ballastType.c}
                            label='d3 - Ballast effective width (ft)'
                            value={values.cd3}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "cd3",
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
                    {/* cd4: 0,Horizontal distance btw ballast center & guy attachment point (ft) 30*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.c ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              d4 - Horizontal distance btw ballast center & guy
                              attachment point (ft)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            d4 - Horizontal distance btw ballast center & guy
                            attachment point (ft)
                          </InputLabel>
                          <Select
                            native
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(30);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            //defaultValue={0}
                            hidden={ballastType.c}
                            label='d4 - Horizontal distance btw ballast center & guy attachment point (ft)'
                            value={values.cd4}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "cd4",
                              id: "outlined-age-native-simple",
                            }}>
                            <option value={0}>0</option>
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
                    {/* ch4: 0,Vertical distance btw plate & guy attachment point
                (ft) 31*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.c ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              h4 - Vertical distance btw plate & guy attachment
                              point (ft)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            h4 - Vertical distance btw plate & guy attachment
                            point (ft)
                          </InputLabel>
                          <Select
                            native
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(31);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            //defaultValue={20}
                            hidden={ballastType.c}
                            label='h4 - Vertical distance btw plate & guy attachment point (ft)'
                            value={values.ch4}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "ch4",
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
                    {/* cmu1: 0,Friction coefficient btw ballast & ground (if
                applicable) 32*/}
                    {/* <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.c ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              Friction coefficient btw ballast & ground (if
                              applicable)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            Friction coefficient btw ballast & ground (if
                            applicable) ({units.size[values.unit]})
                          </InputLabel>
                          <Select
                            native
                            endAdornment={
                              <InputAdornment position='end'>
                                <EditRoundedIcon
                                  onClick={() => {
                                    handleCustomDialog(32);
                                  }}
                                />
                              </InputAdornment>
                            }
                            //defaultValue={20}
                            hidden={ballastType.c}
                            label='Friction coefficient btw ballast & ground (if applicable)'
                            value={values.cmu1}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "cmu1",
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
                    </Grid> */}
                    {/* 
                D SELECTION
                 */}
                    {/* dd2: 0,Distance btw far end of plate & upright (ft) 33*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.d ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              d2 - Distance btw far end of plate & upright -
                              (ft)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            d2 - Distance btw far end of plate & upright (ft)
                          </InputLabel>
                          <Select
                            native
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(33);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            //defaultValue={20}
                            hidden={ballastType.d}
                            label='d2 - Distance btw far end of plate & upright (ft)'
                            value={values.dd2}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "dd2",
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
                    {/* dd4: 0,Horizontal distance btw ballast center & guy
                attachment point (ft) 34 */}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.d ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              d4 - Horizontal distance btw ballast center & guy
                              attachment point (ft)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            d4 - Horizontal distance btw ballast center & guy
                            attachment point (ft)
                          </InputLabel>
                          <Select
                            native
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(34);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            //defaultValue={20}
                            hidden={ballastType.d}
                            label='d4 - Horizontal distance btw ballast center & guy attachment point (ft)'
                            value={values.dd4}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "dd4",
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
                    {/* dd5: 0,Horizontal distance btw guy attachment point and upright (ft)  35*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.d ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              d5 - Horizontal distance btw guy attachment point
                              and upright (ft)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            d5 - Horizontal distance btw guy attachment point
                            and upright (ft)
                          </InputLabel>
                          <Select
                            native
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(1);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            //defaultValue={20}
                            hidden={ballastType.d}
                            label='d5 - Horizontal distance btw guy attachment point and upright (ft)'
                            value={values.dd5}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "dd5",
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
                    {/* dmu3: 0,Friction coefficient btw plate & ground  36*/}
                    {/* <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.d ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              Friction coefficient btw plate & ground
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            Friction coefficient btw plate & ground
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
                            hidden={ballastType.d}
                            label='Friction coefficient btw plate & ground  '
                            value={values.dmu3}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "dmu3",
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
                    </Grid> */}
                    {/* dwplate: 0,Weight of plate  37*/}
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: ballastType.d ? "inherit" : "none",
                      }}>
                      <HtmlTooltip
                        enterDelay={200}
                        leaveDelay={150}
                        interactive
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        title={
                          <React.Fragment>
                            <Typography color='inherit'>
                              wplate - Weight of plate (lbs)
                            </Typography>
                          </React.Fragment>
                        }>
                        <FormControl
                          className={clsx(classes.textField)}
                          variant='outlined'>
                          <InputLabel htmlFor='outlined-age-native-simple'>
                            wplate - Weight of plate (lbs)
                          </InputLabel>
                          <Select
                            native
                            // endAdornment={
                            //   <InputAdornment position='end'>
                            //     <EditRoundedIcon
                            //       onClick={() => {
                            //         handleCustomDialog(1);
                            //       }}
                            //     />
                            //   </InputAdornment>
                            // }
                            //defaultValue={20}
                            hidden={ballastType.d}
                            label='Weight of plate  (lbs)'
                            value={values.dwplate}
                            onChange={handleSelectChange}
                            inputProps={{
                              name: "dwplate",
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

                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  </Grid>
                </Grid>
              </form>

              {/* End hero unit */}
            </Container>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              display: { calculationDataOpen } ? "inherit" : "none",
            }}
            id='calculationDataTable'></Grid>

          <Grid item ref={calculateRef} xs={12}>
            <Divider />
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
