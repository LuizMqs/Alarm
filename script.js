const mediaElem = document.getElementById("audio");
let seg = 0;
let min = 0;
let myTemp = 0;
let total;

function regressivo() {
  min = Number(min);
  seg = Number(seg);

  if (seg > 0) {
    seg--;
  } else {
    if (min > 0) {
      seg = 59;
      min--;
    } else {
      mediaElem.play();
      mediaElem.loop();
      clearInterval(myTemp);
    }
  }

  if (total / 20 > min * 60 + seg)
    document.querySelector("h4").innerHTML = "Seu tempo está acabando: ";

  console.log(document.querySelector("h4").innerHTML)

  if (min < 10) min = `0${min}`;
  if (seg < 10) seg = `0${seg}`;

  document.querySelector("p").innerHTML = `${min}:${seg}`;
}

document.getElementById("button").addEventListener("click", function () {
  const select = Number(document.getElementById("select").value);
  const number = parseInt(document.getElementById("number").value);
  min = 0;
  seg = 0;

  if (myTemp != 0) {
    clearInterval(myTemp);
    myTemp = 0;
    document.getElementById("button").innerHTML = "Começar";
    document.querySelector("h4").innerHTML = "";
    mediaElem.pause();
    mediaElem.currentTime = 0;
    return;
  } else {
    document.getElementById("button").innerHTML = "Desarmar";
  }

  if (select == 1) {
    min = number;
    total = min * 60;
  } else if (select == 2) {
    seg = number;
    total = seg;
  }

  while (seg > 59) {
    min++;
    seg = seg - 60;
  }

  if (min > 59) {
    document.querySelector("p").innerHTML = "O valor máximo é 59 minutos";
  } else {
    if (min < 10) min = `0${min}`;
    if (seg < 10) seg = `0${seg}`;
    document.querySelector("p").innerHTML = `${min}:${seg}`;
    myTemp = setInterval(regressivo, 1000);
  }
});
