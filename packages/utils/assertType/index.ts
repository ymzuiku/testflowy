export function assertType(condition: unknown, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg || "assertType is error");
  }
}

export function assertIsError(err: unknown): asserts err is Error {
  if (!(err instanceof Error)) {
    throw err;
  }
}

export function assertIsString(val: unknown): asserts val is string {
  if (!(typeof val === "string")) {
    throw val;
  }
}

export function assertIsNumber(val: unknown): asserts val is number {
  if (!(typeof val === "number")) {
    throw val;
  }
}

export function assertIsBoolean(val: unknown): asserts val is boolean {
  if (!(typeof val === "boolean")) {
    throw val;
  }
}

export function assertIsArray<T>(val: unknown): asserts val is Array<T> {
  if (!Array.isArray(val)) {
    throw val;
  }
}

export function assertIsObject<T>(val: unknown): asserts val is NonNullable<T> {
  if (Object.prototype.toString.call(val) === "[object Object]") {
    throw val;
  }
}
