import { connectionDB } from "../database/db.js";

export function createPost(user, infos) {
	return connectionDB.query(`
    INSERT INTO posts (user_id, link, description, likes) VALUES ($1, $2, $3, $4)`,
    [user.id, infos.link, infos.description, 0]);
}