// Eljutás a documentum elemekhez
const gameContainer = document.querySelector(".container"),
  userResult = document.querySelector(".user_result img"),
  cpuResult = document.querySelector(".cpu_result img"),
  result = document.querySelector(".result"),
  optionImages = document.querySelectorAll(".option_image");

// Loop minden opció képen át
optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    image.classList.add("active");

    userResult.src = cpuResult.src = "images/rock.png";
    result.textContent = "Várj...";

    // Loop minden opció képen át ismét
    optionImages.forEach((image2, index2) => {
      // Ha a jelenlegi index nem egyezik a kattintottal
      // Akkor töröljük az "active" class-t a másik opciós képnél
      index !== index2 && image2.classList.remove("active");
    });

    gameContainer.classList.add("start");

    // Állíts be egy időkorlátot a eredmény kiszámításának késleltetésére.
    let time = setTimeout(() => {
      gameContainer.classList.remove("start");

      // Szerezd meg a kattintott opció kép forrását.
      let imageSrc = e.target.querySelector("img").src;
      // Állítsd be a felhasználó képét a kattintott opció képére.
      userResult.src = imageSrc;

      // Generálj egy véletlenszerű számot 0 és 2 között.
      let randomNumber = Math.floor(Math.random() * 3);
      // Hozz létre egy tömböt a CPU kép opciókkal.
      let cpuImages = ["images/rock.png", "images/paper.png", "images/scissors.png"];
      // Állítsd be a CPU képét egy véletlenszerű opcióra a tömbből.
      cpuResult.src = cpuImages[randomNumber];

      // Rendeljünk hozzá egy betűt a gépnek (R a kő mint rock, P a papír mint paper, S az olló mint scissors)
      let cpuValue = ["R", "P", "S"][randomNumber];
      // Rendeljünk hozzá egy betűt az összes indexhez  (index-et használva alapnak)
      let userValue = ["R", "P", "S"][index];

      // Készítsünk egy object-et az összes lehetséges eredménnyel
      let outcomes = {
        RR: "Döntetlen",
        RP: "GÉP",
        RS: "Játékos",
        PP: "Döntetlen",
        PR: "Játékos",
        PS: "GÉP",
        SS: "Döntetlen",
        SR: "GÉP",
        SP: "Játékos",
      };

      // Vizsgáljuk meg az eredményt
      let outComeValue = outcomes[userValue + cpuValue];

      // Végeredmény
      result.textContent = userValue === cpuValue ? "Döntetlen" : `${outComeValue} Nyert!!`;
    }, 2500);
  });
});