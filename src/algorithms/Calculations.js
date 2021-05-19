import { useFirebase } from "rmw-shell/lib/providers/Firebase";

// eslint-disable-next-line
export default ({ data }) => {
  console.log("got to calculations class");
  const { firebaseApp } = useFirebase();
  firebaseApp
    .firestore()
    .collection("members")
    .doc(firebaseApp.auth().currentUser.uid)
    .collection("saved")
    .doc(data.calcID)
    .onSnapshot(
      function (snapshot) {
        return snapshot.data();
      },
      function (error) {
        console.log(error);
        return null;
      }
    );
};
