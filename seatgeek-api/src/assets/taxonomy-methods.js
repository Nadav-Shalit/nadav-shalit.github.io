import imgSrc from "./seatgeek-def_280-210.png";

export default async function getTaxonomies() {
  const taxData = [];
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
  await fetch(
    "https://api.seatgeek.com/2/taxonomies?client_id=Mzk3OTgxMDF8MTcwNzY1ODc3OC4yNzE5ODUz&per_page=50",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      const res = JSON.parse(result);
      res["taxonomies"].forEach((elm, idx) => {
        // console.log(elm);
        taxData.push({
          id: elm.id,
          idx,
          name: elm.name,
          parent_id: elm.parent_id,
          events: elm.stats.event_count,
          perfomers: elm.stats.performer_count,
          imgSrc: elm.image ? elm.image : imgSrc,
        });
      });
    })
    .catch((error) => console.log("error", error));
  console.log(taxData);
  return taxData;
}
