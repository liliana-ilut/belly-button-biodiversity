function process(data) {
    let samples = data.map(sample => sample.id);
    console.log(metadata);
    return metadata;
}

d3.json("../docs/samples.json").then(process);


// Fetch the JSON data and console log it 
// d3.json("../docs/samples.json").then((bacteriaData) => {
//     console.log(bacteriaData)
//     // let data = bacteriaData
// });
// //  or this way
// d3.json("../docs/samples.json").then(bacteriaData => {
//     console.log(bacteriaData)
//     // let data = bacteriaData
// });


