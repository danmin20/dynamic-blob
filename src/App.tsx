import "./App.scss";
import { useEffect } from "react";

const App = () => {
  let selected: HTMLDivElement | null = null;
  const handleMousedown = (dom: HTMLDivElement) => {
    console.log("handleMousedown");
    selected = dom;
  };

  useEffect(() => {
    const doms = document.getElementById("dynamic-blob")?.childNodes ?? [];

    doms.forEach((dom) => {
      dom.addEventListener("mousedown", () =>
        handleMousedown(dom as HTMLDivElement)
      );
    });

    return () => {
      const doms = document.getElementById("dynamic-blob")?.childNodes ?? [];
      doms.forEach((dom) => {
        dom.removeEventListener("mousedown", () =>
          handleMousedown(dom as HTMLDivElement)
        );
      });
    };
  }, []);

  useEffect(() => {
    const handleMouseup = () => {
      if (!selected) return;
      console.log(selected, "handleMouseup");
      selected.style.animation = "bounceBack 1s ease";
      selected.style.animationFillMode = "forwards";
      selected = null;
    };

    const handleMousemove = (e: MouseEvent) => {
      if (!selected) return;
      console.log(selected, "handleMousemove");
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
  }, [selected]);

  return (
    <div className="App">
      <div id="dynamic-blob" className="dynamic-blob">
        {[...new Array(15)].map((_, idx) => (
          <div id={idx.toString()} key={idx} />
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
    </div>
  );
};

export default App;
