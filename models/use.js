import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        login: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
           
        },
        googleID:{
            type:String,
            require:true
        },
        FirstName:{
            type:String,
            
        },
        LasteName:{
            type:String,
            
        },
        Age:{
            type:Number,
            
        },
        Numero:{
            type:String,
           
        },
        Sexe:{
            type:String,
           
        },
        Image:{
            type:String,
           
        },
        Matches:{
            type:[mongoose.Schema.Types.ObjectId]
        },
        AboutYou:{
            type:String,
           
        },
        Job :{
            type:String,
            
        },
        School:{
            type:String,
            
        },
        AgeMax:{
            type:String,
          
        },
        AgeMin:{
            type:String,
          
        },

    },
    {
        timestamps: true
    }
);

export default model('User', userSchema);