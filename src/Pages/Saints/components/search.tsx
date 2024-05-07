import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ExpandableInput = ({ toggle }: { toggle: () => void }) => {
  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (expanded && inputRef.current && inputValue) {
      toggle()
    } else {
      setExpanded((prevExpanded) => !prevExpanded);
      toggle()
    }
  };

  const handleAnimationComplete = () => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    if (!inputValue && expanded) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    if (!expanded && inputRef.current) {
      inputRef.current.blur();
    }
  }, [expanded]);

  return (
    <div className="relative flex items-center">
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="input"
            initial={{ width: 0, opacity: 0, marginRight: 0 }}
            animate={{ width: "230px", opacity: 1, marginRight: "-34px" }}
            exit={{ width: 0, opacity: 0, marginRight: 0 }}
            onAnimationComplete={handleAnimationComplete}>
            <Input
              ref={inputRef}
              className={cn("rounded-full", !inputValue && "border-0")}
              placeholder="A szent neve..."
              onBlur={handleBlur}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Button className="flex items-center justify-center p-2 rounded-full" onClick={handleButtonClick}>
        <SearchIcon size={20} />
      </Button>
    </div>
  );
};

export default ExpandableInput;
