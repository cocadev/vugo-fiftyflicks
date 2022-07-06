import React, { useEffect } from 'react'
import { Container, Row, Col, Navbar, Dropdown } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Card from './Card'
import CustomToggle from './dropdowns'
import logo from '../assets/images/logo.png';
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import config from '../config'
import useAuth from "./auth/useAuth";
import { getDeviceId } from "../shared/utils/getDeviceId";
import UserApi from "../api/UserApi";
import { setAuthorizationToken } from '../api/ApiHelper';

const HeaderStyle1 = () => {

  const history = useHistory();
  const { user, userId, clearUser } = useAuth();
  const { logout: logoutAuth0, loginWithRedirect: loginAuth0WithRedirect, isAuthenticated, isAuthLoading, getAccessTokenSilently, user: authUser } = useAuth0();
  const isUserAuthenticated = config.AUTH0_ENABLED ? isAuthenticated : userId;
  const { setUser, setAuthToken } = useAuth();

  useEffect(() => {
    if (config.AUTH0_ENABLED && !isAuthLoading && isAuthenticated) {

      getAccessTokenSilently({
        audience: config.AUTH0_AUDIENCE
      }).then(token => {

        setAuthorizationToken(token);
        setAuthToken(token);
      });

      setUser(authUser);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthLoading, isAuthenticated]);

  const menuLoggedOutOptions = [
    {
      label: "Login",
      link: "#",
      icon: faSignInAlt,
      onClick: () => {
        handleLogin();
      },
    },
    // Enable signup only if Auth0 is disabled. Auth0 doesn't provide a way
    // to redirect directly to the signup page.
    ...(!config.AUTH0_ENABLED
      ? [{ label: "sign up", link: "/signup", icon: faUser }]
      : []),
  ];

  const menuLoggedInOptions = [
    ...(!config.AUTH0_ENABLED ? [{ label: "profile", link: "/profile", icon: faUser }] : []),
    {
      label: "Logout",
      link: "#",
      icon: faSignOutAlt,
      onClick: () => {
        handleLogout();
      },
    },
  ];

  const handleLogin = () => {
    if (config.AUTH0_ENABLED) {
      loginAuth0WithRedirect({
        redirect_uri: window.location.origin,
      });
    } else {
      history.push("/login");
    }
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

    // TODO
    // Refactor to a single auth function.
    // The problem is that the `history` object is only
    // obtainable inside a functional component.
    if (config.AUTH0_ENABLED) {
      logoutAuth0({ returnTo: window.location.origin });
    } else {
      logoutRequest();
    }
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

                      <Dropdown as="li" className="nav-item nav-icon">
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
                      </Dropdown>
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