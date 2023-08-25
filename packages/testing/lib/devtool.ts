export function devTools() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((import.meta as any).env.DEV && typeof window !== "undefined") {
    // 3秒内点击屏幕5下
    let timer: NodeJS.Timeout;
    let n = 0;
    let url = "http://";
    window.addEventListener("touchend", (e) => {
      if (e.touches.length != 1) {
        return;
      }
      n += 1;
      if (n > 3) {
        url = prompt(`当前:${location.href}`, url) || "";
        if (url == "http://log") {
          const js = document.createElement("script");
          js.src = "https://unpkg.com/vconsole@latest/dist/vconsole.min.js";
          js.onload = () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            new (window as any).VConsole();
          };
          document.head.append(js);
        } else if (url !== "http://") {
          location.href = url;
        }
      }
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        n = 0;
      }, 2000);
    });
  }
}

devTools();
