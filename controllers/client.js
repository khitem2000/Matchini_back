import Client from '../models/client.js'

// export function putOnce(req, res) {
//     Client
//     .findOneAndUpdate({ "login": req.params.login }, { "FirstName": req.body.FirstName}, {new: true})
// 	.then(doc => {
// 	  res.status(200).json({message: "your account is now verified"});
// 	})
// 	.catch(err => {
// 	  res.status(500).json({ error: err });
// 	});

// } 

export async function addOnce(req, res){
  	
	Client.create({ 
	FirstName: req.body.FirstName,
	LasteName: req.body.LasteName,
	Age: req.body.Age,
    Numero: req.body.Numero,
	Sexe: req.body.Sexe,
	Description: req.body.Description,
	User: req.body.login
	

		})
	  .then(
	res.status(200).json(Client))
		.catch((err) => 
		{
			res.status(500).json({ error: err})
		})	
		
	  ;
	}