import { userSignUpSchema } from "../schemas/userSignUpSchema.js";
import { getUserByEmail } from "../repositories/usersRepository.js";

export async function signUpValidation(req, res, next) {
	const user = req.body;

	const { error } = userSignUpSchema.validate(user, { abortEarly: false });

	if (error) {
		const errors = error.details.map((err) => err.message);
		return res.status(422).send(errors);
	}

	const userExists = await getUserByEmail(user.email);
	if (userExists.rowCount > 0) {
		return res.status(409).send("E-mail já cadastrado");
	}

	delete user.confirmPassword;
	res.locals.user = user;

	next();
}
