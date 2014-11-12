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
            if (self.titleColor) {
                axis.axisTitleColor(self.titleColor);
            }
            if (self.axisTitleFont) {
                axis.axisTitleFont(self.font);
            }
            if (self.lineColor) {
                axis.lineColor(self.lineColor);
            }
            if (self.lineWidth) {
                axis.lineWidth(self.lineWidth);
            }
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
            if (self.tickLabelOrientation) {
                axis.tickLabelOrientation(self.tickLabelOrientation);
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

            return axis;


        };
    };

})(insight);
