function _1(md){return(
md`# HW6`
)}

function _artistData(FileAttachment){return(
FileAttachment("artistVer (1) - artistVer (1).csv").csv()
)}

function _publicData(FileAttachment){return(
FileAttachment("artistPublic (1) - artistPublic (1).csv").csv()
)}

function _artist_question(artistData){return(
Object.keys(artistData[0])[3]
)}

function _artist_score(artistData,artist_question){return(
artistData.map(row => row[artist_question])
)}

function _artistver_uniqueValues(){return(
["1", "2", "3", "4", "5"]
)}

function _artist_counts(artistver_uniqueValues,artist_score){return(
artistver_uniqueValues.map(val => ({
  value: val,
  count: artist_score.filter(v => v === val).length
}))
)}

function _public_question(publicData){return(
Object.keys(publicData[0])[4]
)}

function _public_score(publicData,public_question){return(
publicData.map(row => String(row[public_question]))
)}

function _artistpublic_uniqueValues(){return(
["1", "2", "3", "4", "5"]
)}

function _public_count(artistpublic_uniqueValues,public_score){return(
artistpublic_uniqueValues.map(val => ({
  value: val,
  count: public_score.filter(v => v === String(val)).length
}))
)}

function _data(artist_counts,public_count){return(
artist_counts.flatMap((item, index) => ([
  {
    value: item.value,
    count: item.count,
    series: 'artist'
  },
  {
    value: item.value,
    count: public_count[index].count,
    series: 'artistpublic'
  }
]))
)}

function _selectedSeries(Inputs){return(
Inputs.checkbox(["artist", "artistpublic"], {label: "Choose datasets", value: ["artist", "artistpublic"]})
)}

function _14(Plot,artist_question,data,selectedSeries){return(
Plot.plot({
  height: 600,
  title: artist_question,
  x: {
    label: 'Value',
    domain: data.map(d => d.value),
    padding: 0.1
  },
  y: {
    label: 'Count',
    grid: true
  },
  color: {
    domain: ['artist', 'artistpublic'],
    range: ['#E9AAB9', '#8AB7DA'], 
    legend: true
  },
  marks: [
    Plot.barY(data.filter(d => selectedSeries.includes(d.series)), Plot.stackY({ 
      x: "value",
      y: "count",
      fill: "series",
      title: d => `${d.series}\nvalue: ${d.value}\ncount: ${d.count}`
    }))
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artistVer (1) - artistVer (1).csv", {url: new URL("./files/363ea43eed3c6a6a6fed83d3e26ac23641da56f4f0689da720760208af84f1c3caff531322fc2ceeaf3924e4ff2f0ca4314a49adfe0e45701c6687fc36ee24d3.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["artistPublic (1) - artistPublic (1).csv", {url: new URL("./files/41a9c6bfdf8907c7f19b5a52517012d51d11afcdf769218a6b5c1af5288c865ca2bf10f0fdac5144f8d3676054b833c736642053e880c85ec6123fb15744ae7f.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("artistData")).define("artistData", ["FileAttachment"], _artistData);
  main.variable(observer("publicData")).define("publicData", ["FileAttachment"], _publicData);
  main.variable(observer("artist_question")).define("artist_question", ["artistData"], _artist_question);
  main.variable(observer("artist_score")).define("artist_score", ["artistData","artist_question"], _artist_score);
  main.variable(observer("artistver_uniqueValues")).define("artistver_uniqueValues", _artistver_uniqueValues);
  main.variable(observer("artist_counts")).define("artist_counts", ["artistver_uniqueValues","artist_score"], _artist_counts);
  main.variable(observer("public_question")).define("public_question", ["publicData"], _public_question);
  main.variable(observer("public_score")).define("public_score", ["publicData","public_question"], _public_score);
  main.variable(observer("artistpublic_uniqueValues")).define("artistpublic_uniqueValues", _artistpublic_uniqueValues);
  main.variable(observer("public_count")).define("public_count", ["artistpublic_uniqueValues","public_score"], _public_count);
  main.variable(observer("data")).define("data", ["artist_counts","public_count"], _data);
  main.variable(observer("viewof selectedSeries")).define("viewof selectedSeries", ["Inputs"], _selectedSeries);
  main.variable(observer("selectedSeries")).define("selectedSeries", ["Generators", "viewof selectedSeries"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","artist_question","data","selectedSeries"], _14);
  return main;
}
