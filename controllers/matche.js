import { log } from "async";
import Matche from "../models/matche.js";
import User from "../models/use.js";
import mongoose from "mongoose";
export async function matches(req, res){
    try {
        const { User1_param, User2_param } = req.params;
      
        const ExistingMatch= await Matche.findOne({
          $or: [
            {
              User1: User1_param,
              User2: User2_param,
            },
            {
              User1: User2_param,
              User2: User1_param,
            },
          ],
        });
        let createdMatche;
        if (ExistingMatch) {
            createdMatche = await Matche.findByIdAndUpdate(ExistingMatch._id, {
            User2_Right: true,
            Match: true,
            RommeName:ExistingMatch._id
          });
        } 
        else {
          const Matchee = new Matche({
            User1: User1_param,
            User2: User2_param,
          });
          createdMatche = Matchee.save();
        }
        res.status(200).json(createdMatche);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  export async function amie (req,res){
    const {userid}=req.params
    const List= []
   const docs = await Matche.find({})
      for (let i = 0; i < docs.length; i++) {
       if (docs[i].User1._id .equals(mongoose.Types.ObjectId(userid))) List.push(docs[i].User2);
       if (docs[i].User2._id .equals(mongoose.Types.ObjectId(userid))) List.push(docs[i].User1);
       console.log("test2",List+"\n")
	}
   res.status(200).json(List)
 }
  
