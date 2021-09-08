import * as functions from "firebase-functions";
import admin from "firebase-admin";

// https://oss.sheetjs.com/sheetjs/
// for sheet conversion
const runtimeOpts = {
  timeoutSeconds: 540,
  memory: "4GB",
};

const XLSX = require("xlsx");
const XLSX_CALC = require("xlsx-calc");
const formulajs = require("formulajs");

export default functions
  .region("us-central1")
  .runWith(runtimeOpts)
  .https.onCall((sent, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called while authenticated."
      );
    }

    const payload = sent.values;

    if (payload === null) {
      console.log("keep alive");
      return;
    }

    const file = admin.storage().bucket().file("storage/aug30-main40.2.xlsx");
    return file.download().then((data) => {
      // import your calc functions lib
      XLSX_CALC.import_functions(formulajs);
      var workbook = XLSX.read(data[0], {
        type: "buffer",
        WTF: true,
        bookType: "xlsx",
        bookDeps: true,
      });
      var worksheet = workbook.Sheets["Main"];

      if (payload.units === 1) {
      }

      /* Get the value */

      // change some cell value
      // workbook.Sheets["Main"].A1.v = 42;
      worksheet["D2"] = {
        t: "n",
        v: Math.floor(parseFloat(payload.tentLength)),
      };
      worksheet["D3"] = { t: "n", v: parseFloat(payload.tentWidth) }; // ft/m

      // ft / m
      worksheet["D4"] = { t: "n", v: parseFloat(payload.eaveHeight) };

      worksheet["D5"] = { t: "n", v: parseFloat(payload.roofType) };

      // ft / m
      worksheet["D6"] = { t: "n", v: parseFloat(payload.ridgeLength) };
      //worksheet["D5"] = { t: "n", v: parseFloat(payload.bandHeight) };

      //ft / m
      worksheet["D8"] = { t: "n", v: parseFloat(payload.roofHeight) };

      //worksheet["D9"] = { t: "s", v: "X" };

      // mph / km/h
      worksheet["D11"] = { t: "n", v: parseFloat(payload.windSpeed) };

      // mph / km/h
      worksheet["D12"] = { t: "n", v: parseFloat(payload.windFlow) };

      // Number of intermediate posts in length D13

      worksheet["D17"] = { t: "n", v: parseFloat(payload.postsPerLength) };

      // Number of intermediate posts in width D14
      worksheet["D18"] = { t: "n", v: parseFloat(payload.postsPerWidth) };

      // Number of Number of ballasts per corner post D15
      worksheet["D19"] = {
        t: "n",
        v: parseFloat(payload.ballastsPerCornerPost),
      };

      // CALCULATION OF THE SPREADSHEET
      XLSX_CALC(workbook);

      var openFX = worksheet["K3"] ? worksheet["K3"].v : undefined;
      var openFY = worksheet["K4"] ? worksheet["K4"].v : undefined;
      var openFZ = worksheet["K5"] ? worksheet["K5"].v : undefined;
      var openOML = worksheet["K6"] ? worksheet["K6"].v : undefined;
      var openOMW = worksheet["K7"] ? worksheet["K7"].v : undefined;
      var partFX = worksheet["L3"] ? worksheet["L3"].v : undefined;
      var partFY = worksheet["L4"] ? worksheet["L4"].v : undefined;
      var partFZ = worksheet["L5"] ? worksheet["L5"].v : undefined;
      var partOML = worksheet["L6"] ? worksheet["L6"].v : undefined;
      var partOMW = worksheet["L7"] ? worksheet["L7"].v : undefined;
      var encFX = worksheet["M3"] ? worksheet["M3"].v : undefined;
      var encFY = worksheet["M4"] ? worksheet["M4"].v : undefined;
      var encFZ = worksheet["M5"] ? worksheet["M5"].v : undefined;
      var encOML = worksheet["M6"] ? worksheet["M6"].v : undefined;
      var encOMW = worksheet["M7"] ? worksheet["M7"].v : undefined;

      var totalBallasts = worksheet["K19"] ? worksheet["K19"].v : undefined;

      // Weights of each ballast  K23, L23, and M23.
      var openBallastWeight = worksheet["K27"] ? worksheet["K27"].v : undefined;
      var partBallastWeight = worksheet["L27"] ? worksheet["L27"].v : undefined;
      var encBallastWeight = worksheet["M27"] ? worksheet["M27"].v : undefined;

      // console.log(encOMW);

      if (payload.title === "") {
        payload.title = "Calculation";
      }

      const returnData = {
        calcID: payload.calcID,
        owner: context.auth.uid,
        openFX: Math.floor(parseFloat(openFX)),
        openFY: Math.floor(parseFloat(openFY)),
        openFZ: Math.floor(parseFloat(openFZ)),
        openOML: Math.floor(parseFloat(openOML)),
        openOMW: Math.floor(parseFloat(openOMW)),
        partFX: Math.floor(parseFloat(partFX)),
        partFY: Math.floor(parseFloat(partFY)),
        partFZ: Math.floor(parseFloat(partFZ)),
        partOML: Math.floor(parseFloat(partOML)),
        partOMW: Math.floor(parseFloat(partOMW)),
        encFX: Math.floor(parseFloat(encFX)),
        encFY: Math.floor(parseFloat(encFY)),
        encFZ: Math.floor(parseFloat(encFZ)),
        encOML: Math.floor(parseFloat(encOML)),
        encOMW: Math.floor(parseFloat(encOMW)),
        windSpeed: Math.floor(parseFloat(payload.windSpeed)),
        windFlow: Math.floor(parseFloat(payload.windFlow)),
        tentWidth: Math.floor(parseFloat(payload.tentWidth)),
        tentLength: Math.floor(parseFloat(payload.tentLength)),
        eaveHeight: Math.floor(parseFloat(payload.eaveHeight)),
        bandHeight: Math.floor(parseFloat(payload.bandHeight)),
        roofType: Math.floor(parseFloat(payload.roofType)),
        ridgeLength: Math.floor(parseFloat(payload.ridgeLength)),
        roofHeight: Math.floor(parseFloat(payload.roofHeight)),
        postsPerWidth: Math.floor(parseFloat(payload.postsPerWidth)),
        postsPerLength: Math.floor(parseFloat(payload.postsPerLength)),
        ballastsPerIntermediate: Math.floor(
          parseFloat(payload.ballastsPerIntermediate)
        ),
        ballastsPerCornerPost: Math.floor(
          parseFloat(payload.ballastsPerCornerPost)
        ),
        totalBallasts: totalBallasts,
        openBallastWeight: Math.floor(parseFloat(openBallastWeight)),
        partBallastWeight: Math.floor(parseFloat(partBallastWeight)),
        encBallastWeight: Math.floor(parseFloat(encBallastWeight)),
        title: payload.title,
        time: admin.firestore.Timestamp.now(),
        share: payload.share,
        notes: payload.notes,
      };

      admin
        .database()
        .ref(`/tasks/${context.auth.uid}/${payload.calcID}`)
        .update(returnData);

      return returnData;
    });
  });
