import { FC } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

import styles from "../styles/Home.module.css";

interface ComponentProps {
  timeSeriesData: {
    data: {
      name: string;
      parameters: {
        start: string;
        end: string;
        interval: string;
      };
      values: [Array<number>];
    };
  };
}

const Chart: FC<ComponentProps> = ({ timeSeriesData }) => {
  const { data } = timeSeriesData;
  const { name, parameters, values } = data;
  const { start, end, interval } = parameters;

  var timeStamps: Array<string> = [];
  var openVals: Array<number> = [];
  var highVals: Array<number> = [];
  var lowVals: Array<number> = [];
  var closeVals: Array<number> = [];

  values.forEach((v) => {
    timeStamps.push(moment(v[0]).format("lll"));
    openVals.push(v[1]);
    highVals.push(v[2]);
    lowVals.push(v[3]);
    closeVals.push(v[4]);
  });

  const formattedData: Object = {
    labels: timeStamps,
    datasets: [
      {
        label: "Open",
        data: openVals,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 3,
      },
      {
        label: "High",
        data: highVals,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 3,
      },
      {
        label: "Low",
        data: lowVals,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 3,
      },
      {
        label: "Close",
        data: closeVals,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 3,
      },
    ],
  };

  return (
    <div className={styles.chart}>
      <Line
        data={formattedData}
        width={400}
        height={200}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default Chart;

/*
 columns
        "timestamp",
        "open",
        "high",
        "low",
        "close",
        "volume"
  */
