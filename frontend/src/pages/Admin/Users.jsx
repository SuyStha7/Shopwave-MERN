import axios from "axios";
import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState({});
  const getAllUsers = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/all-users`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, //axios send automatically cookies when we apply this property
      })
      .then((res) => {
        console.log(res);
        setUsers(res?.data);
        // toast.success("Authorized");
      })
      .catch((error) => {
        console.log(error);
        // toast.error("Can't access the resource");
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <div className='flex items-center'>
        <h1 className='text-lg font-semibold md:text-2xl'>Users</h1>
      </div>
      <div
        className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'
        x-chunk='dashboard-02-chunk-1'>
        <div className='flex flex-col items-center gap-1 text-center'>
          {JSON.stringify(users, 0, 2)}
        </div>
      </div>
    </>
  );
};

export default Users;
