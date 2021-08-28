import { useState, MouseEvent, ChangeEvent } from "react";
import moment from "moment";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
} from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";

import styles from "../styles/Home.module.css";

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

interface MetricsTableProps {
  assetMetrics: {
    data: {
      market_data: {
        last_trade_at: string;
        price_usd: number;
        price_eth: number;
        price_btc: number;
        volume_last_24_hours: number;
        real_volume_last_24_hours: number;
        percent_change_btc_last_24_hours: number;
        percent_change_eth_last_24_hours: number;
        percent_change_usd_last_24_hours: number;
      };
      cycle_low: {
        price: number;
      };
      roi_data: {
        percent_change_btc_last_1_year: number;
        percent_change_eth_last_1_year: number;
        percent_change_last_1_year: number;
        percent_change_year_to_date: number;
      };
    };
  };
}

export default function MetricsTable(props: MetricsTableProps) {
  const { assetMetrics } = props;
  const { data } = assetMetrics;
  const { market_data, cycle_low, roi_data } = data;
  const {
    last_trade_at,
    price_usd,
    price_eth,
    price_btc,
    volume_last_24_hours,
    real_volume_last_24_hours,
    percent_change_btc_last_24_hours,
    percent_change_eth_last_24_hours,
    percent_change_usd_last_24_hours,
  } = market_data;

  const { price } = cycle_low;

  const {
    percent_change_btc_last_1_year,
    percent_change_eth_last_1_year,
    percent_change_last_1_year,
    percent_change_year_to_date,
  } = roi_data;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const rows = [
    {
      name: "PRICE USD",
      stat: "$ " + price_usd.toFixed(2),
    },
    {
      name: "CHANGE VS USD (24H)",
      stat: percent_change_usd_last_24_hours.toFixed(2) + " %",
    },
    {
      name: "CHANGE VS USD (1Y)",
      stat: percent_change_last_1_year.toFixed(2) + " %",
    },
    {
      name: "CHANGE VS USD (YTD)",
      stat: percent_change_year_to_date.toFixed(2) + " %",
    },
    {
      name: "REAL VOLUME (24H)",
      stat: "$ " + real_volume_last_24_hours.toFixed(2),
    },
    {
      name: "VOLUME (24H)",
      stat: "$ " + volume_last_24_hours.toFixed(2),
    },
    {
      name: "LAST TRADE",
      stat: moment(last_trade_at).format("lll"),
    },
    {
      name: "CYCLE LOW (USD)",
      stat: price,
    },
    {
      name: "PRICE BTC",
      stat: "$ " + price_btc.toFixed(2),
    },
    {
      name: "CHANGE VS BTC (24H)",
      stat: percent_change_btc_last_24_hours.toFixed(2) + " %",
    },
    {
      name: "CHANGE VS BTC (1Y)",
      stat: percent_change_btc_last_1_year.toFixed(2) + " %",
    },
    {
      name: "PRICE ETH",
      stat: "$ " + price_eth.toFixed(2),
    },
    {
      name: "CHANGE VS ETH (24H)",
      stat: percent_change_eth_last_24_hours.toFixed(2) + " %",
    },
    {
      name: "CHANGE VS ETH (1Y)",
      stat: percent_change_eth_last_1_year.toFixed(2) + " %",
    },
  ];

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} classes={{ root: styles.metricsTable }}>
      <Table className={styles.metricsTable} aria-label="metrics table">
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map(({ name, stat }) => (
            <TableRow key={name}>
              <TableCell
                classes={{ root: styles.metricsTableCell }}
                component="th"
                scope="row"
              >
                {name}
              </TableCell>
              <TableCell
                classes={{ root: styles.metricsTableCell }}
                style={{ width: 50 }}
                align="right"
              >
                {stat}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell
                classes={{ root: styles.metricsTableCell }}
                colSpan={6}
              />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              classes={{ root: styles.metricsTableCell }}
              rowsPerPageOptions={[
                5,
                10,
                Math.floor(rows.length / 2 + rows.length / 2.5),
                { label: "All", value: -1 },
              ]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
