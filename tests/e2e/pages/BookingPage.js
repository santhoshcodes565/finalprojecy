/**
 * BookingPage — Page Object Model (Playwright)
 * File: tests/e2e/pages/BookingPage.js
 *
 * Encapsulates ALL selectors and actions for the Booking page (/booking).
 * Never use raw page.click() in spec files — always go through this class.
 */

export class BookingPage {
  constructor(page) {
    this.page = page;

    // ── Step 1: Service selection ──────────────────────────────────────────────
    this.carOption     = page.getByTestId('service-option-car');
    this.driverOption  = page.getByTestId('service-option-driver');
    this.packageOption = page.getByTestId('service-option-package');
    this.continueBtn   = page.getByTestId('booking-continue-btn');

    // ── Step 2: Booking details form ──────────────────────────────────────────
    this.fullNameInput      = page.getByLabel(/full name/i);
    this.phoneInput         = page.getByLabel(/phone number/i);
    this.emailInput         = page.getByLabel(/email address/i);
    this.pickupDistrictSel  = page.getByLabel(/pickup district/i);
    this.pickupAddressInput = page.getByLabel(/pickup address/i);
    this.dropAddressInput   = page.getByLabel(/drop address/i);
    this.startDateInput     = page.getByLabel(/start date/i);
    this.endDateInput       = page.getByLabel(/end date/i);
    this.passengersInput    = page.getByLabel(/passengers/i);
    this.specialReqInput    = page.getByLabel(/special requests/i);
    this.reviewBookingBtn   = page.getByRole('button', { name: /review booking/i });
    this.backBtn            = page.getByRole('button', { name: /back/i });

    // ── Step 3: Confirmation ──────────────────────────────────────────────────
    this.confirmationSection = page.getByTestId('booking-confirmation');
    this.bookAnotherBtn      = page.getByRole('button', { name: /book another service/i });

    // ── Toasts / error messages ───────────────────────────────────────────────
    this.errorToast    = page.getByText(/please enter your full name|please select/i);
    this.successToast  = page.getByText(/request received|booking created/i);
    this.stepperActive = page.locator('.ring-4'); // active stepper ring class
  }

  async goto() {
    // 'commit' means Playwright resolves goto as soon as the server responds,
    // even if React Router immediately redirects. We then wait for booking content.
    await this.page.goto('/booking', { waitUntil: 'commit' });
    await this.page.waitForSelector('text=Secure Reservation', { timeout: 10000 });
  }

  async gotoWithCarPreselected(carId = 'car-001') {
    await this.page.goto(`/booking?type=car&carId=${carId}`, { waitUntil: 'commit' });
    await this.page.waitForSelector('text=Secure Reservation', { timeout: 10000 });
  }

  async gotoWithDriverPreselected(driverId = 'drv-001') {
    await this.page.goto(`/booking?type=driver&driverId=${driverId}`, { waitUntil: 'commit' });
    await this.page.waitForSelector('text=Secure Reservation', { timeout: 10000 });
  }

  async gotoWithPackagePreselected(packageId = 'pkg-001') {
    await this.page.goto(`/booking?type=package&packageId=${packageId}`, { waitUntil: 'commit' });
    await this.page.waitForSelector('text=Secure Reservation', { timeout: 10000 });
  }




  /**
   * Completes Step 1 by selecting a service type and clicking Continue.
   */
  async selectServiceAndContinue(type = 'car') {
    const btn = {
      car:     this.carOption,
      driver:  this.driverOption,
      package: this.packageOption,
    }[type];
    await btn.click();
    await this.continueBtn.click();
    await this.page.waitForTimeout(300); // allow step animation
  }

  /**
   * Fills all Step 2 form fields with the provided booking data object.
   */
  async fillBookingForm(data) {
    await this.fullNameInput.fill(data.fullName);
    await this.phoneInput.fill(data.phone);
    await this.emailInput.fill(data.email);
    if (data.pickupAddress) await this.pickupAddressInput.fill(data.pickupAddress);
    if (data.dropAddress)   await this.dropAddressInput.fill(data.dropAddress);
    await this.startDateInput.fill(data.startDate);
    if (data.endDate)       await this.endDateInput.fill(data.endDate);
    if (data.passengers)    await this.passengersInput.fill(data.passengers);
    if (data.specialRequests) await this.specialReqInput.fill(data.specialRequests);
  }

  /**
   * Clicks "Review Booking" button and waits for navigation or toast.
   */
  async submitBookingForm() {
    await this.reviewBookingBtn.click();
  }
}
