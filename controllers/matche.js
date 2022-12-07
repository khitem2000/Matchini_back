import Matche from "../models/matche.js";
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
          });
        } else {
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
  
        
        