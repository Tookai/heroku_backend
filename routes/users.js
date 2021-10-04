const router = require("express").Router();

// ---------------------------------------
const userCtrl = require("../controllers/user");
// ---------------------------------------

//
// Create a new user
router.post("/register", userCtrl.createUser);

//
// Login a user
router.post("/login", userCtrl.loginUser);

//
// Select all users
router.get("/all", userCtrl.selectAllUsers);

//
// Select one user
router.get("/:id", userCtrl.selectOneUser);

//
// Update one user INFOS
router.put("/update/infos/:id", userCtrl.updateUserInfos);

//
// Update one user AVATAR
router.put("/update/avatar/:id", userCtrl.updateUserAvatar);

//
// Update one user COVER
router.put("/update/cover/:id", userCtrl.updateUserCover);

//
// Update one user CREDENTIALS
router.put("/update/credentials/:id", userCtrl.updateUserCredentials);

//
// Delete one user
router.delete("/delete/:id", userCtrl.deleteUser);

//
//
//
module.exports = router;
