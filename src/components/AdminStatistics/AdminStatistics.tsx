import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AdminStatistics.css";
import { faLandmark, faUsers } from "@fortawesome/free-solid-svg-icons";

function AdminStatistics() {
  return (
    <div className="admin-stat">
      <div className="main-report">
        <div className="title">
          <h3>التقارير</h3>
        </div>
        <div className="data">
          <div className="box">
            <div className="icon">
              <FontAwesomeIcon icon={faLandmark} />
            </div>
            <div className="data">
              <h4 className="data-title">المتاحف</h4>
              <span className="data-number">100</span>
            </div>
          </div>

          <div className="box">
            <div className="icon">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <div className="data">
              <h4 className="data-title">المستخدمين</h4>
              <span className="data-number">100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminStatistics;
