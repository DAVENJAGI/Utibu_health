/* document.addEventListener('DOMContentLoaded', () => {
    const requestsMade = `http://0.0.0.0:5000/api/v1/requests`;
  
    const width = 1450;
    
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 60, left: 50 };
    // const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    // const width = window.innerWidth - margin.left - margin.right;
    innerWidth = width - margin.left - margin.right;
  
    let parsedData;
  
    fetch(requestsMade)
      .then(response => response.json())
      .then(data => {
        console.log('Requests made', data);
        parsedData = calculateHourlyCounts(data);
        drawChart(parsedData);
      })
      .catch(error => console.error(error));
  
    
    function calculateHourlyCounts(data) {
        // for every twelve minutes
        const twelfthHourCounts = new Array(24 * 12).fill(0);
        
        data.forEach(d => {
            const date = new Date(d.created_at);
            const hour = date.getHours();
            const minutes = date.getMinutes();
            const twelfthHourInterval = Math.floor(minutes / 5);
            const index = hour * 12 + twelfthHourInterval;
            twelfthHourCounts[index]++;
        });
    
        return twelfthHourCounts.map((count, index) => ({ hour: Math.floor(index / 12), interval: index % 12, count }));
    }

    

  
    function drawChart(parsedData) {
      const svg = d3.select("#line_graph")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
      // Define xScale and yScale
      const xScale = d3.scaleLinear()
        .domain([new Date(2024, 0, 1, 0, 0), new Date(2024, 0, 1, 23, 59)])
        .range([0, innerWidth]);
  
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(parsedData, d => d.count)])
        .nice()
        .range([innerHeight, 0]);

      const xAxisLabel = "Time of Day"; 
      const yAxisLabel = "Number of API Requests Made"
  
      const xAxis = d3.axisBottom(xScale)
      .ticks(d3.timeHour.every(1)) 
      .tickFormat(d3.timeFormat("%H:%M"));
  
      const yAxis = d3.axisLeft(yScale);
  
      
      svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis);
      
        svg.append("text")
        .attr("class", "x-axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + margin.top + 20)
        .style("text-anchor", "middle")
        .text(xAxisLabel);
    
      svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis);

      svg.append("text")
        .attr("class", "y-axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -margin.left)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(yAxisLabel);

      const line = d3.line()
        .x(d => xScale(new Date(2024, 7, 24, d.hour, 0))) 
        .y(d => yScale(d.count));
  
      // Append the line path
      svg.append("path")
        .datum(parsedData)
        .attr("fill", "none")
        .attr("stroke", "#00D9FF")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);
    }
    window.addEventListener("resize", function() {
        drawChart(parsedData); 
      });
});*/
document.addEventListener('DOMContentLoaded', () => {
    const requestsMade = `http://0.0.0.0:5000/api/v1/requests`;
  
    const width = 1450;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 60, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
  
    let parsedData;
  
    fetch(requestsMade)
      .then(response => response.json())
      .then(data => {
        console.log('Requests made', data);
        parsedData = calculateHourlyCounts(data);
        drawChart(parsedData);
      })
      .catch(error => console.error(error));
  
    function calculateHourlyCounts(data) {
        const twelfthHourCounts = new Array(24 * 12).fill(0); // Counts for every 12 minutes
        
        data.forEach(d => {
            const date = new Date(d.created_at);
            const hour = date.getHours();
            const minutes = date.getMinutes();
            const twelfthHourInterval = Math.floor(minutes / 5); // Change this interval as per your requirement
            const index = hour * 12 + twelfthHourInterval;
            twelfthHourCounts[index]++;
        });
    
        return twelfthHourCounts.map((count, index) => ({ hour: Math.floor(index / 12), interval: index % 12, count }));
    }

    function drawChart(parsedData) {
      const svg = d3.select("#line_graph")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
      const xScale = d3.scaleLinear()
        .domain([new Date(2024, 0, 1, 0, 0), new Date(2024, 0, 1, 23, 59)])
        .range([0, innerWidth]);
  
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(parsedData, d => d.count)])
        .nice()
        .range([innerHeight, 0]);

      const xAxisLabel = "Time of Day"; 
      const yAxisLabel = "Number of API Requests Made";
  
      const xAxis = d3.axisBottom(xScale)
        .ticks(d3.timeHour.every(1))
        .tickFormat(d3.timeFormat("%H:%M"));
  
      const yAxis = d3.axisLeft(yScale);
  
      svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis);
      
      svg.append("text")
        .attr("class", "x-axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + margin.top + 20)
        .style("text-anchor", "middle")
        .text(xAxisLabel);
    
      svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis);

      svg.append("text")
        .attr("class", "y-axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -margin.left)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(yAxisLabel);

      const line = d3.line()
        .x(d => xScale(new Date(2024, 0, 1, d.hour, 0))) 
        .y(d => yScale(d.count));
  
      svg.append("path")
        .datum(parsedData)
        .attr("fill", "none")
        .attr("stroke", "#00D9FF")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);
    }

    window.addEventListener("resize", function() {
        drawChart(parsedData); 
    });
});
