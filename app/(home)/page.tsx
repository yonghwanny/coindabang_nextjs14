import { Metadata } from 'next'
import styles from "../../styles/home.module.css";

export const metadata: Metadata = {
  title: 'Home',
}

export default function Home() {
  return (
    <div>
      <div className={styles.container}>
        <li>Home!</li>
      </div>
    </div>
  )
}