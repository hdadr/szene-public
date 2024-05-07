import React from "react";

export const Prayer = ({ prayer }: { prayer?: string }) => {
  const [title, ...body] = prayer ? prayer.split("\n") : "";
  return (
    <>
      {body.length > 0 ? (
        <div className="mt-4 p-4 flex flex-col w-full  rounded-2xl border border-gray-200  shadow">
          <h3 className=" font-semibold dark:text-purple-200 text-purple-700 pb-4">{title}</h3>

          <p className="whitespace-pre-line pb-8 ">
            {body?.map((line: string, index: number) => {
              if (line.length < 1) return;
              return (
                <React.Fragment key={index}>
                  {line} <br />
                </React.Fragment>
              );
            })}
          </p>
        </div>
      ) : null}
    </>
  );
};
