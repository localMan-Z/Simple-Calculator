function updateValues() {
  let height, width;
  let container = document.querySelector(".container").getBoundingClientRect();
  height = container.height;
  width = container.width;
  console.log(height, width);

  document.documentElement.style.setProperty("--width", `${width}px`);
  document.documentElement.style.setProperty("--height", `${height}px`);
  document.documentElement.style.setProperty("--depth", "150px");
}

window.onresize = updateValues;
updateValues();
