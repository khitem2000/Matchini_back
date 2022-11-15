
import User from "../models/use.js";
import bcrypt from 'bcrypt';
import async from'async';
import crypto from 'crypto';
import nodemailer from'nodemailer';
import {sendmailresetpassword} from "../services/mailer.js"

import {generatePassword} from '../services/generatePassword.js'
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
	User.create({ login: req.body.login,
		lastname: req.body.lastname,
		password: hashedPwd,	
		FirstName:"",
		LasteName:"",
		Age:1,
		Numero:"",
		Sexe:"",
		Image:""
		})
	  .then(
		res.status(200).json({
			login: req.body.login,
		  password: req.body.password,
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
	.findOneAndUpdate({ "login": req.body.login }, { "FirstName": req.body.FirstName,  "LasteName": req.body.LasteName,  "Age": req.body.Age ,  "Numero": req.body.Numero, "Sexe": req.body.Sexe , "Image" : req.body.Image}, {new: true})
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

