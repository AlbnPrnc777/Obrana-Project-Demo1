import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  // Example Data (Replace with real blockchain data later)
  const assignedPercentage = 75; // 75% of assets assigned
  const totalAssets = "5.2 ETH"; // Total secured assets
  const lastWeekChange = "+2.3 ETH";
  const lastMonthChange = "+4.1 ETH";

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Asset Allocation</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={assignedPercentage} text={`${assignedPercentage}%`} strokeWidth={5} />
        </div>
        <p className="title">Total Registered assets</p>
        <p className="amount">{totalAssets}</p>
        <p className="desc">
          This represents the total digital inheritance secured within the system.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">0.5 ETH</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">{lastWeekChange}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">{lastMonthChange}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
