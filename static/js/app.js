// 
// d3.json("samples.json").then((data) => {
//     let metadata = data.metadata;
//       console.log(data) // 
//     });

// create a bar chart
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


    });