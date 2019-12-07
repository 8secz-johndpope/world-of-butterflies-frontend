import React, {Component} from 'react';
import {Link} from "react-router-dom";
import '../../css/Header.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faTimes, faSearch, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {ReactComponent as GabannaLogo} from "../../components/images/logo/gabanna-logo2.svg";
import {ReactComponent as LogoSmall} from "../../components/images/logo/logo-small.svg";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import SearchBar from "./SearchBar";

class Header extends Component {


    alterNav = () => {
        const width = window.getComputedStyle(this.refs.mySidebar).getPropertyValue("width");
        if (width === "0px") {
            this.refs.mySidebar.style.width = "85%";
            this.refs.openBtnLine.style.marginLeft = "85%";
        } else {
            this.refs.mySidebar.style.width = "0px";
            this.refs.openBtnLine.style.marginLeft = "0px";
        }

    };

    closeNav = () => {
        this.refs.mySidebar.style.width = "0";
        this.refs.openBtnLine.style.marginLeft = "0";
    };


    render() {
        return (
            <React.Fragment>
                <header className="header">
                    <div className="register-login-container">
                        <RegisterModal/>
                        <LoginModal/>
                    </div>

                    <LogoSmall className="logo-small"/>
                    <GabannaLogo className="logo-header"/>

                    <SearchBar/>

                    <nav role="navigation" className="nav-header">
                        <input type="checkbox" id="chk"/>
                        <label htmlFor="chk" className="show-menu-btn">
                            <FontAwesomeIcon className="icon-bars" icon={faBars}/>
                        </label>
                        <ul className="nav-options">

                            <li>
                                <Link to="/" className="main-link">HOME</Link>
                            </li>
                            <li>
                                <Link to="/about" className="main-link">ABOUT</Link>
                            </li>
                            <li>
                                <Link to="/butterfly" className="main-link">BUTTERFLY</Link>
                                <ul className="dropdown">
                                    <li><Link to="/" className="dropdown-link">MOTHS</Link></li>
                                    <li><Link to="/" className="dropdown-link">BOTANICAL PRINTS</Link></li>
                                    <li><Link to="/" className="dropdown-link">CREATE YOUR FRAME</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/insect" className="main-link">INSECT</Link>
                                <ul className="dropdown">
                                    <li><Link to="/" className="dropdown-link">BOTANICAL PRINT</Link></li>
                                    <li><Link to="/" className="dropdown-link">CREATE YOUR FRAME</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/fossil" className="main-link">FOSSIL</Link>
                                <ul className="dropdown">
                                    <li><Link to="/" className="dropdown-link">FOSSIL</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/minerals" className="main-link">MINERALS</Link>
                                <ul className="dropdown">
                                    <li><Link to="/" className="dropdown-link">MINERAL 1</Link></li>
                                    <li><Link to="/" className="dropdown-link">MINERAL 2</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/jewelry" className="main-link">JEWELRY</Link>
                                <ul className="dropdown">
                                    <li><Link to="/" className="dropdown-link">BUTTERFLY</Link></li>
                                    <li><Link to="/" className="dropdown-link">BEATL ASSECUALL</Link></li>

                                </ul>
                            </li>
                            <li><Link to="/contact" className="main-link">CONTACT</Link></li>
                            <label htmlFor="chk" className="hide-menu-btn">
                                <FontAwesomeIcon icon={faTimes}/>
                            </label>
                        </ul>
                    </nav>
                    <div id="mySidebar" ref="mySidebar" className="sidebar">
                        <a className="close-btn" onClick={this.closeNav}>×</a>
                        <div id="sidebar-content">
                            <ul className="main-menu">
                                <li><Link to="/">HOME</Link></li>
                                <li><Link to="/about">ABOUT</Link></li>


                                <li><Link id="butterfly-main" className="sidebar-main-link"
                                          to="/butterfly">BUTTERFLY</Link>
                                    <label title="Toggle Drop-down" className="drop-icon" htmlFor="sm1">▾</label>
                                    <input type="checkbox" id="sm1"/>
                                    <ul className="sub-menu">
                                        <li><Link to="/">MOTHS</Link></li>
                                        <li><Link to="/">BOTANICAL PRINTS</Link></li>
                                        <li><Link to="/">CREATE YOUR FRAME</Link></li>
                                    </ul>
                                </li>


                                <li><Link id="insect-main" className="sidebar-main-link" to="/insect">INSECT</Link>
                                    <label title="Toggle Drop-down" className="drop-icon" htmlFor="sm2">▾</label>
                                    <input type="checkbox" id="sm2"/>
                                    <ul className="sub-menu">
                                        <li><Link to="/">BOTANICAL PRINT</Link></li>
                                        <li><Link to="/">CREATE YOUR FRAME</Link></li>
                                    </ul>
                                </li>


                                <li><Link id="fossil-main" to="/fossil">FOSSIL</Link>
                                    <label title="Toggle Drop-down" className="drop-icon" htmlFor="sm3">▾</label>
                                    <input type="checkbox" id="sm3"/>
                                    <ul className="sub-menu">
                                        <li><Link to="/">FOSSIL SOMETHING</Link></li>
                                    </ul>
                                </li>


                                <li><Link id="mineral-main" to="/mineral">MINERAL</Link>
                                    <label title="Toggle Drop-down" className="drop-icon" htmlFor="sm4">▾</label>
                                    <input type="checkbox" id="sm4"/>
                                    <ul className="sub-menu">
                                        <li><Link to="/">MINERAL 1</Link></li>
                                        <li><Link to="/">MINERAL 2</Link></li>
                                    </ul>
                                </li>


                                <li><Link id="jewelry-main" to="/jewelry">JEWELRY</Link>
                                    <label title="Toggle Drop-down" className="drop-icon" htmlFor="sm5">▾</label>
                                    <input type="checkbox" id="sm5"/>
                                    <ul className="sub-menu">
                                        <li><Link to="/">BUTTERFLY</Link></li>
                                        <li><Link to="/">BEATL ASSECUALL</Link></li>
                                    </ul>
                                </li>


                                <li><Link to="/contact">CONTACT</Link></li>
                            </ul>
                        </div>
                        {/*<a href="#">About</a>*/}
                        {/*<a href="#">Services</a>*/}
                        {/*<a href="#">Clients</a>*/}
                        {/*<a href="#">Contact</a>*/}
                    </div>

                    <div id="open-btn-line" ref="openBtnLine">
                        <button className="open-btn" onClick={this.alterNav}>☰</button>
                    </div>
                </header>
            </React.Fragment>
        );
    }
}

export default Header;
