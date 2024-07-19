import { SVGProps } from "@/app";
import QuestionSVG from "./SVGs/QuestionSVG";
interface TooltipProps extends SVGProps{
  children: React.ReactNode
}
export default function Tooltip({w, h, fill, children} : TooltipProps){
  return(
    <div className="flex justify-center">
      <div className='tooltip'>
        <QuestionSVG w={w} h={h} fill={fill}></QuestionSVG>
        {children && <div className="tooltip-text">{children}</div>}
      </div>
    </div>
  )
}