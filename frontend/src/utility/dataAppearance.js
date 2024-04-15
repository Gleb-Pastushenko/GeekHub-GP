// Get datetime string in ISO format and return string "dd.mm.yyyy  hh:mm"
export const dtFormat = (datetime, out = 'as_str') => {
  const dt = new Date(datetime);

  const dd = `${dt.getDate()}`.padStart(2, '0');
  const MM = `${dt.getMonth() + 1}`.padStart(2, '0');
  const yyyy = `${dt.getFullYear()}`;

  const hh = `${dt.getHours()}`.padStart(2, '0');
  const mm = `${dt.getMinutes()}`.padStart(2, '0');

  const result = {
    as_str: `${dd}.${MM}.${yyyy}  ${hh}:${mm}`,
    as_obj: { dd, MM, yyyy, hh, mm },
    as_dt: dt,
  }

  return (out in result ? result[out] : result.as_str);
}
