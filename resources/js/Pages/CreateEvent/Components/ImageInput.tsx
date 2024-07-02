import UploadSVG from "@/Components/SVGs/UploadSVG";
import { useState } from "react";

export default function ImageInput({setData} : {setData : Function}){
  // Состояние для превью изображения
  const [preview, setPreview] = useState<string | undefined>(undefined);
  // Состояние для ошибки
  const [error, setError] = useState<string | undefined>(undefined); 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Проверка размера файла (10 МБ = 10 * 1024 * 1024 байт)
      if (file.size > 10485760) {
        setError("Размер файла должен быть не более 10 МБ.");
        setPreview(undefined); // Очистить предыдущее превью, если оно есть
        return;
      }
      setData('file', file);
      setError(undefined); // Очистка сообщений об ошибках, если файл подходит

      // Создание превью
      const reader = new FileReader();
      reader.onloadend = () => {
        // reader.result должен быть строкой (Data URL)
        if (typeof reader.result === 'string') {
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setError("Файл не выбран.");
    }
  };

  return(
    <div className={` ${preview == null ? 'w-[600px] relative border-2 border-gray-300 border-dashed rounded-3xl p-6' : 'relative'}`} id="dropzone">
        <input type="file"
        className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
        onChange={handleFileChange}
        />
        <div className={`text-center ${preview == null ? '' : 'hidden'}`} >
            <UploadSVG className="mx-auto h-12 w-12" w={12} h={12}></UploadSVG>

            <h3 className="mt-2 text-sm font-medium text-gray-900">
                <label htmlFor="file-upload" className="relative">
                    <span>Перетащите</span>
                    <span className="text-primary"> или загрузите</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
            </h3>
            <p className="mt-1 text-xs text-gray-500">
                PNG, JPG, GIF до 10MB
            </p>
        {error && <strong className="text-red-400">{error}</strong>} {/* Отображение ошибки */}
        </div>
        {preview && (
          <img src={preview} className="mt-4 mx-auto max-w-[600px] rounded-55px shadow-normal" id="preview" alt="Preview" />
        )}
    </div>

  )
}