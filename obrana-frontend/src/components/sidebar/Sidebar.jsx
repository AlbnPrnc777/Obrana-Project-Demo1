import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"; // optional icon
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Obrana</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          {/* ✅ Dashboard */}
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>

          {/* ✅ My Assets, Beneficiaries, Guardians */}
          <p className="title">MANAGE</p>
          <Link to="/assets" style={{ textDecoration: "none" }}>
            <li><span>My Assets</span></li>
          </Link>
          <Link to="/beneficiaries" style={{ textDecoration: "none" }}>
            <li><span>Beneficiaries</span></li>
          </Link>
          <Link to="/guardians" style={{ textDecoration: "none" }}>
            <li><span>Guardians</span></li>
          </Link>

          {/* ✅ Activity Logs & Death Confirmation */}
          <p className="title">ACTIVITY</p>
          <Link to="/logs" style={{ textDecoration: "none" }}>
            <li><span>Activity Logs</span></li>
          </Link>
          <Link to="/death-confirmation" style={{ textDecoration: "none" }}>
            <li>
              <VerifiedUserIcon className="icon" />
              <span>Death Confirmation</span>
            </li>
          </Link>

          {/* 🔧 Profile, Settings, Logout */}
          <p className="title">USER</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <Link to="/settings" style={{ textDecoration: "none" }}>
            <li>
              <SettingsApplicationsIcon className="icon" />
              <span>Settings</span>
            </li>
          </Link>
          <li onClick={() => {
            console.log("Logging out...");
            localStorage.removeItem("user");
            sessionStorage.removeItem("user");
            window.location.href = "/login";
          }}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
