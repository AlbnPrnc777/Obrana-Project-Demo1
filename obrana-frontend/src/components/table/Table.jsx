import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Example Blockchain Transactions (Replace with real API data)
const transactions = [
  {
    txid: "0xa7b3...d56f",
    asset: "ETH",
    sender: "0xF3A2...B12C",
    receiver: "0x8B92...A3FE",
    date: "March 24, 2025",
    amount: "0.5",
    status: "Success",
  },
  {
    txid: "0xf1c4...78ad",
    asset: "BTC",
    sender: "0x9D27...CA88",
    receiver: "0xFAE3...B29D",
    date: "March 23, 2025",
    amount: "0.01",
    status: "Pending",
  },
  {
    txid: "0x5a91...3e7b",
    asset: "USDT",
    sender: "0xC2E5...D491",
    receiver: "0xE4F8...9C7A",
    date: "March 22, 2025",
    amount: "250",
    status: "Failed",
  },
  {
    txid: "0x8d2b...a91f",
    asset: "ETH",
    sender: "0xAB39...F92A",
    receiver: "0xD1C7...A482",
    date: "March 21, 2025",
    amount: "1.2",
    status: "Success",
  },
];

const List = () => {
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="blockchain transactions table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Transaction ID</TableCell>
            <TableCell className="tableCell">Asset</TableCell>
            <TableCell className="tableCell">Sender</TableCell>
            <TableCell className="tableCell">Receiver</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.txid}>
              <TableCell className="tableCell">{tx.txid}</TableCell>
              <TableCell className="tableCell">{tx.asset}</TableCell>
              <TableCell className="tableCell">{tx.sender}</TableCell>
              <TableCell className="tableCell">{tx.receiver}</TableCell>
              <TableCell className="tableCell">{tx.date}</TableCell>
              <TableCell className="tableCell">{tx.amount}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${tx.status.toLowerCase()}`}>
                  {tx.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
