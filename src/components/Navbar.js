import React from "react";
const Navbar = () =>{
  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{"backgroundColor":""}}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#"> <img
              src='https://images.moneycontrol.com/static-mcnews/2023/06/Meesho-682x435.jpg?impolicy=website&width=770&height=431'
style={{height:"3.5rem",width:"7rem"}}
          /></a>
          <button className="navbar-toggler" type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page"
                   href="#">Download App</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Become a Supplier</a>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search"
                     placeholder="Search Meesho..." aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search
              </button>
            </form>
          </div>
        </div>
      </nav>
  );
};
export default Navbar;