export const loadCollection = () => {
  const data = localStorage.getItem('myCollection');
  return data ? JSON.parse(data) : [];
};

export const saveCollection = (collection) => {
  localStorage.setItem('myCollection', JSON.stringify(collection));
};