// get the json data
d3.json("../docs/samples.json").then((bacteriaData) => {
    console.log(bacteriaData);
    let data = bacteriaData
});


// => {
//     //  Create the Traces
//     var trace1 = {
//       x: data.names,
//     //   y: data.survival.map(val => Math.sqrt(val)),
//       type: "box",
//       name: "Cancer Survival",
//       boxpoints: "all"
//     };
//     // Create the data array for the plot
//   var data = [trace1];

//   // Define the plot layout
//   var layout = {
//     title: "Square Root of Cancer Survival by Organ",
//     xaxis: { title: "Organ" },
//     // yaxis: { title: "Square Root of Survival" }
//   };

//   // Plot the chart to a div tag with id "plot"
//   Plotly.newPlot("plot", data, layout);
// });