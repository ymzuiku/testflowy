export interface INanoStorage<T> {
  defaultValues: T;
  set: (obj: Partial<T>) => void;
  assign: (obj: Partial<T>) => void;
  clear: () => void;
  val: T;
}

export interface NanoStorageOptions {
  storage: "localStorage" | "sessionStorage" | "memory";
  iframe?: string;
  // includeSite?: string;
}

// const SOURCE = "nano_storage_source";
export function NanoStorage<T>(key: string, init: T, { storage, iframe }: NanoStorageOptions): INanoStorage<T> {
  if (typeof init !== "object") {
    throw "NanoDb: init need a object";
  }
  if (iframe) {
    const box = document.createElement("iframe");
    box.src = iframe;
    Object.assign(box.style, {
      position: "fixed",
      left: "-500px",
      top: "-500px",
      width: "1px",
      height: "1px",
      overflow: "hidden",
    });
    document.body.appendChild(box);
  }

  const db = {
    val: JSON.parse(JSON.stringify(init)),
    defaultValues: JSON.parse(JSON.stringify(init)),
    set: (obj: T) => {
      db.val = obj;
      if (storage !== "memory") {
        if (iframe) {
          //
        } else {
          window[storage].setItem(key, JSON.stringify(db.val));
        }
      }
    },
    assign: (obj: T) => {
      Object.assign(db.val, obj);
      if (storage !== "memory") {
        if (iframe) {
          //
        } else {
          window[storage].setItem(key, JSON.stringify(db.val));
        }
      }
    },
    clear: () => {
      db.set({ ...db.defaultValues });
    },
  };

  if (storage !== "memory") {
    let old;
    if (iframe) {
      //
    } else {
      old = window[storage].getItem(key);
    }
    if (old) {
      try {
        const obj = JSON.parse(old);
        db.assign(obj);
      } catch (err) {
        console.error(err);
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return db as any;
}

// 在一个空的 html 页面执行此方法, 注册某个 localstorage key 和限定某些外部url可以操作该key
const NanoStorageIframe = (key: string, include: string) => {
  // 如果 include 不属于这个范围, 那么停止消息
  if (include !== "*" && location.href.indexOf(include) === -1) {
    return;
  }
};

// eslint-disable-next-line
(window as any).NanoStorageIframe = NanoStorageIframe;
