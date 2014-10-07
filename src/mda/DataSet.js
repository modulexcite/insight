(function(insight) {
    /**
     * DataSet allows [insight.Groupings]{@link insight.Grouping} to be easily created from an object array.
     * @constructor
     * @extends insight.DataProvider
     * @param {Object[]} collection - The data to be processed and represented by this DataSet.
     */
    insight.DataSet = function DataSet(data) {

        insight.DataProvider.call(this, data);

        // Private variables ------------------------------------------------------------------------------------------

        var self = this;

        /**
         * Creates an {@link insight.Grouping} for this data set.
         * @memberof! insight.DataSet
         * @instance
         * @param {String} name The name to give to the grouping.
         * @param {Function} groupFunction A function that returns a property value to use for grouping data.
         * @param {Boolean} oneToMany A one-to-many grouping should be used if the groupFunction returns an
         * array property.
         * @returns {insight.Grouping} - A grouping which allows aggregation of a data set into groups for analysis.
         * @example var dataSet = new insight.DataSet([
         *    { Wpm : 33, Country : 'England' },
         *    { Wpm : 69, Country : 'Scotland' },
         *    { Wpm : 51, Country : 'Northern Ireland' }
         *  ]):
         *
         *  // Group on a single / one-to-one value
         *  var countryGrouping = dataSet.group('Country', function(d) { return d.Country; });
         * @example var dataSet = new insight.DataSet([
         *    { Wpm : 33, Interests : [ 'Triathlon', 'Music', 'Mountain Biking' ] },
         *    { Wpm : 69, Interests : [ 'Ballet', 'Music', 'Climbing' ] },
         *    { Wpm : 51, Interests : [ 'Triathlon', 'Music', 'Kayaking' ] }
         *  ]):
         *
         *  // Group on an array / one-to-many value
         *  var interestsGrouping = dataSet.group('Interests', function(d) { return d.Interests; }, true);
         */
        self.group = function(name, groupFunction, oneToMany) {

            var arrayData = self.rawData();

            self.crossfilterData = self.crossfilterData || crossfilter(arrayData);

            var dim = new insight.Dimension(name, self.crossfilterData, groupFunction, oneToMany);

            var group = new insight.Grouping(dim);

            return group;
        };

    };

    insight.DataSet.prototype = Object.create(insight.DataProvider.prototype);
    insight.DataSet.prototype.constructor = insight.DataSet;

})(insight);
