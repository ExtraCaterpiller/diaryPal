import Layout from "./components/Layout";
import Diary from "./components/Diary";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Login from "./components/Login";
import Register from "./components/Register";
import DiaryDetails from "./components/DiaryDetails";
import About from "./components/About";
import EditDetails from "./components/EditDetails"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" >
    <Route index element={<LandingPage />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="about" element={<About />} />
    <Route path="main" element={<Layout />}>
      <Route path="home" element={<Home />} />
      <Route path="details/:id" element={<DiaryDetails />} />
      <Route path="details/:id/edit" element={<EditDetails />} />
      <Route path="diary" element={<Diary />} />
    </Route>
    <Route path="*" element={<NotFound />} />                  {/* If user goes to any worng url, we show this */}
  </Route>
))

function App() {
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
