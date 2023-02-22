import {lazy, useState, Suspense, useEffect} from 'react'
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
import {Menu} from "./components/Menu/Menu";
import Alert from "./ui/alert/alert";
import SliderDemo from "./ui/slider/slider";
import {Search} from "./components/Search/Search";
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {getPhonesFetch} from "./store/slices/phones.slices";
import {useAppDispatch} from "./store";

function App() {
  const [count, setCount] = useState(0);
  const Auth = lazy(() => import('./pages/Authorization/Authorization'));
  const Registration = lazy(() => import('./pages/Register/Register'));
    const DetalisPhone = lazy(() => import('./pages/Phones/Details'));
    const Phones = lazy(() => import('./pages/Phones/Phones'));
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getPhonesFetch());
    }, [dispatch]);
    return (
            <div className="App max-w-screen-xl mx-auto" >
                <Header />
                <Filters filterBy={[{name: 'filter'}]}/>
                <h1 className="border border-blue p-30">test</h1>
                <h1 className="text-3xl  font-bold underline">
                    Hello world!
                </h1>
                <Search />
                <h1 className={"text-"}></h1>
                <header>
                    <a href="">webdev</a>
                    <nav>
                        <ul>
                            <li><a href="#"></a></li>
                            <li><a href="#"></a></li>
                            <li><a href="#"></a></li>
                        </ul>
                    </nav>
                </header>
                <SliderDemo />
                <Alert />
                {/*<Checkbox text={'ASDAD'}/>*/}
                <Router>
                    <Menu />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />}/>
                        <Route path="/login" element={<Suspense fallback={<h2>Загрузка...</h2>}><Auth /></Suspense>} />
                        <Route path="/register" element={<Suspense fallback={<h2>Загрузка...</h2>}><Registration /></Suspense>} />
                        <Route path="/join" element={<Suspense fallback={<h2>Загрузка...</h2>}><Registration /> </Suspense>} />
                        <Route path="/product" element={<Suspense fallback={<h2>Загрузка...</h2>}><Home /> </Suspense>} />
                        <Route path="/product/phone" element={<Suspense fallback={<h2>Загрузка...</h2>}><Phones /> </Suspense>} />
                        <Route path="/product/phone/:id" element={<Suspense fallback={<h2>Загрузка...</h2>}><DetalisPhone /> </Suspense>} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
                <Footer />
            </div>
  )
}

export default App
