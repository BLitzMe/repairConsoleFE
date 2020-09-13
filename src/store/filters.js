export function filterManufacturer(userDevices, currUserDevice) {
  if (!currUserDevice) return userDevices;
  console.log(currUserDevice.toString());
  let hello = [];
  hello = userDevices.filter((device) => {
    return device.manufacturer
      .toLowerCase()
      .match(currUserDevice.toLowerCase());
  });
  console.log(hello);
  return hello;
}
