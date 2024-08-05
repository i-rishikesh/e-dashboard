const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const app = express();
const Product = require("./db/Product");

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  const user = new User(req.body);
  let result = await user.save();
  result = result.findOne();
  delete result.password;

  resp.send(result);
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      resp.send(user);
    } else {
      resp.send("No user found");
    }
  }
});

app.post("/addProduct", async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/products", async (req, resp) => {
  let product = await Product.find();
  if (product.length > 0) {
    resp.send(product);
  } else {
    resp.send("No products found");
  }
});

app.listen(5000);
