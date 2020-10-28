import { NavLink } from 'react-router-dom';
import React from 'react';

export const Header = () => (
    <nav>
      <ul>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/rooms'>rooms</NavLink></li>
      </ul>
    </nav>
  );