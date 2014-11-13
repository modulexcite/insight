/**
 * Created by tferguson on 13/11/2014.
 */

(function(insight) {
    insight.SimpleLineChart = function(data, element, keyProperty, valueProperty) {

        insight.SimpleChart.call(this, data, element, keyProperty, valueProperty, {
            xAxisScale: insight.scales.linear,
            xAxisName: keyProperty,
            yAxisScale: insight.scales.linear,
            yAxisName: valueProperty,
            seriesType: insight.LineSeries
        });
    };

})(insight);
