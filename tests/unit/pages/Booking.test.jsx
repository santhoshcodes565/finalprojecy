/**
 * Booking Page — Unit Tests
 * File: tests/unit/pages/Booking.test.jsx
 * Framework: Vitest + @testing-library/react
 * Pattern: AAA (Arrange · Act · Assert)
 *
 * Tests the Booking.jsx page component in isolation using MemoryRouter
 * so useSearchParams / useNavigate work correctly without extra mocks.
 */

import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import toast from 'react-hot-toast';
import Booking from '@/pages/Booking';

// ─── Renderer helper ──────────────────────────────────────────────────────────
// Routes are handled by MemoryRouter — no manual mocking of useSearchParams needed.
// The global setup.js mock of useSearchParams is overridden here by MemoryRouter.
const renderBooking = (path = '/booking') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Booking />
    </MemoryRouter>
  );

// ─── Reset mocks before each test ────────────────────────────────────────────
beforeEach(() => {
  vi.clearAllMocks();
});

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Step 1 — Initial Render
// ═══════════════════════════════════════════════════════════════════════════════

describe('Booking Page — Step 1 (Service Selection)', () => {
  it('should render the page heading with "Journey"', () => {
    // Arrange + Act
    renderBooking();

    // Assert
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/journey/i);
  });

  it('should render all three service option cards', () => {
    // Arrange + Act
    renderBooking();

    // Assert
    expect(screen.getByText('Rental Car')).toBeInTheDocument();
    expect(screen.getByText('Hire Driver')).toBeInTheDocument();
    expect(screen.getByText('Tour Package')).toBeInTheDocument();
  });

  it('should render a "Continue" button on step 1', () => {
    // Arrange + Act
    renderBooking();

    // Assert
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });

  it('should NOT render the booking form on step 1 initial render', () => {
    // Arrange + Act
    renderBooking();

    // Assert — booking form (step 2 heading) should not be visible yet
    expect(screen.queryByText('Booking Details')).not.toBeInTheDocument();
  });

  it('should display service description text for each option', () => {
    // Arrange + Act
    renderBooking();

    // Assert
    expect(screen.getByText(/self-drive or chauffeur/i)).toBeInTheDocument();
    expect(screen.getByText(/professional bilingual/i)).toBeInTheDocument();
    expect(screen.getByText(/all-inclusive/i)).toBeInTheDocument();
  });

  it('should render the "Secure Reservation" tag', () => {
    // Arrange + Act
    renderBooking();

    // Assert
    expect(screen.getByText(/secure reservation/i)).toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Step Navigation
// ═══════════════════════════════════════════════════════════════════════════════

describe('Booking Page — Step Navigation', () => {
  it('should advance to step 2 (Booking Details) when Continue is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    renderBooking();

    // Act
    await user.click(screen.getByRole('button', { name: /continue/i }));

    // Assert
    expect(screen.getByText('Booking Details')).toBeInTheDocument();
  });

  it('should return to step 1 when Back is clicked from step 2', async () => {
    // Arrange
    const user = userEvent.setup();
    renderBooking();

    // Act — go to step 2 then back
    await user.click(screen.getByRole('button', { name: /continue/i }));
    await user.click(screen.getByRole('button', { name: /back/i }));

    // Assert
    expect(screen.getByText('What do you want to book?')).toBeInTheDocument();
  });

  it('should advance to step 2 after selecting Hire Driver and clicking Continue', async () => {
    // Arrange
    const user = userEvent.setup();
    renderBooking();

    // Act
    await user.click(screen.getByText('Hire Driver'));
    await user.click(screen.getByRole('button', { name: /continue/i }));

    // Assert
    expect(screen.getByText('Booking Details')).toBeInTheDocument();
  });

  it('should advance to step 2 after selecting Tour Package and clicking Continue', async () => {
    // Arrange
    const user = userEvent.setup();
    renderBooking();

    // Act
    await user.click(screen.getByText('Tour Package'));
    await user.click(screen.getByRole('button', { name: /continue/i }));

    // Assert
    expect(screen.getByText('Booking Details')).toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 3. URL Pre-selection (Deep Link)
// ═══════════════════════════════════════════════════════════════════════════════

describe('Booking Page — URL Pre-selection', () => {
  it('should skip step 1 and go directly to step 2 when carId is in URL', () => {
    // Arrange + Act
    renderBooking('/booking?type=car&carId=car-001');

    // Assert
    expect(screen.getByText('Booking Details')).toBeInTheDocument();
    expect(screen.queryByText('What do you want to book?')).not.toBeInTheDocument();
  });

  it('should skip step 1 when driverId is in URL', () => {
    // Arrange + Act
    renderBooking('/booking?type=driver&driverId=drv-001');

    // Assert
    expect(screen.getByText('Booking Details')).toBeInTheDocument();
  });

  it('should skip step 1 when packageId is in URL', () => {
    // Arrange + Act
    renderBooking('/booking?type=package&packageId=pkg-001');

    // Assert
    expect(screen.getByText('Booking Details')).toBeInTheDocument();
  });

  it('should NOT render a Back button when pre-selected via URL', () => {
    // Arrange + Act
    renderBooking('/booking?type=car&carId=car-001');

    // Assert — no back button when step 1 is bypassed
    expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument();
  });

  it('should show the selected service banner when pre-selected', () => {
    // Arrange + Act
    renderBooking('/booking?type=car&carId=car-001');

    // Assert — selected car label visible
    expect(screen.getByText(/selected car/i)).toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Step 2 — Form Field Rendering
// ═══════════════════════════════════════════════════════════════════════════════

describe('Booking Page — Step 2 Form Fields', () => {
  // Helper: render directly on step 2 via URL preselection
  const renderStep2 = () => renderBooking('/booking?type=car&carId=car-001');

  it('should render Full Name input field', () => {
    // Arrange + Act
    renderStep2();

    // Assert
    expect(screen.getByPlaceholderText(/your full name/i)).toBeInTheDocument();
  });

  it('should render Phone Number input field', () => {
    // Arrange + Act
    renderStep2();

    // Assert
    expect(screen.getByPlaceholderText(/\+91/i)).toBeInTheDocument();
  });

  it('should render Email Address input field', () => {
    // Arrange + Act
    renderStep2();

    // Assert
    expect(screen.getByPlaceholderText(/you@email\.com/i)).toBeInTheDocument();
  });

  it('should render Pickup District dropdown with Tamil Nadu districts', () => {
    // Arrange + Act
    renderStep2();

    // Assert — Chennai is one of the district options
    expect(screen.getByRole('option', { name: 'Chennai' })).toBeInTheDocument();
  });

  it('should render Passengers input defaulting to 2', () => {
    // Arrange + Act
    renderStep2();

    // Assert
    const passInput = screen.getByDisplayValue('2');
    expect(passInput).toBeInTheDocument();
    expect(passInput.type).toBe('number');
  });

  it('should render the Special Requests textarea', () => {
    // Arrange + Act
    renderStep2();

    // Assert
    expect(screen.getByPlaceholderText(/child seats|route preferences/i)).toBeInTheDocument();
  });

  it('should render at least one date input', () => {
    // Arrange + Act
    renderStep2();

    // Assert
    const dateInputs = document.querySelectorAll('input[type="date"]');
    expect(dateInputs.length).toBeGreaterThanOrEqual(1);
  });

  it('should update fullName field value when user types', async () => {
    // Arrange
    const user = userEvent.setup();
    renderStep2();
    const input = screen.getByPlaceholderText(/your full name/i);

    // Act
    await user.type(input, 'Ravi Kumar');

    // Assert
    expect(input).toHaveValue('Ravi Kumar');
  });

  it('should update phone field value when user types', async () => {
    // Arrange
    const user = userEvent.setup();
    renderStep2();
    const input = screen.getByPlaceholderText(/\+91/i);

    // Act
    await user.type(input, '9876543210');

    // Assert
    expect(input).toHaveValue('9876543210');
  });

  it('should update email field value when user types', async () => {
    // Arrange
    const user = userEvent.setup();
    renderStep2();
    const input = screen.getByPlaceholderText(/you@email\.com/i);

    // Act
    await user.type(input, 'ravi@slt.com');

    // Assert
    expect(input).toHaveValue('ravi@slt.com');
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Validation Tests
// ═══════════════════════════════════════════════════════════════════════════════

describe('Booking Page — Validation', () => {
  it('should call toast.error when Review Booking is clicked with empty full name', async () => {
    // Arrange
    const user = userEvent.setup();
    renderBooking('/booking?type=car&carId=car-001');

    // Act — submit without filling anything
    await user.click(screen.getByRole('button', { name: /review booking/i }));

    // Assert
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringMatching(/full name|phone|email/i)
      );
    });
  });

  it('should call toast.error when start date is missing', async () => {
    // Arrange
    const user = userEvent.setup();
    renderBooking('/booking?type=car&carId=car-001');

    // Act — fill name/phone/email but leave start date empty
    await user.type(screen.getByPlaceholderText(/your full name/i), 'Ravi Kumar');
    await user.type(screen.getByPlaceholderText(/\+91/i), '9876543210');
    await user.type(screen.getByPlaceholderText(/you@email\.com/i), 'ravi@slt.com');
    await user.click(screen.getByRole('button', { name: /review booking/i }));

    // Assert
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringMatching(/start date|please select/i)
      );
    });
  });

  it('should call toast.error when end date is missing for car booking', async () => {
    // Arrange
    const user = userEvent.setup();
    renderBooking('/booking?type=car&carId=car-001');

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    const futureDateStr = futureDate.toISOString().split('T')[0];

    // Act — fill everything including start date, but no end date
    await user.type(screen.getByPlaceholderText(/your full name/i), 'Ravi Kumar');
    await user.type(screen.getByPlaceholderText(/\+91/i), '9876543210');
    await user.type(screen.getByPlaceholderText(/you@email\.com/i), 'ravi@slt.com');

    const dateInputs = document.querySelectorAll('input[type="date"]');
    fireEvent.change(dateInputs[0], { target: { value: futureDateStr } });
    // leave endDate empty (dateInputs[1])

    await user.click(screen.getByRole('button', { name: /review booking/i }));

    // Assert
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringMatching(/end date|please select/i)
      );
    });
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Submit Button States
// ═══════════════════════════════════════════════════════════════════════════════

describe('Booking Page — Submit Button States', () => {
  it('should render the "Review Booking" button on step 2', () => {
    // Arrange + Act
    renderBooking('/booking?type=car&carId=car-001');

    // Assert
    expect(screen.getByRole('button', { name: /review booking/i })).toBeInTheDocument();
  });

  it('should not be disabled initially', () => {
    // Arrange + Act
    renderBooking('/booking?type=car&carId=car-001');

    // Assert
    expect(screen.getByRole('button', { name: /review booking/i })).not.toBeDisabled();
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 7. Car / Driver Selection Dropdown
// ═══════════════════════════════════════════════════════════════════════════════

describe('Booking Page — Service Dropdowns', () => {
  it('should show car model select when type=car is chosen without pre-selection', async () => {
    // Arrange
    const user = userEvent.setup();
    renderBooking('/booking');

    // Act — advance to step 2 with Car selected (default)
    await user.click(screen.getByRole('button', { name: /continue/i }));

    // Assert — car name from mockData is visible in a dropdown option
    expect(screen.getByText(/Toyota Innova Crysta/i)).toBeInTheDocument();
  });

  it('should show driver select when Hire Driver is chosen', async () => {
    // Arrange
    const user = userEvent.setup();
    renderBooking('/booking');

    // Act
    await user.click(screen.getByText('Hire Driver'));
    await user.click(screen.getByRole('button', { name: /continue/i }));

    // Assert — driver name from mockData
    expect(screen.getByText(/Rajesh Kumar/i)).toBeInTheDocument();
  });

  it('should show package select when Tour Package is chosen', async () => {
    // Arrange
    const user = userEvent.setup();
    renderBooking('/booking');

    // Act
    await user.click(screen.getByText('Tour Package'));
    await user.click(screen.getByRole('button', { name: /continue/i }));

    // Assert — package title from mockData
    expect(screen.getByText(/Ooty Weekend Getaway/i)).toBeInTheDocument();
  });
});
