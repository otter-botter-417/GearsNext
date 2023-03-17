const mongoose = require("mongoose");

const itemDatasSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },

  itemName: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  brandName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  asin: {
    type: String,
    required: true,
  },
  amazonUrl: {
    type: String,
    required: true,
  },
  colors: [],
  tags: [],

  itemAbility: {
    subCategorys: String,
    openSize: {
      wide: Number,
      depth: Number,
      high: Number,
    },
    storageSize: {
      wide: Number,
      depth: Number,
      high: Number,
    },
    weight: Number,
    capacity: Number,
    innerTent: String,
    grandSheet: String,
    accessories: [],
  },
});

export default mongoose.model("ItemDatas", itemDatasSchema);
