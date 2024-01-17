var clsArena = undefined;
const validChairs = (e) => {
  if (e && e.target && +e.target.value > +e.target.getAttribute("max")) {
    alert(`Max chairs per row is ${e.target.getAttribute("max")}`);
    e.target.value = +e.target.getAttribute("max");
  }
};
const validCheckout = () => {
  const selectedChairs = document.querySelectorAll("li.S");
  Array.from(selectedChairs).forEach((chr, idx) => {
    clsArena.soldChair = chr.id;
  });
  drowArena();
};
const ToggleSelect = (id) => {
  const selectedChair = document.querySelector(`#${id}`);
  if (selectedChair.classList.contains("O")) {
    selectedChair.classList.replace("O", "S");
    clsArena.markChair = id;
  } else {
    selectedChair.classList.replace("S", "O");
    clsArena.unMarkChair = id;
  }
  ToggleCheckOut();
};
const ToggleCheckOut = () => {
  document.querySelector("button#checkout").disabled =
    !!!document.querySelectorAll("li.S").length;
};
const handleDrowClick = () => {
  const rows = +document.querySelector("#rows").value;
  const chairs = +document.querySelector("#chairs").value;
  clsArena = new Arena(rows, chairs);
  drowArena();
};
const drowArena = () => {
  resetHall();
  ToggleCheckOut();
  for (const [row, chairs] of Object.entries(clsArena.getArenaSataus)) {
    const newRow = document.createElement("li");
    const newRowSpan = document.createElement("span");
    newRowSpan.classList.add("row");
    newRowSpan.innerText = row;
    newRow.appendChild(newRowSpan);
    const newChairsList = document.createElement("ol");
    newChairsList.classList.add("chairs");
    for (const [idx, chair] of Object.entries(chairs)) {
      const newChair = document.createElement("li");
      const id = ["c", row, idx].join("-");
      newChair.id = id;
      newChair.classList.add(chair);
      newChair.innerText = idx;
      newChairsList.appendChild(newChair);
      newChair.addEventListener("click", () => {
        ToggleSelect(id);
      });
    }
    newRow.appendChild(newChairsList);
    document.querySelector("#hall ol").appendChild(newRow);
    updateCapacity();
  }
};
const updateCapacity = () => {
  const res = clsArena.getArenaAvailabeCapacty;
  document.querySelector("#capacity").setAttribute("max", res.capacity);
  document.querySelector("#capacity").value = res.soldChairs;
  document.querySelector("span.capacity").innerText = `${res.capacityPct}%`;
  if (+res.capacityPct === 100) {
    document.querySelector("span.capacity").classList.add("soldout");
    document.querySelector("div.capacity label").innerHTML = "SOLD OUT! ";
  }
};
const resetHall = () => {
  while (document.querySelector("#hall ol").children.length) {
    document.querySelector("#hall ol").children[0].remove();
  }
};
