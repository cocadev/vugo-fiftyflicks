import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getApiGenres, getApiLayoutFiftyFlicks } from '../../../store/layout/actions'
import BannerCarousel from './bannerCarousel';
import Layout1Carousel from './layout1Carousel';


const Homepage = () => {

  const dispatch = useDispatch();
  const { layouts, } = useSelector((state) => state.layout);

  useEffect(() => {
    dispatch(getApiLayoutFiftyFlicks())
    dispatch(getApiGenres())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {
        layouts
          .sort(function (a, b) {
            return a.displayOrder - b.displayOrder
          })
          .map((item, index) => <div key={index}>
            {item.type === 'Banner' && <BannerCarousel data={item} />}
            {item.type === 'Layout1' && <Layout1Carousel data={item} idx={index} />}
          </div>)
      }
    </>
  )
}

export default Homepage