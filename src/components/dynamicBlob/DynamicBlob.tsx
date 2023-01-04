import { useEffect } from "react";
import "./index.scss";

type DynamicBlobProps = {
  count: number;
};

const DynamicBlob = ({ count }: DynamicBlobProps) => {
  let selected: HTMLDivElement | null = null;
  const handleMousedown = (dom: HTMLDivElement) => {
    selected = dom;
  };

  useEffect(() => {
    const handleMouseup = () => {
      if (!selected) return;

      selected.style.animation = "bounceBack 1s ease";
      selected.style.animationFillMode = "forwards";

      const item = selected;
      selected = null;

      setTimeout(function () {
        item.style.animation = "";
        item.style.animationFillMode = "";
        item.style.left = "";
        item.style.top = "";
      }, 1000);
    };

    const handleMousemove = (e: MouseEvent) => {
      if (!selected) return;

      selected.style.left =
        e.clientX -
        selected.getBoundingClientRect().width / 2 -
        window.innerWidth / 2 +
        "px";
      selected.style.top =
        e.clientY -
        selected.getBoundingClientRect().height / 2 -
        window.innerHeight / 2 +
        "px";

      selected.style.animation = "";
    };

    window.addEventListener("mouseup", () => handleMouseup());
    window.addEventListener("mousemove", (e) => handleMousemove(e));

    return () => {
      window.removeEventListener("mouseup", () => handleMouseup());
      window.removeEventListener("mousemove", (e) => handleMousemove(e));
    };
  }, []);

  return (
    <>
      <div id="dynamic-blob" className="dynamic-blob">
        {[...new Array(count)].map((_, idx) => (
          <div
            id={idx.toString()}
            key={idx}
            onMouseDown={(e) => handleMousedown(e.target as HTMLDivElement)}
          />
        ))}
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default DynamicBlob;
