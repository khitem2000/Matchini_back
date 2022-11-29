import poste from "../models/poste.js";

export async function AddPost(req, res) {

    const { title , name } = req.body;

    const poste = new poste({
       
        title
    })
    console.log(poste);
    await poste.save();
    res.json(poste);
}

export async function listAllPost (req, res)  {

    const  post  = await poste.find();
    console.log("the Post is",post)
        res.json( post);     
        
}