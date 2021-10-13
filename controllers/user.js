const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Like, Comment, Post } = require("../models");

//
// Create a new user
exports.createUser = async (req, res) => {
  const user = req.body;
  const firstName = user.firstName;
  const lastName = user.lastName;
  const email = user.email;
  const hashedPw = await bcrypt.hash(user.password, 10);
  try {
    const newUser = await User.create({ firstName, lastName, email, password: hashedPw });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

//
// Login a user
exports.loginUser = async (req, res) => {
  const user = req.body;
  const email = user.email;
  const password = user.password;
  try {
    const user = await User.findAll({ where: { email } });
    if (!user[0]) {
      res.status(404).json("Cet utilisateur n'existe pas");
    }
    if (user[0]) {
      const validPw = await bcrypt.compare(password, user[0].password);
      if (!validPw) {
        res.status(405).json("Mauvaise combinaison utilisateur / mot de passe.");
      }
      if (validPw) {
        res.status(200).json({
          user,
          token: jwt.sign({ userId: user[0].id, isAdmin: user[0].isAdmin }, "SUPER_SECRET_KEY", { expiresIn: "3h" }),
        });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//
// Select all users
exports.selectAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

//
// Select one user
exports.selectOneUser = async (req, res) => {
  try {
    const user = await User.findAll({ where: { id: req.params.id } });
    if (!user[0]) {
      res.status(404).json("Cet utilisateur n'existe pas.");
    }
    if (user[0]) {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//
// Update one user INFOS
exports.updateUserInfos = async (req, res) => {
  const user = req.body;
  try {
    if (req.params.id == req.user.userId || req.user.isAdmin) {
      const updatedUser = await User.update(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          birthday: user.birthday,
          city: user.city,
          fromCity: user.fromCity,
          relationship: user.relationship,
          scholarship: user.scholarship,
          job: user.job,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (!updatedUser[0]) {
        res.status(404).json("Cet utilisateur n'existe pas.");
      }
      if (updatedUser[0]) {
        res.status(200).json(`L'utilisateur a été mis à jour.`);
      }
    } else {
      res.status(404).json("Vous ne pouvez pas faire ça.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//
// Update one user AVATAR
exports.updateUserAvatar = async (req, res) => {
  const user = req.body;
  try {
    if (req.params.id == req.user.userId || req.user.isAdmin) {
      await User.update(
        {
          avatar: user.avatarPic,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json(`L'avatar a été mis à jour.`);
    } else {
      res.status(404).json("Vous ne pouvez pas faire ça.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//
// Update one user COVER
exports.updateUserCover = async (req, res) => {
  const user = req.body;
  try {
    if (req.params.id == req.user.userId || req.user.isAdmin) {
      await User.update(
        {
          cover: user.coverPic,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json(`La cover a été mis à jour.`);
    } else {
      res.statuts(404).json(`Vous ne pouvez pas faire ça.`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//
// Delete one user
exports.deleteUser = async (req, res) => {
  try {
    if (req.params.id == req.user.userId || req.user.isAdmin) {
      await User.destroy({ where: { id: req.params.id } });
      await Post.destroy({ where: { userId: req.params.id } });
      await Like.destroy({ where: { userId: req.params.id } });
      await Comment.destroy({ where: { userId: req.params.id } });
      res.status(200).json("L'utilisateur a été supprimé ainsi que ses posts, likes et comments.");
    } else {
      res.statuts(404).json(`Vous ne pouvez pas faire ça.`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
