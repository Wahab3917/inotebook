import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {

//   let location = useLocation();
//   useEffect(() => {

//   }, [location]);

  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }

  return (
    <>
    
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          
          <Link className="navbar-brand" to="/">iNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
            {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/page-1" ? "active" : ""}`} to="/page-1">Page 1</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/page-2" ? "active" : ""}`} to="/page-2">Page 2</Link>
              </li>
            </ul> */}

            {!localStorage.getItem('token') ? <form className='d-flex'>
              <Link className="btn btn-primary btn-sm" role='button' to="/login" style={{marginRight: "5px"}}>Login</Link>
              <Link className="btn btn-primary btn-sm" role='button' to="/signup" style={{marginLeft: "5px"}}>Signup</Link>
            </form> : <button className="btn btn-primary btn-sm" style={{marginLeft: "5px"}} onClick={handleLogout}>Logout</button>}

          {/* </div> */}

        </div>
      </nav>
    
    </>
  )
}

export default Navbar

