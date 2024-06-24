import { SVGProps } from "@/app";
export default function MoneySVG({className, w, h} : SVGProps){
  return(
    <svg className={className} width={w} height={h} viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_908_78)">
        <path d="M24.25 2.5H1.75C1.05977 2.5 0.5 3.05977 0.5 3.75V16.25C0.5 16.9402 1.05977 17.5 1.75 17.5H24.25C24.9402 17.5 25.5 16.9402 25.5 16.25V3.75C25.5 3.05977 24.9402 2.5 24.25 2.5ZM2.375 15.625V13.125C3.75586 13.125 4.875 14.2441 4.875 15.625H2.375ZM2.375 6.875V4.375H4.875C4.875 5.75586 3.75586 6.875 2.375 6.875ZM13 13.75C11.2738 13.75 9.875 12.0707 9.875 10C9.875 7.92891 11.2742 6.25 13 6.25C14.7258 6.25 16.125 7.92891 16.125 10C16.125 12.0715 14.7254 13.75 13 13.75ZM23.625 15.625H21.125C21.125 14.2441 22.2441 13.125 23.625 13.125V15.625ZM23.625 6.875C22.2441 6.875 21.125 5.75586 21.125 4.375H23.625V6.875Z" fill="#1384D6"/>
      </g>
      <defs>
        <clipPath id="clip0_908_78">
          <rect width="25" height="20" fill="white" transform="translate(0.5)"/>
        </clipPath>
      </defs>
    </svg>
  )
}
