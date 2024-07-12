import { useDate } from "@/Components/contexts/DateContext";
import { Availability } from "@/Pages/Event/Components/RentForm";
import { useEffect } from "react";

export function checkAvailability(availability: Availability | undefined, setAvailability : Function | undefined){
  const { date } = useDate();

  if (availability !== undefined && setAvailability !== undefined) {
    useEffect(() => {
      if (date) {
        const formattedDate = date.toISOString().split('T')[0];
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