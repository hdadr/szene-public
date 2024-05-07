import { Psalm as PsalmType } from "@/models/Word";
import DOMPurify from "dompurify";

type Props = { psalm?: PsalmType };

export const Psalm = ({ psalm }: Props) => {
  const parts = psalm?.content.trim().split("\n") ?? [""];
  const answer = parts.shift() + "\n";
  const content = answer + parts.join("");
  const sanitizedContent = DOMPurify.sanitize(content);
  //TODO: format as the others, the answer part and the reference part padding bottom
  return (
    <>
      {psalm && (
        <div className="mt-4 p-4 flex flex-col w-full  rounded-2xl border border-gray-200  shadow">
          <h3 className=" font-semibold dark:text-purple-200 text-purple-700 pb-4">{psalm.title}</h3>
          <div className="whitespace-pre-line pb-8 ">
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
          </div>
        </div>
      )}
    </>
  );
};
