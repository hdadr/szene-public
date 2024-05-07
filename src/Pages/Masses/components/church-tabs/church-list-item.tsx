import placeholderImage from "@/assets/churches/church_fallback.webp";
import { ImageWithPlaceholder } from "@/components/ImageWithPlaceholder";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Church } from "@/models/Church";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addChurchTo, removeChurchFrom, setScrollPosition, setSelectedChurch } from "@/store/slices/masses";
import { NavLink } from "react-router-dom";
import { NextMassesDisplay } from "../next-masses-display";
import { DropdownAction } from "./dropdown-action";

type Props = {
  church: Church;
  checked?: boolean;
  showCheckbox?: boolean;
  dropdownActions?: DropdownAction[];
};

export const ChurchListItem = ({ church, checked = false, showCheckbox, dropdownActions }: Props) => {
  const dispatch = useAppDispatch();
  const isMapOpen = useAppSelector((state: RootState) => state.masses.layout.map.open);

  return (
    <NavLink
      className={"w-full"}
      to={`church/${church.tid}`}
      onClick={() => {
        dispatch(setSelectedChurch(church));
        dispatch(addChurchTo({ place: "history", church }));
        dispatch(setScrollPosition(window.scrollY));
      }}
      unstable_viewTransition>
      {(isTransitioning) => {
        return (
          <div
            className={cn(
              "bg-white  border w-full content-center mt-4 rounded-2xl shadow-sm p-3 border-gray-200 grid grid-cols-5 grid-rows-1 gap-4",
              checked && "border-r-2 border-r-purple-400"
            )}>
            <div className="flex items-center ">
              <ImageWithPlaceholder
                style={{ viewTransitionName: isTransitioning && !isMapOpen ? `image-${church.tid}` : "" }}
                className="rounded-2xl z-10"
                placeholderSrc={placeholderImage}
                src={church.kep ?? ""}
                alt={church.nev ?? ""}
              />
            </div>

            <div className="col-span-4">
              <div className="flex items-center justify-between w-full font-semibold text-purple-600 pt-1">
                <span className="pb-1">{church.nev}</span>
                {dropdownActions && dropdownActions.length > 0 && (
                  <DropdownAction church={church} dropdownActions={dropdownActions} />
                )}
              </div>

              <div className="flex justify-between items-center text-muted-foreground text-xs [&>span]:mr-1 py-1  gap-y-1">
                <NextMassesDisplay church={church} />
                <div
                  className="px-1 pt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}>
                  {showCheckbox && (
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(checked) => {
                        checked
                          ? dispatch(addChurchTo({ place: "map", church }))
                          : dispatch(removeChurchFrom({ place: "map", church }));
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </NavLink>
  );
};
