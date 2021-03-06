import React, {Component} from 'react';
import {Link} from "react-router-dom";
import '../../css/Header.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import {ReactComponent as GabannaLogo} from "../../components/images/logo/gabanna_logo.svg";
import {ReactComponent as LogoSmall} from "../../components/images/logo/logo-small.svg";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "./ShoppingCartIcon";
import LogoutBtn from "./LogoutBtn";
import Email from "./Email";
import {connect} from 'react-redux';
import LanguageChanger from "./LanguageChanger";
import {FormattedMessage} from "react-intl";

class Header extends Component {
    state = {
        isScreenSmall: false,
    };

    componentWillMount(): void {
        this.modifySearchBarPlace()
    }

    componentDidMount() {
        window.addEventListener("resize", this.modifySearchBarPlace);
    }

    componentWillUnmount(): void {
        window.removeEventListener("resize", this.modifySearchBarPlace);
    }

    modifySearchBarPlace = () => {
        let windowWidth = window.innerWidth;
        if (windowWidth <= 945 && !this.state.isScreenSmall) {
            this.setState({
                isScreenSmall: true
            })
        } else if (windowWidth > 945 && this.state.isScreenSmall) {
            this.setState({
                isScreenSmall: false
            })
        }

    };

    alterNav = () => {
        const width = window.getComputedStyle(this.refs.mySidebar).getPropertyValue("width");
        if (width === "0px") {
            this.refs.mySidebar.style.width = "85%";
            this.refs.openBtnLine.style.marginLeft = "91.5%";
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
            <div className="whole-header-container">
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
                                <LoginModal
                                isTitleVisible={false}/>
                            </div>
                    }
                    <LogoSmall className="logo-small"/>

                    <div className="header-logo-icon-area">
                        <div className="logo-holder">
                            <Link to="/">
                                <GabannaLogo
                                    className="logo-header"
                                />
                            </Link>

                        </div>
                        {
                            !this.state.isScreenSmall ?
                                <div className="other-icons">
                                    <div className="search-bar-cart-container">
                                        <ShoppingCartIcon/>
                                        <SearchBar
                                            headerBtnWidth={'20px'}
                                        />
                                    </div>
                                </div>
                                :
                                null
                        }
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
                                <Link to="/main-categories/butterfly" className="main-link">
                                    <FormattedMessage id="app.header.main.butterfly"/>
                                </Link>
                                <ul className="dropdown">
                                    <li className="dotted-spaced-bottom"><Link to="/sub-categories/butterfly"
                                                                               className="dropdown-link ">
                                        <FormattedMessage id="app.header.main.butterfly"/>
                                    </Link></li>
                                    <li className="dotted-spaced-bottom"><Link to="/sub-categories/moth"
                                                                               className="dropdown-link ">
                                        <FormattedMessage id="app.header.sub.moths"/>
                                    </Link></li>
                                    <li className="dotted-spaced-bottom"><Link to="/" className="dropdown-link ">
                                        <FormattedMessage id="app.header.sub.botanical.prints"/>
                                    </Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/main-categories/beetle" className="main-link">
                                    <FormattedMessage id="app.header.main.beetles"/>
                                </Link>
                            </li>
                            <li>
                                <Link to="/main-categories/insect" className="main-link">
                                    <FormattedMessage id="app.header.main.insect"/>
                                </Link>
                                <ul className="dropdown">
                                    <li className="dotted-spaced-bottom"><Link to="/" className="dropdown-link">
                                        <FormattedMessage id="app.header.sub.botanical.prints"/>
                                    </Link></li>

                                </ul>
                            </li>

                            <li>
                                <Link to="/main-categories/minerals" className="main-link">
                                    <FormattedMessage id="app.header.main.minerals"/>
                                </Link>
                                <ul className="dropdown">
                                    <li className="dotted-spaced-bottom"><Link to="/" className="dropdown-link">MINERAL
                                        1</Link>
                                    </li>
                                    <li><Link to="/" className="dropdown-link">MINERAL 2</Link></li>
                                    <li><Link to="/" className="dropdown-link">FOSSIL</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/main-categories/jewelry" className="main-link">
                                    <FormattedMessage id="app.header.main.jewelry"/>
                                </Link>
                                <ul className="dropdown">
                                    <li className="dotted-spaced-bottom"><Link to="/"
                                                                               className="dropdown-link">BUTTERFLY</Link>
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
                                <li>
                                    <Link to="/" className="sidebar-main-link" onClick={this.closeNav}>
                                        <FormattedMessage id="app.header.home"/>
                                    </Link>
                                </li>
                                {/*<li>*/}
                                {/*    <Link to="/about">*/}
                                {/*        <FormattedMessage id="app.header.about"/>*/}
                                {/*    </Link>*/}
                                {/*</li>*/}


                                <li>
                                    <Link id="butterfly-main"
                                          className="sidebar-main-link"
                                          to="/main-categories/butterfly"
                                          onClick={this.closeNav}>
                                        <FormattedMessage id="app.header.main.butterfly"/>
                                    </Link>
                                    <label title="Toggle Drop-down" className="drop-icon" htmlFor="sm1">▾</label>
                                    <input type="checkbox" id="sm1"/>
                                    <ul className="sub-menu">
                                        <li>
                                            <Link to="/sub-categories/moth" onClick={this.closeNav}>
                                                <FormattedMessage id="app.header.sub.moths"/>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/" onClick={this.closeNav}>
                                                <FormattedMessage id="app.header.sub.botanical.prints"/>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>


                                <li>
                                    <Link id="insect-main"
                                          className="sidebar-main-link"
                                          to="/main-categories/insect"
                                          onClick={this.closeNav}>
                                        <FormattedMessage id="app.header.main.insect"/>
                                    </Link>
                                    <label title="Toggle Drop-down" className="drop-icon" htmlFor="sm2">▾</label>
                                    <input type="checkbox" id="sm2"/>
                                    <ul className="sub-menu">
                                        <li>
                                            <Link to="/" onClick={this.closeNav}>
                                                <FormattedMessage id="app.header.sub.botanical.prints"/>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>


                                <li>
                                    <Link id="fossil-main"
                                          to="/main-categories/fossil"
                                          className="sidebar-main-link"
                                          onClick={this.closeNav}>
                                        <FormattedMessage id="app.header.main.fossil"/>
                                    </Link>
                                    <label title="Toggle Drop-down" className="drop-icon" htmlFor="sm3">▾</label>
                                    <input type="checkbox" id="sm3"/>
                                    <ul className="sub-menu">
                                        <li>
                                            <Link to="/" onClick={this.closeNav}>FOSSIL SOMETHING</Link>
                                        </li>
                                    </ul>
                                </li>


                                <li>
                                    <Link id="mineral-main"
                                          to="/main-categories/minerals"
                                          className="sidebar-main-link"
                                          onClick={this.closeNav}>
                                        <FormattedMessage id="app.header.main.minerals"/>
                                    </Link>
                                    <label title="Toggle Drop-down" className="drop-icon" htmlFor="sm4">▾</label>
                                    <input type="checkbox" id="sm4"/>
                                    <ul className="sub-menu">
                                        <li>
                                            <Link to="/" onClick={this.closeNav}>MINERAL 1</Link>
                                        </li>
                                        <li>
                                            <Link to="/" onClick={this.closeNav}>MINERAL 2</Link>
                                        </li>
                                    </ul>
                                </li>


                                <li>
                                    <Link id="jewelry-main"
                                          to="/main-categories/jewelry"
                                          className="sidebar-main-link"
                                          onClick={this.closeNav}>
                                        <FormattedMessage id="app.header.main.jewelry"/>
                                    </Link>
                                    <label title="Toggle Drop-down" className="drop-icon" htmlFor="sm5">▾</label>
                                    <input type="checkbox" id="sm5"/>
                                    <ul className="sub-menu">
                                        <li>
                                            <Link to="/" onClick={this.closeNav}>BUTTERFLY</Link>
                                        </li>
                                        <li>
                                            <Link to="/" onClick={this.closeNav}>BEATL ASSECUALL</Link>
                                        </li>
                                    </ul>
                                </li>


                                <li>
                                    <Link to="/contact"
                                          className="sidebar-main-link"
                                          onClick={this.closeNav}>
                                        <FormattedMessage id="app.header.contact"/>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {/*<a href="#">About</a>*/}
                        {/*<a href="#">Services</a>*/}
                        {/*<a href="#">Clients</a>*/}
                        {/*<a href="#">Contact</a>*/}
                    </div>
                    {this.state.isScreenSmall ?
                        <div className="search-bar-cart-container-under-open-btn-line">
                        <span className="first-element">
                            <ShoppingCartIcon/>
                        </span>

                            <span className="second-element">
                            <SearchBar
                                headerBtnWidth={'20px'}
                            />
                        </span>
                        </div>
                        :
                        null
                    }
                    <div id="open-btn-line" ref="openBtnLine">
                        <button className="open-btn" onClick={this.alterNav}>☰</button>
                    </div>

                </header>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        isLoggedIn: state.isLoggedIn,
    }
}

export default connect(mapStateToProps, null)(Header);
