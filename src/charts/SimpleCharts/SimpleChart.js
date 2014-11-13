/**
 * Created by tferguson on 10/11/2014.
 */

(function(insight) {
    insight.SimpleChart = function(data, element, keyProperty, valueProperty, options) {

        var self = this;

        self.xAxisScale = function(xAxisScale) {
            options.xAxisScale = xAxisScale;
            return self;
        };

        self.yAxisScale = function(yAxisScale) {
            options.yAxisScale = yAxisScale;
            return self;
        };

        //Construct the chart object
        self.build = function() {

            var dataset = new insight.DataSet(data);

            var xAxis = new insight.Axis(options.xAxisName, options.xAxisScale);
            var yAxis = new insight.Axis(options.yAxisName, options.yAxisScale);
            var series = new options.seriesType('series', dataset, xAxis, yAxis)
                .keyFunction(function(d) {
                    return d[keyProperty];
                })
                .valueFunction(function(d) {
                    return d[valueProperty];
                });

            if (options.radiusProperty) {
                series.radiusFunction(function(d) {
                    return d[options.radiusProperty];
                });
            }

            return new insight.Chart('', element)
                .xAxis(xAxis)
                .yAxis(yAxis)
                .series([series]);
        };
    };

})(insight);
