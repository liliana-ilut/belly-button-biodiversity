// create a funtion that will read the metadata 
function createMetadata(sample) {
    // read the json file and console log to make sure it works
    d3.json("../docs/samples.json").then((data) => {
    let metadata = data.metadata;
    // console.log(metadata); 
    
    // filter results of the desire items
    let resultMetadata = metadata.filter(sampleItem => sampleItem.id == sample);
    let result= resultMetadata[0];

    let dashbord = d3.select("#sample-metadata");
    // clear any existing metadata
    dashbord.html("");

    Object.entries(result).forEach(([key, value]) => {
        dashbord.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
});
};

function createCharts(sample) {
    d3.json("../docs/samples.json").then((data) => {
    let samples= data.samples;

    let resultSamples = samples.filter(sampleItem => sampleItem.id == sample);
    let result = resultSamples[0];

    let otuIds = result.otu_ids;
    let otuLabels= result.otu_labels;
    let sampleValues= result.sample_values;

    // Bublle Chart
    let bubbleLayout= {
        title: "Bacteria per culture",
        margin: {t:0},
        hovermode: "closest",
        xaxis: {title: "OTU ID"},
        margin: {t:30}
    };
    let bubbleData= [{
        x:otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
            size: sampleValues,
            color: otuIds,
            colorscale: "Earth"
        }
    }];

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    let yticks = otuIds.slice(0,10).map(otuIds=> `OTU ${otuIds}`).reverse();
    let barData = [ 
        {
            y: yticks,
            x: sampleValues.slice(0,10).reverse(),
            text: otuLabels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }
    ];
    let barLayout= {
        title : "top 10",
        margin: {t:30, l:150}
    };

    Plotly.newPlot("bar", barData, barLayout);

    });
};

function init() {
    let choose= d3.select("#selDataset");
    d3.json("../docs/samples.json").then((data) => {
        let sampleNames= data.names;

        sampleNames.forEach((sample) => {
            choose
                .append("option")
                .text(sample)
                .property("value", sample);
        });
        
        let firstSample= sampleNames[0];
        createCharts(firstSample);
        createMetadata(firstSample);
    });
};

function optionChanged(newSample) {
    createCharts(newSample);
    createMetadata(newSample);
};

init();