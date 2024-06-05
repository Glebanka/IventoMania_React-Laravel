import { useContext } from "react";

export default function ContentSelectionButtons() {
  const { content, setContent }  = useContext(ContentContext);

  const handleContentButtonClick = (newContent : string) => {
    setContent(newContent);
  };

  return (
    <div>
      {content === 'listener' && <div className="flex flex-nowrap justify-between items-center gap-4">
        <button className="btn-inactive text-xl leading-none" onClick={() => handleContentButtonClick('listener')}>Слушатель</button>
        <button className="btn text-xl leading-none" onClick={() => handleContentButtonClick('lecturer')}>Лектор</button>
      </div>}
      {content === 'lecturer' && <div className="flex flex-nowrap justify-between items-center gap-4">
        <button className="btn text-xl leading-none" onClick={() => handleContentButtonClick('listener')}>Слушатель</button>
        <button className="btn-inactive text-xl leading-none" onClick={() => handleContentButtonClick('lecturer')}>Лектор</button>
      </div>}
    </div>
  );
 }