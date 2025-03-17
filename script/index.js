// load button
const loadLessonBtn = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((data) => displayLessonBtn(data.data));
};
const displayLessonBtn = (array) => {
  const lessonButtonContainer = document.getElementById("lesson-btn-container");
  array.forEach((element) => {
    const levelNo = element.level_no;
    console.log(levelNo);
    const div = document.createElement("div");
    div.innerHTML = `
        <button id="btn_${levelNo}"  onclick="loadVocabulary(${levelNo})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson -${levelNo}</button>
        `;
    lessonButtonContainer.appendChild(div);
  });
};
loadLessonBtn();

// data
// :
// Array(42)
// 0
// :
// {id: 2, level: 6, word: 'Benevolent', meaning: 'দয়ালু', pronunciation: 'বেনেভোলেন্ট'}
// load Vocabulary Section card
const removeClass = () =>{
    const btns = document.getElementsByClassName("active");
    for(let btn of btns){
        btn.classList.remove("active");
    }
}
const loadVocabulary = (id) => {
    const btn = document.getElementById(`btn_${id}`);
    removeClass();
    btn.classList.add("active");
  displayLoading();
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayVocabularyCard(data.data));
};
const displayVocabularyCard = (vocabularies) => {
  console.log(vocabularies);
  const displayVocabularyCardContainer = document.getElementById(
    "displayVocabularyCardContainer"
  );
  if(vocabularies.length === 0){
    displayNoVocabularyAlert();
  }
  else{
    displayVocabularyCardContainer.innerHTML = "";
    vocabularies.forEach((vocabulary) => {
        console.log(vocabulary);
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="p-6 bg-white flex flex-col gap-10 rounded-xl">
                        <div class="flex flex-col gap-3">
                            <h3 class="text-2xl font-bold text-center">${vocabulary.word}</h3>
                            <p class="text-sm text-center">Meaning /Pronounciation</p>
                            <h2 class="text-3xl text-center font-bold">"${vocabulary.meaning === null ? "অর্থ পাওয়া যায়নি": vocabulary.meaning} / ${vocabulary.pronunciation}"</h2>
                        </div>
                        <div class="flex justify-between px-10">
                            <i class="fa-solid fa-circle-info text-2xl hover:cursor-pointer" onclick=" loadDetails(${vocabulary.id})"></i>
                            <i class="fa-solid fa-volume-high text-2xl hover:cursor-pointer" onclick="pronounceWord('${vocabulary.word}')"></i>
                        </div>
             </div>
            `;
         displayCard();
        displayVocabularyCardContainer.appendChild(div);
      });
  }
};

function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN'; // English
    window.speechSynthesis.speak(utterance);
}
// {
//     "word": "Benevolent",
//     "meaning": "দয়ালু",
//     "pronunciation": "বেনেভোলেন্ট",
//     "level": 6,
//     "sentence": "The benevolent man donated food to the poor.",
//     "points": 4,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "kind",
//         "generous",
//         "compassionate"
//     ],
//     "id": 2
// }
// display details
const loadDetails = (id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayDetails(data.data))
}
const displayDetails = (data) =>{
    const con = document.getElementById("vocabularyDetails");
    document.getElementById("vocabularyDetails").showModal();
    console.log(data);
    const synonyms = data.synonyms;
    con.innerHTML = `
    <div class="modal-box">
            <h3 class="text-2xl font-bold">${data.word} ( <i class="fa-solid fa-microphone"></i> : ${data.pronunciation})</h3>
            <div class="py-5 flex flex-col gap-2">
                <p class="font-semibold text-2xl">Meaning</p>
                <p >${data.meaning === null? "অর্থ পাওয়া যায়নি" : data.meaning}</p>
            </div>
            <div class="py-5 flex flex-col gap-2">
                <p class="font-semibold text-2xl">Example</p>
                <p >${data.sentence}</p>
            </div>
            <div class="py-5 flex flex-col gap-2">
                <p class="font-semibold text-2xl">সমার্থক শব্দ গুলো</p>
                <div id="synonymContainer" class="flex flex-row gap-2">

                </div>
            </div>
            <div class="modal-action justify-start">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-active btn-primary">Complete Learning</button>
                </form>
            </div>
        </div>
    `
    const synonymContainer = document.getElementById('synonymContainer');
    synonyms.forEach(element => {
        const btn = document.createElement("button");
        btn.innerHTML = `<button class="btn">${element}</button>`;
        synonymContainer.appendChild(btn);
    });
}

function displayInitial(){
    document.getElementById("noVocabularyAlert").classList.add("hidden");
    document.getElementById("displayVocabularyCardContainer").classList.add("hidden");
    document.getElementById("initial").classList.remove("hidden");
    document.getElementById("loading").classList.add("hidden");
}
function displayNoVocabularyAlert(){
    document.getElementById("noVocabularyAlert").classList.remove("hidden");
    document.getElementById("displayVocabularyCardContainer").classList.add("hidden");
    document.getElementById("initial").classList.add("hidden");
    document.getElementById("loading").classList.add("hidden");
}
function displayCard(){
    document.getElementById("noVocabularyAlert").classList.add("hidden");
    document.getElementById("displayVocabularyCardContainer").classList.remove("hidden");
    document.getElementById("initial").classList.add("hidden");
    document.getElementById("loading").classList.add("hidden");
}
function displayLoading(){
    document.getElementById("noVocabularyAlert").classList.add("hidden");
    document.getElementById("displayVocabularyCardContainer").classList.add("hidden");
    document.getElementById("initial").classList.add("hidden");
    document.getElementById("loading").classList.remove("hidden");
}
displayInitial();

function displayBeforeLogin(){
    document.getElementById("navbar").classList.add("hidden");
    document.getElementById("vocabulariesBtns").classList.add("hidden");
    document.getElementById("vucabularysection").classList.add("hidden");
    document.getElementById("faqSection").classList.add("hidden");
    document.getElementById("banner").classList.remove("hidden");
}
function displayAfterLogin(){
    document.getElementById("navbar").classList.remove("hidden");
    document.getElementById("vocabulariesBtns").classList.remove("hidden");
    document.getElementById("vucabularysection").classList.remove("hidden");
    document.getElementById("faqSection").classList.remove("hidden");
    document.getElementById("banner").classList.add("hidden");
}
displayBeforeLogin();
document.getElementById("login").addEventListener('click', () =>{
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    if(name){
        if(password === "123456"){
            document.getElementById("login-modal").showModal();
            displayAfterLogin();
        }
        else{
            alert("Enter valid password");
        }
    }
    else{
        alert("Enter your name");
    }
})
document.getElementById("logout").addEventListener('click', () =>{
    displayBeforeLogin();
})