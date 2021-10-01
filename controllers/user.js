const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

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
          token: jwt.sign({ userId: user[0].id, isAdmin: user[0].isAdmin }, process.env.JWT_KEY, { expiresIn: "3h" }),
        });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// { user, token: jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, "Super_Secret_Key", { expiresIn: "3h" }) }

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
  } catch (err) {
    res.status(500).json(err);
  }
};

//
// Update one user AVATAR
exports.updateUserAvatar = async (req, res) => {
  console.log(req);
  try {
    if (!req.file) {
      const user = req.body;
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
      res.status(200).json(`L'utilisateur a été mis à jour.`);
    } else {
      console.log(req);
      await User.update(
        {
          avatar: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json(`L'utilisateur a été mis à jour.`);
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
    if (!req.file) {
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
      res.status(200).json(`L'utilisateur a été mis à jour.`);
    } else {
      await User.update(
        {
          cover: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json(`L'utilisateur a été mis à jour.`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//
// Update one user CREDENTIALS
exports.updateUserCredentials = async (req, res) => {
  const user = req.body;
  const email = user.email;
  const oldPw = user.oldPw;
  const newPw = user.newPw;

  try {
    const u = await User.findAll({ where: { id: req.params.id } });
    const validPw = await bcrypt.compare(oldPw, u[0].password);

    if (!validPw) {
      res.status(405).json("Le mot de passe est incorrect.");
    }

    if (validPw) {
      const newHashedPw = await bcrypt.hash(newPw, 10);
      await User.update(
        {
          email: email !== null ? email : u[0].email,
          password: newPw !== null ? newHashedPw : u[0].password,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json("Mise a jour effectuée.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//
// Delete one user
exports.deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.status(200).json("L'utilisateur a été supprimé.");
  } catch (err) {
    res.status(500).json(err);
  }
};
