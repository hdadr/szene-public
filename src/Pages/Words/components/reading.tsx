import { Gospel, Reading as ReadingType } from "@/models/Word";

type Props = { reading?: ReadingType | Gospel };

export const Reading = ({ reading }: Props) => {
  return (
    <>
      {reading && (
        <div className="mt-4 p-4 flex flex-col w-full  rounded-2xl border border-gray-200  shadow">
          <h3 className=" font-semibold dark:text-purple-200 text-purple-700 pb-4">{reading.title}</h3>
          <div className="whitespace-pre-line pb-8 ">
            <div className="italic pb-2">{reading.shortMessage}</div>
            <div>{reading.text}</div>
            <div className="font-medium pt-2">{reading.reference}</div>
          </div>
        </div>
      )}
    </>
  );
};
