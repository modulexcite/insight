(function(insight) {
    /**
     * Provides the default configurations for each series in ChartBuilder
     * @constructor
     * @param {String} seriesType - The type of series to be used
     * @param {Array} data - An array of  JSON objects
     * @param {String} element - The css selector identifying the div container that the chart will be drawn in
     */
    insight.ChartBuilder = function ChartBuilder(seriesType, data, element, keyProperty, valueProperty) {

        var self = this;
        var config = new insight.ChartBuilderConfig();
        self.xAxis = config[seriesType].xAxis;
        self.yAxis = config[seriesType].yAxis;
        self.constructor = config[seriesType].constructor;


        self.set = function(settings) {
            Object.keys(settings).forEach(function(key) {
                self[key] = settings[key];
            });
        };

        self.build = function() {
            var dataset = new insight.DataSet(data);
            var x = new insight.Axis(keyProperty, self.xAxis);
            var y = new insight.Axis(valueProperty, self.yAxis);

            var chart = new insight.Chart('', element)
                .xAxis(x)
                .yAxis(y);

            if (config.chart.applyTheme) {
                chart.applyTheme(config.chart.applyTheme);
            }

            var series = new self.constructor('series', dataset, x, y)
                .keyFunction(function(d) {
                    return d[keyProperty];
                })
                .valueFunction(function(d) {
                    return d[valueProperty];
                });


            chart.series([series]);

            chart.draw();
        };



    };

})(insight);
