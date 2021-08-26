import axios from "axios";

const timeSeriesUrl: string =
  "https://data.messari.io/api/v1/assets/yfi/metrics/price/time-series?start=2021-01-01&end=2021-02-01&interval=1d";

const getTimeSeries = () => {
  axios
    .get(timeSeriesUrl)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

export default getTimeSeries;
