import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        
        {/* Updated Widgets */}
        <div className="widgets">
          <Widget type="assets" /> {/* Total Secured Assets */}
          <Widget type="guardians" /> {/* Pending Guardian Approvals */}
          <Widget type="activity" /> {/* Last Recorded Activity */}
          <Widget type="countdown" /> {/* Inactivity Countdown */}
        </div>

        {/* Updated Charts Section */}
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Crypto Activity)" aspect={2 / 1} />
        </div>

        {/* Updated Table Section */}
        <div className="listContainer">
          <div className="listTitle">Recent Smart Contract Events</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
