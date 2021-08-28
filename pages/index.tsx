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
import MetricsTable from "./metricsTable";

/* TODO:

add metrics data

debug re-render 4 times situation (probably has to do with useEffect)

use paging rather than asset in state in order to change asset?
*/
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
          <FormControl classes={{ root: styles.selectAsset }}>
            <InputLabel classes={{ root: styles.selectAssetLabels }}>
              Asset
            </InputLabel>
            <Select
              classes={{ root: styles.selectAssetLabels }}
              value={asset}
              onChange={handleChangeAsset}
            >
              <MenuItem key="yfi" value="yfi">
                yfi
              </MenuItem>
              {assetList?.map((val: string) => (
                <MenuItem key={val} value={val.toLowerCase()}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={styles.metricsDiv}>
          {!!assetMetrics && <MetricsTable assetMetrics={assetMetrics} />}
        </div>
        <div className={styles.chartDiv}>
          {timeSeriesData && <Chart timeSeriesData={timeSeriesData} />}
        </div>
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
