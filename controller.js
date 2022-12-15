import bcrypt from "bcryptjs/dist/bcrypt.js";
import UserModel from "./frontend/src/models/User.js";
import jwt from "jsonwebtoken";

class Controller {
  async login(req, res) {
    const { name, password } = req.body;
    if (!req.body) return res.sendStatus(400);
    try {
      const user = await UserModel.findOne({ name });
      if (!user) {
        return res.sendStatus(400);
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.sendStatus(400);
      }
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
      res.send({ username: name, token });
    } catch (error) {}
  }

  async getUsers(req, res) {
    try {
      const data = await UserModel.find();
      return res.json(data);
    } catch (error) {
      return res.sendStatus(400);
    }
  }
}

export default Controller;
