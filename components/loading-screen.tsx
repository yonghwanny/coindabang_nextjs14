import styles from "../styles/loading.module.css";

export default function LoadingScreen() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>Loading...</div>
    </div>
  )
}