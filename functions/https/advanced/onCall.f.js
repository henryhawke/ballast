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

    const file = admin.storage().bucket().file("storage/balance.xlsx");
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
      worksheet["D3"] = {
        t: "n",
        v: Math.floor(parseFloat(payload.tentLength)),
      };
      worksheet["D4"] = { t: "n", v: parseFloat(payload.tentWidth) }; // ft/m

      // ft / m
      worksheet["D5"] = { t: "n", v: parseFloat(payload.eaveHeight) };

      worksheet["D6"] = { t: "n", v: parseFloat(payload.roofType) };

      // ft / m
      worksheet["D7"] = { t: "n", v: parseFloat(payload.ridgeLength) };
      //worksheet["D5"] = { t: "n", v: parseFloat(payload.bandHeight) };

      //ft / m
      worksheet["D9"] = { t: "n", v: parseFloat(payload.roofHeight) };

      //worksheet["D9"] = { t: "s", v: "X" };

      // mph / km/h
      worksheet["D12"] = { t: "n", v: parseFloat(payload.windSpeed) };

      // mph / km/h
      worksheet["D13"] = { t: "n", v: parseFloat(payload.windFlow) };

      // valance height
      worksheet["D14"] = { t: "n", v: parseFloat(payload.valanceHeight) };

      // Number of intermediate posts in length D13

      worksheet["D20"] = { t: "n", v: parseFloat(payload.postsPerLength) };

      // Number of intermediate posts in width D14
      worksheet["D21"] = { t: "n", v: parseFloat(payload.postsPerWidth) };

      // Number of Number of ballasts per corner post D15
      worksheet["D22"] = {
        t: "n",
        v: parseFloat(payload.ballastsPerCornerPost),
      };

      // CALCULATION OF THE SPREADSHEET
      XLSX_CALC(workbook);

      var openFX = worksheet["J10"] ? worksheet["J10"].v : undefined;
      var openFY = worksheet["J11"] ? worksheet["J11"].v : undefined;
      var openFZ = worksheet["J12"] ? worksheet["J12"].v : undefined;
      var openOML = worksheet["J13"] ? worksheet["J13"].v : undefined;
      var openOMW = worksheet["J14"] ? worksheet["J14"].v : undefined;

      var encFX = worksheet["K10"] ? worksheet["K10"].v : undefined;
      var encFY = worksheet["K11"] ? worksheet["K11"].v : undefined;
      var encFZ = worksheet["K12"] ? worksheet["K12"].v : undefined;
      var encOML = worksheet["K13"] ? worksheet["K13"].v : undefined;
      var encOMW = worksheet["K14"] ? worksheet["K14"].v : undefined;

      // var totalBallasts = worksheet["K19"] ? worksheet["K19"].v : undefined;

      // Weights of each ballast  K23, L23, and M23.
      var openBallastWeight = worksheet["J19"] ? worksheet["J19"].v : undefined;
      var encBallastWeight = worksheet["K19"] ? worksheet["K19"].v : undefined;

      // Fixed-to-plate
      var b2mu3 = worksheet["E42"] ? worksheet["E43"].v : undefined;
      var b2wplate = worksheet["E43"] ? worksheet["E43"].v : undefined;

      var b2open = worksheet["E56"] ? worksheet["E56"].v : undefined;
      var b2enclosed = worksheet["F56"] ? worksheet["F56"].v : undefined;

      // Fixed-to-pole
      var c2mu1 = worksheet["G40"] ? worksheet["G40"].v : undefined;

      var c2open = worksheet["G56"] ? worksheet["G56"].v : undefined;
      var c2enclosed = worksheet["H56"] ? worksheet["H56"].v : undefined;
      // A
      var ad1 = worksheet["I34"] ? worksheet["I34"].v : undefined;
      var ad2 = worksheet["I35"] ? worksheet["I35"].v : undefined;

      var amu3 = worksheet["I42"] ? worksheet["I42"].v : undefined;
      var awplate = worksheet["I43"] ? worksheet["I43"].v : undefined;

      var aopen = worksheet["I56"] ? worksheet["I56"].v : undefined;
      var aenclosed = worksheet["J56"] ? worksheet["J56"].v : undefined;

      // B Assuming A
      var bd1 = worksheet["K34"] ? worksheet["K34"].v : undefined;
      var bd2 = worksheet["K35"] ? worksheet["K35"].v : undefined;

      var bd3 = worksheet["M36"] ? worksheet["M36"].v : undefined;
      var bd4 = worksheet["M37"] ? worksheet["M37"].v : undefined;
      var bh4 = worksheet["M38"] ? worksheet["M38"].v : undefined;

      var bmu2 = worksheet["M41"] ? worksheet["M41"].v : undefined;
      var bmu3 = worksheet["K42"] ? worksheet["K42"].v : undefined;
      var bwplate = worksheet["K43"] ? worksheet["K43"].v : undefined;

      var bopen = worksheet["K56"] ? worksheet["K56"].v : undefined;
      var benclosed = worksheet["L56"] ? worksheet["L56"].v : undefined;

      // C
      var cd1 = worksheet["O34"] ? worksheet["O34"].v : undefined;
      var cd3 = worksheet["O36"] ? worksheet["O36"].v : undefined;
      var cd4 = worksheet["O37"] ? worksheet["O37"].v : undefined;
      var ch4 = worksheet["O38"] ? worksheet["O38"].v : undefined;
      var cmu1 = worksheet["O40"] ? worksheet["O40"].v : undefined;

      var copen = worksheet["O56"] ? worksheet["O56"].v : undefined;
      var cenclosed = worksheet["P56"] ? worksheet["P56"].v : undefined;
      // D
      var dd2 = worksheet["Q35"] ? worksheet["Q35"].v : undefined;
      var dd4 = worksheet["Q37"] ? worksheet["Q37"].v : undefined;
      var dd5 = worksheet["Q39"] ? worksheet["Q39"].v : undefined;
      var dmu3 = worksheet["Q42"] ? worksheet["Q42"].v : undefined;
      var dwplate = worksheet["Q43"] ? worksheet["Q43"].v : undefined;

      var dopen = worksheet["Q56"] ? worksheet["Q56"].v : undefined;
      var denclosed = worksheet["R56"] ? worksheet["R56"].v : undefined;

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
        openBallastWeight: Math.floor(parseFloat(openBallastWeight)),
        encBallastWeight: Math.floor(parseFloat(encBallastWeight)),
        title: payload.title,
        time: admin.firestore.Timestamp.now(),
        share: payload.share,
        notes: payload.notes,
        b2mu3: Math.floor(parseFloat(b2mu3)),
        b2wplate: Math.floor(parseFloat(b2wplate)),
        b2open: Math.floor(parseFloat(b2open)),
        b2enclosed: Math.floor(parseFloat(b2enclosed)),
        c2mu1: Math.floor(parseFloat(c2mu1)),
        c2open: Math.floor(parseFloat(c2open)),
        c2enclosed: Math.floor(parseFloat(c2enclosed)),
        ad1: Math.floor(parseFloat(ad1)),
        ad2: Math.floor(parseFloat(ad2)),
        amu3: Math.floor(parseFloat(amu3)),
        awplate: Math.floor(parseFloat(awplate)),
        aopen: Math.floor(parseFloat(aopen)),
        aenclosed: Math.floor(parseFloat(aenclosed)),
        bd1: Math.floor(parseFloat(bd1)),
        bd2: Math.floor(parseFloat(bd2)),
        bd3: Math.floor(parseFloat(bd3)),
        bd4: Math.floor(parseFloat(bd4)),
        bh4: Math.floor(parseFloat(bh4)),
        bmu2: Math.floor(parseFloat(bmu2)),
        bmu3: Math.floor(parseFloat(bmu3)),
        bwplate: Math.floor(parseFloat(bwplate)),
        bopen: Math.floor(parseFloat(bopen)),
        benclosed: Math.floor(parseFloat(benclosed)),
        cd1: Math.floor(parseFloat(cd1)),
        cd3: Math.floor(parseFloat(cd3)),
        cd4: Math.floor(parseFloat(cd4)),
        ch4: Math.floor(parseFloat(ch4)),
        cmu1: Math.floor(parseFloat(cmu1)),
        copen: Math.floor(parseFloat(copen)),
        cenclosed: Math.floor(parseFloat(cenclosed)),
        dd2: Math.floor(parseFloat(dd2)),
        dd4: Math.floor(parseFloat(dd4)),
        dd5: Math.floor(parseFloat(dd5)),
        dmu3: Math.floor(parseFloat(dmu3)),
        dwplate: Math.floor(parseFloat(dwplate)),
        dopen: Math.floor(parseFloat(dopen)),
        denclosed: Math.floor(parseFloat(denclosed)),
      };

      admin
        .database()
        .ref(`/tasks/${context.auth.uid}/${payload.calcID}`)
        .update(returnData);

      return returnData;
    });
  });
