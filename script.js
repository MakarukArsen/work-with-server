let planetsPage = 1;
const buttonHeros = document.getElementById("btn-heroes-info");
const select = document.getElementById("select-film");

const buttonPlanets = document.getElementById("btn-planets-info");
const buttonPrev = document.getElementById("btn-prev");
const buttonNext = document.getElementById("btn-next");

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
        const heroInfo = [];
        const heroName = hero.name;
        const heroAge = hero.birth_yearж
        const heroGender = hero.gender;
        heroInfo.push(`Name: ${heroName}, Age: ${heroAge}, Gender: ${heroGender}`);

        const heroBox = document.createElement("div")
        heroBox.classList.add("hero-list__box");
        heroesList.append(heroBox);
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
    getPlanets();
})

buttonNext.addEventListener("click", () => {
    if(!planetList.hasChildNodes()){
        return;
    }
    if(planetsPage === 6){
        return;
    }
    planetsPage += 1;
    getPlanets(planetsPage);
});

buttonPrev.addEventListener("click", () => {
    if(!planetList.hasChildNodes()){
        return;
    }
    if(planetsPage === 1){
        return;
    }
    planetsPage -= 1;
    getPlanets(planetsPage);
});
