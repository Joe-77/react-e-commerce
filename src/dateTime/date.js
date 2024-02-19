export let countDate = new Date("Sep 30, 2024 23:59:59");

export let dateNow = new Date().getTime();

export const dateDiff = countDate - dateNow;

export var days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));

export var hours = Math.floor(
  (dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
);

export var minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
