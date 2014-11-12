/**
 * Created by tferguson on 10/11/2014.
 */

(function(insight) {
    insight.SimpleColumnChart = function(data, element, keyProperty, valueProperty) {

        var self = this;

        var xAxisBuilder = new insight.AxisBuilder(keyProperty, insight.scales.ordinal);
        var yAxisBuilder = new insight.AxisBuilder(valueProperty, insight.scales.linear);
        var seriesBuilder = new insight.SeriesBuilder(insight.ColumnSeries, data, keyProperty, valueProperty);

        //Axis Settable Properties

        self.xAxis = function(axis) {
            xAxisBuilder = new insight.AxisBuilder(keyProperty, axis);
            return self;
        };

        self.yAxis = function(axis) {
            yAxisBuilder = new insight.AxisBuilder(valueProperty, axis);
            return self;
        };

        self.applyTheme = function(theme) {
            xAxisBuilder.theme = theme;
            yAxisBuilder.theme = theme;
            return self;
        };

        self.axisTitleColor = function(axis, color) {
            xAxisBuilder.titleColor = color;
            yAxisBuilder.titleColor = color;
            return self;

        };

        self.axisTitleFont = function(axisTitleFont) {
            xAxisBuilder.axisTitleFont = axisTitleFont;
            yAxisBuilder.axisTitleFont = axisTitleFont;
            return self;
        };

        self.lineColor = function(lineColor) {
            xAxisBuilder.lineColor = lineColor;
            yAxisBuilder.lineColor = lineColor;
            return self;
        };

        self.lineWidth = function(lineWidth) {
            xAxisBuilder.lineWidth = lineWidth;
            yAxisBuilder.lineWidth = lineWidth;
            return self;
        };

        self.textAnchor = function(textAnchor) {
            xAxisBuilder.textAnchor = textAnchor;
            yAxisBuilder.textAnchor = textAnchor;
            return self;
        };

        self.tickColor = function(tickColor) {
            xAxisBuilder.tickColor = tickColor;
            yAxisBuilder.tickColor = tickColor;
            return self;
        };

        self.tickFrequency = function(tickFreq) {
            xAxisBuilder.tickFreq = tickFreq;
            yAxisBuilder.tickFreq = tickFreq;
            return self;
        };

        self.tickLabelColor = function(tickLabelColor) {
            xAxisBuilder.tickLabelColor = tickLabelColor;
            yAxisBuilder.tickLabelColor = tickLabelColor;
            return self;
        };

        self.tickLabelFont = function(tickLabelFont) {
            xAxisBuilder.tickLabelFont = tickLabelFont;
            yAxisBuilder.tickLabelFont = tickLabelFont;
            return self;
        };

        self.tickLabelFormat = function(tickLabelFormat) {
            xAxisBuilder.tickLabelFormat = tickLabelFormat;
            yAxisBuilder.tickLabelFormat = tickLabelFormat;
            return self;
        };

        self.tickLabelOrientation = function(axis, tickLabelOrientation) {
            if (axis === 'xAxis') {
                xAxisBuilder.tickLabelOrientation = tickLabelOrientation;
            } else if (axis === 'yAxis') {
                yAxisBuilder.tickLabelOrientation = tickLabelOrientation;
            }
            return self;
        };

        self.tickPadding = function(tickPadding) {
            xAxisBuilder.tickPadding = self.tickPadding;
            yAxisBuilder.tickPadding = self.tickPadding;
            return self;
        };

        self.tickSize = function(tickSize) {
            xAxisBuilder.tickSize = tickSize;
            yAxisBuilder.tickSize = tickSize;
            return self;
        };

        self.tickWidth = function(tickWidth) {
            xAxisBuilder.tickWidth = tickWidth;
            yAxisBuilder.tickWidth = tickWidth;
            return self;
        };

        //Series Settable Properties

        self.keyFunction = function(func) {
            seriesBuilder.keyFunction = func;
            return self;
        };

        self.valueFunction = function(func) {
            seriesBuilder.valueFunction = func;
            return self;
        };

        self.filterFunction = function(filterFunc) {
            seriesBuilder.filterFunction = filterFunc;
            return self;
        };

        self.title = function(title) {
            seriesBuilder.title = title;
            return self;
        };

        self.groupKeyFunction = function(groupKeyFunc) {
            seriesBuilder.groupKeyFunction = groupKeyFunc;
            return self;
        };

        self.tooltipFormat = function(formatFunc) {
            seriesBuilder.tooltipFormat = formatFunc;
            return self;
        };

        self.tooltipOffset = function(offset) {
            seriesBuilder.tooltipOffset = offset;
            return self;
        };

        self.top = function(topValues) {
            seriesBuilder.top = topValues;
            return self;
        };

        //Construct the chart object
        self.build = function() {
            var xAxis = xAxisBuilder.build();
            var yAxis = yAxisBuilder.build();
            var axes = {
                xAxis: xAxis,
                yAxis: yAxis
            };
            var series = seriesBuilder.build(axes);
            return new insight.Chart('', element)
                .xAxis(axes.xAxis)
                .yAxis(axes.yAxis)
                .series([series]);

        };
    };

})(insight);
