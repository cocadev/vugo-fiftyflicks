import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import UserApi from '../../../../api/UserApi'
import useAuth from '../../../../components/auth/useAuth'
import { getDeviceId } from '../../../../shared/utils/getDeviceId'
import { validateEmail } from '../../utils/validateEmail'
import ButtonSpinner from '../../../../components/spinners/ButtonSpinner'

const Login = () => {

  const history = useHistory();
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { setUser } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setFormError("Invalid email. Please try again.");

      setEmail(null);
      setPassword(null);
      return;
    }

    setLoading(true);

    const deviceId = getDeviceId();
    try {
      await UserApi.login(email, password, deviceId);

      const user = await UserApi.getUser();
      const userDrmToken = await UserApi.getDrmToken(user.data.userId);

      user.data.userDrmToken = userDrmToken;
      setUser(user.data);

      // If login successfully, redirect to home
      history.push("/");
      setFormError(null);
    } catch (err) {
      setFormError("Login failed. Please try again.");
      setPassword(null);
    }

    setLoading(false);
  };

  return (
    <>
      <section className="sign-in-page">
        <Container>
          <Row className="justify-content-center align-items-center height-self-center">
            <Col lg="5" md="12" className="align-self-center">
              <div className="sign-user_card ">
                <div className="sign-in-page-data">
                  <div className="sign-in-from w-100 m-auto">
                    <h3 className="mb-3 text-center">Sign in</h3>
                    <Form className="mt-4">
                      <Form.Group>
                        <Form.Control 
                          type="email" 
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="form-control mb-0" 
                          id="exampleInputEmail1" 
                          placeholder="Enter email" 
                          autoComplete="off" 
                          required 
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control 
                          type="password" 
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="form-control mb-0" 
                          id="exampleInputPassword2" 
                          placeholder="Password" 
                          required 
                        />
                      </Form.Group>
                      <div className="sign-info">
                        <Button className="btn btn-hover btn-primary1" onClick={handleSubmit}>
                          {loading ? <ButtonSpinner /> : 'Sign in' }
                        </Button>
                        <div className="custom-control custom-checkbox d-inline-block">
                          <input type="checkbox" className="custom-control-input" id="customCheck" />
                          <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                        </div>
                      </div>
                      {formError && <div style={{ color: 'red'}}>{formError}</div>}
                    </Form>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="d-flex justify-content-center links">
                    Don't have an account?
                    <Link to="/signup" className="text-primary ml-2">Sign Up</Link>
                  </div>
                  <div className="d-flex justify-content-center links">
                    <Link to="/recover-pswd" className="f-link">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Login