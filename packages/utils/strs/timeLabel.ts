import dayjs from "dayjs";

export function timeLabelDay(time?: string) {
  return dayjs(time || void 0)
    .format("YYYY-MM-DD")
    .toString();
}

export function timeLabel(time?: string) {
  return dayjs(time || void 0)
    .format("YYYY-MM-DD HH:mm")
    .toString();
}

export function timeLabelFull(time?: string) {
  return dayjs(time || void 0)
    .format("YYYY-MM-DD HH:mm:ss")
    .toString();
}
