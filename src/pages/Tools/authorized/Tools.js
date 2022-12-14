// "use strict";

// exports.__esModule = true;
// exports.default = void 0;

// var firebaseui = _interopRequireWildcard(require("firebaseui"));

// var _AuthUI = _interopRequireDefault(
//   require("rmw-shell/lib/containers/AuthUI/AuthUI")
// );

// var _Page = _interopRequireDefault(
//   require("material-ui-shell/lib/containers/Page/Page")
// );

// var _react = _interopRequireDefault(require("react"));

// var _reactHelmet = require("react-helmet");

// var _Config = require("base-shell/lib/providers/Config");

// var _Firebase = require("rmw-shell/lib/providers/Firebase");

// var _reactIntl = require("react-intl");

// var _Menu = require("material-ui-shell/lib/providers/Menu");

// function _interopRequireDefault(obj) {
//   return obj && obj.__esModule ? obj : { default: obj };
// }

// function _getRequireWildcardCache() {
//   if (typeof WeakMap !== "function") return null;
//   var cache = new WeakMap();
//   _getRequireWildcardCache = function _getRequireWildcardCache() {
//     return cache;
//   };
//   return cache;
// }

// function _interopRequireWildcard(obj) {
//   if (obj && obj.__esModule) {
//     return obj;
//   }
//   if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
//     return { default: obj };
//   }
//   var cache = _getRequireWildcardCache();
//   if (cache && cache.has(obj)) {
//     return cache.get(obj);
//   }
//   var newObj = {};
//   var hasPropertyDescriptor =
//     Object.defineProperty && Object.getOwnPropertyDescriptor;
//   for (var key in obj) {
//     if (Object.prototype.hasOwnProperty.call(obj, key)) {
//       var desc = hasPropertyDescriptor
//         ? Object.getOwnPropertyDescriptor(obj, key)
//         : null;
//       if (desc && (desc.get || desc.set)) {
//         Object.defineProperty(newObj, key, desc);
//       } else {
//         newObj[key] = obj[key];
//       }
//     }
//   }
//   newObj.default = obj;
//   if (cache) {
//     cache.set(obj, newObj);
//   }
//   return newObj;
// }

// function _extends() {
//   _extends =
//     Object.assign ||
//     function (target) {
//       for (var i = 1; i < arguments.length; i++) {
//         var source = arguments[i];
//         for (var key in source) {
//           if (Object.prototype.hasOwnProperty.call(source, key)) {
//             target[key] = source[key];
//           }
//         }
//       }
//       return target;
//     };
//   return _extends.apply(this, arguments);
// }

// var SignIn = () => {
//   var intl = (0, _reactIntl.useIntl)();

//   var _useConfig = (0, _Config.useConfig)(),
//     appConfig = _useConfig.appConfig;

//   var _useFirebase = (0, _Firebase.useFirebase)(),
//     firebaseApp = _useFirebase.firebaseApp;

//   var _ref = appConfig || {},
//     _ref$firebase = _ref.firebase,
//     firebase = _ref$firebase === void 0 ? {} : _ref$firebase;

//   var _firebase$firebaseuiP = firebase.firebaseuiProps,
//     firebaseuiProps =
//       _firebase$firebaseuiP === void 0 ? {} : _firebase$firebaseuiP;

//   var _useMenu = (0, _Menu.useMenu)(),
//     setAuthMenuOpen = _useMenu.setAuthMenuOpen;

//   var uiConfig = _extends(
//     {
//       signInSuccessUrl: "/",
//       signInFlow: "popup",
//       callbacks: {
//         signInSuccessWithAuthResult: () => {
//           setAuthMenuOpen(false); // To avoid page reload on single page applications

//           return false;
//         },
//       },
//       credentialHelper: firebaseui.auth.CredentialHelper.NONE,
//     },
//     firebaseuiProps
//   );

//   return /*#__PURE__*/ _react.default.createElement(
//     _Page.default,
//     {
//       pageTitle: intl.formatMessage({
//         id: "sign_in",
//       }),
//     },
//     /*#__PURE__*/ _react.default.createElement(
//       _reactHelmet.Helmet,
//       null,
//       /*#__PURE__*/ _react.default.createElement("link", {
//         type: "text/css",
//         rel: "stylesheet",
//         href:
//           "https://www.gstatic.com/firebasejs/ui/4.6.1/firebase-ui-auth.css",
//       })
//     ),
//     /*#__PURE__*/ _react.default.createElement(_AuthUI.default, {
//       firebaseApp: firebaseApp,
//       uiConfig: uiConfig,
//     })
//   );
// };

// var _default = SignIn;
// exports.default = _default;
// module.exports = exports.default;
