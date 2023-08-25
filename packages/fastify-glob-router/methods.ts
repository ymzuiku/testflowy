interface Methods {
  GET?: boolean;
  PUT?: boolean;
  POST?: boolean;
  PATCH?: boolean;
  DELETE?: boolean;
}

export function methods<F>(fn: F): F & Methods {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return fn as any;
}
