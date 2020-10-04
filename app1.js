// create a funtion that will read the metadata 
function createMetadata(sample) {
    // read the json file and console log to make sure it works
    d3.json("samples.json").then((data) => {
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
// create a function that will create charts
function createCharts(sample) {
    d3.json("samples.json").then((data) => {
    let samples= data.samples;

    let resultSamples = samples.filter(sampleItem => sampleItem.id == sample);
    let result = resultSamples[0];

    let otuIds = result.otu_ids;
    let otuLabels= result.otu_labels;
    let sampleValues= result.sample_values;

    // Bubble Chart
    let bubbleLayout= {
        title: "Bacteria per culture",
        margin: {t:0},
        hovermode: "closest",
        xaxis: {title: "OTU IDs"},
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
    // plot the new bubble chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    // create the bar chart
    let yticks = otuIds.slice(0,10).map(otuIds=> `OTU ${otuIds}`).reverse();
    let barData = [ 
        {
            y: yticks,
            x: sampleValues.slice(0,10).reverse(),
            text: otuLabels.slice(0,10).reverse(),
            type: "bar",
            marker: {
                color: "rgba(153, 0, 204,0.5)",
                line: {
                    color: "rgba(153, 255, 102,1)",
                    width: 3}
            },
            orientation: "h"
        }
    ];
    let barLayout= {
        title : "Top ten OTUs found",
        margin: {t:30, l:150}
    };
    // plot the new bar chart
    Plotly.newPlot("bar", barData, barLayout);

    });
};
// create a funtion that will tie together the other functions we created above 
function init() {
    let choose= d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
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