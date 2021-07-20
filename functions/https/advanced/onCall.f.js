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

    const file = admin.storage().bucket().file("storage/jul1621-advanced.xlsx");
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
        v: parseFloat(payload.tentLength),
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

      worksheet["E42"] = {
        t: "n",
        v: parseFloat(payload.b2mu3),
      };
      worksheet["E43"] = {
        t: "n",
        v: parseFloat(payload.b2wplate),
      };
      worksheet["G40"] = {
        t: "n",
        v: parseFloat(payload.c2mu1),
      };
      worksheet["I34"] = {
        t: "n",
        v: parseFloat(payload.ad1),
      };
      worksheet["I35"] = {
        t: "n",
        v: parseFloat(payload.ad2),
      };
      worksheet["I42"] = {
        t: "n",
        v: parseFloat(payload.amu3),
      };
      worksheet["I43"] = {
        t: "n",
        v: parseFloat(payload.awplate),
      };
      worksheet["K34"] = {
        t: "n",
        v: parseFloat(payload.bd1),
      };
      worksheet["K35"] = {
        t: "n",
        v: parseFloat(payload.bd2),
      };
      worksheet["M36"] = {
        t: "n",
        v: parseFloat(payload.bd3),
      };
      worksheet["M37"] = {
        t: "n",
        v: parseFloat(payload.bd4),
      };
      worksheet["M38"] = {
        t: "n",
        v: parseFloat(payload.bh4),
      };
      worksheet["K41"] = {
        t: "n",
        v: parseFloat(payload.bmu2),
      };
      worksheet["K42"] = {
        t: "n",
        v: parseFloat(payload.bmu3),
      };
      worksheet["K43"] = {
        t: "n",
        v: parseFloat(payload.bwplate),
      };
      worksheet["O34"] = {
        t: "n",
        v: parseFloat(payload.cd1),
      };
      worksheet["O36"] = {
        t: "n",
        v: parseFloat(payload.cd3),
      };
      worksheet["O37"] = {
        t: "n",
        v: parseFloat(payload.cd4),
      };
      worksheet["O38"] = {
        t: "n",
        v: parseFloat(payload.ch4),
      };
      worksheet["O40"] = {
        t: "n",
        v: parseFloat(payload.cmu1),
      };
      worksheet["Q35"] = {
        t: "n",
        v: parseFloat(payload.dd2),
      };
      worksheet["Q37"] = {
        t: "n",
        v: parseFloat(payload.dd4),
      };
      worksheet["Q39"] = {
        t: "n",
        v: parseFloat(payload.dd5),
      };
      worksheet["Q42"] = {
        t: "n",
        v: parseFloat(payload.dmu3),
      };
      worksheet["Q43"] = {
        t: "n",
        v: parseFloat(payload.dwplate),
      };

      // CALCULATION OF THE SPREADSHEET
      XLSX_CALC(workbook);

      var openFX = worksheet["J10"] ? worksheet["J10"].v : 0;
      var openFY = worksheet["J11"] ? worksheet["J11"].v : 0;
      var openFZ = worksheet["J12"] ? worksheet["J12"].v : 0;
      var openOML = worksheet["J13"] ? worksheet["J13"].v : 0;
      var openOMW = worksheet["J14"] ? worksheet["J14"].v : 0;

      var encFX = worksheet["K10"] ? worksheet["K10"].v : 0;
      var encFY = worksheet["K11"] ? worksheet["K11"].v : 0;
      var encFZ = worksheet["K12"] ? worksheet["K12"].v : 0;
      var encOML = worksheet["K13"] ? worksheet["K13"].v : 0;
      var encOMW = worksheet["K14"] ? worksheet["K14"].v : 0;

      // var totalBallasts = worksheet["K19"] ? worksheet["K19"].v : 0;

      // Weights of each ballast  K23, L23, and M23.
      var openBallastWeight = worksheet["J19"] ? worksheet["J19"].v : 0;
      var encBallastWeight = worksheet["K19"] ? worksheet["K19"].v : 0;

      // Fixed-to-plate

      var b2mu3 = worksheet["E42"] ? worksheet["E42"].v : 0;
      var b2wplate = worksheet["E43"] ? worksheet["E43"].v : 0;

      var b2open = worksheet["E56"] ? worksheet["E56"].v : 0;
      var b2enclosed = worksheet["F56"] ? worksheet["F56"].v : 0;

      // Fixed-to-pole

      var c2mu1 = worksheet["G40"] ? worksheet["G40"].v : 0;

      var c2open = worksheet["G56"] ? worksheet["G56"].v : 0;
      var c2enclosed = worksheet["H56"] ? worksheet["H56"].v : 0;
      // A

      var ad1 = worksheet["I34"] ? worksheet["I34"].v : 0;
      var ad2 = worksheet["I35"] ? worksheet["I35"].v : 0;

      var amu3 = worksheet["I42"] ? worksheet["I42"].v : 0;
      var awplate = worksheet["I43"] ? worksheet["I43"].v : 0;

      var aopen = worksheet["I56"] ? worksheet["I56"].v : 0;
      var aenclosed = worksheet["J56"] ? worksheet["J56"].v : 0;

      // B Assuming A
      var bd1 = worksheet["K34"] ? worksheet["K34"].v : 0;
      var bd2 = worksheet["K35"] ? worksheet["K35"].v : 0;

      var bd3 = worksheet["M36"] ? worksheet["M36"].v : 0;
      var bd4 = worksheet["M37"] ? worksheet["M37"].v : 0;
      var bh4 = worksheet["M38"] ? worksheet["M38"].v : 0;

      var bmu2 = worksheet["M41"] ? worksheet["M41"].v : 0;
      var bmu3 = worksheet["K42"] ? worksheet["K42"].v : 0;
      var bwplate = worksheet["K43"] ? worksheet["K43"].v : 0;

      var bopen = worksheet["K56"] ? worksheet["K56"].v : 0;
      var benclosed = worksheet["L56"] ? worksheet["L56"].v : 0;

      // C
      var cd1 = worksheet["O34"] ? worksheet["O34"].v : 0;
      var cd3 = worksheet["O36"] ? worksheet["O36"].v : 0;
      var cd4 = worksheet["O37"] ? worksheet["O37"].v : 0;
      var ch4 = worksheet["O38"] ? worksheet["O38"].v : 0;
      var cmu1 = worksheet["O40"] ? worksheet["O40"].v : 0;

      var copen = worksheet["O56"] ? worksheet["O56"].v : 0;
      var cenclosed = worksheet["P56"] ? worksheet["P56"].v : 0;
      // D
      var dd2 = worksheet["Q35"] ? worksheet["Q35"].v : 0;
      var dd4 = worksheet["Q37"] ? worksheet["Q37"].v : 0;
      var dd5 = worksheet["Q39"] ? worksheet["Q39"].v : 0;
      var dmu3 = worksheet["Q42"] ? worksheet["Q42"].v : 0;
      var dwplate = worksheet["Q43"] ? worksheet["Q43"].v : 0;

      var dopen = worksheet["Q56"] ? worksheet["Q56"].v : 0;
      var denclosed = worksheet["R56"] ? worksheet["R56"].v : 0;

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
        windSpeed: parseFloat(payload.windSpeed),
        windFlow: parseFloat(payload.windFlow),
        tentWidth: parseFloat(payload.tentWidth),
        tentLength: parseFloat(payload.tentLength),
        eaveHeight: parseFloat(payload.eaveHeight),
        bandHeight: parseFloat(payload.bandHeight),
        roofType: parseFloat(payload.roofType),
        ridgeLength: parseFloat(payload.ridgeLength),
        roofHeight: parseFloat(payload.roofHeight),
        postsPerWidth: parseFloat(payload.postsPerWidth),
        postsPerLength: parseFloat(payload.postsPerLength),
        ballastsPerIntermediate: parseFloat(payload.ballastsPerIntermediate),
        ballastsPerCornerPost: parseFloat(payload.ballastsPerCornerPost),
        openBallastWeight: Math.floor(parseFloat(openBallastWeight)),
        encBallastWeight: Math.floor(parseFloat(encBallastWeight)),
        title: payload.title,
        time: admin.firestore.Timestamp.now(),
        share: payload.share,
        notes: payload.notes,
        b2mu3: parseFloat(b2mu3),
        b2wplate: parseFloat(b2wplate),
        b2open: Math.floor(parseFloat(b2open)),
        b2enclosed: Math.floor(parseFloat(b2enclosed)),
        c2mu1: parseFloat(c2mu1),
        c2open: Math.floor(parseFloat(c2open)),
        c2enclosed: Math.floor(parseFloat(c2enclosed)),
        ad1: parseFloat(ad1),
        ad2: parseFloat(ad2),
        amu3: parseFloat(amu3),
        awplate: parseFloat(awplate),
        aopen: Math.floor(parseFloat(aopen)),
        aenclosed: Math.floor(parseFloat(aenclosed)),
        bd1: parseFloat(bd1),
        bd2: parseFloat(bd2),
        bd3: parseFloat(bd3),
        bd4: parseFloat(bd4),
        bh4: parseFloat(bh4),
        bmu2: parseFloat(bmu2),
        bmu3: parseFloat(bmu3),
        bwplate: parseFloat(bwplate),
        bopen: Math.floor(parseFloat(bopen)),
        benclosed: Math.floor(parseFloat(benclosed)),
        cd1: parseFloat(cd1),
        cd3: parseFloat(cd3),
        cd4: parseFloat(cd4),
        ch4: parseFloat(ch4),
        cmu1: parseFloat(cmu1),
        copen: Math.floor(parseFloat(copen)),
        cenclosed: Math.floor(parseFloat(cenclosed)),
        dd2: parseFloat(dd2),
        dd4: parseFloat(dd4),
        dd5: parseFloat(dd5),
        dmu3: parseFloat(dmu3),
        dwplate: parseFloat(dwplate),
        dopen: Math.floor(parseFloat(dopen)),
        denclosed: Math.floor(parseFloat(denclosed)),
      };
      console.log(returnData);
      console.log(openOML);
      console.log(openOML);
      admin
        .database()
        .ref(`/tasks/${context.auth.uid}/${payload.calcID}`)
        .update(returnData);

      return returnData;
    });
  });
