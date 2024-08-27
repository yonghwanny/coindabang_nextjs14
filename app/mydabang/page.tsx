"use client";

//import { Metadata } from 'next'
import { useEffect, useState } from 'react'
import LoadingScreen from '../../components/loading-screen';
import { auth } from '../../config/firebase';
import styles from "../../styles/mydabang.module.css";
//import CreateAccount from '../create-account/page';
import Login from '../login/page';
/*
export const metadata: Metadata = {
  title: 'MyDabang',
}
*/
export default function MyDabang() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setLogin] = useState(false);
  const init = async () => {
    // wait for firebase
    await auth.authStateReady();

    const user = auth.currentUser;
    if(!user) {
      setLogin(false);
    }
    else {
      setLogin(true);
    }

    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);

  const logOut = () => {
    auth.signOut();
  };

  return (
    <div className={styles.wrapper}>
      {isLoading ? <LoadingScreen /> : 
        isLogin ? <h1><button onClick={logOut}>Log Out</button></h1> :
        <Login />}
    </div>
  )
}