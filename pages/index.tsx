import { useState, useEffect, ChangeEvent } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.css";
import getTimeSeries from "../helpers/getTimeSeries";
import getMetrics from "../helpers/getMetrics";
import getAssetList from "../helpers/getAssetList";
import SelectAsset from "./selectAsset";
import Chart from "./chart";
import MetricsTable from "./metricsTable";

/* TODO:

debug re-render 4 times situation (probably has to do with useEffect)

convert large numbers to legible string

make styling dynamic for different screen sizes

fix metrics table height

add more data to metrics table

use paging rather than asset in state in order to change asset?

*/
const Home: NextPage = () => {
  const [timeSeriesData, setTimeSeriesData] = useState(null);
  const [assetMetrics, setAssetMetrics] = useState(null);
  const [assetList, setAssetList] = useState([]);

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
        <div className={styles.logoAndMetricsDiv}>
          <Image
            alt="Messari logo"
            height={80}
            width={250}
            className={styles.logo}
            src="/Messari_horizontal_white-03.svg"
          />
          <div className={styles.metricsDiv}>
            {!!assetMetrics && <MetricsTable assetMetrics={assetMetrics} />}
          </div>
        </div>
        <div className={styles.selectAndChartDiv}>
          <SelectAsset
            asset={asset}
            handleChangeAsset={handleChangeAsset}
            assetList={assetList}
          />
          <div className={styles.chartDiv}>
            {timeSeriesData && <Chart timeSeriesData={timeSeriesData} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
