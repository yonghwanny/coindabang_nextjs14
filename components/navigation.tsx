"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from "../styles/navigation.module.css";

export default function Navigation() {
  const path = usePathname();
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <Link href="/">Home</Link> {path === "/" ? "💰" : ""}
        </li>
        <li>
          <Link href="/coin_status">시황</Link> {path === "/coin_status" ? "💰" : ""}
        </li>
        <li>
          <Link href="/coin_news">코인뉴스</Link> {path === "/coin_news" ? "💰" : ""}
        </li>
        <li>
          <Link href="/economic_index">경제지표</Link> {path === "/economic_index" ? "💰" : ""}
        </li>
        <li>
          <Link href="/coin_index">코인지표</Link> {path === "/coin_index" ? "💰" : ""}
        </li>
        <li>
          <Link href="/gene">지니왈~</Link> {path === "/gene" ? "💰" : ""}
        </li>
        <li>
          <Link href="/mydabang">MyDabang</Link> {path === "/mydabang" ? "💰" : ""}
        </li>
      </ul>
    </nav>
  )
}