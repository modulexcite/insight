/**
 * Created by tferguson on 13/11/2014.
 */

(function(insight) {

    /**
     * The SimpleBubbleChart class extends the SimpleChart class to create a pre-configured bubble chart.
     * @constructor
     * @extends insight.SimpleChart
     * @param {insight.DataProvider | Array} data - The object containing this chart's data
     * @param {String} element - The css selector identifying the div container that the chart will be drawn in.
     * @param {String} keyProperty - The data field that will be used for the default key function.
     * @param {String} valueProperty - The data field that will be used for the default value function.
     * @param {Object} radiusProperty - The data field that will be used for the default radius function.
     */

    insight.SimpleBubbleChart = function(data, element, keyProperty, valueProperty, radiusProperty) {

        insight.SimpleChart.call(this, data, element, keyProperty, valueProperty, {
            xAxisScale: insight.scales.linear,
            xAxisName: keyProperty,
            yAxisScale: insight.scales.linear,
            yAxisName: valueProperty,
            seriesType: insight.BubbleSeries,
            radiusProperty: radiusProperty
        });
    };

})(insight);
