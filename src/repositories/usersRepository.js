import { connectionDB } from "../database/db.js";

export function getUserById(id) {
	return connectionDB.query(
		`SELECT * FROM users
		WHERE id=$1`,
		[id]
	);
}

export function getUserByEmail(email) {
	return connectionDB.query(
		`SELECT * FROM users
		WHERE email=$1`,
		[email]
	);
}

export function createUser(user) {
	return connectionDB.query(
		`INSERT INTO users (email, password, username, picture_url)
		VALUES ($1, $2, $3, $4)`,
		[user.email, user.password, user.username, user.picture_url]
	);
}

export function searchByName(search) {
	return connectionDB.query(
		`SELECT * FROM users
		WHERE username ILIKE $1`,
		[`${search}%`]
	);
}