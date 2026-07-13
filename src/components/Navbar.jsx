import { Link } from "react-router-dom"
export default function Navbar(){

    return(
    <nav className="navbar ">
     <div className="navbar-container">
       
          <Link to="/" className="navbar-brand"> ShopHub</Link>
           <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/checkout">cart</Link>
           </div>
           <divt className="navbar-Auth">
              <div className="navbar-auth-links">
                <Link to="/auth" className="btn btn-secondary">login</Link>
                <Link to="/auth" className="btn btn-primary">signup</Link>
              </div>
           </divt>
    
     </div>
    </nav>
    )

}