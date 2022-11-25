
//all of this code has to go under a function. something like displayGraph().
$.ajax({
    url: '/stock/' + stockname, //where stock name is the stock symbol passed on to this function
    type: 'GET',
    contentType: 'application/json',                        
    success: function(response){
        console.log(response);

        anychart.onDocumentReady(function () {
            anychart.data.loadCsvFile(response.data,
            
            function (data) { 
                // create data table on loaded data
                var dataTable = anychart.data.table();
                dataTable.addData(data);
        
                // map loaded data for the candlestick series
                var mapping = dataTable.mapAs({
                open: 1,
                high: 2,
                low: 3,
                close: 4
                });
            }
            );
        });
    },
    // If there's an error, we can use the alert box to make sure we understand the problem
    error: function(xhr, status, error){
        var errorMessage = xhr.status + ': ' + xhr.statusText
        alert('Error - ' + errorMessage);
    }
})
    


  // create stock chart
var chart = anychart.stock();

// create first plot on the chart
var plot = chart.plot(0);

// set grid settings
plot.yGrid(true).xGrid(true).yMinorGrid(true).xMinorGrid(true);

var series = plot.candlestick(mapping)
        .name('Tesla');

series.legendItem().iconType('rising-falling');

// create scroller series with mapped data
chart.scroller().candlestick(mapping);


chart.selectRange('2020-11-27', '2021-11-26');

// create range picker
var rangePicker = anychart.ui.rangePicker();

// init range picker
rangePicker.render(chart);

// create range selector
var rangeSelector = anychart.ui.rangeSelector();

// init range selector
rangeSelector.render(chart);


chart.title('Tesla Inc. Stock Chart');

// set container id for the chart
chart.container('container');

// initiate chart drawing
chart.draw();