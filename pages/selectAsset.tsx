import { ChangeEvent } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";

import styles from "../styles/Home.module.css";

interface SelectAssetProps {
  asset: string;
  assetList: Array<string>;
  handleChangeAsset: (event: ChangeEvent<{ value: unknown }>) => void;
}

function SelectAsset(props: SelectAssetProps) {
  const { asset, handleChangeAsset, assetList } = props;

  return (
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
  );
}

export default SelectAsset;
