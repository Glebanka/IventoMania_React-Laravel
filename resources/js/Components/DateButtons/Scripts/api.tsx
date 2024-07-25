import { useDate } from "@/Components/contexts/DateContext";
import { Availability } from "@/Pages/Event/Components/RentForm";
import { useEffect } from "react";

export function checkAvailability(availability: Availability | undefined, setAvailability : Function | undefined){
  const { date } = useDate();

  if (availability !== undefined && setAvailability !== undefined) {
    useEffect(() => {
      if (date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы нумеруются с 0, поэтому добавляем 1
        const day = String(date.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        console.log(formattedDate);
        fetch(`/api/availability?date=${formattedDate}`)
          .then(response => response.json())
          .then(data => {
            setAvailability(data);
          })
          .catch(error => {
            console.error('Error fetching availability:', error);
          });
      }
    }, [date]);
  }
}