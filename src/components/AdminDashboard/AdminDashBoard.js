import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminTools from "./AdminTools";
const AdminDashBoard = () => {
  let { userObj } = useSelector((state) => state.user);
  let { isAdmin } = userObj;
  let { url } = useRouteMatch();
  // Tools
  return <div className="fluid">{isAdmin && <AdminTools url={url} />}</div>;
};
export default AdminDashBoard;
