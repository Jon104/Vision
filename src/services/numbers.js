export const getRandomNumber = () => {
  return Math.random() * (1 - -1) + -1;
};

export const getRandomPositions = (amountOfPoints) => {
  let array = Array.from({ length: amountOfPoints }, () => getRandomNumber());

  return array.reduce(
    (r, a) => r.concat(Math.random() * (0.2 - -0.2) + -0.2, a),
    [0]
  );
};
