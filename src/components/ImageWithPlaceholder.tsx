import placeholderImage from "@/assets/churches/church_fallback.webp";
import { CSSProperties, useState } from "react";

type Props = {
  src: string;
  placeholderSrc?: string;
  alt: string;
  className: string;
  style?: CSSProperties;
};

export const ImageWithPlaceholder = ({ src, placeholderSrc = placeholderImage, alt, className, style }: Props) => {
  const [imageSrc, setImageSrc] = useState(src);

  const handleImageError = () => {
    setImageSrc(placeholderSrc ?? placeholderImage);
  };

  return <img onError={handleImageError} className={className} style={style} src={imageSrc} alt={alt} />;
};
