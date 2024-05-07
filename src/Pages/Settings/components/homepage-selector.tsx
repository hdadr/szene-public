import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const HomepageSelector = () => {
  const [homepage, setHomepage] = useLocalStorage("homepage", "/saints");

  const updateHomePage = (newHomepage: string) => {
    setHomepage((oldHomepage) => (newHomepage === "" ? oldHomepage : newHomepage));
  };

  return (
    <ToggleGroup
      className="flex flex-wrap"
      type="single"
      variant="outline"
      defaultValue={homepage}
      onValueChange={updateHomePage}>
      <ToggleGroupItem value="/masses">Misék</ToggleGroupItem>
      <ToggleGroupItem value="/saints">Szentek</ToggleGroupItem>
      <ToggleGroupItem value="/words">Ige</ToggleGroupItem>
    </ToggleGroup>
  );
};
