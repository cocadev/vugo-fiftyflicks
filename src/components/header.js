import React from 'react'
import { Container, Row, Col, Navbar, Dropdown } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Card from './Card'
import CustomToggle from './dropdowns'
import logo from '../assets/images/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import config from '../config'
import useAuth from "./auth/useAuth";
import { getDeviceId } from "../shared/utils/getDeviceId";
import UserApi from "../api/UserApi";

const HeaderStyle1 = () => {

  const history = useHistory();
  const { user, userId, clearUser } = useAuth();
  const {pathname} = history.location;
  const isLoginPage = pathname.includes('login');

  console.log('history: ', history);
  // const isUserAuthenticated = userId;

  // const menuLoggedOutOptions = [
  //   {
  //     label: "Login",
  //     link: "#",
  //     icon: faSignInAlt,
  //     onClick: () => {
  //       handleLogin();
  //     },
  //   },
  //   ...(!config.AUTH0_ENABLED
  //     ? [{ label: "sign up", link: "/signup", icon: faUser }]
  //     : []),
  // ];

  // const menuLoggedInOptions = [
  //   ...(!config.AUTH0_ENABLED ? [{ label: "profile", link: "/profile", icon: faUser }] : []),
  //   {
  //     label: "Logout",
  //     link: "#",
  //     icon: faSignOutAlt,
  //     onClick: () => {
  //       handleLogout();
  //     },
  //   },
  // ];

  const handleLogin = () => {
    history.push("/login");
  };

  const handleLogout = async () => {
    async function logoutRequest() {
      const deviceId = getDeviceId();
      try {
        await UserApi.logout(deviceId);
        history.push("/");
        clearUser();
      } catch (err) {
        console.error(err);
      }
    }
    logoutRequest();
  };

  return (
    <>
      <header id="main-header">
        <div className="main-header">
          <Container fluid>
            <Row>
              <Col sm="12">
                <Navbar expand="lg" className="p-0">

                  <Navbar.Brand className="navbar-brand">
                    <img className="img-fluid logo" src={logo} alt="streamit" onClick={() => history.push('/')} />
                  </Navbar.Brand>

                  <div style={{ display: 'flex', flex: 1 }} />

                  <div className="navbar-right menu-right">
                    <ul className="d-flex align-items-center list-inline m-0">
                      {!isLoginPage && <div
                        className="user-avatar"
                        data-toggle="search-toggle"
                        onClick={() => history.push("/login")}
                      >
                        LOGIN
                      </div>}
                      {/* <Dropdown as="li" className="nav-item nav-icon">
                        <Dropdown.Toggle href="#" as={CustomToggle} variant="search-toggle">
                          <div 
                            className="user-avatar"
                            data-toggle="search-toggle"
                          >
                            {isUserAuthenticated ? generateUserAvatar(user) : <FontAwesomeIcon icon={faUser} /> }
                          </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="iq-sub-dropdown iq-user-dropdown" align="right">
                          <Card>
                            <Card.Body className="p-2">
                              {(isUserAuthenticated ? menuLoggedInOptions : menuLoggedOutOptions).map(
                                (item, idx) => (
                                  <div key={`UserMenuItem-${idx}`} style={{display: 'block', padding: 8}}>
                                    <Link
                                      className=" text-white "
                                      to={item.link}
                                      onClick={item.onClick}
                                    >
                                      <FontAwesomeIcon icon={item.icon} /> &nbsp;
                                      {item.label}
                                    </Link>
                                    <br/>
                                  </div>
                                )
                              )}
                            </Card.Body>
                          </Card>
                        </Dropdown.Menu>
                      </Dropdown> */}
                    </ul>
                  </div>
                </Navbar>
              </Col>
            </Row>
          </Container>
        </div>
      </header>
    </>
  )
}

export default HeaderStyle1

function generateUserAvatar(user) {
  if (user.firsName) {
    return user.firstName.charAt(0).toUpperCase()
  } else if (user.email) {
    return user.email.charAt(0).toUpperCase();
  }

  return "";
}