import {lazy, useState, Suspense, useEffect, Profiler} from 'react'
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
import {AdminPage} from "./pages/Admin/Admin";
import {getBrandsFetch} from "./store/slices/brand.slice";
import PhoneModel from "./sections/PhoneModel";
import {getUserFetch} from "./store/slices/user.slice";
import {Slider} from "./components/Slider/slider";

function App() {
  const [count, setCount] = useState(0);
  const Auth = lazy(() => import('./pages/Authorization/Authorization'));
  const Registration = lazy(() => import('./pages/Register/Register'));
    const DetalisPhone = lazy(() => import('./pages/Phones/Details'));
    const Phones = lazy(() => import('./pages/Phones/Phones'));
    const AdminPage = lazy(() => import('./pages/Admin/Admin'));
    const Profile = lazy(() => import('./pages/Admin/Admin'));
    const dispatch = useAppDispatch();
    const User = localStorage.getItem('token');
    useEffect(() => {
        dispatch(getPhonesFetch());
        dispatch(getBrandsFetch());
        { User &&  dispatch(getUserFetch())}
    }, [dispatch]);
    return (
            <div className="App max-w-screen-xl mx-auto" >


                {/*<SliderDemo />*/}
                {/*<Alert />*/}
                {/*<Checkbox text={'ASDAD'}/>*/}
                <Router>
                    <Header />
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
                        <Route path="/AdminPage" element={<Suspense fallback={<h2>Загрузка...</h2>}> <AdminPage /> </Suspense>}></Route>
                        <Route path="/AdminPage" element={<Suspense fallback={<h2>Загрузка...</h2>}> <AdminPage /> </Suspense>}></Route>
                        <Route path="/AdminPage" element={<Suspense fallback={<h2>Загрузка...</h2>}> <AdminPage /> </Suspense>}></Route>
                        <Route path="/Profile" element={<Suspense fallback={<h2>Загрузка...</h2>}> <Profile /> </Suspense>}></Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
                <Slider sliders={[{id: 1, text:"smile", image:"nigger"}, {id: 2, text:"like", image:"ASdasdasd"}]}/>
                <Footer />
                <PhoneModel />
            </div>
  );
}

export default App
