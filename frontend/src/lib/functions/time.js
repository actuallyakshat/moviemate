export function formatDateTimeFromSeconds(seconds) {
  const milliseconds = seconds * 1000;
  const dateObject = new Date(milliseconds);

  const day = dateObject.getDate();
  const month = dateObject.toLocaleString("en-US", { month: "long" });
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  const formattedDay =
    day +
    (day % 10 == 1 && day !== 11
      ? "st"
      : day % 10 == 2 && day !== 12
      ? "nd"
      : day % 10 == 3 && day !== 13
      ? "rd"
      : "th");
  const formattedTime = `${hours > 12 ? hours - 12 : hours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${hours >= 12 ? "pm" : "am"}`;
  const formattedDateTime = `${formattedDay} ${month}, ${formattedTime}`;

  return formattedDateTime;
}
