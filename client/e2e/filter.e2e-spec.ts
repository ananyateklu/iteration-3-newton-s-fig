import {RidesPage} from './filter.po';
import {browser, protractor, element, by} from 'protractor';
import {Key} from 'selenium-webdriver';

// This line (combined with the function that follows) is here for us
// to be able to see what happens (part of slowing things down)
// https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/

const origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function () {
  let args = arguments;

  // queue 100ms wait between test
  // This delay is only put here so that you can watch the browser do its thing.
  // If you're tired of it taking long you can remove this call or change the delay
  // to something smaller (even 0).
  origFn.call(browser.driver.controlFlow(), () => {
    return protractor.promise.delayed(20);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};


describe('rides page', () => {
  let page: RidesPage;

  beforeEach(() => {
    var baseTime = new Date(2019, 3, 26);
    jasmine.clock().mockDate(baseTime);
    page = new RidesPage();
    browser.executeScript("localStorage.user=\'{\"_id\":{\"$oid\":\"5c8182212f608130b228e558\"},\"name\":\"Sofia Sharp\"" +
      ",\"vehicle\":\"5c81820b80f223f8a09a54da\",\"phone\":\"(875) 571-3867\",\"email\":\"sofiasharp@email.co.uk\"}\';");
    page.navigateTo();
  });


/* This test works when seeded with the correct ride information, but not for the reason that it should.
   Figuring out the clock function would be my next step for sure. But this single test does test most
   of the filter's functionality. Because there are rides well before the given date that don't show up,
   and there are dates afterwards that do. To be complete there would need to be one ride on the given
   date, and the test would show that.
 */

  it("should be dates in both divs",()=>{

    page.navigateTo();
    page.click("filterButton");
    browser.executeScript('document.getElementsByClassName("mat-input-container")[0].style.display = "block";');
    page.field("datePickerField").sendKeys("4/27/2019");

    expect(page.elementExistsWithClass("unfilteredRides")).toBeTruthy("There should be some rides" +
                                                                      "in the unfilteredRides div");
    expect(page.elementExistsWithClass("rides")).toBeTruthy("There should be rides in the rides div");
  });

  it("should only be dates in the unfilteredRides div",()=>{

    page.navigateTo();
    page.click("filterButton");
    browser.executeScript('document.getElementsByClassName("mat-input-container")[0].style.display = "block";');
    page.field("datePickerField").sendKeys("4/26/2019");

    expect(page.elementExistsWithClass("unfilteredRides")).toBeTruthy("There should be some rides" +
      "in the unfilteredRides div");
    expect(page.elementExistsWithClass("rides")).toBeFalsy("There should be rides in the rides div");
  });

});
