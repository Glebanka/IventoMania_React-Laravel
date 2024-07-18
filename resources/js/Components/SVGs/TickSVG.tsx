import { SVGProps } from "@/app";
export default function TickSVG({className, w, h, fill} : SVGProps){
  return(
    <svg className={className} width={w} height={h} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.79688 14.5054L10.2656 19.9741L21.2031 8.25537" stroke={fill} stroke-width="2.34375" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}