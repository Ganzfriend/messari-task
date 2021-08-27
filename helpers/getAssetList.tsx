import axios from "axios";

const getAssetList = (cb: Function) => {
  const assetsURL: string = `https://data.messari.io/api/v1/assets`;

  axios
    .get(assetsURL)
    .then(({ data }) => data)
    .then((res) => {
      const { data } = res;
      const names = data.map(({ name }) => name);
      cb(names);
    })
    .catch((err) => console.log(err));
};

export default getAssetList;
