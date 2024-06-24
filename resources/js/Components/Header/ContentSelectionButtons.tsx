import { useContext } from "react";
import ContentContext from "../contexts/ContentContext";

export default function ContentSelectionButtons() {
  const { content, setContent }  = useContext(ContentContext);

  const handleContentButtonClick = (newContent : string) => {
    setContent(newContent);
  };

  return (
    <div>
      <div className="flex flex-nowrap justify-between items-center gap-4">
        <button className={`btn text-xl leading-none ${content === 'listener' ? 'btn-inactive' : ''}`} onClick={() => handleContentButtonClick('listener')}>Слушатель</button>
        <button className={`btn text-xl leading-none ${content === 'lecturer' ? 'btn-inactive' : ''}`} onClick={() => handleContentButtonClick('lecturer')}>Лектор</button>
      </div>
    </div>
  );
 }