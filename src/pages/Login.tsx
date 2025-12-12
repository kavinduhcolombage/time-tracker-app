const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-[60vh]">
      <div className="text-2xl font-semibold mb-10">Login</div>
      
      <div className="flex gap-3">
        <div>Username:</div>
        <input type="text" className="border p-1" />
      </div>

      <div className="flex gap-4">
        <div>Password:</div>
        <input type="password" className="border p-1" />
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-800">Login</button>
    </div>
  )
}

export default Login
