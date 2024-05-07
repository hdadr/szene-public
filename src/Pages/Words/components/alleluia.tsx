import { Alleluia as AlleluiaType } from "@/models/Word";

type Props = { alleluia?: AlleluiaType };

export const Alleluia = ({ alleluia }: Props) => {
  //TODO: separate reference and make it bold
  return (
    <>
      {alleluia && (
        <div className="mt-4 p-4 flex flex-col w-full  rounded-2xl border border-gray-200  shadow">
          <h3 className=" font-semibold dark:text-purple-200 text-purple-700 pb-4">{alleluia.title}</h3>

          <p className="whitespace-pre-line pb-8 ">{alleluia.text}</p>
        </div>
      )}
    </>
  );
};
