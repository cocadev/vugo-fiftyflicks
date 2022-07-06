import React from 'react'
import { Container,Col,Row, } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade,Navigation,Thumbs,Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
SwiperCore.use([EffectFade,Navigation,Thumbs,Pagination]);

const Layout2Carousel = () => {
    return (
        <section id="iq-trending" className="s-margin">
        <Container fluid>
           <Row>
              <Col sm="12" className="overflow-hidden">
                 <div className="d-flex align-items-center justify-content-between">                      
                    <h4 className="main-title">Trending</h4>                        
                 </div>
                 <div id="trending-contens">
                    <div id="prev4" className="swiper-button swiper-button-prev"><i className= "fa fa-chevron-left"></i></div>
                    <div id="next4" className="swiper-button swiper-button-next"><i className= "fa fa-chevron-right"></i></div>  
                    <Swiper as="ul" 
                       thumbs={{ swiper: null }} 
                       centeredSlides={true}  
                       centeredSlidesBounds={true}
                       navigation={{
                          prevEl: '#prev4',
                          nextEl: '#next4'
                       }} 
                       slidesPerView={5}  
                       spaceBetween={20}  
                       breakpoints={{
                          320: { slidesPerView: 1 },
                          550: { slidesPerView: 2 },
                          991: { slidesPerView: 3 },
                          1400: { slidesPerView: 4 },
                          1500: { slidesPerView: 5 }
                       }}
                       loop={true} 
                       className="list-inline p-0 m-0 row align-items-center iq-rtl-direction">
                       <SwiperSlide as="li">
                          <Link to="#">
                             <div className="movie-slick position-relative">
                                <img src={'trending1'} className="img-fluid" alt=""/>
                             </div>
                          </Link>
                       </SwiperSlide>
                       <SwiperSlide as="li">
                          <Link to="#">
                             <div className="movie-slick position-relative">
                                <img src={'trending2'} className="img-fluid" alt=""/>
                             </div>
                          </Link>
                       </SwiperSlide>
                       <SwiperSlide as="li">
                          <Link to="#">
                             <div className="movie-slick position-relative">
                                <img src={'trending3'} className="img-fluid" alt=""/>
                             </div>
                          </Link>
                       </SwiperSlide>
                       <SwiperSlide as="li">
                          <Link to="#">
                             <div className="movie-slick position-relative">
                                <img src={'trending4'} className="img-fluid" alt=""/>
                             </div>
                          </Link>
                       </SwiperSlide>
                       <SwiperSlide as="li">
                          <Link to="#">
                             <div className="movie-slick position-relative">
                                <img src={'trending5'} className="img-fluid" alt=""/>
                             </div>
                          </Link>
                       </SwiperSlide>
                       <SwiperSlide as="li">
                          <Link to="#">
                             <div className="movie-slick position-relative">
                                <img src={'trending6'} className="img-fluid" alt=""/>
                             </div>
                          </Link>
                       </SwiperSlide>
                    </Swiper>
                 </div>
              
              </Col>
           </Row>
        </Container>
     </section>
    )
}

export default Layout2Carousel