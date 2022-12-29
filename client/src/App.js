import './App.css';
// import {Button} from 'antd'
// import 'antd/dist/antd.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home';
import Test from './pages/Test';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/test' element={<Test />} />
          {/* <Route path='/offers' element={<Offers />} />
          <Route path='/profile' element={<Profile />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* <Route path='/forgot-password' element={<ForgotPassword />} /> */}
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export const ProtectedRoute=(props)=>{
  if(localStorage.getItem('expense-tracker-user')){
    // console.log('expense-tracker-user')
    return props.children
  }else {
    return <Navigate to='/login' />
  }
}


export default App;
