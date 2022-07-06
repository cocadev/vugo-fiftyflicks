import React from 'react'
import { Col, Row, Container } from 'react-bootstrap'

const FooterStyle = () => {
  return (
    <>
      <footer id="contact" className="footer-one iq-bg-dark">
        <div className="footer-top">
          <Container fluid>
            <Row className="footer-standard">

              <Col lg="12">

                {/* <div className="widget text-left">
                  <div className="menu-footer-link-1-container">
                    <ul id="menu-footer-link-1" className="menu p-0">
                      <li id="menu-item-7314" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7314">
                        Terms Of Use
                      </li>
                      <li id="menu-item-7316" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7316">
                        Privacy-Policy
                      </li>
                      <li id="menu-item-7118" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7118">
                        FAQ
                      </li>
                      <li id="menu-item-7118" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7118">
                        Watch List
                      </li>
                    </ul>
                  </div>
                </div> */}

                <div className="widget text-left">
                  <div className="textwidget text-center">
                    <p><small>© 2022 VUGO Entertainment Pty Ltd. All Rights Reserved. Duplication and copy of this is strictly prohibited. All rights reserved.</small></p>
                  </div>
                </div>

              </Col>

              {/* <Col lg="2" md="6" className="mt-4 mt-lg-0">
                <h6 className="footer-link-title">
                  Follow Us :
                </h6>
                <ul className="info-share">
                  <li><Link target="_blank" to="#"><i className="fa fa-facebook"></i></Link></li>
                  <li><Link target="_blank" to="#"><i className="fa fa-twitter"></i></Link></li>
                  <li><Link target="_blank" to="#"><i className="fa fa-google-plus"></i></Link></li>
                  <li><Link target="_blank" to="#"><i className="fa fa-github"></i></Link></li>
                </ul>
              </Col> */}

              {/* <Col lg="3" md="6" className="mt-4 mt-lg-0">
                <div className="widget text-left">
                  <div className="textwidget">
                    <h6 className="footer-link-title">Streamit App</h6>
                    <div className="d-flex align-items-center">
                      <Link className="app-image" to="#">
                        <img src={footer1} alt="play-store" />
                      </Link><br />
                      <Link className="ml-3 app-image" to="#"><img src={footer2} alt="app-store" /></Link>
                    </div>
                  </div>
                </div>
              </Col> */}
            </Row>
          </Container>
        </div>
      </footer>
    </>
  )
}

export default FooterStyle;