import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import TaskTable from "../components/TaskTable";
import TaskForm from "../components/TaskForm";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  if (!auth) {
    return (
      <div>nothing...</div>
    );
  }

  const { currentUser, loading, logout } = auth;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  }

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
      <div className="max-w-6xl mx-auto space-y-6 max-[400px]:space-y-2">

        {/* Header */}
        <header className="flex items-center justify-between bg-indigo-500 p-4 rounded shadow">
          <div>
            <h1 className="text-2xl max-[600px]:text-xl font-bold text-white">Dashboard</h1>
            <p className="text-sm text-white">
              {currentUser.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        <TaskForm/>

        <TaskTable/>

      </div>
    </div>
  );
  
}

export default Dashboard;
