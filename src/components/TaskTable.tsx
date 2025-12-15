
const TaskTable = () => {
    return (
        <div>
            <table className="min-w-full border border-blue-700">
                <th className="bg-blue-200">
                    <tr className="flex justify-around">
                        <th className="px-4 py-2 text-left">Start Time</th>
                        <th className="px-4 py-2 text-left">End Time</th>
                        <th className="px-4 py-2 text-left">Task</th>
                    </tr>
                </th>
            </table>
        </div>

    )
}

export default TaskTable