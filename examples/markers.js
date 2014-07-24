var data = [
{
    key: 'England',
    value: 53012456,
    target: 64012456
},
{
    key: 'Scotland',
    value: 5295000,
    target: 13195000
},
{
    key: 'Wales',
    value: 3063456,
    target: 43076456
},
{
    key: 'Northern Ireland',
    value: 1810863,
    target: 9012456
}];

$(document)
    .ready(function()
    {
        var dataset = new insight.DataSet(data);

        var chart = new insight.Chart('Chart 1', "#exampleChart")
            .width(450)
            .height(400)
            .autoMargin(true);

        var x = new insight.Axis('Country', insight.Scales.Ordinal)
            .tickOrientation('tb')
            .tickRotation(45)
            .tickSize(5);

        var y = new insight.Axis('Population', insight.Scales.Linear)
            .labelFormat(d3.format("0,000"));

        chart.addXAxis(x);
        chart.addYAxis(y);

        var series = new insight.ColumnSeries('countryColumn', dataset, x, y, 'silver')
            .valueFunction(function(d)
            {
                return d.value;
            });


        var targets = new insight.MarkerSeries('targets', dataset, x, y, '#333')
            .valueFunction(function(d)
            {
                return d.target;
            })
            .widthFactor(0.3);

        chart.series([series, targets]);

        insight.drawCharts();
    });
