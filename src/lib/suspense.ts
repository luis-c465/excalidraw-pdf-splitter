type Status = "pending" | "success" | "error";

/**
 * Wraps a promise so it can be used with React Suspense
 * @param promise The promise to process
 * @returns A response object compatible with Suspense
 */
export function wrapPromise<R>(promise: Promise<R>) {
  let status: Status = "pending";
  let response: R;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const handler = {
    pending: () => {
      throw suspender;
    },
    error: () => {
      throw response;
    },
    default: () => response,
    success: () => null,
  };

  const read = () => {
    const result = handler[status] ? handler[status]() : handler.default();
    return result;
  };

  return { read };
}

export default wrapPromise;
