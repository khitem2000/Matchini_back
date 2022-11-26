
import User from "../models/use.js";
import bcrypt from 'bcrypt';
import async from'async';
import crypto from 'crypto';
import nodemailer from'nodemailer';
import {sendmailresetpassword} from "../services/mailer.js"


import {generatePassword} from '../services/generatePassword.js'
import mongoose from "mongoose";
var saltRounds = 10;
const password = generatePassword();
// export async function login(req, res) {
//     User
//     .findOne({ "login": req.body.login, "password": req.body.password })
	
//     .then(doc => {
		
//         res.status(200).json(doc);
//     })
//     .catch(err => {
//         res.status(500).json({ error: err });
//     });
// }
export async function signup(req, res) {
	const  hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
	User.create({ 
		login: req.body.login,
		lastname: "",
		password: hashedPwd,	
		FirstName:"",
		LasteName:"",
		Age:req.body.Age,
		Numero:"",
		Sexe:"",
		Image:`${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
		})
	  .then(
		res.status(200).json({
			login: req.body.login,
		  password: req.body.password,
		  Image:req.body.Image
		}))
	  .catch((err) => {
		res.status(500).json({ error: err });
	  });
	}
	export async function login(req, res) {
		const user = await User.findOne({ login: req.body.login });
		if (user) {
		  // check user password with hashed password stored in the database
		  const validPassword = await bcrypt.compare(req.body.password, user.password);
		  if (validPassword) {
			res.status(200).json({ message: "Valid password" });
		  }
		else {
		  res.status(400).json({ error: "Invalid Password" });
		}
	  } else {
		res.status(401).json({ error: "User does not exist" });
	  }
	  };
	export function patchOnce(req, res) {
		User
		.findOneAndUpdate({ "login": req.body.login }, { "password": req.body.password})
		.then(doc => {
			res.status(200).json(doc);
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
	}
	   export async function sendmail(req, res, next) {
	 	async.waterfall([
			function (done) {
	 			crypto.randomBytes(20, function (err, buf) {
	 				var token = buf.toString('hex');
					done(err, token);
				});
			},
			function (token, done) {
				User.findOne({ login: req.body.login }, function (err, user) {
					if (!user) {
						console.log('No account with that email address exists.')
					}
	
					user.resetPasswordToken = token;
					user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
	
	 				user.save(function (err) {
						done(err, token, user);
					});
	 			});
	 		},
			function (token, user, done) {
				let smtpTransport= nodemailer.createTransport({
	 				service: 'gmail',
					auth: {
					  user: 'khitem.mathlouthi@esprit.tn',
					  pass: 'loicfhwbjlkevfqg'
					}
				
				});
	 			
	 			var mailOptions = {
					to: user.login,
				from: 'khitem.mathlouthi@esprit.tn',
					subject: 'Password Reset',
				   text: `Follow this link to reset your Code for new Password: ${password}`,
                  
						
				};
				smtpTransport.sendMail(mailOptions, function (res) {
	 				console.log('mail sent' , password);
					res.send("mail sent" );
					
					done(res, 'done');
					
				});
		}
	 	], function (res) {
	 		res.status(200).json({password});
			
		});
	 }; 
	export async function googleSignIn(req, res) {
		const user = await User.findOne({ googleID: req.body.googleID });
		if (user) {
		  // check user password with hashed password stored in the database
			   res.status(200).json(user);
		  }
		else {
		res.status(401).json({ error: "User does not exist" });
	  }
	  };
	  export async function googleSignUp(req, res) {
		const password = generatePassword();
		User.create({ login: req.body.login,
		 
		  password: password,
		  
		  googleID: req.body.googleID})
		.then(
		   
		  res.status(200).json({
			login: req.body.login,
			password: req.body.password,
		  }))
		.catch((err) => {
		  res.status(500).json({ error: err });
		});
		
	  }

export async function googleVerifier(req, res) {
  const user = await User.findOne({ googleID: req.body.googleID });
  if (user) {
    // check user password with hashed password stored in the database
         res.status(200).json(user);
    }
  else {
  res.status(401).json({ error: "User does not exist" });
}
}	 
export function putOnce(req, res) {
	User
	.findOneAndUpdate({ "login": req.body.login }, { "FirstName": req.body.FirstName,  "LasteName": req.body.LasteName,  "Age": req.body.Age ,  "Numero": req.body.Numero, "Sexe": req.body.Sexe , "Image" : req.body.Image,"AboutYou" : req.body.AboutYou,"Job" : req.body.Job,"School" : req.body.School},{new: true})
	.then(doc => {
	  res.status(200).json({message: "your account is now verified"});
	})
	.catch(err => {
	  res.status(500).json({ error: err });
	});

} 
export async function forgot(req, res) {
	
	const user = await User.findOne({ login: req.body.login });
	if(user){
		const verificationcode = generatePassword();
		sendmailresetpassword( user.login,verificationcode);
		res.status(200).json({key: "key", value:verificationcode });
		
		console.log("test",verificationcode)
	}
	else {
		res.status(500).json({ message: "no account with this mail to restor" });
	}
  };
  
  export async function restorPassword(req,res) {
	const  hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
	User
	.findOneAndUpdate({login: req.body.login}, {password: hashedPwd}, {new: true})
	.then(doc1 => {
	   
			res.status(200).json({message: "password has been changed succefully"});
		
	})
	.catch(err => {
		res.status(500).json({ error: err });
	});
  }

  export  async function getUser(req, res) {
	const user = await User.findOne({ login: req.body.login });
	User.find({})
    .then((docs) => {
      let list = [];
      for (let i = 0; i < docs.length; i++) {
        list.push({
		login: docs[i].login,
        FirstName: docs[i].FirstName,
        Age: docs[i].Age,
        Image: docs[i].Image,
		id: docs[i]._id,
        });
      }
	  
	  const index = list.findIndex((el) => (el.login ===req.body.login  ));
	  console.log("test 1 " ,index)
		 list.splice(index , 1)
		 console.log("test 2" , user)

      res.status(200).json(list);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });

  };
  export  async function getConnectedUser(req, res) {
	User.findOne({ login: req.body.login }).then((docs) => {
		let list = [];
		  list.push({
		  login: docs.login,
		  FirstName: docs.FirstName,
		  Age: docs.Age,
		  Image: docs.Image,
		  id : docs._id,
		  });
		res.status(200).json(list);
	  })
    };
	export  async function getObjectId(req, res) {
		User.findOne({ login: req.body.login }).then((docs) => {
			// let list = [];
			
			//   list.push({
				const id =docs._id;
			

			//   });
			  res.status(200).json({key: "key", value:id });
		  })
		  
		};
// export  async function addMatches(req, res) {

// 	 var user = User.find({ login: req.body.login })
// 	 .then((docs) => {
// 			let list =[];
//       console.log(list);
// 	list.push({Matches :req.body.Matches})
// 	console.log("hhhhhhhhh" +docs[i].Matches)
// 	res.status(200).json(list);
// }
// ).catch(err=> {
// 	res.status(505).json({error: err});
// })
//     }

 export  async function addMatches(req, res) {
 	var user = User.findOneAndUpdate({ login: req.body.login },{ $push: { Matches: req.body.Matches } } , {new: true}).then((docs)=>{
		res.status(200).json( user);
	}).catch(err=> {
			res.status(505).json({error: err});
		})

 
 }
	// 	var user = await User
	// .findOneAndUpdate({ "login": req.body.login}, { "Matches": req.body.Matches}, {new: true})
	
	//   res.status(200).json(user);
	//   console.log("hhhhhhhhh" +req.body.Matches)

		