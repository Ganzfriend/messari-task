import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.css";
import getTimeSeries from "../helpers/getTimeSeries";
import Chart from "./chart";

const Home: NextPage = () => {
  const [timeSeriesData, setTimeSeriesData] = useState();

  useEffect(() => {
    getTimeSeries(setTimeSeriesData);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Messari Task</title>
        <meta name="description" content="Messari Front-End Coding Task" />
        <link rel="icon" href="/favicon-96x96.png" />
        {/* <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> */}
      </Head>

      <main className={styles.main}>
        {/* <h1 className={styles.title}>
        </h1> */}
        <Image
          alt="Messari logo"
          height={80}
          width={250}
          src="/Messari_horizontal_white-03.svg"
        />

        {/* <div>{!!timeSeriesData && JSON.stringify(timeSeriesData.status)}</div>
        <div>{!!timeSeriesData && JSON.stringify(timeSeriesData.data)}</div> */}

        <Chart />

        {/* <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  );
};

export default Home;
