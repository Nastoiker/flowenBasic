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
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {getPhonesFetch} from "./store/slices/phones.slices";
import {useAppDispatch, useAppSelector} from "./store";
import {AdminPage} from "./pages/Admin/Admin";
import {getBrandsFetch} from "./store/slices/brand.slice";
import {getUserFetch} from "./store/slices/user.slice";

import BasketPage from "./pages/Basket/Basket.page";
import {getBasketFetch} from "./store/slices/basket.slice";

import SearchPage from "./pages/Search/Search";
import {StaticSlider} from "./components/Slider/StaticSlider";
import SliderDemo from "./ui/slider/slider";

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
    const  Accessories = lazy(() => import('./pages/Accessories/Accessories'));
    const Brands = lazy(() => import('./pages/brands/Brands'));
    const Phones = lazy(() => import('./pages/Phones/Phones'));
    const Home = lazy(() => import('./pages/Home/Home'));
    const AdminPage = lazy(() => import('./pages/Admin/Admin'));
    const Profile = lazy(() => import('./pages/Profile/Profile'));
    const BasketPage = lazy(() => import('./pages/Basket/Basket.page'));
    const PhonesByBrand = lazy(() => import('./pages/Phones/PhonesByBrand'));
    const SearchPage = lazy(() => import('./pages/Search/Search'));
  const EditProfile = lazy(() => import('./pages/EditProfile/EditProfilePage'));
  const BrandPage = lazy(() => import('./pages/Brand/Brand.page'));
    const dispatch = useAppDispatch();
    const User = localStorage.getItem('token');
    useEffect(() => {
        dispatch(getPhonesFetch());
        dispatch(getBrandsFetch());
        { User &&  dispatch(getUserFetch()); dispatch(getBasketFetch()); }
    }, [dispatch]);
    const phones = useAppSelector(state => state.phone.filtered);
  console.log(phones);
    return (<div className={"relative"}>



        <div className="App h-fit min-h-screen max-w-screen-xl mx-auto" >

            {/*<SliderDemo />*/}
            {/*<Alert />*/}
            {/*<Checkbox text={'ASDAD'}/>*/}
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Suspense fallback={<h2>Загрузка...</h2>}><Home /></Suspense>}/>
                    <Route path="/home" element={<Suspense fallback={<h2>Загрузка...</h2>}><Home /></Suspense>}/>
                    <Route path="/accessories" element={<Suspense fallback={<h2>Загрузка...</h2>}><Accessories /></Suspense>}/>
                    <Route path="/brands" element={<Suspense fallback={<h2>Загрузка...</h2>}><Brands /></Suspense>}/>
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
                    <Route path="/EditProfile" element={<Suspense fallback={<h2>Загрузка...</h2>}> <EditProfile /> </Suspense>}></Route>
                                        <Route path="/Brand/:brand" element={<Suspense fallback={<h2>Загрузка...</h2>}> <BrandPage /> </Suspense>}></Route>

                    <Route path="/Search/:SearchValue" element={<Suspense fallback={<h2>Загрузка...</h2>}> <SearchPage /> </Suspense>}></Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
            {/*<StaticSlider items={StaticSliderArr}/>*/}
            {/*<Filters />*/}
            {/*<Menu />*/}

            {/*<UpdateAvatarProfile/>*/}
            {/*<FilterByPrice />*/}
            {/*<Slider sliders={[{id: 1, text:"smile", image:apple}, {id: 2, text:"like", image:samsung}]}/>*/}
            {/*<PhoneModel />*/}

        </div>
           <Footer />
        </div>

);
}

export default App;
