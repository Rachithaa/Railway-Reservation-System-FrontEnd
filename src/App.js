
import './App.css';
import { useEffect, useState} from "react";
import {Routes,Route} from "react-router-dom";
import Login from './Login/Login';
import Homepage from './Homepage/Homepage';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import AdminDashboard from './AdminDashboard/AdminDashboard';
//import TrainAdd from './Dashboard/TrainAdd';
import TrainAll from './AdminDashboard/ViewTrain';
import AddTrain from './AdminDashboard/AddTrain';
import ParticularTrainView from './AdminDashboard/ParticularTrainView';
import BasicPopover from './AdminDashboard/popup';
import PassengerLogin from './Login/PassengerLogin';
import AdminProfile from './AdminDashboard/AdminProfile';
import SignUp from './SignUp/SignUp';
import PassengerDashboard from './PassengerDashboard/PassengerDashboard';
import PrivateRouteAdmin from './PrivateRoute/PrivateRouteAdmin';
import PassengerProfile from './PassengerDashboard/PassengerProfile';
import Booking from './Booking/Booking';
import AdminFrontPage from './AdminDashboard/AdminFrontPage';
import AboutUs from './PassengerDashboard/AboutUs';
import ViewTicket from './PassengerDashboard/ViewTicket';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path='/adminlogin' element={<Login/>}></Route>
      <Route path='/login' element={<PassengerLogin/>}></Route>
      <Route path='/SignUp' element={<SignUp/>}></Route>
      <Route path='/admindashboard' element={
      <PrivateRouteAdmin>
        <AdminFrontPage/>
        </PrivateRouteAdmin>

      }>
        </Route>
        <Route path='/passengerdashboard' element={
      <PrivateRoute>
        <PassengerDashboard/>
        </PrivateRoute>

      }>
        </Route>
        <Route path= "/passenger/viewpassenger/:email" element={
      <PrivateRoute>
        <PassengerProfile/>
        </PrivateRoute>

      }>
        </Route>
        <Route path= "/passenger/passengersavebooking" element={
        <PrivateRoute>
          <Booking/>
          </PrivateRoute>
  
        }>
          </Route>
          <Route path= "/aboutus" element={
        <PrivateRoute>
          <AboutUs/>
          </PrivateRoute>
  
        }>
          </Route>
          <Route path= "/viewticket" element={
        <PrivateRoute>
          <ViewTicket/>
          </PrivateRoute>
  
        }>
          </Route>
        <Route path='/alltrain' element={
      <PrivateRouteAdmin><TrainAll/></PrivateRouteAdmin>
      }></Route>
            <Route path='/trainadd' element={
      <PrivateRouteAdmin>
        <AddTrain/>
      </PrivateRouteAdmin>
    }>
    </Route>
    <Route path= "/admin/adminlisttrain/:trainId" element={
      <PrivateRouteAdmin>
        <ParticularTrainView/>
      </PrivateRouteAdmin>
    }>
    </Route>
    <Route path= "/admin/viewadmin/:email" element={
      <PrivateRouteAdmin>
        <AdminProfile/>
      </PrivateRouteAdmin>
    }></Route>

    </Routes>
   
  );
}

export default App;
