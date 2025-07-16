"use client";

import TranslateByKey from "@/components/translate/translateByKay";
import TranslateData from "@/components/translate/translateData";

export default function TranslateDataPage() {
  return (
    <div className="flex flex-col md:flex-row md:justify-between h-auto sm:h-[90vh] overflow-auto mt-1">
      <div className="w-full md:w-1/2 overflow-y-auto max-h-[50vh] md:max-h-full sm:mb-2">
        <TranslateData />
      </div>
      <div className="w-full overflow-y-auto md:w-1/2 max-h-[50vh] md:max-h-full lg:w-2/3">
        <TranslateByKey />
      </div>
    </div>
  );
}
