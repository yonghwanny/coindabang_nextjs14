"use client";

import { useEffect, useState } from 'react';
import styles from "../styles/timeline.module.css";
import { collection, getDocs, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../config/firebase';
import Tweet from './tweet';
import { snapshot } from 'node:test';
import { Unsubscribe } from 'firebase/auth';

export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

export default function TimeLineTweet() {
  const [tweets, setTweet] = useState<ITweet[]>([]);
  
  useEffect(() => {
    let unsubscribe : Unsubscribe | null = null;
    const fetchTweets = async() => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      // const snapshot = await getDocs(tweetsQuery);
      // const tweets = snapshot.docs.map((doc) => {
      //   const {tweet, createdAt, userId, username, photo} = doc.data();
      //   return {
      //     tweet,
      //     createdAt,
      //     userId,
      //     username,
      //     photo,
      //     id: doc.id,
      //   };
      // });
      // setTweet(tweets);
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
             const {tweet, createdAt, userId, username, photo} = doc.data();
             return {
               tweet,
               createdAt,
               userId,
               username,
               photo,
               id: doc.id,
             };
           });
           setTweet(tweets);
      })
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      {
        tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))
      }
    </div>
  );
}