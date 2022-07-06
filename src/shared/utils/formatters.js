export function formatTime (time, opt_format = '%h:%mm:%ss') {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - (hours * 3600)) / 60);
  const seconds = Math.floor(time - (hours * 3600) - (minutes * 60));

  const pad = (str, max) => str.length < max ? pad('0' + str, max) : str;
  const replacer = (value) => (_, group) => pad(value, group.length - 1);

  return opt_format
    .replace(/(%h+)/, replacer('' + hours))
    .replace(/(%m+)/, replacer('' + minutes))
    .replace(/(%s+)/, replacer('' + seconds));
}
