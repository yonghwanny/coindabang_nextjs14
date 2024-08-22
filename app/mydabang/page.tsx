"use client";

//import { Metadata } from 'next'
import { useEffect, useState } from 'react'
import LoadingScreen from '../../components/loading-screen';
import { auth } from '../../config/firebase';
import styles from "../../styles/mydabang.module.css";
import CreateAccount from '../create-account/page';
/*
export const metadata: Metadata = {
  title: 'MyDabang',
}
*/
export default function MyDabang() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    // wait for firebase
    await auth.authStateReady();

    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div className={styles.wrapper}>
      {isLoading ? <LoadingScreen /> : <CreateAccount />}
    </div>
  )
}