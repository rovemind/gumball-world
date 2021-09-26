import { Document } from "mongoose";

interface ICandyMachine extends Document {
  network: string;
  public_key: string;

  symbol?: string;
  date?: Date;
  price?: number;

  config_uuid: string;
  config_data: object;
  config_error: string;
  has_config: boolean;
  is_valid: boolean;

  items_num: number;
  redeemed_items_num: number;
  processed_items_num: number;

  image?: string;
  image_dominant_color?: string;
}

export default ICandyMachine;