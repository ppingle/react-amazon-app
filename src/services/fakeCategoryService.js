export const categories = [
  { _id: "5b21ca3eeb7f6fbccd471824", name: "Movies" },
  { _id: "5b21ca3eeb7f6fbccd471828", name: "Electronics" },
  { _id: "5b21ca3eeb7f6fbccd471832", name: "Groceries" },
  { _id: "5b21ca3eeb7f6fbccd471836", name: "Books" }
];

export function getCategories() {
  return categories.filter(g => g);
}
