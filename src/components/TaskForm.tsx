import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { addDoc, collection, limit, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
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
    if (!description || !startTime || !endTime) {
      setLoading(false);
      if (!description) setDescriptionError("Description needed");
      if (!startTime) setStartTimeError("Start time needed");
      if (!endTime) setEndTimeError("End time needed");
      return;
    }
    try {
      await addDoc(collection(db, "users", currentUser.uid, "tasks"),
        {
          description,
          startTime: getDateAndTime(startTime),
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

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "users", currentUser.uid, "tasks"),
      orderBy("startTime", "desc"),
      limit(1)
    );
    const unsubscribe = onSnapshot(q, snapshot => {
      if (!snapshot.empty) {
        const lastTask = snapshot.docs[0].data();
        console.log("Last task added: ", lastTask);
        setStartTime(lastTask.endTime.toDate().toTimeString().slice(0, 5));
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <form onSubmit={addTask} className="">
      <div className="flex gap-5 px-2 max-[600px]:flex-col max-[600px]:gap-1">
        <div className="w-1/2 max-[600px]:w-full">
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

        <div className="flex gap-4 w-1/2 max-[600px]:w-full">
          <div className="w-1/2">
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

          <div className="w-1/2">
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
      </div>
      <div className="flex justify-end px-1 py-3">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 max-[400px]:px-3 max-[400px]:py-1 bg-indigo-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 max-[500px]:w-full"
        >
          {loading ? "Saving..." : "Add Task"}
        </button>
      </div>

    </form>
  )
}

export default TaskForm