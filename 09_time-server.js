const net = require("node:net");

// main
const PORT = process.argv[2];

net
  .createServer((socket) => {
    const timeMapper = createTimeMapper();
    const timeService = createTimeService();

    const timeDTO = timeService.getTimeFrom(new Date());
    const mappedTimeValues = timeMapper.toDomain(timeDTO);

    const formattedTime = timeService.formatTimeFrom(mappedTimeValues);
    const data = `${formattedTime}\n`;

    socket.end(data, (err) => {
      if (err) {
        console.error("Error writing to socket:", err);
      }
    });
  })
  .listen(PORT, () => {
    console.log(`🚀 server running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });

/**
 * @typedef {Object} TimeDTO
 * @property {number} fullYear - The full year.
 * @property {number} month - The month (0-11).
 * @property {number} dayOfTheMonth - The day of the month (1-31).
 * @property {number} hours - The hours (0-23).
 * @property {number} minutes - The minutes (0-59).
 */

/**
 * @typedef {Object} DomainTime
 * @property {string} year - The year as a string.
 * @property {string} month - The month as a string.
 * @property {string} day - The day of the month as a string, padded to 2 digits.
 * @property {string} hours - The hours as a string, padded to 2 digits.
 * @property {string} minutes - The minutes as a string, padded to 2 digits.
 */

/**
 * Creates a time service object with methods to get and format time.
 *
 * @returns {Object} An object containing the following methods:
 *   - getTimeFrom: Function to get the current time.
 *   - formatTimeFrom: Function to format the current time.
 */
const createTimeService = () => {
  /**
   * Extracts specific time components from a given Date object.
   *
   * @param {Date} date - The Date object to extract time components from.
   * @returns {TimeDTO} An object containing the extracted time components.
   */
  const getTimeFrom = (date) => ({
    fullYear: date.getFullYear(),
    month: date.getMonth(),
    dayOfTheMonth: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
  });

  /**
   * Creates formatted time string
   * @param {DomainTime} timeValues
   * @returns {string}
   */
  const formatTimeFrom = (timeValues) => {
    const { year, month, day, hours, minutes } = timeValues;
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return {
    getTimeFrom,
    formatTimeFrom,
  };
};

/**
 * Creates a time mapper object.
 *
 * @returns {{ toDomain: (timeDTO: TimeDTO) => DomainTime }} An object containing the mapper function.
 */
const createTimeMapper = () => {
  const toDomain = (timeDTO) => ({
    year: timeDTO.fullYear.toString(),
    month: (timeDTO.month + 1).toString().padStart(2, "0"),
    day: timeDTO.dayOfTheMonth.toString().padStart(2, "0"),
    hours: timeDTO.hours.toString().padStart(2, "0"),
    minutes: timeDTO.minutes.toString().padStart(2, "0"),
  });

  return {
    toDomain,
  };
};
