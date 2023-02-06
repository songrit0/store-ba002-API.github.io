import { initializeApp } from "@firebase/app";
import { getDatabase, ref, set, get, update, remove } from "firebase/database";
import express from "express";
import bodyParser from "body-parser";

var app2 = express();
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: true }));
var port = 4001;
var server = app2.listen(port, console.log("server is run port " + port));

const firebaseConfig = {
  databaseURL:
    "https://store-ba002-e5fd3-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// app2.get("/api/get", (req, res) => {
//   get(ref(db, "users"))
//     .then((snapshot) => {
//       let data = snapshot.val();
//       //   console.log(data);
//       if (snapshot.exists()) {
//         return res.status(200).json({ status: 200, Message: data });
//       } else {
//         return res.status(500).json({
//           status: 500,
//           Message: "erroe",
//         });
//       }
//     })
//     .catch((err) => {
//       return res.status(500).json({
//         status: 500,
//         Message: "erroe .EXE",
//         erroeMessage: err.message,
//       });
//     });
// });

app2.post("/addSTORE", (req, res) => {
  var STORE_name = req.body.STORE_name;
  var STORE_login = req.body.STORE_login;
  //   var STORE_login_password = req.body.STORE_login_password;
  var STORE_phone = req.body.STORE_phone;
  //   console.log(fullname);
  try {
    set(ref(db, "STORE_LOGIN/" + STORE_login), {
      STORE_name: STORE_name,
      STORE_login: STORE_login,
      STORE_phone: STORE_phone,
      Date_Add: new Date() + "",
    });
    return res.status(200).json({
      status: 200,
      Message: "OK",
     
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      Message: "erroe .EXE",
      erroeMessage: error.message,
    });
  }
});

//login
app2.get("/get_STORE:?", (req, res) => {
  var STORE = req.query.STORE;
  if (!STORE) {
    return res.status(500).json({
      status: 500,
      Message: "STORE is null!",
    });
  }
  get(ref(db, `STORE_LOGIN/${STORE}`))
    .then((snapshot) => {
      let data = snapshot.val();
      //   console.log(data);
      if (snapshot.exists()) {
        return res.status(200).json({ status: 200, Message: data });
      } else {
        return res.status(500).json({
          status: 500,
          Message: "erroe",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        status: 500,
        Message: "erroe .EXE",
        erroeMessage: err.message,
      });
    });
});

app2.post("/STOREitem", (req, res) => {
  var STORE_login = req.body.STORE_login;
  var item_name = req.body.item_name;
  var item_price = req.body.item_price;
  var item_number = req.body.item_number;
  var item_URL = req.body.item_URL;
  //   console.log(fullname);
  try {
    set(
      ref(
        db,
        "STORE_LOGIN/" + STORE_login + "/store_item/" + `name:${item_name}`
      ),
      {
        item_name: item_name,
        item_price: item_price,
        item_number: item_number,
        item_URL: item_URL,
        Date_Add: new Date() + "",
      }
    );
    return res.status(200).json({
      status: 200,
      Message: "OK",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      Message: "erroe .EXE",
      erroeMessage: error.message,
    });
  }
});
// app2.put("/api/put", (req, res) => {
//   var fullname = req.body.fullname;
//   var B = req.body.B;
//   try {
//     var payload = {};
//     payload[`users/${fullname}/B`] = B;
//     update(ref(db), payload)
//       .then(() => {
//         return res.status(200).json({
//           status: 200,
//           Message: "ok",
//         });
//       })
//       .catch(() => {
//         return res.status(500).json({
//           status: 500,
//           Message: "errrrrrrrrrr",
//         });
//       });
//   } catch (error) {
//     return res.status(500).json({
//       status: 500,
//       Message: "error",
//     });
//   }
// });

// app2.delete("/api/delete", (req, res) => {
//   var fullname = req.body.fullname;
//   try {
//     remove(
//       ref(
//         db,
//         "users/" //+ fullname
//       )
//     )
//       .then(() => {
//         return res.status(200).json({
//           status: 200,
//           Message: "ok",
//         });
//       })
//       .catch(() => {
//         return res.status(500).json({
//           status: 500,
//           Message: "errrrrrrrrrr",
//         });
//       });
//   } catch (error) {
//     return res.status(500).json({
//       status: 500,
//       MessageError: error,
//     });
//   }
// });
