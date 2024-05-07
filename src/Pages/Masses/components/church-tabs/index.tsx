import { ChurchListItem } from "@/Pages/Masses/components/church-tabs/church-list-item";
import LoadingIndicator from "@/components/ui/loading-indicator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Church } from "@/models/Church";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addChurchTo,
  removeChurchFrom,
  setActiveTab,
  setSearchFormVisible,
  unselectChurchesForMap,
} from "@/store/slices/masses";
import { selectAreChurchesSelectedForMap } from "@/store/slices/masses/selectors";
import { Tab } from "@/store/slices/masses/types";
import { AnimatePresence, motion } from "framer-motion";
import groupBy from "lodash.groupby";
import { BookmarkMinus, BookmarkPlus, ChevronUp, MousePointerSquare, Trash2, XSquare } from "lucide-react";
import { useEffect } from "react";

export function ChurchTabs() {
  const dispatch = useAppDispatch();
  const { activeTab, searchFormVisible } = useAppSelector((state: RootState) => state.masses.layout);
  const selectedChurchesForMap = useAppSelector((state: RootState) => state.masses.selectedChurchesForMap);
  const { searchResultChurches, churchHistory, bookmarkedChurches, loading } = useAppSelector(
    (state: RootState) => state.masses
  );
  const areChurchesSelectedForMap = useAppSelector(selectAreChurchesSelectedForMap);

  const groupChurches = (churches: Church[]) => Object.entries(groupBy(churches, "varos"));

  useEffect(() => {
    const shouldUpdateActiveTab =
      (activeTab === "church-history" && churchHistory.length === 0) ||
      (activeTab === "bookmarked-churches" && bookmarkedChurches.length === 0);

    if (shouldUpdateActiveTab) {
      dispatch(setActiveTab("search-result"));
    }
  }, [activeTab, churchHistory.length, bookmarkedChurches.length, dispatch]);

  const dropdownActions = {
    addToBookmark: {
      icon: <BookmarkPlus size={16} className="text-muted-foreground mr-2" />,
      label: "Mentés",
      action: (church: Church) => dispatch(addChurchTo({ place: "bookmark", church })),
    },
    removeFromBookmark: {
      icon: <BookmarkMinus size={16} className="text-muted-foreground mr-2" />,
      label: "Eltávolítás a mentettek közül",
      action: (church: Church) => dispatch(removeChurchFrom({ place: "bookmark", church })),
    },
    removeFromHistory: {
      icon: <Trash2 size={16} className="text-muted-foreground mr-2" />,
      label: "Törlés az előzményekből",
      action: (church: Church) => dispatch(removeChurchFrom({ place: "history", church })),
    },
    selectForMap: {
      icon: <MousePointerSquare size={16} className="text-muted-foreground mr-2" />,
      label: "Hozzáadás térképhez",
      action: (church: Church) => dispatch(addChurchTo({ place: "map", church })),
    },
    unselectForMap: {
      icon: <XSquare size={16} className="text-muted-foreground mr-2" />,
      label: "Levétel térképről",
      action: (church: Church) => dispatch(removeChurchFrom({ place: "map", church })),
    },
  };

  const bookmarkedChurchDropdownAction = (church: Church) => {
    const bookmarkedChurch = bookmarkedChurches.some((c) => c.tid === church.tid);
    return bookmarkedChurch ? dropdownActions.removeFromBookmark : dropdownActions.addToBookmark;
  };

  return (
    <>
      <span className="-mb-6 mt-2">
        <ChevronUp
          className={`${
            searchFormVisible ? "" : "rotate-180"
          } ${"text-purple-600"} transform transition duration-380 ease-in-out `}
          size={32}
          onClick={() => {
            dispatch(setSearchFormVisible(!searchFormVisible));
          }}
        />
      </span>
      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={(tab) => dispatch(setActiveTab(tab as Tab))}
        className="m-3 p-1 pt-3 w-[95%]   bg-white rounded-2xl  min-h-96">
        <TabsList className="w-full bg-white">
          <TabsTrigger value="search-result">Találatok</TabsTrigger>
          <TabsTrigger disabled={bookmarkedChurches.length === 0} value="bookmarked-churches">
            Elmentett
          </TabsTrigger>
          <TabsTrigger disabled={churchHistory.length === 0} value="church-history">
            Előzmények
          </TabsTrigger>
        </TabsList>

        <div className="flex w-full justify-end h-5">
          <AnimatePresence>
            {areChurchesSelectedForMap && (
              <motion.div
                initial={{ scale: "0" }}
                animate={{ scale: "100%" }}
                transition={{ duration: 0.32, ease: "easeInOut" }}
                exit={{ scale: "0" }}
                onClick={() => dispatch(unselectChurchesForMap())}>
                <XSquare strokeWidth={1.4} className="w-[18px] mr-4 text-purple-600" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <TabsContent value="search-result" className="flex flex-col mb-3 -mt-1  w-full items-center pt-[-16px]">
          {loading ? (
            <div className="mt-4">
              <LoadingIndicator />
            </div>
          ) : (
            groupChurches(searchResultChurches).map((cityGroup) => {
              return (
                <div className="my-3" key={cityGroup[0]}>
                  <div className="self-start text-sm  text-muted-foreground">{cityGroup[0]}</div>
                  {cityGroup[1].map((church) => {
                    const checked = selectedChurchesForMap.includes(church);
                    return (
                      <ChurchListItem
                        key={church.tid}
                        church={church}
                        checked={checked}
                        showCheckbox={selectedChurchesForMap.length > 0}
                        dropdownActions={[
                          bookmarkedChurchDropdownAction(church),
                          ...(!checked ? [dropdownActions.selectForMap] : [dropdownActions.unselectForMap]),
                        ]}
                      />
                    );
                  })}
                </div>
              );
            })
          )}
        </TabsContent>

        <TabsContent value="bookmarked-churches" className="flex flex-col -mt-3  w-full items-center pt-[-16px]">
          {groupChurches(bookmarkedChurches).map((cityGroup) => {
            return (
              <div className="my-3" key={cityGroup[0]}>
                <div className="self-start text-sm  text-muted-foreground">{cityGroup[0]}</div>
                {cityGroup[1].map((church) => {
                  const checked = selectedChurchesForMap.includes(church);
                  return (
                    <ChurchListItem
                      key={church.tid}
                      church={church}
                      checked={checked}
                      showCheckbox={selectedChurchesForMap.length > 0}
                      dropdownActions={[
                        dropdownActions.removeFromBookmark,
                        ...(!checked ? [dropdownActions.selectForMap] : [dropdownActions.unselectForMap]),
                      ]}
                    />
                  );
                })}
              </div>
            );
          })}
        </TabsContent>

        <TabsContent value="church-history" className="flex flex-col mt-0 w-full items-center pt-[-16px]">
          {groupChurches(churchHistory).map((cityGroup) => {
            return (
              <div className="my-3" key={cityGroup[0]}>
                <div className="self-start text-sm  text-muted-foreground">{cityGroup[0]}</div>
                {cityGroup[1].map((church) => {
                  const checked = selectedChurchesForMap.includes(church);
                  return (
                    <ChurchListItem
                      key={church.tid}
                      church={church}
                      checked={checked}
                      showCheckbox={selectedChurchesForMap.length > 0}
                      dropdownActions={[
                        dropdownActions.removeFromHistory,
                        ...(!checked ? [dropdownActions.selectForMap] : [dropdownActions.unselectForMap]),
                      ]}
                    />
                  );
                })}
              </div>
            );
          })}
        </TabsContent>
      </Tabs>
    </>
  );
}
