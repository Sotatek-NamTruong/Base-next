export function retryCallPromise(
  Function: any,
  condition: (e: any) => boolean,
  maxRetries: number,
  delay: number
) {
  let retries = 0;
  return new Promise((resolve, reject) => {
    async function onCall() {
      const data = await Function();
      if (condition(data)) {
        resolve(data);
      } else {
        if (retries < maxRetries) {
          retries++;
          setTimeout(onCall, delay);
        } else {
          reject(data);
        }
      }
    }
    onCall();
  });
}

export const isValidArray = (data: any): boolean => {
  return Array.isArray(data) && data.length > 0;
};

export const getBaseURLFromIPFS = (url: any) => {
  if (!url) return "";
  if (url.includes("ipfs://ipfs/")) {
    const ipfsIndex = url.indexOf("//ipfs/");
    const urlHash = url.substring(ipfsIndex + 7);
    return `https://ipfs.io/ipfs/${urlHash}`;
  }
  if (url.includes("ipfs://")) {
    const ipfsIndex = url.indexOf("//");
    const urlHash = url.substring(ipfsIndex + 2);
    return `https://ipfs.io/ipfs/${urlHash}`;
  }
  return url;
};

export const openTransitionHash = (txh: string) => {
  return window
    .open(
      `${process.env.NEXT_PUBLIC_POLYGON_SCAN_BASE_URL}/tx/${txh}`,
      "_blank"
    )
    ?.focus();
};
