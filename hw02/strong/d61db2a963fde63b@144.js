function _1(md){return(
md`# HW2 Strong baseline(2pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _constellationNames(){return(
["牡羊座","金牛座","雙子座","巨蟹座","獅子座","處女作","天秤座","天蠍座","射手座","摩羯座","水瓶座","雙魚座"]
)}

function _constellationCount(){return(
[]
)}

function _plot2(Inputs){return(
Inputs.form({
	mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
	mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
	mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
	ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _6(constellationNames,constellationCount,data)
{
  constellationNames.forEach(constellationName => {
    constellationCount.push({Constellation : constellationName, Gender : "男", count : 0});
    constellationCount.push({Constellation : constellationName, Gender : "女", count : 0});
  });

  data.forEach(people => {
    let index = people.Constellation * 2 + (people.Gender == "男" ? 0 : 1);
    constellationCount[index].count++;
  })
  return constellationCount;
}


function _7(Plot,plot2,constellationCount){return(
Plot.plot({
  marginTop: plot2.mt,
  marginRight: plot2.mr,
  marginBottom: plot2.mb,
  marginLeft: plot2.ml,
  
  grid: true,
  y: {label: "count"},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(constellationCount, {x: "Constellation", y: "count", tip: true , fill:"Gender"}),
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../src/data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("constellationNames")).define("constellationNames", _constellationNames);
  main.variable(observer("constellationCount")).define("constellationCount", _constellationCount);
  main.variable(observer("viewof plot2")).define("viewof plot2", ["Inputs"], _plot2);
  main.variable(observer("plot2")).define("plot2", ["Generators", "viewof plot2"], (G, _) => G.input(_));
  main.variable(observer()).define(["constellationNames","constellationCount","data"], _6);
  main.variable(observer()).define(["Plot","plot2","constellationCount"], _7);
  return main;
}
