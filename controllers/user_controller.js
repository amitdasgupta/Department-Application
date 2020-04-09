const User = require("../model/user");
const bcrypt = require("bcryptjs");
const config = require("../default/default.js");
const jwt = require("jsonwebtoken");
const Component = require("../model/components");
const orderMailer = require("../mailers/order_mailer");
module.exports.login = async function (req, res) {
  try {
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
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
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
    const randomData = await Component.aggregate([{ $sample: { size: 5 } }]);
    for (let i = 0; i < 8; i++) {
      let name = Math.random().toString(36).substring(7);
      let quantity = Math.floor(Math.random() * 11) + 10;
      let newData = await Component.create({
        name,
        quantity,
      });
      let count = 5;
      while (count--) {
        let randomItem = randomData[count];
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

module.exports.purchaseComponents = async function (req, res) {
  try {
    const component_id = req.params.cid;
    const compoObject = await Component.findById(component_id);
    const userObject = await User.findById(req.user.id);
    userObject.purchased.push(compoObject);
    compoObject.save();
    compoObject.quantity -= 1;
    userObject.save();
    if (compoObject.quantity <= 2) {
      const data = {
        user: {
          name: userObject.name,
          email: userObject.email,
        },
        component: compoObject,
      };
      orderMailer.newOrderItem(data);
    }
    return res.status(200).json({
      message: "Item purchased succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error,
    });
  }
};

module.exports.componentDetail = async function (req, res) {
  try {
    const component_id = req.params.cid;
    const allData = await Component.findById(component_id).populate({
      path: "related",
      options: { sort: { created_at: -1 } },
    });
    return res.status(200).json({
      data: allData,
      message: "Item purchased succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error,
    });
  }
};
