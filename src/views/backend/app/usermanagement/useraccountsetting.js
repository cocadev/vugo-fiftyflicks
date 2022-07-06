import React, { useEffect, useState } from 'react'
import { Col, Row, Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useAuth from '../../../../components/auth/useAuth';

const UserAccountSetting = () => {

   const { user } = useAuth();
   const [email, setEmail] = useState();
   const [firstName, setFirstName] = useState(user?.firstName);
   const [lastName, setLastName] = useState(user?.lastName);
   const [nickname, setNickname] = useState(user?.nickname);
   console.log(user)

   useEffect(() => {
      setEmail(user?.email);
      setFirstName(user?.firstName);
      setLastName(user?.lastName);
      setNickname(user?.nickname);
   }, [user])

   const onSaveUser = () => {
      
      // UserApi.updateUser({
      //    userId, firstName, lastName
      // })
      // .then((res) => {
      //   console.log('USER :', res)
      // })
      // .catch((err) => console.log(err));
   }

   return (
      <>
         <section className="m-profile setting-wrapper">
            <Container>
               <br />
               <h4 className="main-title mb-4">Account Setting</h4>
               <Row>

                  <Col lg="12">
                     <div className="sign-user_card">
                        <h5 className="mb-3 pb-3 a-border">Personal Details</h5>
                        <Form className="mt-4" action="#">
                           <Form.Group className="form-group">
                              <Form.Label>Nick Name</Form.Label>
                              <Form.Control 
                                 type="text" 
                                 className="form-control mb-0"
                                 autoComplete="off" 
                                 value={nickname} 
                                 onChange={(e)=>setNickname(e.target.value)}
                              />
                           </Form.Group>

                           <Form.Group className="form-group">
                              <Form.Label>First Name</Form.Label>
                              <Form.Control 
                                 type="text" 
                                 className="form-control mb-0"
                                 autoComplete="off" 
                                 value={firstName} 
                                 onChange={(e)=>setFirstName(e.target.value)} 
                              />
                           </Form.Group>

                           <Form.Group className="form-group">
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control 
                                 type="text" 
                                 className="form-control mb-0"
                                 autoComplete="off" 
                                 value={lastName} 
                                 onChange={(e)=>setLastName(e.target.value)} 
                              />
                           </Form.Group>

                           <Form.Group className="form-group">
                              <Form.Label>Email</Form.Label>
                              <Form.Control 
                                 type="text" 
                                 className="form-control mb-0"
                                 autoComplete="off" 
                                 value={email} 
                                 onChange={(e)=>setEmail(e.target.value)} 
                              />
                           </Form.Group>

                           <div className="btn btn-hover" onClick={onSaveUser}>Save</div>

                        </Form>
                        {/* <Row className="align-items-center justify-content-between mb-3">
                           <Col md="8">
                              <span className="text-light font-size-13">Password</span>
                              <p className="mb-0">**********</p>
                           </Col>
                           <Col md="4" className="text-md-right text-left">
                              <Link to="#" className="text-primary">Change</Link>
                           </Col>
                        </Row>
                        <Row className="align-items-center justify-content-between mb-3">
                           <Col md="8">
                              <span className="text-light font-size-13">Date of Birth</span>
                              <p className="mb-0">08-03-1995</p>
                           </Col>
                           <Col md="4" className="text-md-right text-left">
                              <Link to="#" className="text-primary">Change</Link>
                           </Col>
                        </Row>
                        <Row className="align-items-center justify-content-between">
                           <Col md="8">
                              <span className="text-light font-size-13">Language</span>
                              <p className="mb-0">English</p>
                           </Col>
                           <Col md="4" className="text-md-right text-left">
                              <Link to="#" className="text-primary">Change</Link>
                           </Col>
                        </Row> */}

                        <br /><br />
                        <h5 className="mb-3 pb-3 mt-4 a-border">Setting</h5>
                        <Row>
                           <div className="col-12 setting">
                              <Link to="#" className="text-body d-block mb-1">Recent device streaming activity</Link>
                              <Link to="#" className="text-body d-block mb-1">Sign out of all devices </Link>
                              <Link to="#" className="text-body d-block">Download your person information</Link>
                           </div>
                        </Row>
                     </div>
                  </Col>
               </Row>
            </Container>
         </section>
      </>
   )
}

export default UserAccountSetting