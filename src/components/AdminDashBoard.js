import AdminTools from "./AdminTools";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminDashBoard = () => {
  let { userObj } = useSelector((state) => state.user);
  let { isAdmin } = userObj;
  let { url } = useRouteMatch();
  return <div className="fluid">{isAdmin && <AdminTools url={url} />}</div>;
};

export default AdminDashBoard;
