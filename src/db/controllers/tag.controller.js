const db = require('../models');

const createTag = async (req, res) => {
  const data = req.body;
  let tag = await db.Tags.findOne({ where: data });
  if (tag) {
    return res.status(409).json({ error: "La etiqueta ya existe" });
  }
  tag = await db.Tags.create(data);
  res.status(201).json(tag);
};

const getAllTags = async (req, res) => {
  const tags = await db.Tags.findAll({});
  res.status(200).json(tags);
};

const deleteTag = async (req, res) => {
  const tagId = req.params.tagId;
  const tag = await db.Tags.findByPk(tagId);
  await tag.destroy();
  res.status(200).json({ message: `Etiqueta con id ${tagId} eliminada.` });
};

module.exports = {createTag, getAllTags, deleteTag};