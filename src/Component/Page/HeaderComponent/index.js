import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header
      id="header"
      className="d-flex flex-wrap justify-content-center border-bottom border-dark"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <div className="container-fluid d-flex align-items-center my-1">
        <div
          className="logo me-auto fs-4"
          role="button"
          onClick={() => navigate("/")}
        >
          <strong>Coin Hub</strong>
        </div>
        <nav className="navbar navbar-expand-lg">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvas"
            aria-controls="offcanvas"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvas"
            aria-labelledby="offcanvasLabel"
          >
            <div className="offcanvas-header">
              <h4 className="offcanvas-title" id="offcanvasLabel">
                Coin Hub
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav">
                <li
                  className="nav-item"
                  role="button"
                  onClick={() => navigate("/")}
                >
                  <div className="nav-link scrollto">Home</div>
                </li>
                <li
                  className="nav-item"
                  role="button"
                  onClick={() => navigate("/overview/bitcoin")}
                >
                  <div className="nav-link scrollto">Overview</div>
                </li>
                <li
                  className="nav-item"
                  role="button"
                  onClick={() => navigate("/history")}
                >
                  <div className="nav-link scrollto">History</div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
