import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";

const Widget = ({ type }) => {
  let data;

  // Temporary values (Replace with actual data later)
  const amount = 5; // Example: 5 Crypto Assets Secured
  const diff = 10; // Example: 10% increase in approvals

  switch (type) {
    case "assets":
      data = {
        title: "REGISTERED ASSETS",
        isMoney: false,
        link: "View all assets",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              color: "blue",
              backgroundColor: "rgba(0, 0, 255, 0.2)",
            }}
          />
        ),
      };
      break;
    case "guardians":
      data = {
        title: "PENDING GUARDIAN APPROVALS",
        isMoney: false,
        link: "Manage guardians",
        icon: (
          <GavelOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(255, 165, 0, 0.2)",
              color: "orange",
            }}
          />
        ),
      };
      break;
    case "activity":
      data = {
        title: "LAST ACTIVITY RECORDED",
        isMoney: false,
        link: "View activity logs",
        icon: (
          <HistoryOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "countdown":
      data = {
        title: "INACTIVITY COUNTDOWN",
        isMoney: false,
        link: "Set inactivity threshold",
        icon: (
          <TimerOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
