import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const clientSchema = new Schema(
    {
       
        FirstName:{
            type:String,
            require:true
        },
        LasteName:{
            type:String,
            require:true
        },
        Age:{
            type:Number,
            require:true
        },
        Numero:{
            type:Number,
            require:true
        },
        Sexe:{
            type:String,
            require:true
        },
        Description:{
            type:String,
            require:true
        },
        User:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
       
    },
    {
        timestamps: true
    }
);

export default model('Client', clientSchema);