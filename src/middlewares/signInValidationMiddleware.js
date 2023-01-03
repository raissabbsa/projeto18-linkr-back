import bcrypt from "bcrypt";
import { getUserByEmail } from "../repositories/usersRepository.js";
import { userSignInSchema } from "../schemas/userSignInSchema.js";

export async function signInValidation(req, res, next) {
	const reqUser = req.body;
	const { email, password } = reqUser;

	const { error } = userSignInSchema.validate(reqUser, { abortEarly: false });

	if (error) {
		const errors = error.details.map((err) => err.message);
		return res.status(422).send(errors);
	}

	const user = await getUserByEmail(email);
	if (user.rowCount === 0) {
		return res.status(401).send("Email ou senha inválidos");
	}

	const isPasswordCorrect = bcrypt.compareSync(password, user.rows[0].password);
	if (!isPasswordCorrect) {
		return res.status(401).send("Email ou senha inválidos");
	}

	delete user.rows[0].password;
	delete user.rows[0].created_at;
	res.locals.user = user.rows[0];

	next();
}
