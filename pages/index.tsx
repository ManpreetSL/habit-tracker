import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>.SHIFT habit tracker</title>
        <meta name='description' content='A habit tracker' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to .SHIFT habit tracker!</h1>

        <p>
          <Link href={`/about`}>About the app</Link>
        </p>

        <p className={styles.links}>
          <Link href={`/profile/Manpreet`}>Manpreet Singh</Link>
          <Link href={`profile/Harjot`}>Harjot Singh</Link>
          <Link href={`profile/Gurpreet`}>Gurpreet Kaur</Link>
          <Link href={`/profile/Hardeep`}>Hardeep Kaur</Link>
          <br />
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
