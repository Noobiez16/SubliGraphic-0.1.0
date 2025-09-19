# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.4] - 2025-09-19

### Fixed
- Resolved theming bugs to ensure UI consistency, ensuring that components display the "Material" style on Android and "Liquid Glass" style on iOS correctly.
- Complete stabilization of the styling system, which included downgrading tailwindcss to the stable v3 version and refactoring PostCSS and Vite to eliminate compilation errors.

## [0.3.3] - 2025-09-18

### Fixed
- **ATH Móvil Integration:**
  - The business account (`businessAccount`) is now correctly configured in the `ATHMovilButton` component, ensuring that payments are directed to the correct destination.
  - A validation was added to ensure that the total amount (`total`) is always greater than zero before processing a payment, preventing transaction errors with invalid amounts.
- **UI and Styling:**
  - The `CheckoutView` component was adjusted to correctly display the ATH Móvil button, which was previously not rendering.
  - The visual styles of the payment buttons were standardized to ensure they are consistent and visually appealing.

## [0.3.2] - 2025-09-17

### Fixed
- **PayPal Integration:**
  - The `paypal-react` library was completely removed and replaced with `react-paypal-button-v2` to resolve critical compatibility issues that were preventing the component from rendering.
  - The `PayPalButton` component is now passed the `total` and `onPaymentSuccess` props correctly, ensuring that the payment amount is accurate and that the confirmation callback functions as expected.
- **UI:**
  - The `CheckoutView` component was updated to conditionally render the PayPal button only when the `total` is greater than zero, preventing users from attempting to pay with a zero balance.
  - A visual bug was fixed where the PayPal button container was not being displayed, restoring the intended layout.

## [0.1.0] - 2025-09-12

### Added
- **Initial project setup:**
  - The basic structure of the React Native application was created.
  - The main dependencies, such as `react`, `react-native`, and `styled-components`, were configured.
- **"Liquid Glass" theme:**
  - A custom theme called "Liquid Glass ios26" was designed and implemented, giving the application a unique, fluid-style aesthetic.
  - Basic components, such as buttons and containers, were created following the "Liquid Glass" design.
- **Initial payment integration:**
  - The `paypal-react` library was added to the project to handle payments with PayPal.
  - A basic payment flow was implemented, allowing users to initiate a transaction.
