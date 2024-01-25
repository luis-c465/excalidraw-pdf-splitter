export function workerToPromise<TArg, TRet>(createWorker: { new (): Worker }) {
  const worker = new createWorker();

  return (arg: TArg) =>
    new Promise<TRet>((resolve, reject) => {
      worker.postMessage(arg);
      worker.onmessage = (e) => {
        resolve(e.data as TRet);
      };

      worker.onerror = (e) => {
        reject(e.error);
      };
    });
}
