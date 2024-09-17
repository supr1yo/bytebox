import { Schema, model } from "mongoose";

const videoSchema = new Schema({
  title: { type: String, required: true, },
  description: { type: String, required: true, },
  file: { type: String, required: true, },
  size: { type: Number, required: true, },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
}
  
}, {
    timestamps: true
});


export const Video = model('Video', videoSchema);