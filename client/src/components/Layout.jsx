import '../resources/layout.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

function Layout(props) {
  const user = JSON.parse(localStorage.getItem('expense-tracker-user'))
  const navigate = useNavigate()
  // const menu = 

  return (
    <div className='layout'>
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">Expense Tracker</h1>
        </div>
        {/* <div>
          <h1 className='username'>{user.name}</h1>
        </div> */}
        <div>
        <Dropdown>
          {/* <Dropdown.Toggle variant="secondary" id="dropdown-basic"> */}
          <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: "#088a2a", color: 'white' }}>
              {user.name}
          </Dropdown.Toggle>

          {/* <Dropdown.Menu variant="dark"> */}
          <Dropdown.Menu style={{ backgroundColor: "#088a2a"}}>
            <Dropdown.Item style={{ backgroundColor: "#088a2a", color: 'white' }}
              onClick={()=>{localStorage.removeItem('expense-tracker-user')
            navigate('/login')
          }}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
      </div>

      <div className='content'>
          {props.children}
      </div>
      
    </div>
  )
}

export default Layout