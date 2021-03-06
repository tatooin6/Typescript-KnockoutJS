define(["require", "exports", "knockout"], function (require, exports, ko) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SeatReservation = /** @class */ (function () {
        function SeatReservation(name, initialMeal) {
            var self = this;
            self.name = name;
            self.meal = initialMeal;
            self.formattedPrice = ko.computed(function () {
                var price = self.meal().price;
                return price ? "$" + price.toFixed(2) : "None";
            });
        }
        return SeatReservation;
    }());
    var HelloViewModel = /** @class */ (function () {
        function HelloViewModel() {
            var self = this;
            this.language = ko.observable("typescript");
            this.framework = ko.observable("knockoutJS");
            this.modelTitle = ko.observable("Resevation View Model");
            this.availableMeals = [
                { mealName: "sandwich", price: 5.50 },
                { mealName: "hot dog", price: 15.10 },
                { mealName: "tranca pecho", price: 20 },
            ];
            this.seats = ko.observableArray([
                new SeatReservation("Monti", ko.observable(this.availableMeals[0])),
                new SeatReservation("Peter", ko.observable(this.availableMeals[0])),
                new SeatReservation("Raul", ko.observable(this.availableMeals[0])),
            ]);
            // OPERATIONS
            this.addSeat = function () {
                this.seats.push(new SeatReservation("", ko.observable(this.availableMeals[0])));
            };
            this.removeSeat = function (seat) {
                // console.log(self.seats)
                self.seats.remove(seat);
            };
        }
        return HelloViewModel;
    }());
    ko.applyBindings(new HelloViewModel(), document.querySelector("knockout-app"));
});
//# sourceMappingURL=hello.js.map