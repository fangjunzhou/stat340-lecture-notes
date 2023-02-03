listDir = async (path) => {
  const response = await fetch(path);
  const data = await response.json();

  let htmlString = "<ul>";
  for (let file of data) {
    if (file.type == "dir") {
      htmlString += `<li>${file.name}</a></li>`;
      htmlString += await listDir(file._links.self);
    } else {
      htmlString += `<li><a href="${file.path}">${file.name}</a></li>`;
    }
  }
  htmlString += "</ul>";

  return htmlString;
};

window.onload = async () => {
  document.getElementsByTagName("body")[0].innerHTML = await listDir(
    "https://api.github.com/repos/Fangjun-Zhou/stat340-lecture-notes/contents/"
  );
};
