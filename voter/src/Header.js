
import { Router, Switch, Route, Link } from "react-router-dom";
import React from 'react';

export const Header = (props) => (
  <nav className="navbar navbar-expand navbar-dark bg-dark">
    <Link to={"/"} className="navbar-brand">
      bezKoder
  </Link>
    <div className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link to={"/home"} className="nav-link">
          Home
      </Link>
      </li>


      {props.currentUser && (
        <li className="nav-item">
          <Link to={"/user"} className="nav-link">
            User
        </Link>
        </li>
      )}
    </div>

    {props.currentUser ? (
      <div className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to={"/profile"} className="nav-link">
            {props.currentUser.username}
          </Link>
        </li>
        <li className="nav-item">
          <a href="/login" className="nav-link" onClick={props.logOut}>
            LogOut
        </a>
        </li>
      </div>
    ) : (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Login
        </Link>
          </li>

          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              Sign Up
        </Link>
          </li>
        </div>
      )}
  </nav>
);