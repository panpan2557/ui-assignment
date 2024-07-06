export const formatSecondsToMinutes = (second: number) => {
  const m = Math.floor(second / 60)
      .toString()
      .padStart(2, "0"),
    s = Math.floor(second % 60)
      .toString()
      .padStart(2, "0");
  return m + ":" + s;
};

export const replaceAt = <T>(array: Array<T>, index: number, value: T) => {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
};
