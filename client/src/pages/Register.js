import {Link, useNavigate} from 'react-router-dom'
import '../resources/authentication.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function Register() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const navigate = useNavigate()
  const {name, email, password} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit=async (e)=> {
    e.preventDefault()
    setLoading(true)
    const values ={
      name: name,
      email: email,
      password: password
    }
    console.log(values)
    try {
      const response = await axios.post('/api/users/register', values)
      console.log("register user successfully:", response.data) ;
      setLoading(false)
      toast.success("Registration successful", {theme: "colored"})
    } catch (error) {
      setLoading(false)
      toast.error('Registration failed', {theme: "colored"})
      throw new Error(`Something went wrong! ${error.message}`);
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
      <div className="row justify-content-center  align-items-center w-100 h-100">
        <div className="col-md-5 ">
          <div className="lottie">
            <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_06a6pf9i.json"  background="transparent" speed="1" loop autoplay></lottie-player>
          </div>
        </div>
        <div className="col-md-5">
          <form onSubmit={handleSubmit}>
            <h1>EXPENSE TRACKER / 登録</h1>
            <hr />
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                name='name'
                value={name}
                onChange={handleChange}
              />
            </div>
            {/* <div className="mb-3">
              <label>Last name</label>
              <input type="text" className="form-control" placeholder="Last name" />
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
                登録
              </button>
            </div>
            <p className="forgot-password text-right">
              <Link to='/login'>既に登録済みですか?, ここをクリックしてログイン</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register