"use client";

import PostTweetForm from '../../components/post-tweet-form';
import TimeLineTweet from '../../components/timeline-tweet';
import styles from "../../styles/tweets.module.css";

export default function Tweets() {
  return (
    <div className={styles.wrapper}>
      <PostTweetForm />
      <TimeLineTweet />
    </div>
  )
}