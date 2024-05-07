import { Link2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

type Props = {
  link: string;
  text: string;
  className?: string;
};

export const ReferenceLink = ({ link, text, className }: Props) => {
  return (
    <Link className={className} target="_blank" rel="noreferrer" to={link} onClick={(e) => e.stopPropagation()}>
      <Button
        className="flex bg-white border shadow-sm rounded-2xl items-start justify-center mt-4 justify-self-end dark:text-purple-200 text-purple-800"
        variant="link">
        <Link2 className="mr-1" /> <span className="mr-1">{text}</span>
      </Button>
    </Link>
  );
};
