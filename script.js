let computermove = "";

const yourchoice = (event) => {
  document.querySelectorAll(".yourSideItem");
  const yourmove = event.target.id;
  computermove = compchoice();
  console.log(yourmove, computermove);
  let show = document.querySelector("#result");
  let yourScoreno = document.querySelector("#yourScoreno");
  let compScoreno = document.querySelector("#compScoreno");
  showcompchoice();

  if (yourmove === "yourRock" && computermove === "CompRock") {
    console.log("draw");
    document.querySelector("#result").innerText = "ooh you made an draw";
    show.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
  } else if (yourmove === "yourRock" && computermove === "CompPaper") {
    console.log("loose");
    document.querySelector("#result").innerText = "You lost try Again";
    show.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    compScoreno.innerText++;
  } else if (yourmove === "yourRock" && computermove === "CompSizzor") {
    console.log("win");
    document.querySelector("#result").innerText = "Yay you won";
    show.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
    yourScoreno.innerHTML++;
  } else if (yourmove === "yourPaper" && computermove === "CompRock") {
    console.log("win");
    document.querySelector("#result").innerText = "Yay you won";
    show.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
    yourScoreno.innerHTML++;
  } else if (yourmove === "yourPaper" && computermove === "CompPaper") {
    console.log("draw");
    document.querySelector("#result").innerText = "ooh you made an draw";
    show.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
  } else if (yourmove === "yourPaper" && computermove === "CompSizzor") {
    console.log("loose");
    document.querySelector("#result").innerText = "You lost try Again";
    show.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    compScoreno.innerText++;
  } else if (yourmove === "yourSizzor" && computermove === "CompRock") {
    console.log("loose");
    document.querySelector("#result").innerText = "You lost try Again";
    show.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    compScoreno.innerText++;
  } else if (yourmove === "yourSizzor" && computermove === "CompPaper") {
    console.log("win");
    document.querySelector("#result").innerText = "Yay you won";
    show.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
    yourScoreno.innerHTML++;
  } else if (yourmove === "yourSizzor" && computermove === "CompSizzor") {
    console.log("draw");
    document.querySelector("#result").innerText = "ooh you made an draw";
    show.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
  }
};

const compchoice = () => {
  let compside = ["CompRock", "CompPaper", "CompSizzor"];
  let i = Math.floor(Math.random() * 3);
  return compside[i];
};

const showcompchoice = () => {
  document.querySelector("#compRock").style.opacity = "1";
  document.querySelector("#compPaper").style.opacity = "1";
  document.querySelector("#compSizzor").style.opacity = "1";

  if (computermove === "CompRock") {
    document.querySelector("#compPaper").style.opacity = "0.2";
    document.querySelector("#compSizzor").style.opacity = "0.2";
  } else if (computermove === "CompPaper") {
    document.querySelector("#compSizzor").style.opacity = "0.2";
    document.querySelector("#compRock").style.opacity = "0.2";
  } else if (computermove === "CompSizzor") {
    document.querySelector("#compPaper").style.opacity = "0.2";
    document.querySelector("#compRock").style.opacity = "0.2";
  }
};

yourRock.addEventListener("click", yourchoice);
yourPaper.addEventListener("click", yourchoice);
yourSizzor.addEventListener("click", yourchoice);
