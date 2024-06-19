import express from "express";
import {logout,Login,Register,bookmarks,getMyProfile, getOtherUsers, follow, unfollow} from "../controller/userController.js"
import isAuthenticated from "../config/auth.js";
const router =express.Router();
router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(logout);
router.route("/bookmark/:id").put(isAuthenticated,bookmarks);
router.route("/profile/:id").get(isAuthenticated,getMyProfile);
router.route("/otheruser/:id").get(isAuthenticated,getOtherUsers);
router.route("/follow/:id").post(isAuthenticated,follow);
router.route("/unfollow/:id").post(isAuthenticated,unfollow);

export default router;