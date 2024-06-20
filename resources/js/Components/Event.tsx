import { useContext } from "react";
import DateContext from "./contexts/DateContext";

export default function Event( {event} ){
  let { date } = useContext(DateContext);
  const month = date.getMonth() + 1;
  date = date.getDate() + ' ' + month;
  return(
    <>
    {date == event.date && <div key={event.id} className="flex xl:flex-row flex-col justify-between align-center cardochka">
            
            <img className="rounded-83px w-3/6 self-center" src={event.imagePath}></img>
            
            <div className="border-radius w-3/6 flex flex-col sm:justify-between py-16 px-10 self-center xl:self-stretch">
              
              
              <h3 className='text-primary text-4xl font-bold'>{event.name}</h3>
              
              <p className="text-xl leading-tight mb-3 xl:mb-0 hyphens-auto">{event.short_description} </p>
              
              <div className="flex-column d-flex mb-3 xl:mb-0">

          
                <div className="flex flex-row pb-1 items-center">
                  <svg className="me-1" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.375 18.6875V9.75H3.625V18.6875C3.625 19.7649 4.03655 20.7983 4.76911 21.5601C5.50168 22.322 6.49525 22.75 7.53125 22.75H18.4688C19.5048 22.75 20.4983 22.322 21.2309 21.5601C21.9634 20.7983 22.375 19.7649 22.375 18.6875ZM9.87031 13.403C9.87031 13.7256 9.74709 14.035 9.52776 14.2631C9.30844 14.4912 9.01096 14.6193 8.70078 14.6193C8.3906 14.6193 8.09313 14.4912 7.8738 14.2631C7.65447 14.035 7.53125 13.7256 7.53125 13.403C7.53125 13.0804 7.65447 12.771 7.8738 12.5429C8.09313 12.3148 8.3906 12.1867 8.70078 12.1867C9.01096 12.1867 9.30844 12.3148 9.52776 12.5429C9.74709 12.771 9.87031 13.0804 9.87031 13.403ZM9.87031 17.4655C9.87031 17.7881 9.74709 18.0975 9.52776 18.3256C9.30844 18.5537 9.01096 18.6818 8.70078 18.6818C8.3906 18.6818 8.09313 18.5537 7.8738 18.3256C7.65447 18.0975 7.53125 17.7881 7.53125 17.4655C7.53125 17.1429 7.65447 16.8335 7.8738 16.6054C8.09313 16.3773 8.3906 16.2492 8.70078 16.2492C9.01096 16.2492 9.30844 16.3773 9.52776 16.6054C9.74709 16.8335 9.87031 17.1429 9.87031 17.4655ZM14.1703 13.403C14.1703 13.7256 14.0471 14.035 13.8278 14.2631C13.6084 14.4912 13.311 14.6193 13.0008 14.6193C12.6906 14.6193 12.3931 14.4912 12.1738 14.2631C11.9545 14.035 11.8313 13.7256 11.8313 13.403C11.8313 13.0804 11.9545 12.771 12.1738 12.5429C12.3931 12.3148 12.6906 12.1867 13.0008 12.1867C13.311 12.1867 13.6084 12.3148 13.8278 12.5429C14.0471 12.771 14.1703 13.0804 14.1703 13.403ZM14.1703 17.4655C14.1703 17.7881 14.0471 18.0975 13.8278 18.3256C13.6084 18.5537 13.311 18.6818 13.0008 18.6818C12.6906 18.6818 12.3931 18.5537 12.1738 18.3256C11.9545 18.0975 11.8313 17.7881 11.8313 17.4655C11.8313 17.1429 11.9545 16.8335 12.1738 16.6054C12.3931 16.3773 12.6906 16.2492 13.0008 16.2492C13.311 16.2492 13.6084 16.3773 13.8278 16.6054C14.0471 16.8335 14.1703 17.1429 14.1703 17.4655ZM18.4641 13.403C18.4641 13.7256 18.3408 14.035 18.1215 14.2631C17.9022 14.4912 17.6047 14.6193 17.2945 14.6193C16.9844 14.6193 16.6869 14.4912 16.4675 14.2631C16.2482 14.035 16.125 13.7256 16.125 13.403C16.125 13.0804 16.2482 12.771 16.4675 12.5429C16.6869 12.3148 16.9844 12.1867 17.2945 12.1867C17.6047 12.1867 17.9022 12.3148 18.1215 12.5429C18.3408 12.771 18.4641 13.0804 18.4641 13.403ZM22.375 7.3125C22.375 6.23506 21.9634 5.20175 21.2309 4.43988C20.4983 3.67801 19.5048 3.25 18.4688 3.25H7.53125C6.49525 3.25 5.50168 3.67801 4.76911 4.43988C4.03655 5.20175 3.625 6.23506 3.625 7.3125V8.125H22.375V7.3125Z" fill="#1384D6"/></svg>
                  <p className="text-xl leading-none">{event.formattedDate}</p>
                </div>
          
                <div className="flex flex-row pb-1 items-center">
                  <svg className="me-1" width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.875 6.5H24.125V19.5H3.875V6.5ZM14 9.75C14.8951 9.75 15.7536 10.0924 16.3865 10.7019C17.0194 11.3114 17.375 12.138 17.375 13C17.375 13.862 17.0194 14.6886 16.3865 15.2981C15.7536 15.9076 14.8951 16.25 14 16.25C13.1049 16.25 12.2464 15.9076 11.6135 15.2981C10.9806 14.6886 10.625 13.862 10.625 13C10.625 12.138 10.9806 11.3114 11.6135 10.7019C12.2464 10.0924 13.1049 9.75 14 9.75ZM8.375 8.66667C8.375 9.2413 8.13795 9.7924 7.71599 10.1987C7.29403 10.6051 6.72174 10.8333 6.125 10.8333V15.1667C6.72174 15.1667 7.29403 15.3949 7.71599 15.8013C8.13795 16.2076 8.375 16.7587 8.375 17.3333H19.625C19.625 16.7587 19.8621 16.2076 20.284 15.8013C20.706 15.3949 21.2783 15.1667 21.875 15.1667V10.8333C21.2783 10.8333 20.706 10.6051 20.284 10.1987C19.8621 9.7924 19.625 9.2413 19.625 8.66667H8.375Z" fill="#1384D6"/></svg>            
                  <p className="text-xl leading-none">{event.price} ₽</p>
                </div>
                
                <div className="flex flex-row pb-1 items-center">
                  <svg className="me-1" width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.9999 2.0835C11.632 2.0835 10.2774 2.35293 9.01363 2.87642C7.74982 3.3999 6.6015 4.16719 5.63422 5.13447C3.68072 7.08797 2.58325 9.73749 2.58325 12.5002C2.58325 15.2628 3.68072 17.9124 5.63422 19.8659C6.6015 20.8331 7.74982 21.6004 9.01363 22.1239C10.2774 22.6474 11.632 22.9168 12.9999 22.9168C15.7626 22.9168 18.4121 21.8194 20.3656 19.8659C22.3191 17.9124 23.4166 15.2628 23.4166 12.5002C23.4166 11.1322 23.1472 9.77768 22.6237 8.51388C22.1002 7.25007 21.3329 6.10174 20.3656 5.13447C19.3983 4.16719 18.25 3.3999 16.9862 2.87642C15.7224 2.35293 14.3679 2.0835 12.9999 2.0835ZM17.3749 16.8752L11.9583 13.5418V7.29183H13.5208V12.7085L18.2083 15.521L17.3749 16.8752Z" fill="#1384D6"/></svg>            
                  <p className="text-xl leading-none"> {event.formattedTime} </p>
                </div>

                <div className="flex flex-row pb-1 items-center">
                  <svg className="me-1" width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 10.4167C13.4788 10.4167 13.9529 10.3224 14.3952 10.1391C14.8375 9.95592 15.2394 9.68737 15.578 9.34883C15.9165 9.01028 16.1851 8.60837 16.3683 8.16603C16.5515 7.7237 16.6458 7.24961 16.6458 6.77083C16.6458 6.29206 16.5515 5.81797 16.3683 5.37563C16.1851 4.9333 15.9165 4.53139 15.578 4.19284C15.2394 3.85429 14.8375 3.58574 14.3952 3.40252C13.9529 3.2193 13.4788 3.125 13 3.125C12.0331 3.125 11.1057 3.50911 10.422 4.19284C9.73828 4.87657 9.35417 5.8039 9.35417 6.77083C9.35417 7.73777 9.73828 8.6651 10.422 9.34883C11.1057 10.0326 12.0331 10.4167 13 10.4167ZM3.625 21.25V21.875H22.375V21.25C22.375 18.9167 22.375 17.75 21.9208 16.8583C21.5214 16.0744 20.884 15.437 20.1 15.0375C19.2083 14.5833 18.0417 14.5833 15.7083 14.5833H10.2917C7.95833 14.5833 6.79167 14.5833 5.9 15.0375C5.11603 15.437 4.47863 16.0744 4.07917 16.8583C3.625 17.75 3.625 18.9167 3.625 21.25Z" stroke="#1384D6" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round"/></svg>            
                  <p className="text-xl leading-none"> {event.lecturer} </p>
                </div>

              </div>
              <a href="event" className="btn btn-primary px-12 text-3xl w-fit">Записаться на<br />Мастер-класс</a>
            </div>
            
          </div>}
    </>
  )
}