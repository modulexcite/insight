/**
 * Created by tferguson on 10/11/2014.
 */

(function(insight) {
    insight.AxisBuilder = function(name, axisType) {

        var self = this;

        self.build = function() {
            var axis = new insight.Axis(name, axisType);

            if (self.theme) {
                axis.applyTheme(self.theme);
            }
            //            if (self.axisRange) {
            //                axis.axisRange(self.axisRange.rangeMin, self.axisRange.rangeMax);
            //            }
            if (self.titleColor) {
                axis.axisTitleColor(self.titleColor);
            }
            if (self.axisTitleFont) {
                axis.axisTitleFont(self.font);
            }
            //            if (self.isReversed) {
            //                axis.hasReversedPosition(self.isReversed);
            //            }
            //            if (self.shouldOrderAxis) {
            //                axis.isOrdered(self.shouldOrderAxis);
            //            }
            if (self.lineColor) {
                axis.lineColor(self.lineColor);
            }
            if (self.lineWidth) {
                axis.lineWidth(self.lineWidth);
            }
            //            if (self.orderFunc) {
            //                axis.orderingFunction(self.orderFunc);
            //            }
            //            if (self.displayed) {
            //                axis.shouldDisplay(self.displayed);
            //            }
            //            if (self.showGridlines) {
            //                axis.shouldShowGridlines(self.showGridlines);
            //            }
            if (self.textAnchor) {
                axis.textAnchor(self.textAnchor);
            }
            if (self.tickColor) {
                axis.tickColor(self.tickColor);
            }
            if (self.tickFreq) {
                axis.tickFrequency(self.tickFreq);
            }
            if (self.tickLabelColor) {
                axis.tickLabelColor(self.tickLabelColor);
            }
            if (self.tickLabelFont) {
                axis.tickLabelFont(self.tickLabelFont);
            }
            if (self.tickLabelFormat) {
                axis.tickLabelFormat(self.tickLabelFormat);
            }
            //            if (self.tickLabelOrientation) {
            //                axis.tickLabelOrientation(self.tickLabelOrientation);
            //            }
            if (self.tickLabelRotation) {
                axis.tickLabelRotation(self.tickLabelRotation);
            }
            if (self.tickPadding) {
                axis.tickPadding(self.tickPadding);
            }
            if (self.tickSize) {
                axis.tickSize(self.tickSize);
            }
            if (self.tickWidth) {
                axis.tickWidth(self.tickWidth);
            }
            //            if (self.axisTitle) {
            //                axis.title(self.axisTitle);
            //            }

            return axis;


        };
    };

})(insight);
