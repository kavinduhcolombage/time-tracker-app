import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const TaskTable = () => {
    type Task = {
        id: string;
        description: string;
        startTime: Timestamp;
        endTime: Timestamp;
    }
    const [tasks, setTasks] = useState<Task[]>([]);
    const auth = useContext(AuthContext);

    if (!auth) {
        throw new Error("TaskTable must be used inside AuthProvider");
    }

    const { currentUser } = auth;

    useEffect(() => {
        if (!currentUser) return;

        const q = query(
            collection(db, "users", currentUser.uid, "tasks"),
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
    }, [currentUser]);

    return (
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


    )
}

export default TaskTable