import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import TaskTable from "../components/TaskTable";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    return (
      <div>nothing...</div>
    );
  }
  const { currentUser, loading } = auth;
  if (loading) {
    return (
      <div>Loading...</div>
    );
  }
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-500">Unauthorized</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-50 max-[900px]:px-30 max-[800px]:px-15 max-[650px]:px-5">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <header className="flex items-center justify-between bg-white p-4 rounded shadow">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-600">
              Logged in as: {currentUser.email}
            </p>
          </div>

          <button
            onClick={() => console.log("Logout clicked")}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        {/* Add Task */}
        {/* <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Add Task</h2>
          <TaskForm userId={user.uid} />
        </section> */}

        {/* Task List */}
        {/* <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
          <TaskTable userId={user.uid} />
        </section> */}
        <TaskForm/>

        <TaskTable/>

      </div>
    </div>
  );
  
}

export default Dashboard;
