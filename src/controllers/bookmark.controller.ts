import {Request, Response} from "express";
import {bookmarkService} from "../services";
import catchAsync from "../utils/catchAsync";

const createBookmark = catchAsync(async (req: Request, res: Response) => {
  const {url} = req.body;

  const details = await bookmarkService.parseUrl(url);

  const entry = await bookmarkService.saveURL(details, url);

  await bookmarkService.addBookmarkToSearch(entry);

  res.status(201).json({data: {entry}});
});

const deleteBookmark = catchAsync(async (req: Request, res: Response) => {
  await bookmarkService.deleteBookmark(req.body.id);
  res.status(200).json({message: "Deleted Successfully"});
});

const addTags = catchAsync(async (req: Request, res: Response) => {
  const tags = req.body.tags;
  await bookmarkService.createTags(tags, req.body.bookmarkId);
  res.status(200).send({message: "Tags Added"});
});

const getBookmarks = catchAsync(async (req: Request, res: Response) => {
  const query = req.query.query;
  const bookmarks = await bookmarkService.getBookmarkFromQuery(query);
  res.status(200).json({data: {bookmarks}});
});

const getTags = catchAsync(async (req: Request, res: Response) => {
  const bookmarkId = req.params.bookmarkId;
  const tags = await bookmarkService.getTags(bookmarkId);

  res.status(200).json({data: {tags}});
});
export default {createBookmark, deleteBookmark, addTags, getBookmarks, getTags};
