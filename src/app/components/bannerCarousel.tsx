"use client"
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image'

export default function BannerCarousel() {
  return (
    <Carousel emulateTouch infiniteLoop swipeable autoPlay showThumbs={false} showArrows={false} showStatus={false} className='w-full'>
      <div>
        <Image src={'/images/image.jpg'} alt='banner' width={1440} height={451} />
      </div>
      <div>
        <Image src={'/images/image.jpg'} alt='banner' width={1440} height={451} />
      </div>
      <div>
        <Image src={'/images/image.jpg'} alt='banner' width={1440} height={451} />
      </div>
    </Carousel>
  )
}
