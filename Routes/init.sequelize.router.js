import express from "express";
import { sequelize } from '../Config/db.sequelize.js'

const router = express.Router();


// // teste postman om get virker som den skal:
// router.get('/init', (req, res) => { res.json(1234)})

router.get('/init', (req, res) => {
	try {
		sequelize.sync()
		res.sendStatus(200)

	}
	catch(err) {
		res.send(err)
	}

})

export { router };