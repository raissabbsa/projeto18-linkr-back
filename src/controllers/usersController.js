import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, followUser, getFollowStatus, getMyFollowers, getPostsByUserId, searchWhoIDontFollow, searchWhoIFollow, unfollowUser } from "../repositories/usersRepository.js";

export async function signUp(req, res) {
	const user = res.locals.user;

	try {
		const hashPassword = bcrypt.hashSync(user.password, 10);
		await createUser({ ...user, password: hashPassword });
		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function signIn(req, res) {
	const user = res.locals.user;
	const token = jwt.sign({ id: user.id }, process.env.SECRET_JWT, {
		expiresIn: 86400,
	});

	try {
		res.send({ ...user, token: token });
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function searchUsers(req, res) {
	const search = req.query.name;
	const { id } = res.locals.user;

	try {
		const usersIFollow = await searchWhoIFollow(search, id);
		const usersIDontFollow = await searchWhoIDontFollow(search);
		const users = [...usersIFollow.rows, ...usersIDontFollow.rows];
		res.send(users);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function followStatus(req, res) {
	const { id } = req.params;
	const { id: myId } = res.locals.user;

	try {
		const follow = await getFollowStatus(id, myId);
		res.send(follow.rows);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function sendPostsByUser(req, res) {
	const { id } = req.params;

	try {
		const userPosts = await getPostsByUserId(id);
		res.send(userPosts.rows);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function follow(req, res) {
	const { id } = req.params;
	const { id: myId } = res.locals.user;

	try {
		await followUser(id, myId);
		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function unfollow(req, res) {
	const { id } = req.params;
	const { id: myId } = res.locals.user;

	try {
		await unfollowUser(id, myId);
		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function getFollowers(req, res) {
	const { id: myId } = res.locals.user;

	try {
		const followers = await getMyFollowers(myId);
		res.send(followers.rows);
	} catch (error) {
		res.sendStatus(500);
	}
}
