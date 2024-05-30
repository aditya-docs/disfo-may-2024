const router = require("express").Router();
// const passport = require("passport");
// const authenticate = passport.authenticate("jwt", { session: false });
const verifyJwtAndAppendUserToReq = require("../middlewares/auth.middleware");
const {
  findDiscussionById,
  findDiscussionsByUser,
  createNewDiscussion,
  getAllDiscussions,
  addNewComment,
  deleteDiscussion,
  updateDiscussion,
} = require("../controllers/discussion.controller");

const {
  discussionValidationSchema,
  commentValidationSchema,
} = require("../validations/discussion.validator");
const { validateSchema } = require("../middlewares/validate.middleware");
const { checkAdminKey } = require("../middlewares/admin.middleware");
const { fetchUsernameInCollection } = require("../middlewares/user.middleware");
const {
  fetchDiscussion,
  verifyAuthor,
} = require("../middlewares/discussion.middleware");

const validateDiscussion = validateSchema(discussionValidationSchema);
const validateComment = validateSchema(commentValidationSchema);

router.post(
  "/new",
  verifyJwtAndAppendUserToReq,
  fetchUsernameInCollection,
  validateDiscussion,
  createNewDiscussion
);
router.get("/all", checkAdminKey, getAllDiscussions);
router.get("/user/:username", findDiscussionsByUser);
router.get("/id/:id", findDiscussionById);

router.patch("/id/:id", verifyAuthor, updateDiscussion);
router.delete("/id/:id", verifyAuthor, deleteDiscussion);

router.put(
  "/:id/comment",
  fetchUsernameInCollection,
  fetchDiscussion,
  validateComment,
  addNewComment
);

module.exports = router;
