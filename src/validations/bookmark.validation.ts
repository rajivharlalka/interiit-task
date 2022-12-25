import joi from "joi";

const createBookmark = {
  body: {
    url: joi.string().required(),
  },
};

const deleteBookmark = {
  params: {
    id: joi.number().required(),
  },
};
export default {createBookmark, deleteBookmark};
