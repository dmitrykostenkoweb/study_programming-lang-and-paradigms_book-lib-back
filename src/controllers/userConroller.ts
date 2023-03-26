import express, { Request, Response } from "express";
import User from "../models/user.model";

export class UserController {
  private path = "/library_users";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getUsers);
    this.router.post(this.path, this.createUser);
    this.router.get(`${this.path}/:id`, this.getUserById);
    this.router.put(`${this.path}/:id`, this.updateUser);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
  }

  private async getUsers(req: Request, res: Response) {
    try {
      const { name, email } = req.query;
      const query: { [key: string]: any } = {};
      if (name) query["name"] = name;
      if (email) query["email"] = email;
      const users = await User.find(query);
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  private async createUser(req: Request, res: Response) {
    try {
      const user = new User(req.body);
      await user.save();
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  private async getUserById(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  private async updateUser(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  private async deleteUser(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default new UserController().router;
