export interface CreateListOptions {
  onTop?: (ele: HTMLElement) => void;
  onBottom?: (ele: HTMLElement) => void;
  onScroll?: (ele: HTMLElement) => void;
  offset?: number;
}

export const createScroll = (p: CreateListOptions) => {
  let onBottomTimer: NodeJS.Timer | null;
  let onTopTimer: NodeJS.Timer | null;

  const onscroll = (e: { currentTarget: HTMLElement }) => {
    const ele = e.currentTarget;
    const offset = p.offset || 5;
    if (p.onScroll) {
      p.onScroll(ele);
    }
    if (p.onTop && ele.scrollTop === 0) {
      if (onTopTimer) {
        clearTimeout(onTopTimer);
        onTopTimer = null;
      }
      onTopTimer = setTimeout(() => {
        p.onTop!(ele);
      }, 17);
      return;
    }
    if (p.onBottom && ele.scrollTop + ele.clientHeight + offset >= ele.scrollHeight) {
      if (onBottomTimer) {
        clearTimeout(onBottomTimer);
        onBottomTimer = null;
      }
      onBottomTimer = setTimeout(() => {
        p.onBottom!(ele);
      }, 17);
      return;
    }
  };
  return {
    onscroll,
  };
};
