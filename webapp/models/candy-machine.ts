import { model, models, Schema } from "mongoose";
import ICandyMachine from "../types/candy-machine";

const CandyMachineSchema = new Schema<ICandyMachine>(
  {
    network: {
      type: String,
      required: true,
    },
    public_key: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    config_data: {
      type: Object,
      required: false,
    },
    config_uuid: {
      type: String,
      required: false,
    },
    has_config: {
      type: Boolean,
      required: false,
    },
    is_valid: {
      type: Boolean,
      required: false,
    },
    items_num: {
      type: Number,
      required: false,
    },
    redeemed_items_num: {
      type: Number,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    image_dominant_color: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default models.CandyMachine || model("CandyMachine", CandyMachineSchema);