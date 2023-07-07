const scrollTo = (id) => {
  setTimeout(() => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView();
    }
  }, 0);
};

export default scrollTo;
