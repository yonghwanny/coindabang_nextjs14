"use client";

//import { Metadata } from 'next'
import { useState } from 'react';
import styles from "../../styles/login.module.css";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../config/firebase';
/*
export const metadata: Metadata = {
  title: 'Create Account',
}
*/
export default function CreateAccount() {
  //const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: {name, value},
    } = e;
    if (name === "name") {
      setname(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setIsLoading(true);
      // create an account
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      // set the name of the user profile
      await updateProfile(credentials.user, {
        displayName: name,
      });

      // redirect to the mydabang
    } catch (e) {
      // set error
    } finally {
      setIsLoading(false);
    }
    
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Join coindabang</div>
      <form className={styles.form} onSubmit={onSubmit}>
        <input onChange={onChange} className={styles.input} value={name} name="name" placeholder='Name' type='text' required></input>
        <input onChange={onChange} className={styles.input} value={email} name="email" placeholder='Email' type='email' required></input>
        <input onChange={onChange} className={styles.input} value={password} name="password" placeholder='Password' type='password' required></input>
        <input type="submit" className={styles.input} value={isLoading ? "Loading..." : "Create Account"}></input>
      </form>
      {error !== "" ? <div className={styles.error}>{error}</div> : null}
    </div>
  )
}