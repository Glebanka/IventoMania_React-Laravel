import { SVGProps } from "@/app";
export default function TrashSVG({className, w, h} : SVGProps){
  return(
    <svg className={className} width={w} height={h} viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 31.125C10.175 31.125 9.469 30.8397 8.882 30.269C8.295 29.6983 8.001 29.0114 8 28.2083V9.25H6.5V6.33333H14V4.875H23V6.33333H30.5V9.25H29V28.2083C29 29.0104 28.7065 29.6973 28.1195 30.269C27.5325 30.8406 26.826 31.126 26 31.125H11ZM14 25.2917H17V12.1667H14V25.2917ZM20 25.2917H23V12.1667H20V25.2917Z" fill="white"/>
    </svg>
  )
}