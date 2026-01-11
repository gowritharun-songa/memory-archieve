import toast from "react-hot-toast"

const App = () => {
  return (
    <div className="text-red-500 p-4 text-center border">
      <button
        onClick={() => {
          toast.success('Always at the bottom.', {
            position: "top-right"
          })
        }} 
        className="text-blue-700 border-2 p-5 rounded m-4 text-2xl cursor-pointer hover:bg-green-50" >Click me</button>

        <button onClick={() => {
          toast.success("will work")
        }} className="btn btn-primary">
          Daisi UI
        </button>
    </div>
  )
}

export default App