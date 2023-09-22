import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image'

export default function BannerCarousel() {
  return (
    <Carousel autoPlay showThumbs={false}>
      <div>
        <Image src={'/images/image.jpg'} alt='banner' width={1520} height={480} />
      </div>
      <div>
        <Image src={'/images/image.jpg'} alt='banner' width={1520} height={480} />
      </div>
      <div>
        <Image src={'/images/image.jpg'} alt='banner' width={1520} height={480} />
      </div>
    </Carousel>
  )
}
