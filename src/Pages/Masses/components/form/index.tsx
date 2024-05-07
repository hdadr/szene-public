import { fetchChurchesByCity } from "@/Pages/Masses/data/data-fetcher";
import { Button } from "@/components/ui/button";
import LoadingIndicator from "@/components/ui/loading-indicator";
import useLocalJsonData from "@/hooks/useLocalJsonData";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetForm, setActiveTab, setForm, setLoading, setSearchResult } from "@/store/slices/masses";
import { Church as ChurchIcon, MapPinned, RotateCcw, Search } from "lucide-react";
import { FormEvent } from "react";
import { AutoComplete } from "./components/autocomplete";
import { DateSelector } from "./components/date-selector";
import { FilterState, MoreFilters } from "./components/more-filters";

export const SearchForm = () => {
  const cities = useLocalJsonData<string[]>("/masses/cities.json") as string[];
  const churchNames = useLocalJsonData<string[]>("/masses/churchNames.json") as string[];
  const { loading, form } = useAppSelector((state: RootState) => state.masses);
  const dispatch = useAppDispatch();

  //TODO: use more filters for search
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.city === "") return;

    dispatch(setLoading(true));

    try {
      dispatch(setActiveTab("search-result"));
      const churches = await fetchChurchesByCity(form.city);
      //TODO: filter by date local? const churchesFilteredByDate = churches.filter()
      dispatch(setSearchResult(churches));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleMoreFiltersChange = (filterState: FilterState) => {
    dispatch(
      setForm({
        form: {
          ...form,
          musicTypes: filterState.musicTypes,
          ageGroups: filterState.ageGroups,
          greekCatholicMass: filterState.greekCatholicMass,
          includeIgeliturgia: filterState.includeIgeliturgia,
          languages: filterState.languages,
        },
      })
    );
  };

  return (
    <form className="w-full flex flex-col" onSubmit={handleSubmit}>
      <AutoComplete
        enableHistroy
        name="cities"
        className="mb-4"
        value={form.city}
        onValueChange={(newValue) => dispatch(setForm({ form: { ...form, city: newValue } }))}
        placeholder="Város"
        heading="Városok"
        icon={<MapPinned size={28} strokeWidth={1.4} />}
        emptyMessage=""
        options={cities ?? []}
      />

      <AutoComplete
        name="churchNames"
        enableHistroy
        className="mb-4"
        value={form.churchName}
        onValueChange={(newValue) => dispatch(setForm({ form: { ...form, churchName: newValue } }))}
        placeholder="Templom neve"
        heading="Templom nevek"
        icon={<ChurchIcon size={28} strokeWidth={1.4} />}
        emptyMessage="Nincs találat"
        options={churchNames ?? []}
      />

      <DateSelector
        value={form.date ? new Date(form.date) : undefined}
        onValueChage={(newDate) =>
          dispatch(setForm({ form: { ...form, date: newDate ? newDate.toISOString() : undefined } }))
        }
      />

      <div className=" mb-4 self-end">
        <MoreFilters
          musicTypes={form.musicTypes}
          ageGroups={form.ageGroups}
          greekCatholicMass={form.greekCatholicMass}
          includeIgeliturgia={form.includeIgeliturgia}
          languages={form.languages}
          onValueChange={handleMoreFiltersChange}
        />
      </div>

      <div className="flex justify-center w-full">
        <Button
          variant={"secondary"}
          type="reset"
          onClick={() => dispatch(resetForm())}
          className="rounded-2xl mr-4 opacity-100 focus:bg-slate-100 focus:opacity-100">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button type="submit" className="rounded-2xl opacity-95 focus:opacity-95 focus:bg-slate-900">
          {loading ? <LoadingIndicator className="h-4 w-4 text-white" /> : <Search className="h-4 w-4" />}
          <span className="ml-2">Keresés</span>
        </Button>
      </div>
    </form>
  );
};
