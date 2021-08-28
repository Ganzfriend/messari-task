import axios from "axios";

const getAssetList = (cb: Function) => {
  const assetsURL: string = `https://data.messari.io/api/v1/assets`;

  axios
    .get(assetsURL)
    .then(({ data }) => data)
    .then((res) => {
      const { data } = res;
      const slugs = data.map((d: { slug: string }) => d.slug);
      cb(slugs);
    })
    .catch((err) => console.log(err));
};

export default getAssetList;
