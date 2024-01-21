import { useRef } from "react";
import CreateIcon from "@mui/icons-material/Create";

const CreateGroup = ({ toggleCreateGroupModal, createGroup }) => {
  const name = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    createGroup(name.current.value);
  };

  return (
    <>
      <div className="backdrop" onClick={toggleCreateGroupModal}></div>
      <div className="create-group p-4">
        <h3 className="text-2xl font-bold mb-4">Create Group</h3>
        <form onSubmit={submitHandler}>
          <label className="block mb-2">Provide a group name</label>
          <div className="flex items-center mb-4">
            <input
              name="name"
              type="text"
              placeholder="Group name"
              ref={name}
              required
              className="border border-gray-300 p-2 flex-grow"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-2 rounded"
            >
              <CreateIcon className="mr-2" />
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateGroup;
