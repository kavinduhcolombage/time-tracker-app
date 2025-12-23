import { useContext, useEffect, useMemo, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { collection, onSnapshot, orderBy, query, Timestamp, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const TaskTable = () => {
    type Task = {
        id: string;
        description: string;
        startTime: Timestamp;
        endTime: Timestamp;
    }
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const auth = useContext(AuthContext);

    if (!auth) {
        throw new Error("TaskTable must be used inside AuthProvider");
    }

    const { currentUser } = auth;

    useEffect(() => {
        if (!currentUser) return;

        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);

        const startOfNextDay = new Date(startOfDay);
        startOfNextDay.setDate(startOfNextDay.getDate() + 1);

        const q = query(
            collection(db, "users", currentUser.uid, "tasks"),
            where("startTime", ">=", Timestamp.fromDate(startOfDay)),
            where("startTime", "<", Timestamp.fromDate(startOfNextDay)),
            orderBy("startTime", "desc")
        );

        const unsubscribe = onSnapshot(q, snapshot => {
            const taskList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Task[];

            setTasks(taskList);

            console.log("Fetched tasks: ", taskList);
        });

        return () => unsubscribe();
    }, [currentUser, selectedDate]);

    const totalDurationMs = useMemo(() => {
        return tasks.reduce((total, task) => {
            const description = task.description.toLowerCase();
            if (description.includes("break")) {
                return total;
            }
            const start = task.startTime.toDate().getTime();
            const end = task.endTime.toDate().getTime();
            return total + (end - start);
        }, 0);
    }, [tasks]);

    // Convert ms → hours & minutes
    const totalHours = Math.floor(totalDurationMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(
        (totalDurationMs % (1000 * 60 * 60)) / (1000 * 60)
    );

    return (
        <>
            <div className="flex items-center justify-around py-1">
                <div className="font-semibold text-indigo-700">
                    Total :{" "}
                    <span className="text-gray-800">
                        {totalHours}h {totalMinutes}m
                    </span>
                </div>
                <input
                    type="date"
                    value={selectedDate.toISOString().split("T")[0]}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    className="border rounded"
                />
            </div>


            <table className="min-w-full border border-blue-700">
                <thead className="bg-indigo-200">
                    <tr>
                        <th className="px-4 py-2 border">Task</th>
                        <th className="px-4 py-2 border">Start Time</th>
                        <th className="px-4 py-2 border">End Time</th>
                    </tr>
                </thead>

                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id} className="border">
                            <td className="px-4 py-2 border">
                                {task.description}
                            </td>
                            <td className="px-4 py-2 border">
                                {task.startTime?.toDate().toLocaleTimeString([], {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                })}
                            </td>

                            <td className="px-4 py-2 border">
                                {task.endTime?.toDate().toLocaleTimeString([], {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                })}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </>

    )
}

export default TaskTable