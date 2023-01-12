import { getPost } from "../repositories/commentRepository";

export async function commentValidation(req, res, next) {
  const { post_id } = req.body;
  try {
    const postExist = await getPost(post_id);
    if (postExist.rows.length === 0) {
      return res.sendStatus(404);
    }
    if (comment.length === 0) {
      return res.sendStatus(422);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
