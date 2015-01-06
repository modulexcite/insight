/**
 * Created by tferguson on 10/11/2014.
 */

(function(insight) {

    /**
     * The SimpleChart base class provides some base functions that are used by any specific types of simple charts that derive from this class
     * @constructor
     * @param {insight.DataProvider | Array} data - The object containing this chart's data
     * @param {String} element - The css selector identifying the div container that the chart will be drawn in.
     * @param {String} keyProperty - The data field that will be used for the default key function.
     * @param {String} valueProperty - The data field that will be used for the default value function.
     * @param {Object} options - The config object that contains default axis names, scales and series type.
     */

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

        /*
         * Creates and returns the chart object.
         * @memberof insight.SimpleChart
         * @returns {insight.Chart} A chart object with the chosen/defaulted axes and series.
         */
        self.build = function() {
            var series;
            var dataset = data instanceof insight.DataSet ? data : new insight.DataSet(data);

            var xAxis = new insight.Axis(options.xAxisName, options.xAxisScale)
                .tickLabelOrientation('tb');

            var yAxis = new insight.Axis(options.yAxisName, options.yAxisScale);
            var valueFunction;
            var keyFunction;

            if (options.groupingProperty === 'count') {

                keyFunction = function(d) {
                    return d.key;
                };

                valueFunction = function(d) {
                    return d.value[options.groupingProperty];
                };
            } else if (options.groupingProperty) {

                keyFunction = function(d) {
                    return d.key;
                };

                valueFunction = function(d) {
                    return d.value[valueProperty][options.groupingProperty];
                };
            } else {

                keyFunction = function(d) {
                    return d[keyProperty];
                };

                valueFunction = function(d) {
                    return d[valueProperty];
                };
            }

            dataset = options.groupingProperty ? dataset.group('grouping', function(d) {
                return d[keyProperty];
            })[options.groupingProperty]([valueProperty]) : dataset;

            series = new options.seriesType('series', dataset, xAxis, yAxis)
                .keyFunction(keyFunction)
                .valueFunction(valueFunction);


            //            if (options.groupingProperty) {
            //
            //                var grouping = dataset.group('grouping', function(d) {
            //                    return d[keyProperty];
            //                })[options.groupingProperty]([valueProperty]);
            //
            //                series = new options.seriesType('series', grouping, xAxis, yAxis)
            //                    .valueFunction(function(d) {
            //                        if (options.groupingProperty === 'count') {
            //                            return d.value[options.groupingProperty];
            //                        } else {
            //                            return d.value[valueProperty][options.groupingProperty];
            //                        }
            //                    });
            //
            //            } else {
            //
            //                series = new options.seriesType('series', dataset, xAxis, yAxis)
            //                    .keyFunction(function(d) {
            //                        return d[keyProperty];
            //                    })
            //                    .valueFunction(function(d) {
            //                        return d[valueProperty];
            //                    });
            //            }

            if (options.radiusProperty) {
                series.radiusFunction(function(d) {
                    return d[options.radiusProperty];
                });
            }

            return new insight.Chart('', element)
                .xAxis(xAxis)
                .yAxis(yAxis)
                .series([series])
                .width(500)
                .height(500);
        };
    };

})(insight);
