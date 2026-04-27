import { useState } from "react";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
};

export default function ImageWithLoader({
  src,
  alt = "",
  onClick
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`image-wrapper ${loaded ? "loaded" : ""}`}>
      {!loaded && <div className="image-loader" />}

      <img
        src={src}
        alt={alt}
        onClick={onClick}
        onLoad={() => setLoaded(true)}
        className={loaded ? "loaded" : "hidden"}
      />
    </div>
  );
}