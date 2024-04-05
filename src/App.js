import ChatPage from "./Components/ChatFile";
import UploadPage from "./Components/UploadFile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
   <>
   <Router>
    <Routes>
      <Route path="/">
        <Route index element={<UploadPage/>}/>
        <Route path="/ChatFile" element={<ChatPage/>}/>
      </Route>
    </Routes>
   </Router>
   </>
  )
}

export default App;
