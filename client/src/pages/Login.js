import {Link, useNavigate} from 'react-router-dom'
import '../resources/authentication.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

function Login() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const {name, email, password} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit=async(e)=> {
    e.preventDefault()
    setLoading(true)
    const values ={
      name: name,
      email: email,
      password: password
    }
    console.log(values)
    try {
      const response = await axios.post('/api/users/login', values)
      console.log(response.data) ;
      localStorage.setItem('expense-tracker-user', JSON.stringify({...response.data, password:''}))
      toast.success("login successful", {theme: "colored"})
      // console.log('login successful')
      setLoading(false)
      navigate('/')
    } catch (error) {
      setLoading(false)
      toast.error('Login failed', {theme: "colored"})
      // throw new Error(`Something went wrong! ${error.message}`);
    }
    setFormData({
      name: '',
      email: '',
      password: ''
    })
  }

  useEffect(() => {
    if(localStorage.getItem('expense-tracker-user')){
      navigate('/')
    }
  }, [])
  
  if (loading){
    return <Spinner />
  }

  return (
    <div className='register'>
      {/* {loading && <Spinner /> } */}
      <div className="row justify-content-center  align-items-center w-100 h-100">
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            <h1>EXPENSE TRACKER / ログイン</h1>
            <hr />
            {/* <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                name='name'
                value={name}
                onChange={handleChange}
              />
            </div> */}
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name='email'
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name='password'
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                ログイン
              </button>
            </div>
            <p className="forgot-password text-right">
              <Link to='/register'>アカウントをお持ちでありませんか?, ここをクリックして登録</Link>
            </p>
          </form>
        </div>
        <div className="col-md-5 ">
          <div className="lottie">
            <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_06a6pf9i.json"  background="transparent" speed="1" loop autoplay></lottie-player>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login