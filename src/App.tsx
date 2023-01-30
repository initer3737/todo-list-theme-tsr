import {
   Routes,
   Route,
   Navigate,
   useLocation,
   useParams
} from "react-router-dom"
import { 
  NotFound,
  Home,
  Login ,
  ShowChar,
  Loading,
  Game
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
import { AnimatePresence } from "framer-motion"
import ChangeChar from "./components/pages/mainPage/changeChar"
//======================main==programs
function App() {
    const location=useLocation();
    const {id}=useParams()
  return (
    // <AnimatePresence exitBeforeEnter>
      <div className="app__container">
      <div className="">
        <div className="bg-4">
          <Nav />
        </div>
      <AnimatePresence exitBeforeEnter={true}>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home/>}/>
        <Route path="/show/char/:id" element={<ShowChar/>}/>
        <Route path="/login/:id" element={<Login/>}/>
        <Route path="/menu/:id" element={<Todo/>}/>  
        <Route path="/game/:id" element={<Game/>}/>  
        <Route path="/loading/:id/:url" element={<Loading/>}/>  
        <Route path="/kredit/list/:id" element={<CreditList/>}/>  
        <Route path="/char/change/:id" element={<ChangeChar/>}/>  
        <Route path="/char/setting/:id" element={<ChangeChar/>}/>  
        <Route path="/char/show/:playername/:id" element={<ChangeChar/>}/>  
          {/* <Route element={<Middleware/>} >
            <Route path="/list/:id" element={<Todo/>}/>
          </Route> */}
        <Route path="/404" element={<NotFound/>}/>
        <Route path="/*" element={<Navigate replace to={`/404`}/>}/>
      </Routes>
      </AnimatePresence>
      </div>
      <Footer/>
      </div>
    // {/* </AnimatePresence> */}
  )
}

export default App
