import * as functions from "firebase-functions";
import admin from "firebase-admin";

// Test
// https://oss.sheetjs.com/sheetjs/
// for sheet conversion
const runtimeOpts = {
  timeoutSeconds: 60,
  memory: "2GB",
};

const XLSX = require("xlsx");
const XLSX_CALC = require("xlsx-calc");
const formulajs = require("formulajs");

function toNumber(value) {
  if (typeof value !== "number") {
    // covert type to number
    // void 0, null, true, false, 'abc', [], {} => NaN
    // [0] => 0
    value = parseFloat(value);
  }
  if (isNaN(value)) {
    // check NaN
    value = 0;
  }
  if (!isFinite(value)) {
    // check Infinity and -Infinity
    value = Number.MAX_SAFE_INTEGER * Math.sign(value);
  }
  return value;
}

// d2 - Type of tent (1 = Frame, 2 = Hybrid, 3 = Pole)
// d3 - Length
// d4 - Width
// d5 - Eave height
// d6 - Roof type (1 = G, 2 = H, 3 = P)
// d7 - Ridge length if Hip roof
// //d7 - Ridge length if any roof
// d9 - Roof height

// d12 - Wind speed
// d13 - Wind exposure (1 = Fully exposd, 2 = Partially exposed, 3 = Sheltered)
// d14 - Valence height

