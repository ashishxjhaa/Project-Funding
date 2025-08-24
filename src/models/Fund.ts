import mongoose from "mongoose";

const fundSchema = new mongoose.Schema({
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

fundSchema.index({ listing: 1 });
const Fund = mongoose.models.Fund || mongoose.model("Fund", fundSchema);

export default Fund;
