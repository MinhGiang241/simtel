'use client'
import BannerCarousel from "./components/bannerCarousel";
import PlanButton from "./components/planButton";
import PlanList from "./components/planList";
import SelectNumber from "./components/selectNumber";

export default function Home() {
  return (<div className='w-full flex flex-col items-center'>

    <div className="w-full h-20" />
    <div className="max-w-7xl h-fit">
      <BannerCarousel />
      <PlanButton />
      <PlanList />
      <SelectNumber />
      <div className="w-full h-16" />
    </div>
  </div>)
}