// d20 - Number of intermediate posts in length
// d21 - Number of intermediate posts in width
// d22 - Number of ballasts per corner post

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

      // type of tent (1- frame, 2, hybrid, 3=pole)
      worksheet["D2"] = {
        t: "n",
        v: toNumber(payload.tentType),
      };

      //height
      worksheet["D3"] = {
        t: "n",
        v: toNumber(payload.tentLength),
      };

      // width
      worksheet["D4"] = {
        t: "n",
        v: toNumber(payload.tentWidth),
      }; // ft/m

      // eave height
      worksheet["D5"] = {
        t: "n",
        v: toNumber(payload.eaveHeight),
      };

      // roof type (1 = Gable, 2 = Hip, 3 = Pyramid)
      worksheet["D6"] = {
        t: "n",
        v: toNumber(payload.roofType),
      };

      if (payload.roofType === "2") {
        worksheet["D7"] = { t: "n", v: toNumber(payload.ridgeLength) };
      }

      //worksheet["D7"] = { t: "n", v: toNumber(payload.ridgeLength) };
      //worksheet["D5"] = { t: "n", v: toNumber(payload.bandHeight) };
      if (payload.groundSurface === 1) {
        worksheet["G68"] = { t: "n", v: 0.44 };
      } else if (payload.groundSurface === 2) {
        worksheet["G68"] = { t: "n", v: 0.53 };
      } else if (payload.groundSurface === 3) {
        worksheet["G68"] = { t: "n", v: 0.48 };
      } else if (payload.groundSurface === 4) {
        worksheet["G68"] = { t: "n", v: 0.51 };
      } else if (payload.groundSurface === 5) {
        worksheet["G68"] = { t: "n", v: 0.58 };
      } else if (payload.groundSurface === 6) {
        worksheet["G68"] = { t: "n", v: 0.61 };
      }

      //Roof Height
      worksheet["D9"] = { t: "n", v: toNumber(payload.roofHeight) };

      // Wind Speed
      worksheet["D12"] = { t: "n", v: toNumber(payload.windSpeed) };

      // Wind exposure (1 = Fully exposd, 2 = Partially exposed, 3 = Sheltered)
      worksheet["D13"] = { t: "n", v: toNumber(payload.windFlow) };

      // valance height
      worksheet["D14"] = { t: "n", v: toNumber(payload.valenceHeight) };

      // Number of intermediate posts in length D20
      worksheet["D20"] = { t: "n", v: toNumber(payload.postsPerLength) };

      // Number of intermediate posts in width D21
      worksheet["D21"] = { t: "n", v: toNumber(payload.postsPerWidth) };

      // Number of Number of ballasts per corner post D22
      worksheet["D22"] = {
        t: "n",
        v: toNumber(payload.ballastsPerCornerPost),
      };

      var groundSurface = toNumber(payload.groundSurface);
      var ballastMaterial = toNumber(payload.ballastMaterial);

      var mu1 = 0.79;
      var mu2 = 0.2;
      var mu3 = 0.79;

      // console.log("PAYLOAD:");
      // console.log(payload);

      if (payload.advanced) {
        console.log("ADVANCED TURNED ON");
        worksheet["I59"] = { t: "n", v: toNumber(payload.groundSurface) };

        if (ballastMaterial === 1) {
          mu2 = 0.2;
        } else if (ballastMaterial === 2) {
          mu2 = 0.5;
        } else if (ballastMaterial === 3) {
          mu2 = 0.44;
        }

        if (groundSurface === 1) {
          // smoothConcrete
          if (ballastMaterial === 1) {
            mu1 = 0.26;
          } else if (ballastMaterial === 2) {
            mu1 = 0.3;
          } else if (ballastMaterial === 3) {
            mu1 = 0.38;
          }
          mu3 = 0.44;
        } else if (groundSurface === 2) {
          // roughConcrete
          if (ballastMaterial === 1) {
            mu1 = 0.4;
          } else if (ballastMaterial === 2) {
            mu1 = 0.74;
          } else if (ballastMaterial === 3) {
            mu1 = 0.77;
          }
          mu3 = 0.53;
        } else if (groundSurface === 3) {
          if (ballastMaterial === 1) {
            mu1 = 0.43;
          } else if (ballastMaterial === 2) {
            mu1 = 0.86;
          } else if (ballastMaterial === 3) {
            mu1 = 0.79;
          }
          // Asphalt
          mu3 = 0.48;
        } else if (groundSurface === 4) {
          // Gravel
          if (ballastMaterial === 1) {
            mu1 = 0.39;
          } else if (ballastMaterial === 2) {
            mu1 = 0.45;
          } else if (ballastMaterial === 3) {
            mu1 = 0.52;
          }
          mu3 = 0.51;
        } else if (groundSurface === 5) {
          // Dirt
          if (ballastMaterial === 1) {
            mu1 = 0.42;
          } else if (ballastMaterial === 2) {
            mu1 = 0.43;
          } else if (ballastMaterial === 3) {
            mu1 = 0.37;
          }
          mu3 = 0.58;
        } else if (groundSurface === 6) {
          // Grass
          if (ballastMaterial === 1) {
            mu1 = 0.46;
          } else if (ballastMaterial === 2) {
            mu1 = 0.81;
          } else if (ballastMaterial === 3) {
            mu1 = 0.69;
          }
          mu3 = 0.61;
        }

        worksheet["E42"] = {
          t: "n",
          v: mu3,
        };
        worksheet["E43"] = {
          t: "n",
          v: toNumber(payload.b2wplate),
        };
        worksheet["G40"] = {
          t: "n",
          v: mu1,
        };
        worksheet["I34"] = {
          t: "n",
          v: toNumber(payload.ad1),
        };
        worksheet["I35"] = {
          t: "n",
          v: toNumber(payload.ad2),
        };
        worksheet["I42"] = {
          t: "n",
          v: mu3,
        };
        worksheet["I43"] = {
          t: "n",
          v: toNumber(payload.awplate),
        };
        worksheet["K34"] = {
          t: "n",
          v: toNumber(payload.bd1),
        };
        worksheet["K35"] = {
          t: "n",
          v: toNumber(payload.bd2),
        };
        worksheet["M36"] = {
          t: "n",
          v: toNumber(payload.bd3),
        };
        worksheet["M37"] = {
          t: "n",
          v: toNumber(payload.bd4),
        };
        worksheet["M38"] = {
          t: "n",
          v: toNumber(payload.bh4),
        };
        worksheet["K41"] = {
          t: "n",
          v: mu2,
        };
        worksheet["K42"] = {
          t: "n",
          v: mu3,
        };
        worksheet["K43"] = {
          t: "n",
          v: toNumber(payload.bwplate),
        };
        worksheet["O34"] = {
          t: "n",
          v: toNumber(payload.cd1),
        };
        worksheet["O36"] = {
          t: "n",
          v: toNumber(payload.cd3),
        };
        worksheet["O37"] = {
          t: "n",
          v: toNumber(payload.cd4),
        };
        worksheet["O38"] = {
          t: "n",
          v: toNumber(payload.ch4),
        };
        worksheet["O40"] = {
          t: "n",
          v: mu1,
        };
        worksheet["Q35"] = {
          t: "n",
          v: toNumber(payload.dd2),
        };
        worksheet["Q37"] = {
          t: "n",
          v: toNumber(payload.dd4),
        };
        worksheet["Q39"] = {
          t: "n",
          v: toNumber(payload.dd5),
        };
        worksheet["Q42"] = {
          t: "n",
          v: mu3,
        };
        worksheet["Q43"] = {
          t: "n",
          v: toNumber(payload.dwplate),
        };
      }

      // CALCULATION OF THE SPREADSHEET
      XLSX_CALC(workbook);

      var totalBallasts = worksheet["D23"]
        ? worksheet["D23"].v
        : 2 * (payload.postsPerLength + payload.postsPerWidth) +
          4 * payload.ballastsPerCornerPost;
      console.log("the total number of ballasts is " + totalBallasts);

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

      // Weights of each ballast  K23, L23, and M23.

      var openBallastWeight;
      var encBallastWeight;

      console.log("BALLAST TYPE" + payload.ballastType);
      var ballastType = toNumber(payload.ballastType);

      if (payload.advanced) {
        if (ballastType === 1) {
          // Fixed-To-Plate
          openBallastWeight = worksheet["E58"] ? worksheet["E58"].v : 0;
          encBallastWeight = worksheet["F58"] ? worksheet["F48"].v : 0;
        } else if (ballastType === 2) {
          // Fixed-To-Pole
          openBallastWeight = worksheet["G58"] ? worksheet["G58"].v : 0;
          encBallastWeight = worksheet["H58"] ? worksheet["H48"].v : 0;
        } else if (ballastType === 3) {
          // A
          openBallastWeight = worksheet["I58"] ? worksheet["I58"].v : 0;
          encBallastWeight = worksheet["J58"] ? worksheet["J48"].v : 0;
        } else if (ballastType === 4) {
          // B assuming A
          openBallastWeight = worksheet["K58"] ? worksheet["K58"].v : 0;
          encBallastWeight = worksheet["L58"] ? worksheet["L48"].v : 0;
          // } else if (payload.ballastType === 5) {
          //   // B assuming C
          //   openBallastWeight = worksheet["K58"] ? worksheet["K58"].v : 0;
          //   encBallastWeight = worksheet["L58"] ? worksheet["L48"].v : 0;
        } else if (ballastType === 5) {
          // C
          openBallastWeight = worksheet["O58"] ? worksheet["O58"].v : 0;
          encBallastWeight = worksheet["P58"] ? worksheet["P48"].v : 0;
        } else if (ballastType === 6) {
          //D
          openBallastWeight = worksheet["Q58"] ? worksheet["Q58"].v : 0;
          encBallastWeight = worksheet["R58"] ? worksheet["R48"].v : 0;
        }
      } else {
        openBallastWeight = worksheet["J19"] ? worksheet["J19"].v : 0;
        encBallastWeight = worksheet["K19"] ? worksheet["K19"].v : 0;
      }

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
        payload.title = "Calculation" + payload.projectDate;
      }

      const returnData = {
        calcID: payload.calcID,
        owner: context.auth.uid,
        projectDate: payload.projectDate,
        title: payload.title,

        time: admin.firestore.Timestamp.now(),
        share: payload.share,
        notes: payload.notes,
        openFX: Math.floor(toNumber(openFX)),
        openFY: Math.floor(toNumber(openFY)),
        openFZ: Math.floor(toNumber(openFZ)),
        openOML: Math.floor(toNumber(openOML)),
        openOMW: Math.floor(toNumber(openOMW)),
        encFX: Math.floor(toNumber(encFX)),
        encFY: Math.floor(toNumber(encFY)),
        encFZ: Math.floor(toNumber(encFZ)),
        encOML: Math.floor(toNumber(encOML)),
        encOMW: Math.floor(toNumber(encOMW)),
        windSpeed: toNumber(payload.windSpeed),
        windFlow: toNumber(payload.windFlow),
        tentWidth: toNumber(payload.tentWidth),
        tentLength: toNumber(payload.tentLength),
        eaveHeight: toNumber(payload.eaveHeight),
        bandHeight: toNumber(payload.bandHeight),
        roofType: toNumber(payload.roofType),
        tentType: toNumber(payload.tentType),
        ridgeLength: toNumber(payload.ridgeLength),
        roofHeight: toNumber(payload.roofHeight),
        postsPerWidth: toNumber(payload.postsPerWidth),
        postsPerLength: toNumber(payload.postsPerLength),
        ballastsPerIntermediate: toNumber(payload.ballastsPerIntermediate),
        ballastsPerCornerPost: toNumber(payload.ballastsPerCornerPost),
        openBallastWeight: Math.floor(toNumber(openBallastWeight)),
        encBallastWeight: Math.floor(toNumber(encBallastWeight)),
        // advOpenBallastWeight: Math.floor(toNumber(advOpenBallastWeight)),
        // advEncBallastWeight: Math.floor(toNumber(advEncBallastWeight)),
        valenceHeight: Math.floor(toNumber(payload.valenceHeight)),
        totalBallasts: toNumber(totalBallasts),

        b2mu3: toNumber(b2mu3),
        b2wplate: toNumber(b2wplate),
        b2open: Math.floor(toNumber(b2open)),
        b2enclosed: Math.floor(toNumber(b2enclosed)),
        c2mu1: toNumber(c2mu1),
        c2open: Math.floor(toNumber(c2open)),
        c2enclosed: Math.floor(toNumber(c2enclosed)),
        ad1: toNumber(ad1),
        ad2: toNumber(ad2),
        amu3: toNumber(amu3),
        awplate: toNumber(awplate),
        aopen: Math.floor(toNumber(aopen)),
        aenclosed: Math.floor(toNumber(aenclosed)),
        bd1: toNumber(bd1),
        bd2: toNumber(bd2),
        bd3: toNumber(bd3),
        bd4: toNumber(bd4),
        bh4: toNumber(bh4),
        bmu2: toNumber(bmu2),
        bmu3: toNumber(bmu3),
        bwplate: toNumber(bwplate),
        bopen: Math.floor(toNumber(bopen)),
        benclosed: Math.floor(toNumber(benclosed)),
        cd1: toNumber(cd1),
        cd3: toNumber(cd3),
        cd4: toNumber(cd4),
        ch4: toNumber(ch4),
        cmu1: toNumber(cmu1),
        copen: Math.floor(toNumber(copen)),
        cenclosed: Math.floor(toNumber(cenclosed)),
        dd2: toNumber(dd2),
        dd4: toNumber(dd4),
        dd5: toNumber(dd5),
        dmu3: toNumber(dmu3),
        dwplate: toNumber(dwplate),
        dopen: Math.floor(toNumber(dopen)),
        advanced: payload.advanced,
        denclosed: Math.floor(toNumber(denclosed)),
        ballastType: toNumber(payload.ballastType),
        ballastMaterial: payload.ballastMaterial,
      };
      console.log("totalBallasts:" + totalBallasts);
      console.log(openBallastWeight + " enc: " + encBallastWeight);
      console.log(
        "OPEN OML, OMW, FX, FY, FZ: " +
          openOML +
          " | " +
          openOMW +
          " | " +
          openFX +
          " | " +
          openFY +
          " | " +
          openFZ
      );
      console.log(
        "ENC OML, OMW, FX, FY, FZ: " +
          encOML +
          " | " +
          encOMW +
          " | " +
          encFX +
          " | " +
          encFY +
          " | " +
          encFZ
      );
      //console.log(returnData);
      admin
        .database()
        .ref(`/tasks/${context.auth.uid}/${payload.calcID}`)
        .update(returnData);

      return returnData;
    });
  });
