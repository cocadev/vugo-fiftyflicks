import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Container } from 'react-bootstrap'
import CastLabsPage from '../../../components/castLabs'

const ShowList = (props) => { 
   // const { movie } = props.location.state;
   const movie = props.location?.state?.movie

   return (
      <>
         <div className=" iq-main-slider">
         {movie && <CastLabsPage
          movie={movie}
          onClose={() => { }}
        />}
            {/* <video className="video d-block" controls loop>
               <source src={video} type="video/mp4"/>
            </video> */}
         </div>
         <div className="main-content">
            <section className="movie-detail container-fluid">
               <Row>
                  <Col lg="12">
                     <div className="trending-info season-info g-border">
                        <h4 className="trending-text big-title text-uppercase mt-0">{movie?.titleName}</h4>
                        {/* <div className="d-flex align-items-center text-white text-detail episode-name mb-0">
                           <span>S1E01</span>
                           <span className="trending-year">{movie?.titleName}</span>
                        </div> */}
                        <p className="trending-dec w-100 mb-0">{movie?.longDescription}
                        </p>
                        <ul className="list-inline p-0 mt-4 share-icons music-play-lists">
                           <li>
                              <span><i className="ri-add-line"></i></span>
                           </li>
                           <li>
                              <span><i className="ri-heart-fill"></i></span>
                           </li>
                           <li className="share">
                              <span><i className="ri-share-fill"></i></span>
                              <div className="share-box">
                                 <div className="d-flex align-items-center">
                                    <Link to="#" className="share-ico"><i className="ri-facebook-fill"></i></Link>
                                    <Link to="#" className="share-ico"><i className="ri-twitter-fill"></i></Link>
                                    <Link to="#" className="share-ico"><i className="ri-links-fill"></i></Link>
                                 </div>
                              </div>
                           </li>
                        </ul>
                     </div>
                  </Col>
               </Row>
            </section>
            <section id="iq-favorites">
               <Container fluid>
                  <div className="block-space">
                     <Row>
                        <Col sm="12" className="overflow-hidden">
                           <div className="iq-main-header d-flex align-items-center justify-content-between">
                              <h4 className="main-title">Latest Episodes</h4>
                           </div>
                        </Col>
                     </Row>
                  </div>
               </Container>
            </section>
         </div>
      </>
   )
}
export default ShowList; 