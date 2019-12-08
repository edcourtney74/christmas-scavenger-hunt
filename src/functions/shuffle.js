export const princesses = [
  { name: "cinderella.png", id: 0, group: 0 },
  { name: "ariel.jpg", id: 1, group: 1 },
  { name: "elena.jpg", id: 2, group: 2 },
  { name: "elsa.jpg", id: 3, group: 3 },
  { name: "cinderella.png", id: 4, group: 0 },
  { name: "ariel.jpg", id: 5, group: 1 },
  { name: "elena.jpg", id: 6, group: 2 },
  { name: "elsa.jpg", id: 7, group: 3 }
];

export const shuffle = items => {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
};
