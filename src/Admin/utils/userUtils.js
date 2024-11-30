import {
  FIRST_NAMES,
  LAST_NAMES,
  ROLES,
  STATUSES,
} from "../constants/userConstants";

export const getRandomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

const generateRandomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
    .toISOString()
    .split("T")[0];
};

export const generateUsers = (count = 120) => {
  return Array.from({ length: count }, () => {
    const firstName = getRandomElement(FIRST_NAMES);
    const lastName = getRandomElement(LAST_NAMES);
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

    return {
      name,
      email,
      roles: getRandomElement(ROLES),
      status: getRandomElement(STATUSES),
      blogCount: Math.floor(Math.random() * 50),
      lastLogin: generateRandomDate(new Date(2023, 0, 1), new Date()),
    };
  });
};

