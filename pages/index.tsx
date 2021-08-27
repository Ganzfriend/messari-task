import { useState, useEffect, ChangeEvent } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
} from "@material-ui/core";

import styles from "../styles/Home.module.css";
import getTimeSeries from "../helpers/getTimeSeries";
import getMetrics from "../helpers/getMetrics";
import getAssetList from "../helpers/getAssetList";
import Chart from "./chart";

const Home: NextPage = () => {
  const [timeSeriesData, setTimeSeriesData] = useState(null);
  const [assetMetrics, setAssetMetrics] = useState(null);
  const [assetList, setAssetList] = useState(null);

  const [asset, setAsset] = useState("yfi");

  const handleChangeAsset = (event: ChangeEvent<{ value: unknown }>) => {
    setAsset(event.target.value as string);
  };

  useEffect(() => {
    getTimeSeries(asset, setTimeSeriesData);
    getMetrics(asset, setAssetMetrics);
    getAssetList(setAssetList);
  }, [asset]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Messari Task</title>
        <meta name="description" content="Messari Front-End Coding Task" />
        <link rel="icon" href="/favicon-96x96.png" />
      </Head>

      <main className={styles.main}>
        <Image
          alt="Messari logo"
          height={80}
          width={250}
          className={styles.logo}
          src="/Messari_horizontal_white-03.svg"
        />
        <div>
          <FormControl className={styles.selectAsset}>
            <InputLabel>Asset</InputLabel>
            <Select
              labelId="select-asset-label"
              id="select-asset"
              value={asset}
              onChange={handleChangeAsset}
            >
              {assetList?.map((val: string) => (
                <MenuItem key={val} value={val.toLowerCase()}>
                  {val}
                </MenuItem>
              ))}
              {/* <MenuItem value="yfi">YFI</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
            <FormHelperText>Explore metrics of other assets</FormHelperText>
          </FormControl>
        </div>
        <div>{timeSeriesData && <Chart timeSeriesData={timeSeriesData} />}</div>
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
