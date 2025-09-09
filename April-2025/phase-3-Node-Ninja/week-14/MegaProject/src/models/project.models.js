import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unqiue: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}
    , { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);