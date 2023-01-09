import {
  deleteHashtag,
  deleteHashtagPost,
  getHashtag,
  getHashtagPost,
  getPostsByHashtag,
  insertHashtag,
  insertHashtagPost,
  verifyPost,
} from "../repositories/hashtagRepository.js";

export async function sendPostsByHashtag(req, res) {
  const { hashtag } = req.params;
  try {
    const posts = await getPostsByHashtag(hashtag);
    res.send(posts.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
export async function updateHashtag(req, res) {
  const { post_id, antigas, novas } = req.body;

  try {
    if (antigas.length > 0) {
      for (let i = 0; i < antigas.length; i++) {
        const exist = await getHashtag(antigas[i]);
        if (exist.rows.length > 0) {
          const isUsed = await getHashtagPost(exist.rows[0].id);
          if (isUsed.rows.length === 1) {
            await deleteHashtagPost(exist.rows[0].id);
            await deleteHashtag([exist.rows[0].id]);
          } else if (isUsed.rows.length > 1) {
            await deleteHashtagPost(exist.rows[0].id);
          }
        }
      }
    }
    if (novas.length > 0) {
      for (let i = 0; i < novas.length; i++) {
        const exist = await getHashtag(novas[i]);
        if (exist.rows.length > 0) {
          await insertHashtagPost(post_id, exist.rows[0].id);
        } else {
          await insertHashtag(novas[i]);
          const newHashtag = await getHashtag(novas[i]);
          await insertHashtagPost(post_id, newHashtag.rows[0].id);
        }
      }
    }
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
