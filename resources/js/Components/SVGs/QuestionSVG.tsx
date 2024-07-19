import { SVGProps } from "@/app";
export default function QuestionSVG({className, w, h, fill} : SVGProps){
  return(
    <svg width={w} height={h} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5 2.7085C8.89303 2.7085 7.32214 3.18502 5.986 4.07781C4.64985 4.97059 3.60844 6.23954 2.99348 7.72419C2.37852 9.20884 2.21762 10.8425 2.53112 12.4186C2.84463 13.9947 3.61846 15.4424 4.75476 16.5787C5.89106 17.715 7.3388 18.4889 8.91489 18.8024C10.491 19.1159 12.1247 18.955 13.6093 18.34C15.094 17.7251 16.3629 16.6837 17.2557 15.3475C18.1485 14.0114 18.625 12.4405 18.625 10.8335C18.6227 8.67931 17.766 6.61401 16.2427 5.09077C14.7195 3.56753 12.6542 2.71077 10.5 2.7085ZM10.5 15.8335C10.3146 15.8335 10.1333 15.7785 9.97916 15.6755C9.82499 15.5725 9.70482 15.4261 9.63387 15.2548C9.56291 15.0835 9.54434 14.895 9.58052 14.7131C9.61669 14.5312 9.70598 14.3642 9.83709 14.2331C9.9682 14.102 10.1352 14.0127 10.3171 13.9765C10.499 13.9403 10.6875 13.9589 10.8588 14.0299C11.0301 14.1008 11.1765 14.221 11.2795 14.3751C11.3825 14.5293 11.4375 14.7106 11.4375 14.896C11.4375 15.1446 11.3387 15.3831 11.1629 15.5589C10.9871 15.7347 10.7486 15.8335 10.5 15.8335ZM11.125 12.0272V12.0835C11.125 12.2493 11.0592 12.4082 10.9419 12.5254C10.8247 12.6426 10.6658 12.7085 10.5 12.7085C10.3342 12.7085 10.1753 12.6426 10.0581 12.5254C9.94085 12.4082 9.875 12.2493 9.875 12.0835V11.4585C9.875 11.2927 9.94085 11.1338 10.0581 11.0166C10.1753 10.8993 10.3342 10.8335 10.5 10.8335C11.5336 10.8335 12.375 10.1304 12.375 9.271C12.375 8.41162 11.5336 7.7085 10.5 7.7085C9.46641 7.7085 8.625 8.41162 8.625 9.271V9.5835C8.625 9.74926 8.55916 9.90823 8.44195 10.0254C8.32473 10.1426 8.16576 10.2085 8 10.2085C7.83424 10.2085 7.67527 10.1426 7.55806 10.0254C7.44085 9.90823 7.375 9.74926 7.375 9.5835V9.271C7.375 7.72021 8.77657 6.4585 10.5 6.4585C12.2234 6.4585 13.625 7.72021 13.625 9.271C13.625 10.6288 12.55 11.7655 11.125 12.0272Z"
      fill={fill}/>
    </svg>
  )
}