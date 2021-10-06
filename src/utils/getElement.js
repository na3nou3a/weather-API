const getElement = (id) => {
  const element = document.getElementById(id);
  if (element) return element;
  throw new Error("no element selected");
};

export default getElement;
