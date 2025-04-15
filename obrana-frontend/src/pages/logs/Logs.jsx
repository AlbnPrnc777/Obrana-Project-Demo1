import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./logs.scss";

const Logs = () => {
  return (
    <div className="logs">
      <Sidebar />
      <div className="logsContainer">
        <Navbar />
        <div className="header">
          <h1>Smart Contract Activity Logs</h1>
        </div>

        <table className="logsTable">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Event Type</th>
              <th>Involved Party</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>March 25, 2025 - 14:30</td>
              <td>Asset Added</td>
              <td>0x1234...abcd</td>
              <td className="status success">Success</td>
            </tr>
            <tr>
              <td>March 25, 2025 - 15:00</td>
              <td>Guardian Approved</td>
              <td>0x5678...efgh</td>
              <td className="status pending">Pending</td>
            </tr>
            <tr>
              <td>March 26, 2025 - 10:15</td>
              <td>Asset Transferred</td>
              <td>0xabcd...1234</td>
              <td className="status success">Success</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Logs;
