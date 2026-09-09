// Controle de Troca de Abas
function openTab(evt, tabName) {
  stopReading();


  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("active");
  }


  const tabButtons = document.getElementsByClassName("tab-btn");
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
    tabButtons[i].setAttribute("aria-selected", "false");
  }


  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
  evt.currentTarget.setAttribute("aria-selected", "true");
}


// Controle do Ajuste de Luz (Modo Escuro / Alto Contraste)
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  const isDark = document.body.classList.contains("dark-theme");
  const themeText = document.getElementById("theme-text");
 
  if (themeText) {
    themeText.innerText = isDark ? "Modo Claro" : "Modo Escuro";
  }
}


// Leitor de Voz para Pessoas Cegas
let isReading = false;
let speechUtterance = null;


function toggleReadPage() {
  if (isReading) {
    stopReading();
  } else {
    startReading();
  }
}


function startReading() {
  if (!('speechSynthesis' in window)) {
    alert("Seu navegador não possui suporte nativo para leitura de voz.");
    return;
  }


  window.speechSynthesis.cancel();


  const activeTab = document.querySelector(".tab-content.active");
  if (!activeTab) return;


  const textToRead = activeTab.innerText;


  speechUtterance = new SpeechSynthesisUtterance(textToRead);
  speechUtterance.lang = "pt-BR";
  speechUtterance.rate = 1.0;


  speechUtterance.onstart = function() {
    isReading = true;
    document.getElementById("read-btn-text").innerText = "Lendo...";
    document.getElementById("btn-stop").style.display = "inline-flex";
  };


  speechUtterance.onend = function() {
    stopReading();
  };


  speechUtterance.onerror = function() {
    stopReading();
  };


  window.speechSynthesis.speak(speechUtterance);
}


function stopReading() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  isReading = false;
  const readBtnText = document.getElementById("read-btn-text");
  const btnStop = document.getElementById("btn-stop");


  if (readBtnText) readBtnText.innerText = "Ouvir Página";
  if (btnStop) btnStop.style.display = "none";
}