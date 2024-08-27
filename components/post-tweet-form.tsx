"use client";

import React, { useState } from 'react';
import styles from "../styles/post-tweet-form.module.css";
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '../config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  }
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e?.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if(!user || isLoading || tweet === "" || tweet.length > 180) return;

    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
      if(file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }
      setTweet("");
      setFile(null);
    } catch(e){
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={onSubmit}>
        <textarea required rows={5} maxLength={180} onChange={onChange} value={tweet} placeholder="What is happening?!" className={styles.textarea} />
        <input onChange={onFileChange} type="file" name="file" className={styles.file} accept='image/*' />
        <input type="submit" className={styles.submit} value={isLoading ? "Posting..." : "Post Tweet"} />
      </form>
    </div>
  )
}