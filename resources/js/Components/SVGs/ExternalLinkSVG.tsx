import { SVGProps } from "@/app";
export default function CancelSVG({className, w, h} : SVGProps){
  return(
    <svg className={className} width={w} height={h} viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.5002 11.0002H11.5002C10.5277 11.0002 9.59507 11.3865 8.90744 12.0741C8.2198 12.7617 7.8335 13.6944 7.8335 14.6668V33.0002C7.8335 33.9726 8.2198 34.9053 8.90744 35.5929C9.59507 36.2805 10.5277 36.6668 11.5002 36.6668H29.8335C30.806 36.6668 31.7386 36.2805 32.4262 35.5929C33.1139 34.9053 33.5002 33.9726 33.5002 33.0002V22.0002M20.6668 23.8335L37.1668 7.3335M37.1668 7.3335H28.0002M37.1668 7.3335V16.5002" stroke="#1384D6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}