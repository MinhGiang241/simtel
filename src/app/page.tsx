'use client'
import BannerCarousel from "./components/bannerCarousel";
import Discount from "./components/discount";
import PlanButton from "./components/planButton";
import PlanList from "./components/planList";
import SelectNumber from "./components/selectNumber";
import SelectSimTitle from "./components/selectSimTitle";

export default function Home() {
  return (<div className='w-full flex flex-col items-center'>

    <div className="w-full h-20" />
    <BannerCarousel />
    <div className="max-w-[1140px] h-fit">
      <PlanButton />
      <PlanList />
      <SelectSimTitle />
      <SelectNumber />
      <Discount />
      {/* <div className="w-full h-16" /> */}
    </div>
  </div>)
}
