/* eslint-disable @typescript-eslint/no-explicit-any */
export const zodErr = (err: Error): Error & { path?: string } => {
  if (err && (err as any).issues) {
    const issue = (err as any).issues[0];
    const message = issue.message;
    const e = Error(message, { cause: err });
    if (issue.path) {
      const path = issue.path[0];
      (e as any).path = path;
    } else {
      (e as any).path = ["unknow"];
    }

    return e;
  }
  return err;
};
