import React from 'react'
import { gsapAnimate } from '../utils/gsapAnimate';
import { Container, Col, Row, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Navigation, Thumbs, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import { useSelector } from 'react-redux';
import useAuth from '../../../components/auth/useAuth';
SwiperCore.use([EffectFade, Navigation, Thumbs, Pagination]);

const BannerCarousel = (props) => {

  const { data } = props;
  // const [toggler1, setToggler1] = useState(false);
  const { genres } = useSelector((state) => state.layout);
  const { authToken } = useAuth();

  const animationInit = () => {
    if (document.querySelector('.swiper-container .swiper-slide-active') !== null) {

      const gsapElem = document.querySelector('.swiper-container .swiper-slide-active').querySelectorAll('[data-iq-gsap="onStart"]')

      Array.from(gsapElem, (elem) => {
        return gsapAnimate.onStartEnd(elem)
      })
    }
  }

  return (
    <>
      <section id="home" className="iq-main-slider p-0 iq-rtl-direction">
        <div id="prev5" className="swiper-button swiper-button-prev"><i className="fa fa-chevron-left"></i></div>
        <div id="next5" className="swiper-button swiper-button-next"><i className="fa fa-chevron-right"></i></div>
        <Swiper
          navigation={{
            prevEl: '#prev5',
            nextEl: '#next5'
          }}
          pagination={{
            "clickable": true
          }}
          onInit={() => { animationInit() }}
          onSlideChangeTransitionStart={() => animationInit()}
          loop={true}
          id="home-slider"
          className="slider m-0 p-0"
        >
          {data.data.map((item, index) =>
            <SwiperSlide
              className="slide slick-bg s-bg-1"
              key={index}
              style={{ backgroundImage: `url(${item.bannerSignedUrl})` }}
            >
              <Container fluid className="position-relative h-100">
                <div className="slider-inner h-100">
                  <Row className="align-items-center iq-ltr-direction h-100">
                    <Col xl="6" lg="12" md="12">

                      <h1 className="slider-text big-title title text-uppercase" data-iq-gsap="onStart" data-iq-position-x="-200">{item.displayName}</h1>
                      <div className="d-flex flex-wrap align-items-center">
                        <div className="slider-ratting d-flex align-items-center mr-4 mt-2 mt-md-3" data-iq-gsap="onStart" data-iq-position-x="-200" data-iq-delay="-0.5">
                          <ul className="ratting-start p-0 m-0 list-inline text-primary d-flex align-items-center justify-content-left">
                            <li>
                              <i className="fa fa-star" aria-hidden="true"></i>
                            </li>
                            <li>
                              <i className="fa fa-star" aria-hidden="true"></i>
                            </li>
                            <li>
                              <i className="fa fa-star" aria-hidden="true"></i>
                            </li>
                            <li>
                              <i className="fa fa-star" aria-hidden="true"></i>
                            </li>
                            <li>
                              <i className="fa fa-star-half" aria-hidden="true"></i>
                            </li>
                          </ul>
                          <span className="text-white ml-2">4.7(lmdb)</span>
                        </div>
                        <div className="d-flex align-items-center mt-2 mt-md-3" data-iq-gsap="onStart" data-iq-position-x="-200" data-iq-delay="-0.5">
                          <span className="badge badge-secondary p-2">{item.rating}</span>
                          <span className="ml-3">{item.duration} mins</span>
                        </div>

                      </div>

                      <div className='mt-4 mb-4' data-iq-gsap="onStart" data-iq-position-y="80" data-iq-delay="0.8">
                        {item.longDescription}
                      </div>

                      <div className="trending-list" data-wp_object-in="fadeInUp" data-delay-in="1.2">
                        <div className="text-primary title starring">
                          Starring: <span className="text-body">Karen Gilchrist, James Earl Jones</span>
                        </div>
                        <div className="text-primary title tag">
                          Genres: <span className="text-body">
                            <GenreItem data={item.genre} genres={genres} />
                          </span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center r-mb-23" data-iq-gsap="onStart" data-iq-position-y="80" data-iq-delay="0.8">
                        <Link to={{ pathname: `/watch-video/${item.id}`, state: { movie: item } }} className={`btn iq-button ${!authToken ? 'btn-secondary disabled': 'btn-hover'}`} style={{ height: 50, display: 'flex', alignItems: 'center'}}>
                          <i className="fa fa-play mr-2" aria-hidden="true"></i>Play Now
                        </Link>
                        {item.trailerDashUrl && <Link to={{ pathname: `/watch-video/${item.id}`, state: { movie: item } }} className="btn btn-hover iq-button" style={{ marginLeft: 20 }}>
                          <i className="fa fa-play mr-2" aria-hidden="true"></i>Watch Trailer
                        </Link>}
                      </div>

                    </Col>

                    <Col xl="5" lg="12" md="12" className="trailor-video text-center">
                      {/* <Link onClick={() => setToggler1(!toggler1)} to="/" className="video-open playbtn">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px" y="0px" width="80px" height="80px" viewBox="0 0 213.7 213.7"
                        enableBackground="new 0 0 213.7 213.7" xmlSpace="preserve">
                        <polygon className='triangle' fill="none" strokeWidth="7" strokeLinecap="round"
                          strokeLinejoin="round" strokeMiterlimit="10"
                          points="73.5,62.5 148.5,105.8 73.5,149.1 " />
                        <circle className='circle' fill="none" strokeWidth="7" strokeLinecap="round"
                          strokeLinejoin="round" strokeMiterlimit="10" cx="106.8" cy="106.8" r="103.3" />
                      </svg>
                      <span className="w-trailor">Watch Trailer</span>
                    </Link> */}
                    </Col>
                  </Row>
                </div>
              </Container>
            </SwiperSlide>)}
        </Swiper>
      </section>
    </>
  )
}

function GenreItem(props) {
  const { genres, data } = props;
  const result = !data
    ? '-'
    : genres
      .filter((genre) => data.includes(genre.id))
      .map((genre) => genre.name)
      .join(", ");

  return (
    <span>
      {result}
    </span>
  )
}

export default BannerCarousel