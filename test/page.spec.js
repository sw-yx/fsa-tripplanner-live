var chai = require('chai')
var expect = require('chai').expect;
var spies = require('chai-spies');
var {State, Plan} = require('../client/state');

// function addPlace that adds to array
// function(varname, placeId)
// function should add it to the array


describe('Store model', function () {
    var store
    before(function (){
        store = new State()
    });
    afterEach(function (){
        return store.clearState();
    });
    describe('Adding function', function () {
        it('should be a function', () => {
            expect(store.addPlace).to.be.a('function')
        })
        it('should add to the array', () => {
            store.addPlace('hotels', 2)
            expect(store.hotels.length).to.equal(1)
            expect(store.restaurants.length).to.equal(0)
            expect(store.activities.length).to.equal(0)
        })
    })

    describe('Adding function', function () {
        it('should not allow duplicates', () => {
            store.addPlace('hotels', 2)
            store.addPlace('hotels', 2)
            expect(store.hotels.length).to.equal(1)
            expect(store.restaurants.length).to.equal(0)
            expect(store.activities.length).to.equal(0)
        })
    })
    
    describe('Remove function', function () {
        it('should remove places', () => {
            store.addPlace('hotels', 2)
            store.addPlace('restaurants', 5)
            store.removePlace('hotels', 2)
            expect(store.hotels.length).to.equal(0)
            expect(store.restaurants.length).to.equal(1)
            expect(store.activities.length).to.equal(0)
        })
    })
})
describe('Days model', function () {
    var plan = new Plan()
    
    afterEach(function (){
        return plan.resetDays()
    });
    describe('addPlaceToCurrentDay function', function () {
        it('should add to the array', () => {
            plan.addPlaceToCurrentDay('hotels', 2)
            expect(plan.days[0].hotels.length).to.equal(1)
            expect(plan.days[0].restaurants.length).to.equal(0)
            expect(plan.days[0].activities.length).to.equal(0)
        })
        it('should only add once', () => {
            plan.addPlaceToCurrentDay('hotels', 2)
            plan.addPlaceToCurrentDay('hotels', 2)
            expect(plan.days[0].hotels.length).to.equal(1)
            expect(plan.days[0].restaurants.length).to.equal(0)
            expect(plan.days[0].activities.length).to.equal(0)
        })
    })
    describe('removePlaceFromCurrentDay function', function () {
        it('remove from the array', () => {
            plan.addPlaceToCurrentDay('hotels', 2)
            plan.addPlaceToCurrentDay('restaurants', 3)
            plan.removePlaceFromCurrentDay('hotels', 2)
            expect(plan.days[0].hotels.length).to.equal(0)
            expect(plan.days[0].restaurants.length).to.equal(1)
            expect(plan.days[0].activities.length).to.equal(0)
        })
    })
    describe('addNewDay function', function () {
        it('adds a day', () => {
            plan.addNewDay()
            expect(plan.days.length).to.equal(2)
            expect(plan.currentday).to.equal(1)
        })
    })
    describe('removeDay function', function () {
        it('removes a day', () => {
            plan.addNewDay()
            plan.removeDay()
            expect(plan.days.length).to.equal(1)
            expect(plan.currentday).to.equal(0)
        })
    })
    describe('switchDays function', function () {
        it('switches a day', () => {
            plan.addNewDay()
            plan.addNewDay()
            plan.addNewDay()
            plan.addNewDay()
            plan.addNewDay()
            plan.switchDays(1)
            expect(plan.currentday).to.equal(1)
        })
    })
})
