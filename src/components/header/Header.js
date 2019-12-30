import React, {Component} from 'react';
import {Link} from "react-router-dom";
import '../../css/Header.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import {ReactComponent as GabannaLogo} from "../../components/images/logo/gabanna-logo2.svg";
import {ReactComponent as LogoSmall} from "../../components/images/logo/logo-small.svg";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import SearchBar from "./SearchBar";
import ShoppingCart from "./ShoppingCartIcon";
import LogoutBtn from "./LogoutBtn";
import Email from "./Email";
import {connect} from 'react-redux';
import LanguageChanger from "./LanguageChanger";
import {FormattedMessage} from "react-intl";

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

    logMe = () => {
        console.log(window.innerWidth)
    }


    render() {
        return (
            <React.Fragment>
                <header className="header">
                    {
                        this.props.isLoggedIn ?
                            <div className="email-logout-container">
                                <LanguageChanger/>
                                <Email/>
                                <LogoutBtn/>
                            </div>
                            :
                            <div className="register-login-container">
                                <LanguageChanger/>
                                <RegisterModal/>
                                <LoginModal/>
                            </div>
                    }
                    <LogoSmall className="logo-small"/>

                    <div className="header-logo-icon-area">
                        <div className="logo-holder">
                            <GabannaLogo
                                className="logo-header"
                            />
                        </div>
                        <div className="other-icons">
                            <div
                                className="search-bar-cart-container"
                            >
                                <ShoppingCart/>
                                <SearchBar
                                    headerBtnWidth={'20px'}
                                />
                            </div>
                        </div>
                    </div>

                    <nav
                        role="navigation"
                        className="nav-header"
                        style={{
                            position: 'relative',
                        }}
                    >
                        <input type="checkbox" id="chk"/>
                        <label htmlFor="chk" className="show-menu-btn">
                            <FontAwesomeIcon className="icon-bars" icon={faBars}/>
                        </label>
                        <ul className="nav-options">

                            <li>
                                <Link to="/" className="main-link">
                                    <FormattedMessage id="app.header.home"/>
                                </Link>
                            </li>
                            <li>
                                <Link to="/butterfly" className="main-link">
                                    <FormattedMessage id="app.header.main.butterfly"/>
                                </Link>
                                <ul className="dropdown">
                                    <li className="dotted-spaced-bottom"><Link to="/" className="dropdown-link ">
                                        <FormattedMessage id="app.header.sub.moths"/>
                                    </Link></li>
                                    <li className="dotted-spaced-bottom"><Link to="/" className="dropdown-link ">
                                        <FormattedMessage id="app.header.sub.botanical.prints"/>
                                    </Link></li>
                                    <li><Link to="/" className="dropdown-link">
                                        <FormattedMessage id="app.header.sub.create.your.frame"/>
                                    </Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/about" className="main-link">
                                    <FormattedMessage id="app.header.main.beetles"/>
                                </Link>
                            </li>
                            <li>
                                <Link to="/insect" className="main-link">
                                    <FormattedMessage id="app.header.main.insect"/>
                                </Link>
                                <ul className="dropdown">
                                    <li className="dotted-spaced-bottom"><Link to="/" className="dropdown-link">
                                        <FormattedMessage id="app.header.sub.botanical.prints"/>
                                    </Link></li>
                                    <li><Link to="/" className="dropdown-link">
                                        <FormattedMessage id="app.header.sub.create.your.frame"/>
                                    </Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/fossil" className="main-link">
                                    <FormattedMessage id="app.header.main.fossil"/>
                                </Link>
                                <ul className="dropdown">
                                    <li><Link to="/" className="dropdown-link">FOSSIL</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/minerals" className="main-link">
                                    <FormattedMessage id="app.header.main.minerals"/>
                                </Link>
                                <ul className="dropdown">
                                    <li className="dotted-spaced-bottom"><Link to="/" className="dropdown-link">MINERAL 1</Link>
                                    </li>
                                    <li><Link to="/" className="dropdown-link">MINERAL 2</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/jewelry" className="main-link">
                                    <FormattedMessage id="app.header.main.jewelry"/>
                                </Link>
                                <ul className="dropdown">
                                    <li className="dotted-spaced-bottom"><Link to="/" className="dropdown-link">BUTTERFLY</Link>
                                    </li>
                                    <li><Link to="/" className="dropdown-link">BEATL ASSECUALL</Link></li>

                                </ul>
                            </li>
                            <li><Link to="/contact" className="main-link">
                                <FormattedMessage id="app.header.contact"/>
                            </Link></li>
                            <label htmlFor="chk" className="hide-menu-btn">
                                <FontAwesomeIcon icon={faTimes}/>
                            </label>
                        </ul>
                    </nav>
                    <div id="mySidebar" ref="mySidebar" className="sidebar">
                        <a className="close-btn" onClick={this.closeNav}>×</a>
                        <div id="sidebar-content">
                            <ul className="main-menu">
                                <li><Link to="/">
                                    <FormattedMessage id="app.header.home"/>
                                </Link></li>
                                <li><Link to="/about">
                                    <FormattedMessage id="app.header.about"/>
                                </Link></li>


                                <li><Link id="butterfly-main" className="sidebar-main-link"
                                          to="/butterfly">
                                    <FormattedMessage id="app.header.main.butterfly"/>
                                </Link>
                                    <label title="Toggle Drop-down" className="drop-icon" htmlFor="sm1">▾</label>
                                    <input type="checkbox" id="sm1"/>
                                    <ul className="sub-menu">
                                        <li><Link to="/">
                                            <FormattedMessage id="app.header.sub.moths"/>
                                        </Link></li>
                                        <li><Link to="/">
                                            <FormattedMessage id="app.header.sub.botanical.prints"/>
                                        </Link></li>
                                        <li><Link to="/">
                                            <FormattedMessage id="app.header.sub.create.your.frame"/>
                                        </Link></li>
                                    </ul>
                                </li>


                                <li><Link id="insect-main" className="sidebar-main-link" to="/insect">
                                    <FormattedMessage id="app.header.main.insect"/>
                                </Link>
                                    <label title="Toggle Drop-down" className="drop-icon" htmlFor="sm2">▾</label>
                                    <input type="checkbox" id="sm2"/>
                                    <ul className="sub-menu">
                                        <li><Link to="/">
                                            <FormattedMessage id="app.header.sub.botanical.prints"/>
                                        </Link></li>
                                        <li><Link to="/">
                                            <FormattedMessage id="app.header.sub.create.your.frame"/>
                                        </Link></li>
                                    </ul>
                                </li>


                                <li><Link id="fossil-main" to="/fossil">
                                    <FormattedMessage id="app.header.main.fossil"/>
                                </Link>
                                    <label title="Toggle Drop-down" className="drop-icon" htmlFor="sm3">▾</label>
                                    <input type="checkbox" id="sm3"/>
                                    <ul className="sub-menu">
                                        <li><Link to="/">FOSSIL SOMETHING</Link></li>
                                    </ul>
                                </li>


                                <li><Link id="mineral-main" to="/mineral">
                                    <FormattedMessage id="app.header.main.minerals"/>
                                </Link>
                                    <label title="Toggle Drop-down" className="drop-icon" htmlFor="sm4">▾</label>
                                    <input type="checkbox" id="sm4"/>
                                    <ul className="sub-menu">
                                        <li><Link to="/">MINERAL 1</Link></li>
                                        <li><Link to="/">MINERAL 2</Link></li>
                                    </ul>
                                </li>


                                <li><Link id="jewelry-main" to="/jewelry">
                                    <FormattedMessage id="app.header.main.jewelry"/>
                                </Link>
                                    <label title="Toggle Drop-down" className="drop-icon" htmlFor="sm5">▾</label>
                                    <input type="checkbox" id="sm5"/>
                                    <ul className="sub-menu">
                                        <li><Link to="/">BUTTERFLY</Link></li>
                                        <li><Link to="/">BEATL ASSECUALL</Link></li>
                                    </ul>
                                </li>


                                <li><Link to="/contact">
                                    <FormattedMessage id="app.header.contact"/>
                                </Link></li>
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


function mapStateToProps(state) {
    return {
        isLoggedIn: state.isLoggedIn,
    }
}

export default connect(mapStateToProps, null)(Header);
