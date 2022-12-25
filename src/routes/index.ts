import config from "config";
import express from "express";
import {router as authRoute} from "./auth.route";
import {router as bookmarkRoute} from "./bookmark.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/bookmark",
    route: bookmarkRoute,
  },
];

// const devRoutes = [
//     // routes available only in development mode
// ];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

// /* istanbul ignore next */
// if (config.get("mode") === "development") {
//     devRoutes.forEach(route => {
//         router.use(route.path, route.route);
//     });
// }

export default router;
