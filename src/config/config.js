import { lazy } from "react";
import locales from "./locales";
import routes from "./routes";
import getMenuItems from "./menuItems";
import themes from "./themes";
import parseLanguages from "base-shell/lib/utils/locale";
import grants from "./grants";
import Loading from "material-ui-shell/lib/components/Loading/Loading";
import getDefaultRoutes from "./getDefaultRoutes";
import { defaultUserData, isGranted } from "./auth";

const config = {
  firebase: {
    prod: {
      initConfig: {
        apiKey: "AIzaSyDB6abvszOotW1tTyNDy8HC--lIIeuUIHg",
        authDomain: "clemson-ifai.firebaseapp.com",
        databaseURL: "https://clemson-ifai.firebaseio.com",
        projectId: "clemson-ifai",
        storageBucket: "clemson-ifai.appspot.com",
        messagingSenderId: "1086564300498",
        appId: "1:1086564300498:web:b1517d61a1112c7627df0b",
        measurementId: "G-K4JHDNC3D8",
      },
      messaging: {
        publicVapidKey:
          "BKIjszk90AdsqtBB9cC3vDs8AMkFj96jW29cLYal7zVMleSCzdkkaVuo0vSACCSaLgRfekjTVHXlRdj7Z0KSS-s",
      },
    },
    dev: {
      initConfig: {
        apiKey: "AIzaSyDB6abvszOotW1tTyNDy8HC--lIIeuUIHg",
        authDomain: "clemson-ifai.firebaseapp.com",
        databaseURL: "https://clemson-ifai.firebaseio.com",
        projectId: "clemson-ifai",
        storageBucket: "clemson-ifai.appspot.com",
        messagingSenderId: "1086564300498",
        appId: "1:1086564300498:web:b1517d61a1112c7627df0b",
        measurementId: "G-K4JHDNC3D8",
      },
      messaging: {
        publicVapidKey:
          "BKIjszk90AdsqtBB9cC3vDs8AMkFj96jW29cLYal7zVMleSCzdkkaVuo0vSACCSaLgRfekjTVHXlRdj7Z0KSS-s",
      },
    },
    firebaseuiProps: {
      signInOptions: ["google.com", "password", "phone"],
    },
  },
  googleMaps: {
    apiKey: "AIzaSyByMSTTLt1Mf_4K1J9necAbw2NPDu2WD7g",
  },
  auth: {
    grants,
    redirectTo: "/calculate",
    persistKey: "base-shell:auth",
    signInURL: "/signin",
    onAuthStateChanged: async (user, auth, firebaseApp) => {
      if (user != null) {
        const grantsSnap = await firebaseApp
          .database()
          .ref(`user_grants/${user.uid}`)
          .once("value");

        const isAdminSnap = await firebaseApp
          .database()
          .ref(`admins/${user.uid}`)
          .once("value");

        firebaseApp
          .database()
          .ref(`user_grants/${user.uid}`)
          .on("value", (snap) => {
            auth.updateAuth({ grants: snap.val() });
          });

        firebaseApp
          .database()
          .ref(`admins/${user.uid}`)
          .on("value", (snap) => {
            auth.updateAuth({ isAdmin: !!snap.val() });
          });

        auth.updateAuth({
          ...defaultUserData(user),
          grants: grantsSnap.val(),
          isAdmin: !!isAdminSnap.val(),
          isGranted,
        });

        firebaseApp.database().ref(`users/${user.uid}`).update({
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
          providers: user.providerData,
          emailVerified: user.emailVerified,
          isAnonymous: user.isAnonymous,
        });

        await firebaseApp
          .database()
          .ref(`user_chats/${user.uid}/public_chat`)
          .update({
            displayName: "Public Chat",
            lastMessage: "Group chat",
            path: `group_chat_messages/public_chat`,
          });
      } else {
        firebaseApp.database().ref().off();
        auth.setAuth(defaultUserData(user));
      }
    },
  },
  getDefaultRoutes,
  routes,
  locale: {
    locales,
    persistKey: "base-shell:locale",
    defaultLocale: parseLanguages(["en", "de", "ru"], "en"),
    onError: (e) => {
      //console.warn(e)

      return;
    },
  },
  menu: {
    getMenuItems,
    MenuHeader: lazy(() =>
      import("material-ui-shell/lib/components/MenuHeader/MenuHeader")
    ),
  },
  theme: {
    themes,
    defaultThemeID: "default",
    defaultType: "light",
  },
  pages: {
    LandingPage: lazy(() => import("../pages/LandingPage")),
    PageNotFound: lazy(() => import("../pages/PageNotFound")),
  },
  components: {
    Menu: lazy(() =>
      import("rmw-shell/lib/containers/FirebaseMenu/FirebaseMenu")
    ),
    Loading,
  },

  containers: {
    AppContainer: lazy(() =>
      import("material-ui-shell/lib/containers/AppContainer/AppContainer")
    ),
    LayoutContainer: lazy(() =>
      import("rmw-shell/lib/containers/LayoutContainer/LayoutContainer")
    ),
  },
};

export default config;
