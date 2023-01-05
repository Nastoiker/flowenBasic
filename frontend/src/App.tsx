import {lazy, useState, Suspense} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {Route, Routes} from "react-router-dom";
import NotFound from './pages/NotFound';
function App() {
  const [count, setCount] = useState(0);
  const Home = lazy(() => import('./pages/Home/Home'));
  const Auth = lazy(() => import('./pages/Authorization/Authorization'));
  const Registration = lazy(() => import('./pages/Register/Register'));
    const DetalisPhone = lazy(() => import('./pages/Authorization/Authorization'));
    const Phones = lazy(() => import('./pages/Phones/Phones'));

    return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
          <Routes>
              <Route path="/" element={<Suspense fallback={<h2>Загрузка...</h2>}><Home /> </Suspense>} />
              <Route path="/home" element={<Suspense fallback={<h2>Загрузка...</h2>}><Home /> </Suspense>} />
            <Route path="/login" element={<Suspense fallback={<h2>Загрузка...</h2>}><Auth /> </Suspense>} />
            <Route path="/join" element={<Suspense fallback={<h2>Загрузка...</h2>}><Registration /> </Suspense>} />
            <Route path="/product" element={<Suspense fallback={<h2>Загрузка...</h2>}><Home /> </Suspense>} />
              <Route path="/product/phone" element={<Suspense fallback={<h2>Загрузка...</h2>}><Phones /> </Suspense>} />
              <Route path="/product/phone:id" element={<Suspense fallback={<h2>Загрузка...</h2>}><DetalisPhone /> </Suspense>} />
            <Route path="*" element={<NotFound />} />

          </Routes>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
