export function addUrlParams(key: string, value: string | number, type: "location" | "pushState" = "pushState") {
  let url = type === "location" ? location.href : location.hash;
  if (!url.includes("?")) {
    url = `${url}?${key}=${value}`;
  } else {
    if (!url.includes(key)) {
      url = `${url}&${key}=${value}`;
    } else {
      const re = `(\\?|&|\\#)${key}([^&|^#]*)(&|$|#)`;
      url = url.replace(new RegExp(re), "$1" + key + "=" + value + "$3");
    }
  }

  if (type === "location") {
    location.href = url;
  }

  if (type === "pushState") {
    history.pushState({}, "", url);
  }
}

export function getUrlParam(key: string, type: "location" | "pushState" = "pushState") {
  const url = type === "location" ? location.href : location.hash;
  const searchs = url.split("?");
  const usp = new URLSearchParams(searchs[1] || searchs[0]);
  return usp.get(key) || "";
}
