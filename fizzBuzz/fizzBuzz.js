const setEvent = () => {
  const input = document.querySelector('[type="number"]');
  input.oninput = (e) => {
    const inp = e.target;
    const maxLen = +inp.attributes.maxlength.value;
    if (inp.value && inp.value.length > maxLen) {
      inp.value = inp.value.slice(0, maxLen);
    }
  };
};
const fizzBuzz = () => {
  const destValue = +document.querySelector('[type="number"]').value;
  const res = [];
  for (let idx = 1; idx <= destValue; idx++) {
    if (idx % 5 === 0 && idx % 3 === 0) {
      res.push("FizzBuzz");
    } else if (idx % 3 === 0) {
      res.push("Fizz");
    } else if (idx % 5 === 0) {
      res.push("Buzz");
    } else {
      res.push(idx.toString());
    }
    // console.log({ idx, res });
  }
  showRes(res);
};

const showRes = (res) => {
  document.querySelector("#resList").innerHTML = null;
  res.forEach((itm) => {
    const li = document.createElement("li");
    li.innerHTML = itm;
    li.classList.add(itm);
    document.querySelector("#resList").appendChild(li);
  });
};
setEvent();
