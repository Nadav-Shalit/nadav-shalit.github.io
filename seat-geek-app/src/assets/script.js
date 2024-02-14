function getTex() {
  var myHeaders = new Headers();
  myHeaders.append(
    "Cookie",
    "datadome=3bORUTFjL6bi_FsNRjTRvXprcyYut472KkpC9vm8vdKI6fi8N7w6WE_3pygCmb~bRzzfL6e0C4rUZzsmeTY7CB9NDM7_jCkqXEUFAWv0ZJgEP1pZB8TikbcwO36aCIcS"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const texObj = {};
  fetch(
    "https://api.seatgeek.com/2/taxonomies?client_id=Mzk3OTgxMDF8MTcwNzY1ODc3OC4yNzE5ODUz&per_page=50",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      const res = JSON.parse(result);
      console.log(res);
      const templateSection = document.querySelector("section.hidden");
      res["taxonomies"].forEach((elm, idx) => {
        const newSection = templateSection.cloneNode(true);
        newSection.classList.remove("hidden");
        newSection.querySelector("h2").innerText = elm.name;
        // newSection.querySelector("#parnet").innerText = elm.parent_id;
        newSection.querySelector("img").src = elm.image
          ? elm.image
          : "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTbVfdEi3C3o1-iEPOtz81XkN4aQUnPUBERQCiFgTPjiu1VKBRZ";
        newSection.querySelector("#events").innerText =
          elm.stats && elm.stats.event_count ? elm.stats.event_count : 0;
        newSection.querySelector("#performers").innerText =
          elm.stats && elm.stats.performer_count
            ? elm.stats.performer_count
            : 0;
        document.querySelector("#texList").appendChild(newSection);
        // texObj[elm.id] = {
        //   idx,
        //   name: elm.name,
        //   parent_id: elm.parent_id,
        //   stats: elm.stats,
        //   image: elm.image,

        // };
      });
    })
    .catch((error) => console.log("error", error));
  console.log(texObj);
}
//getTex();

function ceo() {
  console.log("ceo");
  cto();
}

function cto() {
  console.log("cto");
  vprnd();
}

function vprnd() {
  console.log("vprnd");
  teamlead();
}

function teamlead() {
  console.log("teamlead");
  dev();
}
function dev() {
  console.log("dev");
}

ceo();
