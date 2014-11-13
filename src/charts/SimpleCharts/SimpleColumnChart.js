/**
 * Created by tferguson on 10/11/2014.
 */

(function(insight) {
    insight.SimpleColumnChart = function(data, element, keyProperty, valueProperty) {

        var self = this;

        var options = {
            xAxisScale: insight.scales.ordinal,
            yAxisScale: insight.scales.linear,
            seriesType: insight.ColumnSeries
        };

        self.xAxisScale = function(xAxisScale) {
            options.xAxisScale = xAxisScale;
            return self;
        };

        self.yAxisScale = function(yAxisScale) {
            options.yAxisScale = yAxisScale;
            return self;
        };

        //        self.seriesType = function(seriesType) {
        //            options.seriesType = seriesType;
        //            return self;
        //        };

        //Construct the chart object
        self.build = function() {

            var dataset = new insight.DataSet(data);

            var xAxis = new insight.Axis(keyProperty, options.xAxisScale);
            var yAxis = new insight.Axis(valueProperty, options.yAxisScale);
            var series = new insight.ColumnSeries('series', dataset, xAxis, yAxis)
                .keyFunction(function(d) {
                    return d[keyProperty];
                })
                .valueFunction(function(d) {
                    return d[valueProperty];
                });

            return new insight.Chart('', element)
                .xAxis(xAxis)
                .yAxis(yAxis)
                .series([series]);
        };
    };

})(insight);
