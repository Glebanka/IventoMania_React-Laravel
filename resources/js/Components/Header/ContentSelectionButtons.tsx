import { useContent } from "../contexts/ContentContext";

export default function ContentSelectionButtons() {
  const { content, setContent } = useContent();

  const handleContentButtonClick = (newContent : string) => {
    setContent(newContent);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 pr-4">

        <button className={`btn text-xs sm:text-xl leading-none py-2 sm:py-4 sm:w-fit w-24 px-0 sm:px-8 ${content === 'listener' ? 'btn-inactive' : ''}`} 
        onClick={() => handleContentButtonClick('listener')}>Слушатель</button>

        <button className={`btn text-xs sm:text-xl leading-none py-2 sm:py-4 sm:w-fit w-24 px-0 sm:px-8 ${content === 'lecturer' ? 'btn-inactive' : ''}`} 
        onClick={() => handleContentButtonClick('lecturer')}>Лектор</button>

      </div>
    </>
  );
 }