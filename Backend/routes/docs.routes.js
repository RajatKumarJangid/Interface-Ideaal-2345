const express = require("express");
const { DocModel } = require("../models/docs.model");
const { auth } = require("../middlewares/auth.middleware");
const docRouter = express.Router();

docRouter.post("/", async (req, res) => {
  const { title, content } = req.body;
  try {
    const doc = new DocModel({ title, content });
    await doc.save();
    res.status(200).send({ msg: "new doc has benn added" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "error in doc added", err });
  }
});

docRouter.get("/", async (req, res) => {
  try {
    const doc = await DocModel.find();
    res.status(200).send({ msg: "all doc", doc });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "error in doc added", err });
  }
});

docRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await DocModel.findOne({ _id: id });
    res
      .status(200)
      .send({ msg: `The doc with id ${id} has been fetched`, doc });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: err });
  }
});

docRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await DocModel.findOne({ _id: id });
    await DocModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send({ msg: `The doc with id ${id} has been updated` });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

docRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await DocModel.findOne({ _id: id });
    console.log(req.body.userId, doc.userId);
    await DocModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: `The doc with id ${id} has been deleted` });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: err });
  }
});

docRouter.get("/alldocs", async (req, res) => {
  try {
    const doc = await DocModel.find();
    res.status(200).send({ msg: "all doc", doc });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "error in doc added", err });
  }
});

module.exports = {
  docRouter,
};
