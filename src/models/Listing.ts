import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: { 
        type: String, 
        required: true,
        minlength: 2,
        maxlength: 15,
    },
    description: { 
        type: String, 
        required: true,
        maxlength: 100,
    },
    tags: { 
        type: [String],
        required: true,
        validate: {
            validator: (arr: unknown) =>
                Array.isArray(arr) && arr.length === 3 && arr.every(t => typeof t === "string"),
            message: "Select exactly 3 tags.",
        },
    },
    funds: {
        type: Number,
        default: 0,
        min: 0,
    },
    likes: {
        type: Number,
        default: 0,
        min: 0,
    },
    link: { 
        type: String 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

listingSchema.index({ funds: -1, likes: -1 });
listingSchema.index({ createdAt: -1 });

const Listing = mongoose.models.Listing || mongoose.model("Listing", listingSchema);

export default Listing;
