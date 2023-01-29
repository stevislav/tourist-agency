import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatable from "../../components/datatable/Datatable";

const List = ({ columns }) => {
  return (
    <div className="profileList">
      <Sidebar />
      <div className="profileListContainer">
        <div className="topList"></div>
        <Datatable columns={columns} />
        <div className="bottomList"></div>
      </div>
    </div>
  );
};

export default List;
