import React, { useEffect, useState } from "react";
import getAxiosWithTokenObj from "../AuthorizedRequest/AxiosReqWithToken";
const UserDetails = () => {
  let [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchdata() {
      let axiosReqWithToken = getAxiosWithTokenObj();
      let response = await axiosReqWithToken.get("/users/getalluser");
      let data = response.data;
      if (data.message === "alluser") {
        setUsers(data.payload);
      } else {
        alert(data.message);
      }
    }
    fetchdata();
  }, []);
  return (
    <div className="container mx-auto mt-5 table-responsive">
      {users.length !== 0 && (
        <table className="table table-secondary table-striped table-hover text-center">
          <thead>
            <tr>
              <th>Profile Pic</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img src={user.image} alt="" width="50px" height="50px" />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserDetails;
