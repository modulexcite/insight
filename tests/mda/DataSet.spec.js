describe('DataSet', function() {

    var data = [
        {'Id':1,'Forename':'Martin','Surname':'Watkins','Country':'Scotland','DisplayColour':'#38d33c','Age':1,'IQ':69, 'Interests':['Ballet', 'Music', 'Climbing'], 'Gender':'Male'},
        {'Id':2,'Forename':'Teresa','Surname':'Knight','Country':'Scotland','DisplayColour':'#6ee688','Age':20,'IQ':103, 'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
        {'Id':3,'Forename':'Mary','Surname':'Lee','Country':'Wales','DisplayColour':'#8e6bc2','Age':3,'IQ':96,'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
        {'Id':4,'Forename':'Sandra','Surname':'Harrison','Country':'Northern Ireland','DisplayColour':'#02acd0','Age':16,'IQ':55, 'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
        {'Id':5,'Forename':'Frank','Surname':'Cox','Country':'England','DisplayColour':'#0b281c','Age':5,'IQ':105,'Interests':['Football', 'Music', 'Kayaking'], 'Gender':'Male'},
        {'Id':6,'Forename':'Mary','Surname':'Jenkins','Country':'England','DisplayColour':'#5908e3','Age':19,'IQ':69,'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
        {'Id':7,'Forename':'Earl','Surname':'Stone','Country':'Wales','DisplayColour':'#672542','Age':6,'IQ':60,'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Male'},
        {'Id':8,'Forename':'Ashley','Surname':'Carr','Country':'England','DisplayColour':'#f9874f','Age':18,'IQ':63,'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
        {'Id':9,'Forename':'Judy','Surname':'Mcdonald','Country':'Northern Ireland','DisplayColour':'#3ab1a8','Age':2,'IQ':70,'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
        {'Id':10,'Forename':'Earl','Surname':'Flores','Country':'England','DisplayColour':'#1be47c','Age':20,'IQ':93,'Interests':['Climbing', 'Boxing'], 'Gender':'Male'},
        {'Id':11,'Forename':'Terry','Surname':'Wheeler','Country':'Wales','DisplayColour':'#2cd57b','Age':4,'IQ':87,'Interests':['Climbing', 'Boxing'], 'Gender':'Male'},
        {'Id':12,'Forename':'Willie','Surname':'Reid','Country':'Northern Ireland','DisplayColour':'#7fcf1e','Age':7,'IQ':86,'Interests':['Climbing', 'Boxing'], 'Gender':'Male'},
        {'Id':13,'Forename':'Deborah','Surname':'Palmer','Country':'Northern Ireland','DisplayColour':'#9fd1d5','Age':5,'IQ':85,'Interests':['Climbing', 'Boxing'], 'Gender':'Female'},
        {'Id':14,'Forename':'Annie','Surname':'Jordan','Country':'England','DisplayColour':'#8f4fd1','Age':10,'IQ':100, 'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
        {'Id':15,'Forename':'Craig','Surname':'Gibson','Country':'England','DisplayColour':'#111ab4','Age':7,'IQ':106,'Interests':['Football', 'Music', 'Kayaking'], 'Gender':'Male'},
        {'Id':16,'Forename':'Lisa','Surname':'Parker','Country':'England','DisplayColour':'#52d5cf','Age':18,'IQ':53,'Interests':['Football', 'Music', 'Kayaking'], 'Gender':'Female'},
        {'Id':17,'Forename':'Samuel','Surname':'Willis','Country':'Wales','DisplayColour':'#e2f6cc','Age':11,'IQ':98, 'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
        {'Id':18,'Forename':'Lisa','Surname':'Chapman','Country':'Northern Ireland','DisplayColour':'#1c5829','Age':7,'IQ':51, 'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
        {'Id':19,'Forename':'Ryan','Surname':'Freeman','Country':'Scotland','DisplayColour':'#6cbc04','Age':12,'IQ':96, 'Interests':['Football', 'Music', 'Kayaking'], 'Gender':'Male'},
        {'Id':20,'Forename':'Frances','Surname':'Lawson','Country':'Northern Ireland','DisplayColour':'#e739c9','Age':14,'IQ':71, 'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'}
    ];

    describe('filterFunction', function() {

        var dataSet;

        beforeEach(function() {
            dataSet = new insight.DataSet();
        });

        it('will include all data be default', function() {

            // When:
            var filterBy = dataSet.filterFunction();

            // Then:
            var filteredData = data.filter(filterBy);
            expect(filteredData.length).toBe(20);

        });

        it('can be overridden by the user', function() {

            // When:
            dataSet.filterFunction(function(d) {
                return d.Id > 10;
            });

            // Then:
            var filterBy = dataSet.filterFunction();
            var filteredData = data.filter(filterBy);
            expect(filteredData.length).toBe(10);

        });

    });

    describe('getData', function() {

        it('has data the that was supplied in the constructor', function() {

            // Given:
            var dataSet = new insight.DataSet(data);

            // When:
            var result = dataSet.getData();

            // Then:
            expect(result.length).toBe(20);
        });


    });

    describe('orderingFunction', function() {

        var orderingData = [
            { Id: 3, value: 2 },
            { Id: 2, value: 12 },
            { Id: 1, value: 7 }
        ];

        var dataSet;

        beforeEach(function() {
            dataSet = new insight.DataSet();
        });

        it('will order data by the "value" property (descending) by default', function() {

            // When:
            var orderBy = dataSet.orderingFunction();

            // Then:
            var orderedData = orderingData.sort(orderBy);
            var expectedOrdering = [
                { Id: 2, value: 12 },
                { Id: 1, value: 7 },
                { Id: 3, value: 2 }
            ];

            expect(orderedData).toEqual(expectedOrdering);

        });

        it('can be overridden by the user', function() {

            // When:
            dataSet.orderingFunction(function(a, b) {
                return b.Id - a.Id;
            });

            // Then:
            var orderBy = dataSet.orderingFunction();
            var orderedData = orderingData.sort(orderBy);
            var expectedOrdering = [
                { Id: 3, value: 2 },
                { Id: 2, value: 12 },
                { Id: 1, value: 7 }
            ];

            expect(orderedData).toEqual(expectedOrdering);

        });

    });

    describe('group', function() {

        it('creates a valid group', function() {

            // Given:
            var dataSet = new insight.DataSet(data);

            // When:
            var countries = dataSet.group('country', function(d){return d.Country;});

            // Then:
            var countryData = countries.getData();
            expect(countryData.length).toBe(4);
        });

    });

    it('can add a group with extra calculated values', function() {
        
        var dataSet = new insight.DataSet(data);


        var countries = dataSet.group('country', function(d){return d.Country;})
                                 .mean(['Age']);

        var countryData = countries.getData();

        var scotland = countryData.filter(function(d){return d.key=='Scotland';})[0];
        
        expect(countryData.length).toBe(4);
        expect(scotland.value.Age.Average).toBe(11);
    });


})

