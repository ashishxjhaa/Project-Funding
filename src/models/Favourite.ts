import mongoose, { Schema, Types, Document, Model } from "mongoose";

export interface IFavourite extends Document {
  user: Types.ObjectId;
  listing: Types.ObjectId;
}

const favouriteSchema = new Schema<IFavourite>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    listing: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
  },
  { timestamps: true }
);

favouriteSchema.index({ user: 1, listing: 1 }, { unique: true });

const Favourite: Model<IFavourite> =
  mongoose.models.Favourite || mongoose.model<IFavourite>("Favourite", favouriteSchema);

export default Favourite;
