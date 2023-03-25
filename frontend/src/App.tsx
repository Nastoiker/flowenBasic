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
import apple from '/slider/sliderApple.png';
import samsung from '/slider/sliderSamsung.webp';
import BasketPage from "./pages/Basket/Basket.page";
import {getBasketFetch} from "./store/slices/basket.slice";
import {RatingForm} from "./components/Rating/setRating.form.";
import {UpdateAvatarProfile} from "./components/Profile/UpdateAvatar.profile";
import SearchPage from "./pages/Search/Search";
import {FilterByPrice} from "./components/Filters/FilterByPrice";
import {StaticSlider} from "./components/Slider/StaticSlider";
interface IItems {
    subtitle: string;
    title: string
    picture: string;
    id: string;
}
function App() {
    const StaticSliderArr:IItems[] = [{id: '1',  subtitle: 'APPLE', title: 'IPHONE', picture: 'http://localhost:8000/slider1.png'}, { id: '2', subtitle: 'SSS', title: 'BBBB', picture: 'http://localhost:8000/slider1.png'}, {id: '3',  subtitle: 'APPLE', title: 'IPHONE', picture: 'http://localhost:8000/slider1.png'}, {id: '4',  subtitle: 'APPLE', title: 'IPHONE', picture: 'http://localhost:8000/slider1.png'}];

    const [count, setCount] = useState(0);
  const Auth = lazy(() => import('./pages/Authorization/Authorization'));
  const Registration = lazy(() => import('./pages/Register/Register'));
    const DetalisPhone = lazy(() => import('./pages/Phones/Details'));
    const Phones = lazy(() => import('./pages/Phones/Phones'));
    const AdminPage = lazy(() => import('./pages/Admin/Admin'));
    const Profile = lazy(() => import('./pages/Profile/Profile'));
    const BasketPage = lazy(() => import('./pages/Basket/Basket.page'));
    const PhonesByBrand = lazy(() => import('./pages/Phones/PhonesByBrand'));
    const SearchPage = lazy(() => import('./pages/Search/Search'));
    const dispatch = useAppDispatch();
    const User = localStorage.getItem('token');
    useEffect(() => {
        dispatch(getPhonesFetch());
        dispatch(getBrandsFetch());
        { User &&  dispatch(getUserFetch()); dispatch(getBasketFetch()); }
    }, [dispatch]);
    return (<div className={"relative"}>



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
                    <Route path="/Basket" element={<Suspense fallback={<h2>Загрузка...</h2>}> <BasketPage /> </Suspense>}></Route>
                    <Route path="/PhonesByBrand/:id" element={<Suspense fallback={<h2>Загрузка...</h2>}> <PhonesByBrand /> </Suspense>}></Route>

                    <Route path="/Search/:SearchValue" element={<Suspense fallback={<h2>Загрузка...</h2>}> <SearchPage /> </Suspense>}></Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
            <StaticSlider items={StaticSliderArr}/>
            {/*<Filters />*/}
            <UpdateAvatarProfile/>
            <FilterByPrice />
            <Slider sliders={[{id: 1, text:"smile", image:apple}, {id: 2, text:"like", image:samsung}]}/>
            <PhoneModel />

        </div>
           <Footer />
        </div>

);
}

export default App;
