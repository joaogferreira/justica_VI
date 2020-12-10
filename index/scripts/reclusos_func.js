var portugal = "portugal";
var continente = "continente";
var acores = "acores";
var madeira = "madeira";


window.onload = function(){
    d3.csv("data/reclusos_2019.csv").then(function(sample) {
      const svg = d3.select('svg');
      const svgContainer = d3.select('#container');
      
      const margin = 80;
      const width = 1000 - 2 * margin;
      const height = 600 - 2 * margin;


      const chart = svg.append('g').attr('transform', `translate(${margin}, ${margin})`);

      const xScale = d3.scaleBand()
          .range([0, width])
          .domain(sample.map((s) => s.type))
          .padding(0.1)
        
        
      var biggest_value=0;
      for (x in sample){
        if (+sample[x].value>biggest_value){
          biggest_value=sample[x].value;
        }
      }

      const yScale = d3.scaleLinear()
          .range([height, 0])
          .domain([0, biggest_value]);
        
      
      const makeYLines = () => d3.axisLeft()
          .scale(yScale)
    
      chart.append('g')
          .attr('transform', `translate(0, ${height})`)
          .call(d3.axisBottom(xScale))
          .selectAll(".tick text")  
      .call(wrap, xScale.bandwidth());
    
      chart.append('g')
          .call(d3.axisLeft(yScale));

      chart.append('g')
        .attr('class', 'grid')
        .call(makeYLines()
          .tickSize(-width, 0, 0)
          .tickFormat('')
        )
      
      const barGroups = chart.selectAll()
        .data(sample)
        .enter()
        .append('g')
      
      barGroups.append('rect')
        .attr('class', 'bar')
        .attr('x', (g) => xScale(g.type))
        .attr('y', (g) => yScale(g.value))
        .attr('height', (g) => height - yScale(g.value))
        .attr('width', xScale.bandwidth())
        .on('mouseenter', function (actual, i) {
          d3.selectAll('.value')
            .attr('opacity', 1)
  
          d3.select(this)
            .transition()
            .duration(300)
            .attr('opacity', 1)
            .attr('x', (a) => xScale(a.type) - 5)
            .attr('width', xScale.bandwidth() + 10)
  
          const y = yScale(actual.value)
  
          line = chart.append('line')
            .attr('id', 'limit')
            .attr('x1', 0)
            .attr('y1', y)
            .attr('x2', width)
            .attr('y2', y)
  
            barGroups.append('text')
            .attr('class', 'divergence')
            .attr('x', (a) => xScale(a.type) + xScale.bandwidth() / 2)
            .attr('y', (a) => yScale(a.value)- 20)
            .attr('fill', 'white')
            .attr('text-anchor', 'middle')
            .text((a, idx) => {
              const divergence = (a.value - actual.value).toFixed(1)
              
              let text = ''
              if (divergence > 0) text += '+'
              text += `${divergence}`
  
              return idx !== i ? text : '';
            })
        })

        .on('mouseleave', function () {
          d3.selectAll('.value')
            .attr('opacity', 1)
  
          d3.select(this)
            .transition()
            .duration(300)
            .attr('opacity', 1)
            .attr('x', (a) => xScale(a.type))
            .attr('width', xScale.bandwidth())
  
          chart.selectAll('#limit').remove()
          chart.selectAll('.divergence').remove()
        })
      
        barGroups.append('text')
            .attr('class', 'value')
            .attr('x', (a) => xScale(a.type) + xScale.bandwidth() / 10 + 30)
            .attr('y', (a) => yScale(a.value))
            .attr('text-anchor', 'start')
            .text((a) => `${a.value}`)
          
        svg.append('text')
            .attr('class', 'label')
            .attr('x', -(height / 2) - margin)
            .attr('y', margin / 2.4 - 15)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Valor')
      
        svg.append('text')
            .attr('class', 'label')
            .attr('x', width / 2 + margin)
            .attr('y', 650)
            .attr('text-anchor', 'middle')
            .text('Tipos de crime')
      
        svg.append('text')
            .attr('class', 'title')
            .attr('x', width / 2 + margin)
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .text('Reclusos condenados em Portugal no ano 2019');
      
        svg.append('text')
            .attr('class', 'source')
            .attr('x', width - margin / 2)
            .attr('y', 800)
            .attr('text-anchor', 'start')
            .text('Source: INE, 2020')
      });       
}


