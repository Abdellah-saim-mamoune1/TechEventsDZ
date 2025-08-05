import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { Section } from "./Section";
import "./app.css"
import { LoginPage } from "./Login";
import { AddSection } from "./AddSection";
function App() {
function handleclick(){
  let clicks= localStorage.getItem("Clicks");
  if(!clicks)
    clicks='0';
  
  let clicks2=Number(clicks)+1;
  localStorage.setItem("Clicks",clicks2.toString());
}
  return (
    <Router>
       <div className="w-full h-full flex flex-row">
 <div onClick={()=>handleclick()}><Sidebar /></div>
        <div className="flex-1 h-full overflow-y-auto flex flex-col">
       
       <div className="flex-1 dark:bg-gray-900 ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/section/:id" element={<Section />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/addsection" element={<AddSection />} />
          </Routes>
        </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
