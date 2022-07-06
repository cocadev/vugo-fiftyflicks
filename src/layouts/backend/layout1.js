import React from 'react';
import { Link } from 'react-router-dom'
import HeaderStyle1 from '../../components/header';
import FooterStyle from '../../components/footer';
import Layout1Route from '../../router/layout1-route';

const Layout1 = () => {

  const pathname = window.location.pathname;
  const isDisableHeader = pathname.includes('watch-video');
  
  const backToTop = document.getElementById("back-to-top");
  // console.log(backToTop)
  if (backToTop !== null && backToTop !== undefined && !isDisableHeader) {
    document.getElementById("back-to-top").classList.add('animated', 'fadeOut')
    window.addEventListener('scroll', (e) => {
      if (document.documentElement.scrollTop > 50) {
        document.getElementById("back-to-top").classList.remove("fadeOut")
        document.getElementById("back-to-top").classList.add("fadeIn")
      } else {
        document.getElementById("back-to-top").classList.remove("fadeIn")
        document.getElementById("back-to-top").classList.add("fadeOut")
      }
    })
    // scroll body to 0px on click
    document.querySelector('#top').addEventListener('click', (e) => {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
  }

  return (
    !isDisableHeader ? <>
      <div id="back-to-top">
        <Link className="top" to="#" id="top"> <i className="fa fa-angle-up"></i> </Link>
      </div>
      <div className="wraper">
        <HeaderStyle1 />
        <div className="content-page" id="content-page">
          <Layout1Route />
        </div>
      </div>
      <FooterStyle />
    </>
    : <Layout1Route />
  )
}

export default Layout1;