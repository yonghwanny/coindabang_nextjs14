"use client";

//import { Metadata } from 'next'
import { useState } from 'react';
import styles from "../../styles/login.module.css";
import { auth } from '../../config/firebase';
import { FirebaseError } from 'firebase/app';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import Link from 'next/link';
/*
export const metadata: Metadata = {
  title: 'Create Account',
}
*/

export default function Login() {
  //const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: {name, value},
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      // redirect to the mydabang
      window.location.href = "/mydabang"
    } catch (e) {
      // set error
      if(e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
    
  }

  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // redirect to the mydabang
      window.location.href = "/mydabang"
    } catch(error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className={styles.wrapper}>
      <div className={styles.title}>Log into coindabang</div>
      <form className={styles.form} onSubmit={onSubmit}>
        <input onChange={onChange} className={styles.input} value={email} name="email" placeholder='Email' type='email' required></input>
        <input onChange={onChange} className={styles.input} value={password} name="password" placeholder='Password' type='password' required></input>
        <input className={styles.input} type="submit" value={isLoading ? "Loading..." : "Login"}></input>
      </form>
      {error !== "" ? <div className="error">{error}</div> : null}
      <div className="switcher">Don't have an account? <Link href="/create-account">Create one &rarr;</Link></div>
      <div className="google_button" onClick={onClick}>
        Continue with google
      </div>
    </div>
    </div>
  )
}