import { Ele, For } from "https://cdn.skypack.dev/esframe";

let sourceNode;

const list = For("div", {
  each: 5,
  className: "list",
  ref: (ele) => {
    ele.ondragover = (e) => {
      e.preventDefault();
    };
    ele.ondragstart = (e) => {
      setTimeout(() => {
        e.target.classList.add("moving");
      });
      e.dataTransfer.effectAllowed = "move";
      sourceNode = e.target;
    };
    ele.ondragenter = (e) => {
      e.preventDefault();
      if (e.target === list || e.target === sourceNode) {
        return;
      }
      const children = Array.from(list.children);
      const sourceIndex = children.indexOf(sourceNode);
      const targetIndex = children.indexOf(e.target);
      if (sourceIndex < targetIndex) {
        list.insertBefore(sourceNode, e.target.nextElementSibling);
      } else {
        list.insertBefore(sourceNode, e.target);
      }
    };
    ele.ondragend = (e) => {
      e.target.classList.remove("moving");
    };
  },
  render: (i) => {
    return Ele("div", {
      draggable: true,
      className: "list-item",
      textContent: i,
    });
  },
});

// const temp = document.createElement("div")

const app = Ele("div", {
  style: {
    cssText: "padding: 20px",
  },
  append: [
    Ele("h1", { textContent: "Example glove" }),
    Ele("h2", { textContent: "Drag use mouse", style: { cssText: "margin-top:20px" } }),
    Ele("div", {
      ref: (ele) => {
        let down = false;
        let rect;
        ele.addEventListener("mousedown", () => {
          down = true;
          rect = ele.getBoundingClientRect();
        });

        ele.addEventListener("mousemove", (e) => {
          if (!down) {
            return;
          }
          const x = e.x - rect.x - rect.width / 2;
          const y = e.y - rect.y - rect.height / 2;
          ele.style.transform = `translate(${x}px, ${y}px)`;
        });

        ele.addEventListener("mouseup", () => {
          down = false;
        });

        ele.addEventListener("mouseleave", () => {
          down = false;
        });
      },
      className: "list-item",
      textContent: "mouse drag",
    }),
    Ele("h2", { textContent: "Drag use touch", style: { cssText: "margin-top:20px" } }),
    Ele("div", {
      ref: (ele) => {
        let down = false;
        let rect;
        // document.createElement("div").addEventListener("touchcancel", () => {});
        ele.addEventListener("touchstart", () => {
          down = true;
          rect = ele.getBoundingClientRect();
        });

        ele.addEventListener("touchmove", (e) => {
          if (!down) {
            return;
          }
          const x = e.touches[0].clientX - rect.x - rect.width / 2;
          const y = e.touches[0].clientY - rect.y - rect.height / 2;
          ele.style.transform = `translate(${x}px, ${y}px)`;
        });

        ele.addEventListener("touchend", () => {
          down = false;
        });

        ele.addEventListener("touchcancel", () => {
          down = false;
        });
      },
      className: "list-item",
      textContent: "touch drag",
    }),
    Ele("h2", { textContent: "Drag use pointer", style: { cssText: "margin-top:20px" } }),
    Ele("div", {
      ref: (ele) => {
        let down = false;
        let rect;
        ele.addEventListener("pointerdown", () => {
          down = true;
          rect = ele.getBoundingClientRect();
        });

        ele.addEventListener("pointermove", (e) => {
          if (!down) {
            return;
          }
          const x = e.x - rect.x - rect.width / 2;
          const y = e.y - rect.y - rect.height / 2;
          ele.style.transform = `translate(${x}px, ${y}px)`;
        });
        ele.addEventListener("pointerup", () => {
          down = false;
        });

        ele.addEventListener("pointerleave", () => {
          down = false;
        });
      },
      className: "list-item",
      textContent: "pointer drag",
    }),
    Ele("h2", { textContent: "Drag list", style: { cssText: "margin-top:20px" } }),
    list,
    Ele("div", {
      append: [
        Ele("h2", { textContent: "Drag range", style: { cssText: "margin-top:20px" } }),
        Ele("h3", { textContent: "Free range", style: { cssText: "margin-top:20px" } }),
        Ele("label", {
          for: "customRange1",
          className: "form-label",
        }),
        Ele("input", {
          type: "range",
          className: "form-range",
          id: "customRange1",
        }),
        Ele("h3", { textContent: "Step range", style: { cssText: "margin-top:20px" } }),
        Ele("label", {
          for: "customRange2",
          className: "form-label",
        }),
        Ele("input", {
          type: "range",
          className: "form-range",
          min: "0",
          max: "5",
          id: "customRange2",
        }),
        Ele("h2", { textContent: "touch", style: { cssText: "margin-top:20px" } }),
        Ele("div", {
          innerHTML: `<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
  <label class="form-check-label" for="inlineCheckbox1">1</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
  <label class="form-check-label" for="inlineCheckbox2">2</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" disabled>
  <label class="form-check-label" for="inlineCheckbox3">3 (disabled)</label>
</div>`,
        }),
      ],
    }),
  ],
});

document.body.append(app);
