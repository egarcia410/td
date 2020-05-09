export const generateHealthStat = (base: number, level: number) => {
  const IV = Math.floor(Math.random() * 186);
  const EV = Math.floor(Math.random() * 510);
  return Math.floor(
    ((base + IV) * 2 + (Math.sqrt(EV) / 4) * level) / 100 + level + 10
  );
};

export const generateOtherStat = (base: number, level: number) => {
  const IV = Math.floor(Math.random() * 140);
  const EV = Math.floor(Math.random() * 250);
  return Math.floor(((base + IV) * 2 + (Math.sqrt(EV) / 4) * level) / 100 + 2);
};
