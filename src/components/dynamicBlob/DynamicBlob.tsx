import { MouseEventHandler, TouchEventHandler, useEffect } from "react";
import "./index.scss";

type DynamicBlobProps = {
  count: number;
};

const DynamicBlob = ({ count }: DynamicBlobProps) => {
  let selected: HTMLDivElement | null = null;

  const handleStart = (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>
  ) => {
    selected = e.target as HTMLDivElement;
  };

  const handleEnd = () => {
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

  const handleMousemove = (
    eType: "mouse" | "touch",
    e: MouseEvent | TouchEvent
  ) => {
    if (!selected) return;

    const eventTarget =
      eType === "mouse" ? (e as MouseEvent) : (e as TouchEvent).touches[0];

    selected.style.left =
      eventTarget.clientX -
      selected.getBoundingClientRect().width / 2 -
      window.innerWidth / 2 +
      "px";

    selected.style.top =
      eventTarget.clientY -
      selected.getBoundingClientRect().height / 2 -
      window.innerHeight / 2 +
      "px";

    selected.style.animation = "0";
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchend", handleEnd);

    window.addEventListener("mousemove", (e) => handleMousemove("mouse", e));
    window.addEventListener("touchmove", (e) => handleMousemove("touch", e));

    return () => {
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchend", handleEnd);

      window.removeEventListener("mousemove", (e) =>
        handleMousemove("mouse", e)
      );
      window.removeEventListener("touchmove", (e) =>
        handleMousemove("touch", e)
      );
    };
  }, []);

  return (
    <>
      <div id="dynamic-blob" className="dynamic-blob">
        {[...new Array(count)].map((_, idx) => (
          <div
            id={idx.toString()}
            key={idx}
            onMouseDown={handleStart}
            onTouchStart={handleStart}
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
