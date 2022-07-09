let planetsPage = 1;
const firstPage = 1;
const lastPage = 6;
const buttonHeros = document.getElementById("btn-heroes-info");
const select = document.getElementById("select-film");

const buttonPlanets = document.getElementById("btn-planets-info");
const buttonPrev = document.getElementById("btn-prev");
const buttonNext = document.getElementById("btn-next");
buttonPrev.classList.add("btn_disabled");
buttonNext.classList.add("btn_disabled");

const wrapper = document.querySelector(".wrapper");
const planetsDiv = wrapper.querySelector(".planets");
const heroesDiv = wrapper.querySelector(".heroes");

const planetList = document.createElement("div");
const heroesList = document.createElement("div");
planetList.classList.add("planet-list");
heroesList.classList.add("heroes-list");

planetsDiv.append(planetList);
heroesDiv.append(heroesList);


async function getHeroesInfo(){
    const value = select.value;
    const request = await fetch(`https://swapi.dev/api/films/${value}`);
    const response = await request.json();
    const heroes = response.characters;

    while(heroesList.hasChildNodes()){
        heroesList.removeChild(heroesList.firstChild);
    }

    for(let i = 0; i < heroes.length; i++){
        const hero = await (await fetch(heroes[i])).json();

        const heroName = hero.name;
        const heroAge = hero.birth_year;
        const heroGender = hero.gender;
        const heroInfo = `Name: ${heroName}, Age: ${heroAge}, Gender: ${heroGender}`;

        const heroBox = document.createElement("div");
        heroBox.classList.add("hero-list__box");
        heroesList.append(heroBox);
        heroBox.style.backgroundImage = `url(./img/${heroName.replaceAll(" ", "").toLowerCase()}.jpeg)`;
        const heroLi = document.createElement('li');
        heroLi.innerHTML = heroInfo;
        heroBox.append(heroLi);
    }
    buttonHeros.removeAttribute("disabled");
}
buttonHeros.addEventListener("click", () => {
    getHeroesInfo();
    buttonHeros.setAttribute("disabled", "disabled");
})


function getPlanets(page = planetsPage) {
    const planetsNames = [];
    const planets = fetch(`https://swapi.dev/api/planets/?page=${page}`);
    planets
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            res.results.forEach(item => {
                planetsNames.push(item.name);
            })
            planetList.innerHTML = planetsNames;
        });
    return planetList;
}

buttonPlanets.addEventListener("click", () => {
    buttonNext.classList.remove("btn_disabled")
    buttonPlanets.classList.add("btn_disabled")
    buttonPlanets.setAttribute("disabled", "disabled");
    getPlanets();
})


buttonNext.addEventListener("click", () => {
    if(!planetList.hasChildNodes() || planetsPage === lastPage){
        buttonNext.classList.add("btn_disabled");
        return;
    } else{
        buttonPrev.classList.remove("btn_disabled");
    }
    planetsPage += 1;
    getPlanets(planetsPage);
});

buttonPrev.addEventListener("click", () => {
    if(!planetList.hasChildNodes() || planetsPage === firstPage){
        buttonPrev.classList.add("btn_disabled");
        return;
    } else{
        buttonNext.classList.remove("btn_disabled");
    }
    planetsPage -= 1;
    getPlanets(planetsPage);
});
