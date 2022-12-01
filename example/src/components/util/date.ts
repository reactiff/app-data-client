export function parse(date: string) {
  const d = new Date();
  const offsetMinutes = d.getTimezoneOffset();
  const minutes = offsetMinutes % 60;
  const hours = offsetMinutes / 60;
  const hh = hours.toString().padStart(2, '0');
  const mm = minutes.toString().padStart(2, '0');
  const adjustmentTime = `${hh}:${mm}`;
  const yyyymmdd = date.split('T')[0];
  const [yyyy, MM, dd] = yyyymmdd.split('-');
  const value = new Date(`${yyyy}-${MM}-${dd}T${adjustmentTime}:00.000`);
  return value;
}

export function isoToInt(isoDate: string) {
  const [yyyy, MM, dd] = isoDate.split('T')[0].split('-');
  return parseInt(`${yyyy}${MM}${dd}`, 10);
}

export default {
  parse,
  isoToInt,
};
