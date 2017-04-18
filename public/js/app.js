/*jshint esversion: 6*/
const dataReq = (source, element, func) => {
  const dReq = new XMLHttpRequest();

  dReq.addEventListener(`load`, function () {
    const data = JSON.parse(this.responseText);
    func(data, element);
  });
  dReq.open(`GET`, source);

  dReq.setRequestHeader(`Api-Key`, `${API_KEY}`);

  dReq.send();
};

const btn = document.querySelector(`#search`);
const input = document.querySelector(`#input`);
const content = document.querySelector(`#content`);

const reset = () => {
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
};

btn.onclick = () => {
  reset();
  const response = dataReq(`https://api.gettyimages.com/v3/search/images?phrase=${input.value}`, content, (data, element) => {
      for (var i = 0; i < data.images.length; i++) {
        let img = document.createElement(`img`);
        img.src = `${data.images[i].display_sizes[0].uri}`;
        content.appendChild(img);
      }
    });
};