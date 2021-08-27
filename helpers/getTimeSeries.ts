import axios from "axios";

const getTimeSeries = (asset: string, cb: Function) => {
  const timeSeriesUrl: string = `https://data.messari.io/api/v1/assets/${asset}/metrics/price/time-series?start=2021-01-01&end=2021-02-01&interval=1d`;

  axios
    .get(timeSeriesUrl)
    .then(({ data }) => cb(data))
    .catch((err) => console.log(err));
};

export default getTimeSeries;
