
function buildMetadata(sample){
    d3.json("samples.json").then((data) => {
        let metadata = data.metadata; 
        // console.log(data) // 
});

let resultArray = metadata.filter(sampleObject => sampleObject.id ==sample);
let result = resultArray[0];
let PANEL = d3.select("sample-metadata");
PANEL.html("");

Object.entires(result).forEach(([key, value])=> {
    PANEL
        .append("h6")
        .text(`${key.toUpperCase()}: ${value}`);
});
// create a bar chart
function buildCharts(sample) {
d3.json("samples.json").then((data) => {
    let samples = data.samples;
    //   console.log(samples) 
    //   bd = bacteria data   
      let sampleValues = samples.map(bd => bd.sample_values);
      let otuIds = samples.map(bd => bd.otu_ids);
      let otuLabels = samples.map(bd => bd.otu_labels);
      let sampleIds = samples.map(bd => bd.id);

      console.log(sampleValues);
      console.log(otuIds);
      console.log(otuLabels);
      console.log(sampleIds);

      let resultArray= sample.filter(sampleObject => sampleObject.id ==sample);
      let reuslt = resultArray[0];
      
    
      let yticks = otuIds.slice(0, 10).map(otuIds => `OTU ${otuIds}`).reverse();
      let barData = [
        {
          y: yticks,
          x: sampleValues.slice(0, 10).reverse(),
          text: otuLabels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        }
      ];
  
      let barLayout = {
        title: "Top 10 Bacteria Cultures",
        margin: { t: 30, l: 150 }
      };
  
      Plotly.newPlot("bar", barData, barLayout);

   // create a bubble chart   
        let bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30}
  };
        let bubbleData = [
    {
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: "markers",
      marker: {
        size: sampleValues,
        color: otuIds,
        colorscale: "Earth"
      }
    }
  ];

  Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    });
};
function init(){
    // refereance to the dropwdown select element 
    let choose = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
    let sampleNames = data.names;

    sampleNames.forEach((sample)=> {
        choose
            .append("option")
            .text(sample)
            .property("value", sample);

    let firstSample = sampleNames[0];
    buildChart(firstSample);
    buildMetadata(firstSample);
    });
});

};
function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  };

// init();//