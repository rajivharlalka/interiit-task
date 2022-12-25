import express from "express";
import {bookmark} from "../validations";
import bookmarkController from "../controllers/bookmark.controller";
import validate from "../middleware/validate";

const router = express.Router();

router.post("/create", validate(bookmark.createBookmark), bookmarkController.createBookmark);
router.delete("/:id", validate(bookmark.deleteBookmark), bookmarkController.deleteBookmark);
router.post("/tags/add", bookmarkController.addTags);
router.get("/", bookmarkController.getBookmarks);
router.get("/tags/:bookmarkId", bookmarkController.getTags);

export {router};
