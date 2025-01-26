import { Link } from "@inertiajs/react";

export default function ContentSelectionButtons() {

 return (
    <div className="flex gap-8 items-center">
      <Link href="/login" className="text-primary text-[28px] font-bold">Войти</Link>
    </div>
  );
 }