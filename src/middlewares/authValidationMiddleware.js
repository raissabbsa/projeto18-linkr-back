import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getUserById } from "../repositories/usersRepository.js";
dotenv.config();

export async function authValidation(req, res, next) {
	const { authorization } = req.headers;

	const token = authorization?.replace("Bearer ", "");

	if (!token) {
		return res.sendStatus(401);
	}

	try {
		jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
			if (error) {
				return res.sendStatus(401);
			}

			const user = await getUserById(decoded.id);
			if (user.rowCount === 0) {
				return res.sendStatus(404);
			}

			delete user.rows[0].password;
			delete user.rows[0].createdAt;
			res.locals.user = user.rows[0];

			return next();
		});
	} catch (error) {
		return res.status(500).send(error.message);
	}
}
