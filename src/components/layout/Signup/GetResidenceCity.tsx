import * as SolarIconSet from "solar-icon-set";
import { Dropdown } from "antd";
import { useState } from "react";
import { useLocalStore } from "../../../store/useLocalStore";
const iranProvinces = [
  { label: "البرز", key: "1" },
  { label: "اردبیل", key: "2" },
  { label: "ایلام", key: "3" },
  { label: "اصفهان", key: "4" },
  { label: "آذربایجان غربی", key: "5" },
  { label: "آذربایجان شرقی", key: "6" },
  { label: "بوشهر", key: "7" },
  { label: "تهران", key: "8" },
  { label: "چهار محال و بختیاری", key: "10" },
  { label: "خراسان جنوبی", key: "11" },
  { label: "خراسان رضوی", key: "12" },
  { label: "خراسان شمالی", key: "13" },
  { label: "خوزستان", key: "14" },
  { label: "زنجان", key: "15" },
  { label: "سمنان", key: "16" },
  { label: "سیستان و بلوچستان", key: "17" },
  { label: "فارس", key: "18" },
  { label: "قزوین", key: "19" },
  { label: "قم", key: "20" },
  { label: "کردستان", key: "21" },
  { label: "کرمان", key: "22" },
  { label: "کرمانشاه", key: "23" },
  { label: "کهکیلویه و بویراحمد", key: "24" },
  { label: "گلستان", key: "25" },
  { label: "گیلان", key: "26" },
  { label: "لرستان", key: "27" },
  { label: "مازندران", key: "28" },
  { label: "مرکزی", key: "29" },
  { label: "هرمزگان", key: "30" },
  { label: "همدان", key: "31" },
  { label: "یزد", key: "32" },
];
export default function GetResidenceCity() {
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState<string>();
  const handleNextStep = useLocalStore((store) => store.handleNextStep);
  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);
  return (
    <div className="flex h-[calc(100%-32px)] w-full flex-col justify-between">
      <div className="flex flex-col gap-y-[16px]">
        <h1 className="text-[32px] font-bold text-brand-black">محل زندگی</h1>
        <p className="text-sm font-medium leading-tight text-[#64748B]">
          با توجه به محل زندگی شما پیشنهادات بهتری دریافت خواهید کرد.
        </p>
        <div className="flex w-full flex-col items-center justify-center gap-3">
          {select && (
            <div className="flex h-[48px] w-full cursor-pointer items-center justify-start rounded-[12px] border-[1.5px] border-[#1a1d1e] bg-white p-2 text-base font-bold">
              {select}
            </div>
          )}
          <Dropdown
            menu={{
              items: iranProvinces
                .filter((e) => e.label.includes(search))
                .map((val) => ({
                  label: (
                    <div
                      onClick={() => {
                        setSelect(val.label);
                      }}
                      className="size-full border-b border-gray-200 p-2 font-semibold"
                    >
                      {val.label}
                    </div>
                  ),
                  key: val.key,
                })),
            }}
            trigger={["click"]}
            className="w-full"
            rootClassName="border-2 rounded-lg border-black"
          >
            <input
              onClick={(e) => e.preventDefault()}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex h-[48px] w-full cursor-pointer items-center justify-start rounded-[12px] border-[1.5px] border-[#1a1d1e] bg-white p-2 text-base font-bold"
              placeholder="استان محل زندگی خود را انتخاب کنید..."
            ></input>
          </Dropdown>
        </div>
      </div>
      <div className="mb-5 flex w-full items-center justify-between">
        <div className="flex min-w-fit items-center justify-between gap-x-[8px]">
          <SolarIconSet.LockKeyholeUnlocked size={24} />
          <p className="w-[200px] pl-[29px] text-xs font-medium leading-none text-[#1a1d1e]">
            شما میتوانید این بخش را در آینده تغییر دهید.
          </p>
        </div>
        <button
          disabled={!select}
          onClick={() => {
            updateUserInfo({ residenceCity: select });
            handleNextStep();
          }}
          className={`px-[20px] py-[16px] ${
            select ? "bg-[#ffcc4e]" : "bg-slate-100"
          } rounded-[12px] font-bold leading-none text-slate-400`}
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
