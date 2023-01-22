import {
   Routes,
   Route,
   Navigate
} from "react-router-dom"
import { 
  NotFound,
  Home,
  Login ,
  ShowChar
} from "./components/pages"
import {
  Footer,
   Nav
} from "./components/molekuls"
import { 
  Middleware
} from "./services"
import './App.css'
import { 
  Todo ,
  CreditList
} from "./components/pages/mainPage"
//======================main==programs
function App() {
  return (
      <div className="app__container">
      <div className="">
        <div className="bg-4">
          <Nav />
        </div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/show/:id/char" element={<ShowChar/>}/>
        <Route path="/login/:id" element={<Login/>}/>
        <Route path="/menu/:id" element={<Todo/>}/>  
        <Route path="/kredit/list/:id" element={<CreditList/>}/>  
          {/* <Route element={<Middleware/>} >
            <Route path="/list/:id" element={<Todo/>}/>
          </Route> */}
        <Route path="/404" element={<NotFound/>}/>
        <Route path="/*" element={<Navigate replace to={'/404'}/>}/>
      </Routes>
      </div>
      <Footer/>
      </div>
  )
}

export default App
