describe("Theme", function(){

    var dummyTheme,
        chartGroup,
        chart,
        table,
        lineSeries,
        rowSeries,
        columnSeries,
        bubbleSeries;

    beforeEach(function() {
        //Create a new theme to be applied
        dummyTheme = {

            axisStyle: {
                gridlineWidth:3.1,
                gridlineColor: '#204',
                shouldShowGridlines: true,

                tickSize: 1.4,
                tickPadding: 6.4,

                axisLineColor: '#345',
                axisLineWidth: 12.5,

                tickLineColor: '#543',
                tickLineWidth: 9.3,

                tickLabelFont: 'Sans serif 72pt',
                tickLabelColor: '#eac',

                axisTitleFont: 'Sans serif 73pt',
                axisTitleColor: '#abc'
            },

            chartStyle: {
                seriesPalette: ['series-0', 'series-1', 'series-2'],
                fillColor: '#24a',
                titleFont: 'Sans serif 71pt',
                titleColor: '#cab'
            },

            tableStyle : {
                headerFont: '17pt Arial',
                headerTextColor: 'red',
                rowHeaderFont: 'bold 15pt Times New Roman',
                rowHeaderTextColor: 'green',
                cellFont: '13pt Helvetica Neue',
                cellTextColor: 'blue',
                headerDivider: '3px solid yellow',
                headerBackgroundColor: '#824',
                rowBackgroundColor : '#943',
                rowAlternateBackgroundColor: '#439'
            }
        };

        var xAxis = new insight.Axis('x-axis', insight.scales.linear);
        var yAxis = new insight.Axis('y-axis', insight.scales.linear);

        lineSeries = new insight.LineSeries('line', [1,2,3], xAxis, yAxis);
        rowSeries = new insight.RowSeries('row', [1,2,3], xAxis, yAxis);
        columnSeries = new insight.ColumnSeries('column', [1,2,3], xAxis, yAxis);
        bubbleSeries = new insight.BubbleSeries('bubble', [1,2,3], xAxis, yAxis);

        chart = new insight.Chart('Chart', '#chart');
        chart.xAxis(xAxis);
        chart.yAxis(yAxis);
        chart.series([lineSeries, rowSeries, columnSeries, bubbleSeries]);

        table = new insight.Table('Table', '#table', new insight.DataSet([1,2,3]));

        chartGroup = new insight.ChartGroup();
        chartGroup.charts = [chart];
        chartGroup.tables = [table];

        // we don't care about resizing the chart for theme tests and there are browser specific
        // differences so a spy will prevent the chart from being resized and thus prevent the side effects
        spyOn(chart, 'resizeChart');

        //When:
        chartGroup.applyTheme(dummyTheme);
    });

    describe("Axis", function() {
        it("Tick size to be set by theme", function() {
            //Then:
            expect(chart.xAxis().tickSize()).toBe(1.4);
            expect(chart.yAxis().tickSize()).toBe(1.4);
        });

        it("Tick padding to be set by theme", function() {
            //Then:
            expect(chart.xAxis().tickPadding()).toBe(6.4);
            expect(chart.yAxis().tickPadding()).toBe(6.4);
        });

        it("Line color to be set by theme", function() {
            //Then:
            expect(chart.xAxis().lineColor()()).toBe('#345');
            expect(chart.yAxis().lineColor()()).toBe('#345');
        });

        it("Gridline color to be set by theme", function() {
            //Then:
            expect(chart.xAxis().gridlines.lineColor()).toBe('#204');
            expect(chart.yAxis().gridlines.lineColor()).toBe('#204');
        });

        it("Gridline width to be set by theme", function() {
            //Then:
            expect(chart.xAxis().gridlines.lineWidth()).toBe(3.1);
            expect(chart.yAxis().gridlines.lineWidth()).toBe(3.1);
        });

        it("Gridline visibility to be set by theme", function() {
            //Then:
            expect(chart.xAxis().shouldShowGridlines()).toBe(true);
            expect(chart.yAxis().shouldShowGridlines()).toBe(true);
        });
    });

    describe("Table", function() {
        it("Header font to be set by theme", function() {
            //Then:
            expect(table.headerFont()).toBe('17pt Arial');
        });

        it("Row header font to be set by theme", function() {
            //Then:
            expect(table.rowHeaderFont()).toBe('bold 15pt Times New Roman');
        });

        it("Cell font to be set by theme", function() {
            //Then:
            expect(table.cellFont()).toBe('13pt Helvetica Neue');
        });

        it("Header textcolor to be set by theme", function() {
            //Then:
            expect(table.headerTextColor()()).toBe('red');
        });

        it("Row header textcolor to be set by theme", function() {
            //Then:
            expect(table.rowHeaderTextColor()()).toBe('green');
        });

        it("Cell textcolor to be set by theme", function() {
            //Then:
            expect(table.cellTextColor()()).toBe('blue');
        });

        it("Header divider style to be set by theme", function() {
            //Then:
            expect(table.headerDivider()).toBe('3px solid yellow');
        });

        it("Header background color to be set by theme", function() {
            //Then:
            expect(table.headerBackgroundColor()()).toBe('#824');
        });

        it("Row background color to be set by theme", function() {
            //Then:
            expect(table.rowBackgroundColor()()).toBe('#943');
        });

        it("Alternate background color to be set by theme", function() {
            //Then:
            expect(table.rowAlternateBackgroundColor()()).toBe('#439');
        });

    });

    describe("Initial theme", function() {
        var method;
        var spy;
        var prototype;

        beforeEach(function() {
            spy = jasmine.createSpy('applyTheme');
        });

        afterEach(function() {
            prototype.applyTheme = method;
        });

        it ("to be set on initialising ChartGroup", function() {
            //Given:
            prototype = insight.ChartGroup.prototype;
            method = prototype.applyTheme;
            prototype.applyTheme = spy;

            //When:
            var chartgroup = new insight.ChartGroup();

            //Then:
            expect(spy).toHaveBeenCalled();
        });

        it ("to be set on initialising Chart", function() {
            //Given:
            prototype = insight.Chart.prototype;
            method = prototype.applyTheme;
            prototype.applyTheme = spy;

            //When:
            var chart = new insight.Chart();

            //Then:
            expect(spy).toHaveBeenCalled();
        });

        it ("to be set on initialising Series", function() {
            //Given:
            prototype = insight.LineSeries.prototype;
            method = prototype.applyTheme;
            prototype.applyTheme = spy;

            var xAxis = new insight.Axis('Axis', insight.scales.linear);
            var yAxis = new insight.Axis('Axis', insight.scales.linear);

            //When:
            var series = new insight.LineSeries('Series', [], xAxis, yAxis);

            //Then:
            expect(spy).toHaveBeenCalled();
        });

        it ("to be set on initialising Axis", function() {
            //Given:
            prototype = insight.Axis.prototype;
            method = prototype.applyTheme;
            prototype.applyTheme = spy;

            //When:
            var axis = new insight.Axis('Axis', insight.scales.linear);

            //Then:
            expect(spy).toHaveBeenCalled();
        });

        it ("to be set on initialising Gridlines", function() {
            //Given:
            prototype = insight.AxisGridlines.prototype;
            method = prototype.applyTheme;
            prototype.applyTheme = spy;

            //When:
            var axis = new insight.AxisGridlines();

            //Then:
            expect(spy).toHaveBeenCalled();
        });


        it ("to be set on initialising Table", function() {
            //Given:
            prototype = insight.Table.prototype;
            method = prototype.applyTheme;
            prototype.applyTheme = spy;

            //When:
            var table = new insight.Table();

            //Then:
            expect(spy).toHaveBeenCalled();
        });
    });

});
