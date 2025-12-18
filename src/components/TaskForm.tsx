import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const TaskForm = () => {
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [startTime, setStartTime] = useState("");
  const [startTimeError, setStartTimeError] = useState("");
  const [endTime, setEndTime] = useState("");
  const [endTimeError, setEndTimeError] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);
  if (!auth) return null;
  const { currentUser } = auth;

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!currentUser) return;
    if(!description || !startTime || !endTime){
      setLoading(false);
      if(!description) setDescriptionError("Description needed");
      if(!startTime) setStartTimeError("Start time needed");
      if(!endTime) setEndTimeError("End time needed");
      return;
    }
    try {
      await addDoc(collection(db, "users", currentUser.uid, "tasks"),
        {
          description,
          startTIme: getDateAndTime(startTime),
          endTime: getDateAndTime(endTime),
          createdAt: serverTimestamp()
        });
      setDescription("");
      setStartTime("");
      setEndTime("");
      setLoading(false);

    } catch (error) {
      console.log("Error adding task: ", error);
    }
  }

  const getDateAndTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
  }

  const onDescriptionChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDescription(value);
    setDescriptionError(value ? "" : "Description needed");
  }

  const onStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStartTime(value);
    setStartTimeError(value ? "" : "Start time needed");
  }

  const onEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEndTime(value);
    const valid = getDateAndTime(value) > getDateAndTime(startTime);
    setEndTimeError(value ? (valid ? "" : "End time must be after start time") : "End time needed");
  }

  return (
    <form onSubmit={addTask} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Task Description
        </label>
        <input
          type="text"
          value={description}
          onChange={onDescriptionChnage}
          className="w-full border rounded px-3 py-2"
          placeholder="What are you working on?"
        />
        {descriptionError && <p className="text-red-500 text-sm">{descriptionError}</p>}

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Start Time
          </label>
          <input
            type="time"
            value={startTime}
            onChange={onStartTimeChange}
            className="w-full border rounded px-3 py-2"
          />
          {startTimeError && <p className="text-red-500 text-sm">{startTimeError}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            End Time
          </label>
          <input
            type="time"
            value={endTime}
            onChange={onEndTimeChange}
            className="w-full border rounded px-3 py-2"
          />
          {endTimeError && <p className="text-red-500 text-sm">{endTimeError}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Add Task"}
      </button>
    </form>
  )
}

export default TaskForm