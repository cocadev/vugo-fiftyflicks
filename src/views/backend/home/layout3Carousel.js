import React from 'react'
import { Container,Col,Row, } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Layout3Carousel = () => {
    return (
      <section id="parallex" className="parallax-window">
      <Container fluid className="h-100">
         <Row className="align-items-center justify-content-center h-100 parallaxt-details">
            <Col lg="4" className="r-mb-23">
               <div className="text-left">
                  <Link to="#">
                     <img src={'parallax4'} className="img-fluid" alt="bailey"/>
                  </Link>
                  <div className="parallax-ratting d-flex align-items-center mt-3 mb-3">
                     <ul className="ratting-start p-0 m-0 list-inline text-primary d-flex align-items-center justify-content-left">
                        <li>
                           <Link to="#" className="text-primary">
                              <i className="fa fa-star" aria-hidden="true"></i>
                           </Link>
                        </li>
                        <li>
                           <Link to="#" className="pl-2 text-primary">
                              <i className="fa fa-star" aria-hidden="true"></i>
                           </Link>
                        </li>
                        <li>
                           <Link to="#" className="pl-2 text-primary">
                              <i className="fa fa-star" aria-hidden="true"></i>
                           </Link>
                        </li>
                        <li>
                           <Link to="#" className="pl-2 text-primary">
                              <i className="fa fa-star" aria-hidden="true"></i>
                           </Link>
                        </li>
                        <li>
                           <Link to="#" className="pl-2 text-primary">
                              <i className="fa fa-star-half-o" aria-hidden="true"></i>
                           </Link>
                        </li>
                     </ul>
                     <span className="text-white ml-3">9.2 (lmdb)</span>
                  </div>
                  <div className="movie-time d-flex align-items-center mb-3 iq-ltr-direction">
                     <div className="badge badge-secondary mr-3">13+</div>
                     <h6 className="text-white">2h 30m</h6>
                  </div>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
                  <div className="parallax-buttons">
                     <Link to="/movie-details" className="btn btn-hover">Play Now</Link>
                     <Link to="/movie-details" className="btn btn-link">More details</Link>
                  </div>
               </div>
            </Col>
            <Col lg="8">
               <div className="parallax-img">
                  <Link to="/movie-details">
                     <img src={'parallax3'} className="img-fluid w-100" alt="bailey"/>
                  </Link>
               </div>
            </Col>
         </Row>
      </Container>
   </section>
    )
}

export default Layout3Carousel