import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Layout from './Layout'
import Reviews from './Components/Reviews';
import Dashboard from './Components/Dashboard/Dashboard';
import DashboardHome from './Components/Dashboard/DashboardHome';
import DashboardReviews from './Components/Dashboard/DashboardReviews';
import ReviewForm from './Components/Dashboard/ReviewForm';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import DashboardReview from './Components/Dashboard/DashboardReview';
import UpdateReview from './Components/Dashboard/UpdateReview';
import DashboardMain from './Components/Dashboard/DashboardMain';

function App() {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/' element={<Reviews/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
      </Route>

      <Route path='/dashboard' element={<Dashboard/>}>
         <Route index element={<DashboardMain/>}/>
         <Route path='home' element={<DashboardHome/>}>
          <Route index element={<DashboardReviews/>}/>
          <Route path='publish-review' element={<ReviewForm/>}/>
          <Route path=':reviewId' element={<DashboardReview/>}/>
          <Route path='update-review/:reviewId' element={<UpdateReview/>}/>
         </Route>
       </Route>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
