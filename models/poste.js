import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const posteSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }

    },
    {
        timestamps: true
    }
);

export default model('Post', posteSchema);