import { gsap } from 'gsap'

export const gsapAnimate = {
  getData: (elem) => {
     const option = {
        opacity: 0,
        scale: 1,
        position: {
              x: 0,
              y:0,
        },
        ease: "",
        duration: 1,
        delay: .4,
        rotate: 0
     }
     if(elem !== undefined) {
        option.position.x = gsapAnimate.validValue(elem.dataset.iqPositionX, 0)

        option.position.y = gsapAnimate.validValue(elem.dataset.iqPositionY, 0)

        option.rotate = gsapAnimate.validValue(elem.dataset.iqRotate, 0)

        option.scale = gsapAnimate.validValue(elem.dataset.iqScale, 1)

        option.opacity = gsapAnimate.validValue(elem.dataset.iqOpacity, 0)

        option.delay = gsapAnimate.validValue(elem.dataset.iqDelay, .4)

        option.duration = gsapAnimate.validValue(elem.dataset.iqDuration, 1.5)

        option.ease = gsapAnimate.validValue(elem.dataset.iqEase, '')

        const setOption = {opacity: option.opacity, scale: option.scale, x: option.position.x, y: option.position.y, ease: option.ease, rotate: option.rotate, duration: option.duration, delay: option.delay}

        return setOption
     } else {
        return {opacity: 0}
     }
  },
  onStart : (elem) => {
     
     const setOption = gsapAnimate.getData(elem)

     gsap.from(elem, setOption)

  },

  onEnd : (elem) => {
     
     const setOption = gsapAnimate.getData(elem)
     
     gsap.to(elem, setOption)

  },

  onStartEnd : (elem) => {

     const setOption = gsapAnimate.getData(elem)

     const setEndOption = gsapAnimate.getData(elem)

     setEndOption.opacity = 1

     setEndOption.x = 0

     setEndOption.y = 0

     setEndOption.rotate = 0

     setEndOption.scale = 1

     gsap.fromTo(elem, setOption, setEndOption)
  },
  validValue: (attr, defaultVal) => {
     if (attr !== undefined && attr !== null) {
        return Number(attr)
     }
     return Number(defaultVal)
  }
}