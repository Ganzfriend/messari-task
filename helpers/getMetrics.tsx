import axios from "axios";

const getMetrics = (asset: string, cb: Function) => {
  const assetMetricsURL: string = `https://data.messari.io/api/v1/assets/${asset}/metrics`;

  axios
    .get(assetMetricsURL)
    .then(({ data }) => cb(data))
    .catch((err) => console.log(err));
};

export default getMetrics;
