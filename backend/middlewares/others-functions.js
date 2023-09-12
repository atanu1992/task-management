// Function to generate a unique alphanumeric string with current time and milliseconds
function generateUniqueString(length = 5) {
  let dateTime = new Date().getTime();
  let milliSec = new Date().getMilliseconds();
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return dateTime + milliSec + result;
}

const captiliseContent = (content) =>
  content.replace(/\b\w/g, (s) => s.toUpperCase());

// only allow positive whole numbers
const isNumeric = (value) => {
  value = value ? value.trim() : value;
  return /^\d+$/.test(value);
};

module.exports = { generateUniqueString, captiliseContent, isNumeric };
