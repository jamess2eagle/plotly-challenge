
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
        
        //setting and selecting top 10 values
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

        var layout2 = {
            xaxis:{title: "OTU ID"},
            title: "volume by OTU ID",
            height: 700,
            width: 1170
        };

        Plotly.newPlot("bubble", data2, layout2);


        var sample2 = filteredData[0].metadata.filter(row => row.id.toString() === id)[0];
        var demo = d3.select("#sample-metadata");
        demo.selectAll("div").remove();
        console.log(sample2);
        demo.append("div").text(`id: ${sample2.id}`);
        demo.append("div").text(`ethinicity: ${sample2.ethinicity}`);
        demo.append("div").text(`gender: ${sample2.gender}`);
        demo.append("div").text(`age: ${sample2.age}`);
        demo.append("div").text(`location: ${sample2.location}`);
        demo.append("div").text(`bbtype: ${sample2.bbtype}`);
        demo.append("div").text(`wfreq: ${sample2.wfreq}`);

    });
};

//handling dropdown menu
function optionChanged(id) {
    plotid(id);
}

//default option
plotid("940");