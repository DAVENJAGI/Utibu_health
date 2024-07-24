document.addEventListener('DOMContentLoaded', () => {
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
  
    /* function calculateHourlyCounts(data) {
      const hourlyCounts = new Array(24).fill(0);
  
      data.forEach(d => {
        const date = new Date(d.created_at);
        const hour = date.getHours();
        hourlyCounts[hour]++;
      });
  
      return hourlyCounts.map((count, hour) => ({ hour, count }));
    }
    function calculateHourlyCounts(data) {
        const halfHourCounts = new Array(24 * 2).fill(0); // 24 hours * 2 half-hour intervals per hour
        
        data.forEach(d => {
            const date = new Date(d.created_at);
            const hour = date.getHours();
            const minutes = date.getMinutes();
            const halfHourInterval = Math.floor(minutes / 30);
            const index = hour * 2 + halfHourInterval;
            halfHourCounts[index]++;
        });
    
        return halfHourCounts.map((count, index) => ({ hour: Math.floor(index / 2), interval: index % 2, count }));
    }
    
    function calculateHourlyCounts(data) {
    // Initialize an array to hold counts for each minute of each hour
    const minuteCounts = new Array(24).fill(0).map(() => new Array(60).fill(0));

    // Iterate over the data and count occurrences for each minute
    data.forEach(d => {
        const date = new Date(d.created_at);
        const hour = date.getHours();
        const minute = date.getMinutes();
        minuteCounts[hour][minute]++;
    });

    // Transform the minuteCounts array into an array of objects
    // Each object represents the hour, minute, and count of requests
    const result = [];
    minuteCounts.forEach((hourlyCounts, hour) => {
        hourlyCounts.forEach((count, minute) => {
            result.push({ hour, minute, count });
        });
    });

    return result;
    }*/
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
      const xScale = d3.scaleTime()
        .domain([new Date(2024, 7, 24, 0, 0), new Date(2024, 7, 24, 23, 59)])
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
});


/*document.addEventListener('DOMContentLoaded', () => {
    const requestsMade = `http://0.0.0.0:5000/api/v1/requests`;

    const width = 1450;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
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

    // Function counting number of requests
   /* function calculateHourlyCounts(data) {
        const hourlyCounts = new Array(24).fill(0);

        data.forEach(d => {
            const hour = new Date(d.created_at).getHours();
            hourlyCounts[hour]++;
        });

        return hourlyCounts.map((count, hour) => ({ hour, count }));
    }

    function calculateHourlyCounts(data) {
        const tenMinuteCounts = new Array(24 * 30).fill(0); 
    
        data.forEach(d => {
            const date = new Date(d.created_at);
            const hour = date.getHours();
            const minutes = date.getMinutes();
            const tenMinuteInterval = Math.floor(minutes / 2);
            const index = hour * 30 + tenMinuteInterval;
            tenMinuteCounts[index]++;
        });
    
        return tenMinuteCounts.map((count, index) => ({ hour: Math.floor(index / 30), interval: index % 30, count }));
    }
   
    function calculateHourlyCounts(data) {
        const minuteCounts = new Array(24 * 60).fill(0); // 24 hours * 60 one-minute intervals per hour
    
        data.forEach(d => {
            const date = new Date(d.created_at);
            const hour = date.getHours();
            const minutes = date.getMinutes();
            const index = hour * 60 + minutes;
            minuteCounts[index]++;
        });
    
        return minuteCounts.map((count, index) => ({ hour: Math.floor(index / 60), minute: index % 60, count }));
    }
   



    function drawChart(parsedData) {
        // Select the container where the chart will be appended
        const svg = d3.select("#line_graph")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Define xScale and yScale
        const xScale = d3.scaleTime()
            .domain(d3.extent(parsedData, d => d.date)) // .domain([new Date(0, 0, 0, 0), new Date(0, 0, 0, 23, 59)])  // .domain([0, 23])   
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(parsedData, d => d.count)])
            .nice()
            .range([innerHeight, 0]);

        // Define xAxis and yAxis
        const xAxis = d3.axisBottom(xScale)
            .ticks(24) // .ticks(d3.timeHour.every(1))
            .tickFormat(d3.timeFormat("%H:%M"));    //.tickFormat(d => d + ":00" + "hrs");

        const yAxis = d3.axisLeft(yScale);

        // Append x-axis
        svg.append("g")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(xAxis);

        // Append y-axis
        svg.append("g")
            .call(yAxis);

        // Define the line generator
        const line = d3.line()
            .x(d => xScale(d.hour))
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
});*/


/*document.addEventListener('DOMContentLoaded', () => {
    const requestsMade = `http://0.0.0.0:5000/api/v1/requests`;

    const width = 985;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    
    
    fetch(requestsMade)
        .then(response => response.json())
        .then(data => {
        
            const parsedData = data.map(d => ({
                hour: new Date(d.created_at).getHours(),
                count: 10000,
            }));
        drawChart(parsedData);
        })
        .catch(error => console.error(error)); 


  function drawChart(parsedData) {
    const svg = d3.select("#line_graph")
    .append("svg")
        .attr("width", width)
        .attr("height", height)
    .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain([0, 24])
        .range([0, innerWidth]);
    
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(parsedData, d => d.count)])
        .range([innerHeight, 0]);
    
    const xAxis = d3.axisBottom(xScale)
        .ticks(24)
        .tickFormat(d => d + ":00" + "hrs");
    
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis);
    
    svg.append("g")
        .call(yAxis);
    
    const line = d3.line()
        .x(d => xScale(d.hour))
        .y(d => yScale(d.count));
    
    svg.append("path")
        .datum(parsedData)
        .attr("fill", "none")
        .attr("stroke", "#00D9FF")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);    
  }

/*
    const svg = d3.select("#line_graph")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain([0, 24])
        .range([0, innerWidth]);
    
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(parsedData, d => d.count)])
        .range([innerHeight, 0]);
    
    const xAxis = d3.axisBottom(xScale)
        .ticks(24)
        .tickFormat(d => d + ":00" + "hrs");
    
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis);
    
    svg.append("g")
        .call(yAxis);
    
    const line = d3.line()
        .x(d => xScale(d.hour))
        .y(d => yScale(d.count));
    
    svg.append("path")
        .datum(parsedData)
        .attr("fill", "none")
        .attr("stroke", "#00D9FF")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);
});*/