async function update(newYear) {
    if(newYear ==undefined){
        return;
    }

    else if(newYear=="2015"){
      
      d3.selectAll("svg > *").remove();
      
      d3.csv("data/reclusos_2015.csv").then(function(sample) {
        const svg = d3.select('svg');
        const svgContainer = d3.select('#container');
        
        //Dimensions
        const margin = 80;
        const width = 1000 - 2 * margin;
        const height = 600 - 2 * margin;

        const chart = svg.append('g').attr('transform', `translate(${margin}, ${margin})`);

        const xScale = d3.scaleBand()
            .range([0, width])
            .domain(sample.map((s) => s.type))
            .padding(0.1)
        
        
        //Determinar maior valor para a escala de Y
        var biggest_value=0;
        for (x in sample){
          if (+sample[x].value>biggest_value){
            biggest_value=sample[x].value;
          }
        }

        const yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, biggest_value]);
          
        
        const makeYLines = () => d3.axisLeft().scale(yScale)
      
        chart.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale))
            .selectAll(".tick text")  
            .call(wrap, xScale.bandwidth());
      
        chart.append('g').call(d3.axisLeft(yScale));

        chart.append('g')
          .attr('class', 'grid')
          .call(makeYLines()
            .tickSize(-width, 0, 0)
            .tickFormat('')
          )
    
        const barGroups = chart.selectAll()
          .data(sample)
          .enter()
          .append('g')
      
        barGroups.append('rect')
          .attr('class', 'bar')
          .attr('x', (g) => xScale(g.type))
          .attr('y', (g) => yScale(g.value))
          .attr('height', (g) => height - yScale(g.value))
          .attr('width', xScale.bandwidth())
          .on('mouseenter', function (actual, i) {
            d3.selectAll('.value')
              .attr('opacity', 1)
      
            d3.select(this)
              .transition()
              .duration(300)
              .attr('opacity', 1)
              .attr('x', (a) => xScale(a.type) - 5)
              .attr('width', xScale.bandwidth() + 10)
      
            const y = yScale(actual.value)
    
            line = chart.append('line')
              .attr('id', 'limit')
              .attr('x1', 0)
              .attr('y1', y)
              .attr('x2', width)
              .attr('y2', y)
    
            barGroups.append('text')
              .attr('class', 'divergence')
              .attr('x', (a) => xScale(a.type) + xScale.bandwidth() / 2)
              .attr('y', (a) => yScale(a.value)- 20)
              .attr('fill', 'white')
              .attr('text-anchor', 'middle')
              .text((a, idx) => {
                const divergence = (a.value - actual.value).toFixed(1)
                
                let text = ''
                if (divergence > 0) text += '+'
                text += `${divergence}`
    
                return idx !== i ? text : '';
              })
            })

          .on('mouseleave', function () {
            d3.selectAll('.value')
              .attr('opacity', 1)
    
            d3.select(this)
              .transition()
              .duration(300)
              .attr('opacity', 1)
              .attr('x', (a) => xScale(a.type))
              .attr('width', xScale.bandwidth())
    
            chart.selectAll('#limit').remove()
            chart.selectAll('.divergence').remove()
          })
      
          barGroups .append('text')
            .attr('class', 'value')
            .attr('x', (a) => xScale(a.type) + xScale.bandwidth() / 10 + 30)
            .attr('y', (a) => yScale(a.value))
            .attr('text-anchor', 'start')
            .text((a) => `${a.value}`)
          
          svg.append('text')
            .attr('class', 'label')
            .attr('x', -(height / 2) - margin)
            .attr('y', margin / 2.4 - 15)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Valor')
      
          svg.append('text')
            .attr('class', 'label')
            .attr('x', width / 2 + margin)
            .attr('y', 650)
            .attr('text-anchor', 'middle')
            .text('Tipos de crime')
      
          svg.append('text')
            .attr('class', 'title')
            .attr('x', width / 2 + margin)
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .text('Reclusos condenados em Portugal no ano ' + newYear)
      
          svg.append('text')
            .attr('class', 'source')
            .attr('x', width - margin / 2)
            .attr('y', 800)
            .attr('text-anchor', 'start')
            .text('Source: INE, 2020')
        
      });
    }

    else if (newYear=="2016"){
      d3.selectAll("svg > *").remove();
      
      d3.csv("data/reclusos_2016.csv").then(function(sample) {      
        const svg = d3.select('svg');
        const svgContainer = d3.select('#container');
        
        const margin = 80;
        const width = 1000 - 2 * margin;
        const height = 600 - 2 * margin;


        const chart = svg.append('g').attr('transform', `translate(${margin}, ${margin})`);

        const xScale = d3.scaleBand()
            .range([0, width])
            .domain(sample.map((s) => s.type))
            .padding(0.1)
        
        
        var biggest_value=0;
        for (x in sample){
          if (+sample[x].value>biggest_value){
            biggest_value=sample[x].value;
          }
        }
        const yScale = d3.scaleLinear().range([height, 0]).domain([0, biggest_value]);
              
        const makeYLines = () => d3.axisLeft().scale(yScale);
      
        chart.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale))
            .selectAll(".tick text")  
            .call(wrap, xScale.bandwidth());
      
        chart.append('g')
            .call(d3.axisLeft(yScale));

        chart.append('g')
            .attr('class', 'grid')
            .call(makeYLines()
              .tickSize(-width, 0, 0)
              .tickFormat('')
            )
      
        const barGroups = chart.selectAll()
            .data(sample)
            .enter()
            .append('g')
      
        barGroups.append('rect')
            .attr('class', 'bar')
            .attr('x', (g) => xScale(g.type))
            .attr('y', (g) => yScale(g.value))
            .attr('height', (g) => height - yScale(g.value))
            .attr('width', xScale.bandwidth())
            .on('mouseenter', function (actual, i) {
              d3.selectAll('.value')
                .attr('opacity', 1)
      
              d3.select(this)
                .transition()
                .duration(300)
                .attr('opacity', 1)
                .attr('x', (a) => xScale(a.type) - 5)
                .attr('width', xScale.bandwidth() + 10)
      
              const y = yScale(actual.value)
      
              line = chart.append('line')
                .attr('id', 'limit')
                .attr('x1', 0)
                .attr('y1', y)
                .attr('x2', width)
                .attr('y2', y)
      
              barGroups.append('text')
                .attr('class', 'divergence')
                .attr('x', (a) => xScale(a.type) + xScale.bandwidth() / 2)
                .attr('y', (a) => yScale(a.value)- 20)
                .attr('fill', 'white')
                .attr('text-anchor', 'middle')
                .text((a, idx) => {
                  const divergence = (a.value - actual.value).toFixed(1)
                  
                  let text = ''
                  if (divergence > 0) text += '+'
                  text += `${divergence}`
      
                  return idx !== i ? text : '';
                })
            })
            .on('mouseleave', function () {
              d3.selectAll('.value')
                .attr('opacity', 1)
      
              d3.select(this)
                .transition()
                .duration(300)
                .attr('opacity', 1)
                .attr('x', (a) => xScale(a.type))
                .attr('width', xScale.bandwidth())
      
              chart.selectAll('#limit').remove()
              chart.selectAll('.divergence').remove()
            })
      
          barGroups.append('text')
            .attr('class', 'value')
            .attr('x', (a) => xScale(a.type) + xScale.bandwidth() / 10 + 30 )
            .attr('y', (a) => yScale(a.value))
            .attr('text-anchor', 'start')
            .text((a) => `${a.value}`)
          
          svg.append('text')
            .attr('class', 'label')
            .attr('x', -(height / 2) - margin)
            .attr('y', margin / 2.4 - 15)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Valor')
      
          svg.append('text')
            .attr('class', 'label')
            .attr('x', width / 2 + margin)
            .attr('y', 650)
            .attr('text-anchor', 'middle')
            .text('Tipos de crime')
      
          svg.append('text')
            .attr('class', 'title')
            .attr('x', width / 2 + margin)
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .text('Reclusos condenados em Portugal no ano ' + newYear)
      
          svg.append('text')
            .attr('class', 'source')
            .attr('x', width - margin / 2)
            .attr('y', 800)
            .attr('text-anchor', 'start')
            .text('Source: INE, 2020')
      });
    }
    else if (newYear=="2017"){
      d3.selectAll("svg > *").remove();
      
      d3.csv("data/reclusos_2017.csv").then(function(sample) {
        const svg = d3.select('svg');
        const svgContainer = d3.select('#container');
        
        const margin = 80;
        const width = 1000 - 2 * margin;
        const height = 600 - 2 * margin;


        const chart = svg.append('g').attr('transform', `translate(${margin}, ${margin})`);

        const xScale = d3.scaleBand()
            .range([0, width])
            .domain(sample.map((s) => s.type))
            .padding(0.1)
        
        
        var biggest_value=0;
        for (x in sample){
          if (+sample[x].value>biggest_value){
            biggest_value=sample[x].value;
          }
        }
        
        const yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, biggest_value]);
          
        
        const makeYLines = () => d3.axisLeft()
            .scale(yScale)
      
        chart.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale))
            .selectAll(".tick text")  
            .call(wrap, xScale.bandwidth());
      
        chart.append('g')
            .call(d3.axisLeft(yScale));

        chart.append('g')
            .attr('class', 'grid')
            .call(makeYLines()
              .tickSize(-width, 0, 0)
              .tickFormat('')
            )
      
        const barGroups = chart.selectAll()
            .data(sample)
            .enter()
            .append('g')
      
        barGroups.append('rect')
            .attr('class', 'bar')
            .attr('x', (g) => xScale(g.type))
            .attr('y', (g) => yScale(g.value))
            .attr('height', (g) => height - yScale(g.value))
            .attr('width', xScale.bandwidth())
            .on('mouseenter', function (actual, i) {
              d3.selectAll('.value')
                .attr('opacity', 1)
      
              d3.select(this)
                .transition()
                .duration(300)
                .attr('opacity', 1)
                .attr('x', (a) => xScale(a.type) - 5)
                .attr('width', xScale.bandwidth() + 10)
      
              const y = yScale(actual.value)
      
              line = chart.append('line')
                .attr('id', 'limit')
                .attr('x1', 0)
                .attr('y1', y)
                .attr('x2', width)
                .attr('y2', y)
      
              barGroups.append('text')
                .attr('class', 'divergence')
                .attr('x', (a) => xScale(a.type) + xScale.bandwidth() / 2)
                .attr('y', (a) => yScale(a.value)- 20)
                .attr('fill', 'white')
                .attr('text-anchor', 'middle')
                .text((a, idx) => {
                  const divergence = (a.value - actual.value).toFixed(1)
                  
                  let text = ''
                  if (divergence > 0) text += '+'
                  text += `${divergence}`
      
                  return idx !== i ? text : '';
                })
            })
            .on('mouseleave', function () {
              d3.selectAll('.value')
                .attr('opacity', 1)
      
              d3.select(this)
                .transition()
                .duration(300)
                .attr('opacity', 1)
                .attr('x', (a) => xScale(a.type))
                .attr('width', xScale.bandwidth())
      
              chart.selectAll('#limit').remove()
              chart.selectAll('.divergence').remove()
            })
      
          barGroups.append('text')
            .attr('class', 'value')
            .attr('x', (a) => xScale(a.type) + xScale.bandwidth() / 10 + 30 )
            .attr('y', (a) => yScale(a.value))
            .attr('text-anchor', 'start')
            .text((a) => `${a.value}`)
          
          svg.append('text')
            .attr('class', 'label')
            .attr('x', -(height / 2) - margin)
            .attr('y', margin / 2.4 - 15)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Valor')
      
          svg.append('text')
            .attr('class', 'label')
            .attr('x', width / 2 + margin)
            .attr('y', 650)
            .attr('text-anchor', 'middle')
            .text('Tipos de crime')
      
          svg.append('text')
            .attr('class', 'title')
            .attr('x', width / 2 + margin)
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .text('Reclusos condenados em Portugal no ano ' + newYear)
          
          svg.append('text')
            .attr('class', 'source')
            .attr('x', width - margin / 2)
            .attr('y', 800)
            .attr('text-anchor', 'start')
            .text('Source: INE, 2020')
      });
    }
    else if(newYear=="2018"){
      d3.selectAll("svg > *").remove();
      
      d3.csv("data/reclusos_2018.csv").then(function(sample) {
        const svg = d3.select('svg');
        const svgContainer = d3.select('#container');
        
        const margin = 80;
        const width = 1000 - 2 * margin;
        const height = 600 - 2 * margin;

        const chart = svg.append('g').attr('transform', `translate(${margin}, ${margin})`);

        const xScale = d3.scaleBand()
            .range([0, width])
            .domain(sample.map((s) => s.type))
            .padding(0.1)
        
        
        var biggest_value=0;
        for (x in sample){
          if (+sample[x].value>biggest_value){
            biggest_value=sample[x].value;
          }
        }

        const yScale = d3.scaleLinear().range([height, 0]).domain([0, biggest_value]);
          
        const makeYLines = () => d3.axisLeft()
            .scale(yScale);
      
        chart.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale))
            .selectAll(".tick text")  
            .call(wrap, xScale.bandwidth());
      
        chart.append('g')
            .call(d3.axisLeft(yScale));

        chart.append('g')
            .attr('class', 'grid')
            .call(makeYLines()
              .tickSize(-width, 0, 0)
              .tickFormat('')
            )
      
        const barGroups = chart.selectAll()
            .data(sample)
            .enter()
            .append('g')
      
        barGroups.append('rect')
            .attr('class', 'bar')
            .attr('x', (g) => xScale(g.type))
            .attr('y', (g) => yScale(g.value))
            .attr('height', (g) => height - yScale(g.value))
            .attr('width', xScale.bandwidth())
            .on('mouseenter', function (actual, i) {
              d3.selectAll('.value')
                .attr('opacity', 1)
      
              d3.select(this)
                .transition()
                .duration(300)
                .attr('opacity', 1)
                .attr('x', (a) => xScale(a.type) - 5)
                .attr('width', xScale.bandwidth() + 10)
      
              const y = yScale(actual.value)
      
              line = chart.append('line')
                .attr('id', 'limit')
                .attr('x1', 0)
                .attr('y1', y)
                .attr('x2', width)
                .attr('y2', y)
      
              barGroups.append('text')
                .attr('class', 'divergence')
                .attr('x', (a) => xScale(a.type) + xScale.bandwidth() / 2)
                .attr('y', (a) => yScale(a.value)- 20)
                .attr('fill', 'white')
                .attr('text-anchor', 'middle')
                .text((a, idx) => {
                  const divergence = (a.value - actual.value).toFixed(1)
                  
                  let text = ''
                  if (divergence > 0) text += '+'
                  text += `${divergence}`
      
                  return idx !== i ? text : '';
                })
            })
            .on('mouseleave', function () {
              d3.selectAll('.value')
                .attr('opacity', 1)
      
              d3.select(this)
                .transition()
                .duration(300)
                .attr('opacity', 1)
                .attr('x', (a) => xScale(a.type))
                .attr('width', xScale.bandwidth())
      
              chart.selectAll('#limit').remove()
              chart.selectAll('.divergence').remove()
            })
      
          barGroups.append('text')
            .attr('class', 'value')
            .attr('x', (a) => xScale(a.type) + xScale.bandwidth() / 10 + 30) 
            .attr('y', (a) => yScale(a.value))
            .attr('text-anchor', 'start')
            .text((a) => `${a.value}`)
          
          svg.append('text')
            .attr('class', 'label')
            .attr('x', -(height / 2) - margin)
            .attr('y', margin / 2.4 - 15)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Valor')
      
          svg.append('text')
            .attr('class', 'label')
            .attr('x', width / 2 + margin)
            .attr('y', 650)
            .attr('text-anchor', 'middle')
            .text('Tipos de crime')
      
          svg.append('text')
            .attr('class', 'title')
            .attr('x', width / 2 + margin)
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .text('Reclusos condenados em Portugal no ano ' + newYear)
      
          svg.append('text')
            .attr('class', 'source')
            .attr('x', width - margin / 2)
            .attr('y', 800)
            .attr('text-anchor', 'start')
            .text('Source: INE, 2020')
      });       
    }
    else if(newYear=="2019"){
        d3.selectAll("svg > *").remove();
        
        d3.csv("data/reclusos_2019.csv").then(function(sample) {
          const svg = d3.select('svg');
          const svgContainer = d3.select('#container');
          
          const margin = 80;
          const width = 1000 - 2 * margin;
          const height = 600 - 2 * margin;
  
  
          const chart = svg.append('g').attr('transform', `translate(${margin}, ${margin})`);
  
          const xScale = d3.scaleBand()
              .range([0, width])
              .domain(sample.map((s) => s.type))
              .padding(0.1)
          
          
          var biggest_value=0;
          for (x in sample){
            if (+sample[x].value>biggest_value){
              biggest_value=sample[x].value;
            }
          }

          const yScale = d3.scaleLinear().range([height, 0]).domain([0, biggest_value]);
            
          const makeYLines = () => d3.axisLeft()
              .scale(yScale)
        
          chart.append('g')
              .attr('transform', `translate(0, ${height})`)
              .call(d3.axisBottom(xScale))
              .selectAll(".tick text")  
              .call(wrap, xScale.bandwidth());
        
          chart.append('g')
              .call(d3.axisLeft(yScale));
  
          chart.append('g')
              .attr('class', 'grid')
              .call(makeYLines()
                .tickSize(-width, 0, 0)
                .tickFormat('')
              )
        
          const barGroups = chart.selectAll()
              .data(sample)
              .enter()
              .append('g')
        
          barGroups.append('rect')
              .attr('class', 'bar')
              .attr('x', (g) => xScale(g.type))
              .attr('y', (g) => yScale(g.value))
              .attr('height', (g) => height - yScale(g.value))
              .attr('width', xScale.bandwidth())
              .on('mouseenter', function (actual, i) {
                d3.selectAll('.value')
                  .attr('opacity', 1)
        
                d3.select(this)
                  .transition()
                  .duration(300)
                  .attr('opacity', 1)
                  .attr('x', (a) => xScale(a.type) - 5)
                  .attr('width', xScale.bandwidth() + 10)
        
                const y = yScale(actual.value)
        
                line = chart.append('line')
                  .attr('id', 'limit')
                  .attr('x1', 0)
                  .attr('y1', y)
                  .attr('x2', width)
                  .attr('y2', y)
        
                  barGroups.append('text')
                  .attr('class', 'divergence')
                  .attr('x', (a) => xScale(a.type) + xScale.bandwidth() / 2)
                  .attr('y', (a) => yScale(a.value)- 20)
                  .attr('fill', 'white')
                  .attr('text-anchor', 'middle')
                  .text((a, idx) => {
                    const divergence = (a.value - actual.value).toFixed(1)
                    
                    let text = ''
                    if (divergence > 0) text += '+'
                    text += `${divergence}`
        
                    return idx !== i ? text : '';
                  })
              })
              .on('mouseleave', function () {
                d3.selectAll('.value')
                  .attr('opacity', 1)
        
                d3.select(this)
                  .transition()
                  .duration(300)
                  .attr('opacity', 1)
                  .attr('x', (a) => xScale(a.type))
                  .attr('width', xScale.bandwidth())
        
                chart.selectAll('#limit').remove()
                chart.selectAll('.divergence').remove()
              })
        
            barGroups .append('text')
              .attr('class', 'value')
              .attr('x', (a) => xScale(a.type) + xScale.bandwidth() / 10 + 30 )
              .attr('y', (a) => yScale(a.value))
              .attr('text-anchor', 'start')
              .text((a) => `${a.value}`)
            
            svg.append('text')
              .attr('class', 'label')
              .attr('x', -(height / 2) - margin)
              .attr('y', margin / 2.4 - 15)
              .attr('transform', 'rotate(-90)')
              .attr('text-anchor', 'middle')
              .text('Valor')
        
            svg.append('text')
              .attr('class', 'label')
              .attr('x', width / 2 + margin)
              .attr('y', 650)
              .attr('text-anchor', 'middle')
              .text('Tipos de crime')
        
            svg.append('text')
              .attr('class', 'title')
              .attr('x', width / 2 + margin)
              .attr('y', 40)
              .attr('text-anchor', 'middle')
              .text('Crimes registados em Portugal no ano ' + newYear)
        
            svg.append('text')
              .attr('class', 'source')
              .attr('x', width - margin / 2)
              .attr('y', 800)
              .attr('text-anchor', 'start')
              .text('Source: INE, 2020')
        });       
      }
  }


/*
Chamar a função update sempre que o dropdown é alterado
*/
d3.select('#year')
    .on('change', function() {
        var newYear = eval(d3.select(this).property('value'));
        update(newYear);
})

//Função para tornar o texto do eixo dos X legível (para casos em que é muito extenso)
//Source: http://bl.ocks.org/LGBY4/204b1c74962cbcb33feba263e0fb4ad2
function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}