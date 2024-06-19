import express from "express";
import {createTweet,deleteTweet,getAllTweets,likeOrDislike,getFollowingTweets} from "../controller/tweetController.js"
import isAuthenticated from "../config/auth.js";
const router =express.Router();


router.route("/create").post(isAuthenticated,createTweet);
router.route("/delete/:id").delete(isAuthenticated,deleteTweet);
router.route("/like/:id").put(isAuthenticated,likeOrDislike);
router.route("/getalltweet/:id").get(isAuthenticated,getAllTweets);
router.route("/followingtweet/:id").get(isAuthenticated,getFollowingTweets);

export default router;