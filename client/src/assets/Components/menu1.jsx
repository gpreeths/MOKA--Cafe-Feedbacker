import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Images/logo.png';

function Menu1() {
  return (
    <div className="menuContainer1">
      <Link to='/'>
        <img src={logo} alt='logo' className='logoiconMenu1' />
      </Link>
      <ul className='menuList1'>
        <li><Link to='/menu'>Menu</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/signup'>Signup</Link></li>
        <li><Link to='/branches'>Branches</Link></li>
      </ul>
    </div>
  );
}

function Menu2() {
  return (
    <div className="menuContainer1">
      <Link to='/'>
        <img src={logo} alt='logo' className='logoiconMenu1' />
      </Link>
      <ul className='menuList1'>
        <li><Link to='/'>Home</Link></li>

        <li><Link to='/about'>About</Link></li>
        <li><Link to='/contact'>Contact Us</Link></li>
       < li><Link to='/branches'>Branches</Link></li>

      </ul>
    </div>
  );
}

function Menu3() {
  return (
    <div className="menuContainer1">
      <Link to='/'>
        <img src={logo} alt='logo' className='logoiconMenu1' />
      </Link>
      <ul className='menuList1'>
        <li><Link to='/menu'>Menu</Link></li>

        <li><Link to='/about'>About</Link></li>
        <li><Link to='/contact'>Contact Us</Link></li>
       < li><Link to='/branches'>Branches</Link></li>

      </ul>
    </div>
  );
}

function Menu4() {
  return (
    <div className="menu4Container">
      <div className='user'>Welcome back, how was MOKA today?</div>
      <Link to='/'>
        <img src={logo} alt='logo' className='logo4iconMenu' />
      </Link>
      <ul className='menu4List'>
        <li><Link to='/home'>Home</Link></li>

        <li><Link to='/previousreviews'>Previous reviwes</Link></li>
        <li><Link to='/contact'>Contact Us</Link></li>
       < li><Link to='/'>Logout</Link></li>

      </ul>
    </div>
  );
}

function Menu5() {
  return (
    <div className="menu4Container">
      <div className='user'>Admin</div>
      <Link to='/'>
        <img src={logo} alt='logo' className='logo4iconMenu' />
      </Link>
      <ul className='menu4List'>
        <li><Link to='/'>Home</Link></li>
       < li><Link to='/'>Logout</Link></li>

      </ul>
    </div>
  );
}
// Export both menus for use in different pages
export { Menu1, Menu2,Menu3,Menu4,Menu5 };
