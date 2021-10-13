const router = require("express").Router();
// ---------------------------------------
const userCtrl = require("../controllers/user");
// ---------------------------------------
const auth = require("../middlewares/auth");
// ---------------------------------------

//
// Create a new user
router.post("/register", userCtrl.createUser);

//
// Login a user
router.post("/login", userCtrl.loginUser);

//
// Select all users
router.get("/all", auth, userCtrl.selectAllUsers);

//
// Select one user
router.get("/:id", auth, userCtrl.selectOneUser);

//
// Update one user INFOS
router.put("/update/infos/:id", auth, userCtrl.updateUserInfos);

//
// Update one user AVATAR
router.put("/update/avatar/:id", auth, userCtrl.updateUserAvatar);

//
// Update one user COVER
router.put("/update/cover/:id", auth, userCtrl.updateUserCover);

//
// Delete one user
router.delete("/delete/:id", auth, userCtrl.deleteUser);

//
//
//
module.exports = router;
