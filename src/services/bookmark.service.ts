import axios from "axios";
import httpStatus from "http-status";
import client from "../utils/meilesearch";
import ApiError from "../utils/ApiError";
import prisma from "../utils/dbClient";

const parseTitle = (body: string) => {
  let match = body.match(/<title.*>([^<]*)<\/title>/i); // regular expression to parse contents of the <title> tag
  if (!match || typeof match[1] !== "string") throw new Error("Unable to parse the title tag");
  return match[1];
};

const parseExcerpt = (body: string) => {
  let match = body.match(/<meta class="description" content=([^<]*) .*><\/meta>/i); // regular expression to parse contents of the <title> tag
  if (!match || typeof match[1] !== "string") return "";
  return match[1];
};

const parseUrl = async (url: string) => {
  const body = await axios.get(url, {
    headers: {"Accept-Encoding": "gzip,deflate,compress"},
  });
  const title = parseTitle(body.data);
  const excerpt = parseExcerpt(body.data);
  const parsed_url = new URL(url).hostname;

  return {title, excerpt, parsed_url};
};

const saveURL = async (details: {title: string; excerpt: string; parsed_url: string}, url: string) => {
  return prisma.bookmark.create({data: {...details, url}});
};

const deleteBookmark = (id: number) => {
  if (isNaN(Number(id))) throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Id");
  return prisma.bookmark.delete({where: {id}});
};

const formatTags = (tags: string[]) => {
  return tags.map(tag => ({name: tag}));
};
const createTags = async (tags: string[], bookmarkId: number) => {
  const formattedTags = formatTags(tags);
  await prisma.bookmark.update({where: {id: bookmarkId}, data: {tags: {create: formattedTags}}});
};

const addBookmarkToSearch = entry => {
  client.addDocuments(entry);
};

const getBookmarkFromQuery = async query => {
  const documents = await client.search(query);
  return documents.hits;
};

const getTags = async bookmarkId => {
  return prisma.tag.findMany({where: {bookmarks: {some: {id: Number(bookmarkId)}}}});
};

export default {
  parseUrl,
  saveURL,
  deleteBookmark,
  createTags,
  addBookmarkToSearch,
  getBookmarkFromQuery,
  getTags,
};
