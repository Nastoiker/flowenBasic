import {lazy, useState, Suspense} from 'react'
import eactLogo from './assets/react.svg';
import './App.css';
import {Route, BrowserRouter as Router, Routes, useLocation} from "react-router-dom";
import NotFound from './pages/NotFound';
import Home from './pages/Home/Home';
import Registration from './pages/Register/Register';
import Auth from './pages/Authorization/Authorization';
import Phones from './pages/Phones/Phones';
import DetalisPhone from './pages/Phones/Details';
import {Checkbox} from "./components/checkbox/Checkbox";
import {Filters} from "./components/Filters/Filter";

function App() {
  const [count, setCount] = useState(0);
  const Auth = lazy(() => import('./pages/Authorization/Authorization'));
  const Registration = lazy(() => import('./pages/Register/Register'));
    const DetalisPhone = lazy(() => import('./pages/Authorization/Authorization'));
    const Phones = lazy(() => import('./pages/Phones/Phones'));
    return (
    <div className="App">
        <Filters filterBy={[{name: 'filter'}]}/>
        <h1 className="border border-blue">test</h1>
        <h1 className="text-3xl  font-bold underline">
            Hello world!
        </h1>
        {/*<Checkbox text={'ASDAD'}/>*/}
        <Router>
        <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />}/>
            <Route path="/login" element={<Suspense fallback={<h2>Загрузка...</h2>}><Auth /></Suspense>} />
            <Route path="/join" element={<Suspense fallback={<h2>Загрузка...</h2>}><Registration /> </Suspense>} />
            <Route path="/product" element={<Suspense fallback={<h2>Загрузка...</h2>}><Home /> </Suspense>} />
            <Route path="/product/phone" element={<Suspense fallback={<h2>Загрузка...</h2>}><Phones /> </Suspense>} />
            <Route path="/product/phone:id" element={<Suspense fallback={<h2>Загрузка...</h2>}><DetalisPhone /> </Suspense>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App
