import React from 'react'
import { Container, Button, Row, Col, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

const SignUp = () => {

  let history = useHistory()

  return (
    <>
      <section className="sign-in-page">
        <Container>
          <Row className="justify-content-center align-items-center height-self-center">
            <Col lg="7" md="12" className="align-self-center">
              <div className="sign-user_card ">
                <div className="sign-in-page-data">
                  <div className="sign-in-from w-100 m-auto">
                    <Form>
                      <Row>
                        <Col md="12">
                          <Form.Group>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" className="mb-0" id="exampleInputEmail3" placeholder="Enter email" autoComplete="off" required />
                          </Form.Group>
                        </Col>
                        <Col md="12">
                          <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" className="mb-0" id="exampleInputEmail2" placeholder="First Name" autoComplete="off" required />
                          </Form.Group>
                        </Col>
                        <Col md="12">
                          <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="email" className="mb-0" id="exampleInputEmail3" placeholder="Last Name" autoComplete="off" required />
                          </Form.Group>
                        </Col>
                        <Col md="12">
                          <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" className="mb-0" id="exampleInputPassword2" placeholder="Password" required />
                          </Form.Group>
                        </Col>
                        <Col md="12">
                          <Form.Group>
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control type="password" className="mb-0" id="exampleInputPassword2" placeholder="Password" required />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Button onClick={() => history.push("/")} className="btn btn-hover btn-primary1 my-2">Sign Up</Button>
                    </Form>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="d-flex justify-content-center links">
                    Already have an account?
                    <Link to="/login" className="text-primary ml-2">Sign In</Link>
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

export default SignUp;