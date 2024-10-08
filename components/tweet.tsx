import { ITweet } from './timeline-tweet';
import styles from "../styles/tweet.module.css";
import { auth, db, storage } from '../config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;
  const onDelete = async() => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if(photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch(e) {
      console.log(e);
    } finally {

    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.column}>
        <span className={styles.username}>{username}</span>
        <p className={styles.payload}>{tweet}</p>
        {user?.uid === userId ? <button className={styles.delete_btn} onClick={onDelete}>Delete</button> : null}
      </div>
      <div className={styles.column}>
      {photo ? (     
        <img className={styles.photo} src={photo} alt="tweet image" />      
      ) : null}
      </div>
    </div>
  )
}