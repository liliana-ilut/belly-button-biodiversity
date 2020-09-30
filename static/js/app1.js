
function createMetadata(sample) {
    // read the json file and console log to make sure it works
    d3.json("../docs/samples.json").then((data) => {
    let metadata = data.metadata;
    // console.log(data); 
    });
    // filter results of the desire items
    let resultMetadata = metadata.filter(sampleItem => sampleItem.id == sample);
    let result= resultMetadata[0];

    let dashbord = d3.select("#sample-metadata");
    // clear any existing metadata
    dashbord.html("");

    Object.defineProperties(result).forEach(([key, value]) => {
        dashbord.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
};
