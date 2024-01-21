import { useRef, useState } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";

const AddMember = ({
  toggleAddMembersModel,
  addMembersHandler,
  isAdmin,
  users,
  admins,
  selected,
}) => {
  const email = useRef();
  const url = "http://localhost:4000";
  const [addUser, setAddUser] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    addMembersHandler(email.current.value);
  };

  const makeAdmin = async (userId) => {
    const response = await axios.post(
      `${url}/api/group/make-admin/${selected.id}`,
      { userId }
    );
    alert(response.data.message);
    toggleAddMembersModel();
  };

  const deleteUser = async ({ email, isadmin }) => {
    const response = await axios.post(
      `${url}/api/group/delete-user/${selected.id}`,
      { email, isadmin }
    );
    alert(response.data.message);
    toggleAddMembersModel();
  };

  return (
    <>
      <div className="backdrop" onClick={toggleAddMembersModel}></div>
      <div className="create-group p-4">
        {!addUser && isAdmin && (
          <button
            onClick={() => setAddUser(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <AddIcon className="mr-2" />
            Add Members
          </button>
        )}
        {addUser && (
          <form onSubmit={submitHandler} className="mt-4">
            <label className="block mb-2">Email</label>
            <input
              name="email"
              type="email"
              placeholder="test@gmail.com"
              ref={email}
              required
              className="border border-gray-300 p-2 w-full"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
            >
              <AddIcon className="mr-2" />
              Add
            </button>
            <button
              onClick={() => setAddUser(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              <CancelIcon className="mr-2" />
              Cancel
            </button>
          </form>
        )}
        {admins.map((admin) => (
          <div key={admin.id} className="members mt-4">
            <div>{admin.email}</div>
            <div className="flex items-center">
              <div className="mr-2">
                <StarIcon />
              </div>
              <div>Admin</div>
            </div>
          </div>
        ))}
        {users.map((user) => (
          <div key={user.id} className="members mt-4">
            <div>{user.email}</div>
            {isAdmin && (
              <div className="flex items-center">
                <button
                  onClick={() => makeAdmin(user.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  <StarIcon className="mr-1" />
                  Make Admin
                </button>
                <button
                  onClick={() =>
                    deleteUser({ email: user.email, isadmin: false })
                  }
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  <DeleteIcon />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default AddMember;
