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
planetList.classList.add("planetList");
heroesList.classList.add("heroesList");

planetsDiv.append(planetList);
heroesDiv.append(heroesList);

function getHeroesInfo(){
    let index = 0;
    const value = select.value;
    const heroes = fetch(`https://swapi.dev/api/films/${value}`);
    heroes
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            while(heroesList.hasChildNodes()){
                heroesList.removeChild(heroesList.firstChild);
            }
            for(index; index < res.characters.length; index++){
                getHeroInfo(res);
            }
        })

    function getHeroInfo(arr){
        const heroInfo = [];
        const hero = fetch(arr.characters[index]);
        hero
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                const heroName = res.name;
                const heroAge = res.birth_year
                const heroGender = res.gender;
                heroInfo.push(`Name: ${heroName}, Age: ${heroAge}, Gender: ${heroGender}`);

                const heroLi = document.createElement('li');
                heroLi.innerHTML = heroInfo;
                heroesList.append(heroLi);
            })
            return heroInfo;
    }
}
buttonHeros.addEventListener("click", () => {
    getHeroesInfo();
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
