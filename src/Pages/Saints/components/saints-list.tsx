import { blinkVariant } from "@/lib/framerProps";
import { Saint } from "@/models/Saint";
import { SaintListItem } from "@/Pages/Saints/components/saint-list-item";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedSaint } from "@/store/slices/saints";
import { motion } from "framer-motion";

export const SaintsList = ({ saints, date }: { saints: Saint[]; date: Date }) => {
  const dispatch = useAppDispatch();
  const seenSaintsIDs = useAppSelector((state: RootState) => state.saints.seenSaintsIDs);

  return (
    <ul>
      {saints.length === 0 ? (
        <motion.li variants={blinkVariant} initial="hidden" animate="show" exit="hidden">
          <div className="flex justify-center rounded-2xl items-center h-[100px] w-full min-w-[340px] border bg-card text-card-foreground shadow">
            <p className="font-medium leading-none tracking-tight text-black/80">A mai napra nincs találat.</p>
          </div>
        </motion.li>
      ) : (
        saints.map((saint) => (
          <motion.li
            variants={blinkVariant}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="pb-4 w-full min-w-[340px]"
            key={saint.name}
            onClick={() => dispatch(setSelectedSaint({ saint, datetime: date.getTime() }))}>
            <SaintListItem saint={saint} seen={seenSaintsIDs.includes(saint.id)} />
          </motion.li>
        ))
      )}
    </ul>
  );
};
