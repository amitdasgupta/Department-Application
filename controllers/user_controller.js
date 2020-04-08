const User = require("../model/user");
const bcrypt = require("bcryptjs");
const config = require("../default/default.json");
const jwt = require("jsonwebtoken");
const Component = require("../model/components");
module.exports.login = async function (req, res) {
  try {
    console.log("----------------------------->", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "please enter all the fileds" });
    }

    let user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
      jwt.sign(
        {
          id: user.id,
        },
        config.jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          console.log("successfully logged in");
          res.json({
            token,
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
            },
          });
        }
      );
    });
  } catch (error) {
    console.log(error);
    return res.json(error).status(400);
  }
};
module.exports.register = async function (req, res) {
  try {
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ msg: "please enter all the fileds" });
    }

    let user = await User.findOne({ email: email });
    if (user) return res.status(400).json({ msg: "User already exist" });
    user = new User({ email, name, password });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw err;
        user.password = hash;
        user.save().then((user) => {
          jwt.sign(
            {
              id: user.id,
            },
            config.jwtSecret,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  department: user.department,
                },
              });
            }
          );
        });
      });
    });
  } catch (error) {
    console.log(error);
    return res.json(error).status(400);
  }
};

module.exports.generateData = async function (req, res) {
  try {
    console.log("krenga na");
    const randomData = await Component.aggregate([{ $sample: { size: 5 } }]);
    console.log("data we got", randomData);
    for (let i = 0; i < 8; i++) {
      let name = Math.random().toString(36).substring(7);
      let quantity = Math.floor(Math.random() * 11) + 10;
      let newData = await Component.create({
        name,
        quantity,
      });
      let count = Math.floor(Math.random() * 6);
      while (count--) {
        let randomItem =
          randomData[Math.floor(Math.random() * (randomData.length + 1))];
        if (randomItem) {
          newData.related.push(randomItem);
        }
      }
      newData.save();
    }
    return res
      .json({
        succes: "success",
      })
      .status(200);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "unable to create data",
    });
  }
};

module.exports.giveComponents = async function (req, res) {
  try {
    const components = await Component.find({});
    console.log("data we got here", components);
    return res.status(200).json({
      status: "successfully fetched data",
      components,
    });
  } catch (error) {
    return res.status(400).json({
      error: "error in fetching components",
    });
  }
};
