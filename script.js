const tg = window.Telegram.WebApp;
tg.expand(); // make it fullscreen in Telegram

let stars = parseInt(localStorage.getItem("stars")) || 10;
let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

const starCount = document.getElementById("starCount");
const openCaseBtn = document.getElementById("openCase");
const inventoryDiv = document.getElementById("inventory");
const popup = document.getElementById("casePopup");
const resultDiv = document.getElementById("giftResult");
const closePopup = document.getElementById("closePopup");

starCount.textContent = stars;

const gifts = [
  { name: "💎 Diamond", chance: 0.1 },
  { name: "🌟 Gold Star", chance: 0.15 },
  { name: "🎈 Balloon", chance: 0.2 },
  { name: "🍀 Clover", chance: 0.25 },
  { name: "🎁 Box", chance: 0.3 },
];

function renderInventory() {
  inventoryDiv.innerHTML = "";
  inventory.forEach(gift => {
    const div = document.createElement("div");
    div.className = "gift";
    div.textContent = gift;
    inventoryDiv.appendChild(div);
  });
}
renderInventory();

openCaseBtn.onclick = () => {
  if (stars < 5) {
    tg.showAlert("Not enough stars!");
    return;
  }
  stars -= 5;
  starCount.textContent = stars;
  localStorage.setItem("stars", stars);

  popup.classList.remove("hidden");
  resultDiv.textContent = "Opening...";

  setTimeout(() => {
    const random = Math.random();
    let cumulative = 0;
    const gift = gifts.find(g => (cumulative += g.chance) >= random);
    resultDiv.textContent = `You got ${gift.name}! 🎉`;

    inventory.push(gift.name);
    localStorage.setItem("inventory", JSON.stringify(inventory));
    renderInventory();
  }, 1000);
};

closePopup.onclick = () => popup.classList.add("hidden");
