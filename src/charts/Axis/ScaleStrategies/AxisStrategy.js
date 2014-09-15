(function(insight) {

    /*
     * An axis strategy representing time and date scales.
     */
    insight.AxisStrategy = function AxisStrategy() {

        var self = this;

        self.domain = function(axis) {
            return [0, 0];
        };

        self.tickValues = function(axis) {
            var scale = axis.scale.copy()
                .domain(axis.domain());

            // Some scales, such as `d3.scale.ordinal`, do not provide `ticks()`.
            // For these scales `d3.svg.axis` depends upon `domain()` to create ticks values.
            return scale.ticks ? scale.ticks() : scale.domain();
        };

        self.tickFrequencyForDomain = function(domain) {
            var domainRange = domain[1] - domain[0];

            if (domainRange === 0) {
                return 1;
            }

            var tickFrequency = Math.pow(10, Math.floor(Math.log(domainRange) / Math.LN10) - 1);

            var multipliers = [
                2,
                2.5,
                2
            ];

            while (Math.floor(domainRange / tickFrequency) > 10) {
                tickFrequency *= multipliers.shift();
            }

            return tickFrequency;
        };

        self.tickFrequency = function(axis) {
            return self.tickFrequencyForDomain(axis.domain());
        };

        /*
         * Calculates the minimum value to be used in this axis.
         * @returns {object} - The smallest value in the datasets that use this axis
         */
        self.findMin = function(axis) {
            var min = Number.MAX_VALUE;

            axis.series.forEach(function(series) {
                var m = series.findMin(axis);

                min = m < min ? m : min;
            });

            return min;
        };

        /*
         * Calculates the maximum value to be used in this axis.
         * @returns {object} - The largest value in the datasets that use this axis
         */
        self.findMax = function(axis) {
            var max = 0;

            axis.series.forEach(function(series) {
                var m = series.findMax(axis);

                max = m > max ? m : max;
            });

            return max;
        };

        self.increaseTickStep = function(axis, currentTickValue) {
            return currentTickValue;
        };

        self.decreaseTickStep = function(axis, currentTickValue) {
            return currentTickValue;
        };
    };

})(insight);
