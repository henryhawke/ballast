exports.__esModule = true;
exports.isGranted = exports.defaultUserData = void 0;

var defaultUserData = (user) => {
  if (user != null) {
    return {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      uid: user.uid,
      providerData: user.providerData,
      isAuthenticated: true,
      isMember: false,
    };
  } else {
    return {
      isAuthenticated: false,
    };
  }
};

exports.defaultUserData = defaultUserData;

var isGranted = (auth, grant) => {
  var _ref = auth || {},
    _ref$grants = _ref.grants,
    grants = _ref$grants === void 0 ? [] : _ref$grants,
    _ref$isAdmin = _ref.isAdmin,
    isAdmin = _ref$isAdmin === void 0 ? false : _ref$isAdmin;

  if (isAdmin) {
    return true;
  }

  if (!grants) {
    return false;
  }

  return !!grants[grant];
};

exports.isGranted = isGranted;
