document.getElementById("load").onclick = function () {
  const req = new XMLHttpRequest();
  req.open('GET', '/api/products');
  req.onload = function () {
    const data = JSON.parse(req.response);
    addList({ data });
  }
  req.send();
}

function addList({ data }) {

}

function addSingle({ data }) {

}

function notFound() {

}

function resetContentArea() {

}
