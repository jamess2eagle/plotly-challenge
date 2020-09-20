
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }

//plots the graph
function plotid(id) {
    //grabs json data
    d3.json("data/samples.json").then((filteredData) => {
        var name = (filteredData[0].names);
        
        console.log(filteredData);

        //appending dropdown menu
        var dropdown = d3.selectAll("#selDataset")
        name.forEach((row) => {
            dropdown
            .append("option")
            .attr("value", row)
            .text(row);
        });
        
        //filtering and sorting top 10 values
        var sample = filteredData[0].samples.filter(row => row.id === id);
        var otu_ids = sample.map(row => row.otu_ids)[0].slice(0,10).reverse();
        var otu_no = otu_ids.map(count => "OTU " + count);
        var otu_labels = sample.map(row => row.otu_labels)[0].slice(0,10).reverse();
        var valueCount = sample.map(row => row.sample_values)[0].slice(0,10).reverse();

        //setting trace for bar chart
        var trace1 = {
            x: valueCount,
            y: otu_no,
            text: otu_labels,
            type: "bar",
            orientation: "h"
        };
        var data = [trace1];

        //setting layout for bar chart
        var layout = {
            yaxis: {
                tickmode:"linear"
            },
            title: "Top 10 OTUs found"
        };

        //plotting bar chart
        Plotly.newPlot("bar", data, layout);

        //trace for bubble plot
        var trace2 = {
            x: otu_ids = sample.map(row => row.otu_ids)[0],
            y: sample.map(row => row.sample_values)[0],
            mode: "markers",
            marker: {
                size: sample.map(row => row.sample_values)[0],
                color: sample.map(row => row.otu_ids)[0]
            },
            text: sample.map(row => row.otu_labels)[0]
        };

        data2 = [trace2];

        //layout for bubble plot
        var layout2 = {
            xaxis:{title: "OTU ID"},
            title: "volume by OTU ID",
            height: 700,
            width: 1170
        };
        
        //plotting bubble
        Plotly.newPlot("bubble", data2, layout2);

        //filtering demographic info
        var sample2 = filteredData[0].metadata.filter(row => row.id.toString() === id)[0];
        var demo = d3.select("#sample-metadata");
        //remove & append demographic info
        demo.selectAll("div").remove();
        demo.append("div").text(`id: ${sample2.id}`);
        demo.append("div").text(`ethinicity: ${sample2.ethinicity}`);
        demo.append("div").text(`gender: ${sample2.gender}`);
        demo.append("div").text(`age: ${sample2.age}`);
        demo.append("div").text(`location: ${sample2.location}`);
        demo.append("div").text(`bbtype: ${sample2.bbtype}`);
        demo.append("div").text(`wfreq: ${sample2.wfreq}`);
        
        //filtering gauge plot
        var frequency = filteredData[0].metadata.filter(row => row.id.toString() === id)[0].wfreq;
        
        //trace for gauge plot
        var trace3 = [
            {
            domain: { x: [0, 1], y: [0, 1] },
            value: frequency,
            title: { text: "Weekly Washing Frequency"},
            type: "indicator",
            
            mode: "gauge+number",
            gauge: { axis: { range: [null, 9] },
                     steps: [
                      { range: [0, 1], color: "#ffffe5"},
                      { range: [1, 2], color: "#fdfeda"},
                      { range: [2, 3], color: "#fbfdcf"},
                      { range: [3, 4], color: "#f7fcc5"},
                      { range: [4, 5], color: "#f3fabd"},
                      { range: [5, 6], color: "#eef8b5"},
                      { range: [6, 7], color: "#e7f6ae"},
                      { range: [7, 8], color: "#dff2a8"},
                      { range: [8, 9], color: "#d6efa3"},
                    ]} 
            }
          ];
        
        //gauge layout
          var layout3 = { 
              margin: { t: 20, b: 40, l:100, r:100 } 
            };
        //plotting gauge plot
          Plotly.newPlot("gauge", trace3, layout3);
        

    });
};

//handling dropdown menu
function optionChanged(id) {
    plotid(id);
}

//default option
plotid("940");