import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Moon, Sun } from "lucide-react";
import { Theme, useTheme } from "../../../components/theme-provider";

const themes = {
  dark: "Sötét",
  light: "Világos",
  system: "Eszköz alapértelmezett",
};

export function ThemeSelector() {
  const { setTheme, theme } = useTheme();

  return (
    <Select onValueChange={(value: Theme) => setTheme(value)} defaultValue="light">
      <SelectTrigger className="w-auto px-6">
        <SelectValue className="rounded-2xl" placeholder={themes[theme]} />
      </SelectTrigger>
      <SelectContent className="rounded-2xl">
        <SelectItem className="data-[state=checked]:bg-purple-50 data-[state=checked]:rounded-2xl" value="light">
          <span className="flex items-center">
            <Sun className="pr-2" size={24} strokeWidth={1} />
            Világos
          </span>
        </SelectItem>
        <SelectItem disabled value="dark">
          <span className="flex items-center">
            <Moon className="pr-2" size={24} strokeWidth={1} />
            Sötét, hamarosan
          </span>
        </SelectItem>
        {/* <SelectItem value="system">Eszköz alapértelmezett</SelectItem> */}
      </SelectContent>
    </Select>
  );
}
