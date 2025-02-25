export const postedAt = (time) => {
  const date = time.split("T");
  const splitDate = date[0].split("-");

  let month;
  switch (Number(splitDate[1][1])) {
    case 1:
      month = "January";
      break;
    case 2:
      month = "February";
      break;
    case 3:
      month = "March";
      break;
    case 4:
      month = "April";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "June";
      break;
    case 7:
      month = "July";
      break;
    case 8:
      month = "August";
      break;
    case 9:
      month = "September";
      break;
    case 10:
      month = "October";
      break;
    case 11:
      month = "November";
      break;
    case 12:
      month = "December";
      break;
  }

  console.log(month);

  const arrangedDate = splitDate[2] + " " + month + " " + splitDate[0];

  const hourMinutes = date[1].slice(0, -8);
  return `Posted on ${arrangedDate} ${hourMinutes} GMT`;
};
