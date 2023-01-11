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

export function searchWhoIFollow(search, id) {
	return connectionDB.query(
		`SELECT u.id, u.username, u.picture_url
		FROM users u
		JOIN followers f
		ON follower_id=$1 AND f.following_id=u.id
		WHERE u.username ILIKE $2`,
		[id, `${search}%`]
	);
}

export function searchWhoIDontFollow(search) {
	return connectionDB.query(
		`SELECT u.id, u.username, u.picture_url
		FROM users u
		WHERE u.username ILIKE $1
		AND NOT EXISTS (
			SELECT
			FROM followers f
			WHERE f.following_id=u.id
		);`,
		[`${search}%`]
	);
}

export function getFollowStatus(id, myId) {
	return connectionDB.query(
		`SELECT * FROM followers
		WHERE following_id=$1 AND follower_id=$2`,
		[id, myId]
	);
}

export function getPostsByUserId(user_id){
	return connectionDB.query(`
		SELECT p.*, u.picture_url AS picture_user, u.username
		FROM posts p JOIN users u ON p.user_id = u.id
		WHERE u.id = $1
		ORDER BY p.id DESC`,
		[user_id]
	);
}

export function followUser(following_id, follower_id){
	return connectionDB.query(`
		INSERT INTO followers (following_id, follower_id)
		VALUES ($1, $2)`,
		[following_id, follower_id]
	);
}

export function unfollowUser(following_id, follower_id){
	return connectionDB.query(`
		DELETE FROM followers
		WHERE following_id=$1 AND follower_id=$2`,
		[following_id, follower_id]
	);
}