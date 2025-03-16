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
        <button  onclick="loadVocabulary(${levelNo})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson -${levelNo}</button>
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

const loadVocabulary = (id) => {
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
                            <h2 class="text-3xl text-center font-bold">"${vocabulary.meaning === null ? "অর্থ নেই": vocabulary.meaning} / ${vocabulary.pronunciation}"</h2>
                        </div>
                        <div class="flex justify-between px-10">
                            <a href=""><i class="fa-solid fa-circle-info text-2xl"></i></a>
                            <a href=""><i class="fa-solid fa-volume-high text-2xl"></i></a>
                        </div>
             </div>
            `;
         displayCard();
        displayVocabularyCardContainer.appendChild(div);
      });
  }
};

function displayInitial(){
    document.getElementById("noVocabularyAlert").classList.add("hidden");
    document.getElementById("displayVocabularyCardContainer").classList.add("hidden");
    document.getElementById("initial").classList.remove("hidden");
}
function displayNoVocabularyAlert(){
    document.getElementById("noVocabularyAlert").classList.remove("hidden");
    document.getElementById("displayVocabularyCardContainer").classList.add("hidden");
    document.getElementById("initial").classList.add("hidden");
}
function displayCard(){
    document.getElementById("noVocabularyAlert").classList.add("hidden");
    document.getElementById("displayVocabularyCardContainer").classList.remove("hidden");
    document.getElementById("initial").classList.add("hidden");
}
displayInitial();
