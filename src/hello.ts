import * as ko from "knockout";

interface IMeal {
  mealName: string
  price: number
}

class SeatReservation {
  name: string
  meal: KnockoutObservable<IMeal>
  formattedPrice: KnockoutComputed<string>

  constructor(name: string, initialMeal: KnockoutObservable<IMeal>) {
    let self = this
    self.name = name
    self.meal = initialMeal

    self.formattedPrice = ko.computed(function() {
      let price = self.meal().price
      return price ? "$" + price.toFixed(2) : "None"
    })
  }
}

class HelloViewModel {
  modelTitle: KnockoutObservable<string>
  language: KnockoutObservable<string>

  framework: KnockoutObservable<string>
  availableMeals: IMeal[]
  seats: KnockoutObservableArray<SeatReservation>
  totalSurcharge: KnockoutComputed<number>

  addSeat: () => void
  removeSeat: (seat: SeatReservation) => void

  constructor() {
    let self = this
    this.language = ko.observable("typescript");
    this.framework = ko.observable("knockoutJS");

    this.modelTitle = ko.observable("Resevation View Model")
    this.availableMeals = [
      {mealName: "sandwich", price: 5.50},
      {mealName: "hot dog", price: 15.10},
      {mealName: "tranca pecho", price: 20},
    ]

    this.seats = ko.observableArray([
      new SeatReservation("Monti", ko.observable(this.availableMeals[0])),
      new SeatReservation("Peter", ko.observable(this.availableMeals[0])),
      new SeatReservation("Raul", ko.observable(this.availableMeals[0])),

    ])
    // OPERATIONS
    this.addSeat = function() {
      this.seats.push(new SeatReservation("", ko.observable(this.availableMeals[0])))
    }
    this.removeSeat = function(seat: SeatReservation) {
      // console.log(self.seats)
      self.seats.remove(seat)
    }
  }

}

ko.applyBindings(new HelloViewModel(), document.querySelector("knockout-app"));
