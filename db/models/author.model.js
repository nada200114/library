import { Schema, model } from "mongoose";

const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'book'
    }]
}, {
    timestamps: true
});

const authorModel = model('author', authorSchema);

export default authorModel;
