/* eslint-disable no-undef */
import { green } from "@material-ui/core/colors";
// import { createMuiTheme } from "@material-ui/core/styles";

// const theme = createMuiTheme({
//   palette: {
//     primary: { main: "#242424" },
//     secondary: {
//       main: "#c62828",
//     },
//   },
// });
// eslint-disable-next-line import/no-anonymous-default-export
export default (theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  backdrop: {
    zIndex: 999999999, //theme.zIndex.drawer + 1,
    color: "#fff",
  },
  tooltip: {
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(16),
  },
  root: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.background.default
        : theme.palette.primary1Color,
    justifyContent: "center",
    alignContent: "stretch",
    alignItems: "center",
    boxSizing: "content-box",
    paddingTop: theme.spacing(1),
    "& .MuiTextField-root": {
      margin: theme.spacing(0),
      width: "100%",
    },
    "& .MuiGrid-item": {
      textAlign: "center",
    },
    "& .MuiFormControl-root": {
      marginLeft: theme.spacing(0),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(0),
    },
    "& .MuiDivider-root": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    "& .MuiAutocomplete-root": {
      margin: theme.spacing(0),
      width: "100%",
    },
    // "& .MuiContainer-maxWidthLg": {
    //   maxWidth: "900px",
    // },
    "& .MuiFormControlLabel-root, & .MuiFormGroup-root": {
      textAlign: "center",
    },
    "& .MuiDataGrid-columnHeaderTitle, & .MuiDataGrid-columnHeaderTitleContainer, .MuiDataGrid-root .MuiDataGrid-columnHeaderTitle":
      {
        overflow: "inherit",
        lineHeight: "1",
        whiteSpace: "normal",
        textOverflow: "clip",
      },
    "& .MuiSelect-icon": {
      display: "none",
    },
  },
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  section: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "95%",

    marginLeft: "0",
    marginBottom: "0",
  },
  fab: {
    position: "absolute",
    zIndex: 99999999,
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  snackbar: {
    [theme.breakpoints.down("xs")]: {
      bottom: 90,
    },
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[600],
    },
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appTabBar: {
    left: "auto",
    right: 0,
    height: 48,
    bottom: 0,
    top: "unset",
    position: "fixed",
  },
  tileImage: {
    top: "25%",
    height: "auto",
    width: "100%",
    position: "relative",
  },
  formRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    padding: "2px 4px",
  },
  formInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  formIconButton: {
    padding: 10,
  },
  formDivider: {
    height: 28,
    margin: 4,
  },
  grow: {
    flexGrow: 1,
  },
  calculateButton: {
    marginTop: "10px",
    marginBottom: "2.5%",
    fontWeight: "bold",
  },
  fabButton: {
    position: "fixed",
    zIndex: 99999999,
    top: 0,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  windFlowWidth: {
    marginLeft: "-15%",
    minWidth: "130%",
  },
  formControl: {
    width: "95%",
    marginTop: "2.5%",
    marginLeft: "2.5%",
    marginBottom: "5px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  bGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    height: `100%`,
    justifyContent: "space-evenly",
  },
  paper: {
    padding: theme.spacing(1),
    paddingBottom: 0,
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "5px",
    whiteSpace: "nowrap",
    margin: theme.spacing(5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  formGrid: {
    flexGrow: 1,
  },
  cardGrid: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(2),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  gridRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  gridImageList: {
    width: "100%",
    maxHeight: "100%",
    overflow: "scroll",
    padding: theme.spacing(1),
    resizeMode: "contain",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  // titleImageBar: {
  //   background:
  //     "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
  //     "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  // },
  mainFeaturedPost: {
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 10 },
    textShadowRadius: 10,
    position: "relative",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/collection/43247403)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  images: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  infoImage: {
    position: "relative",
    maxHeight: 200,
    marginBottom: -10,
    width: "100%",
  },
  topInfoImage: {
    position: "relative",
    marginBottom: -10,
    width: "100%",
  },
  gridList: {
    width: "100%",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  imageList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background: "transparent",
  },
  imageHead: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  mainFeaturedPostContent: {
    textShadow: "-1px -1px 10px black",
    color: "white",
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
});
