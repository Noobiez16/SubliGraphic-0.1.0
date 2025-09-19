# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [0.3.3] - 2025-09-18

### Added
- **CSS Import:** Added a direct import for `AIIdeaGenerator.css` within the `AIIdeaGenerator.tsx` component to ensure styles are correctly applied.

### Changed
- **Styling Refactor:** Moved the `@keyframes spin360` animation from an inline `<style>` tag in `AIIdeaGenerator.tsx` to the external `AIIdeaGenerator.css` stylesheet, improving code organization and maintainability.
- **Button and Price Alignment:** Updated the product card layout by changing `justify-between` to `justify-center` and adjusting the `gap` to provide more balanced and centered alignment for the price and "View" button.
- **CSS Custom Properties:** Replaced a hardcoded inline `style` for the AI-generated mug preview with a CSS custom property (`--mug-design-image`), making the styling more dynamic and easier to manage.

### Fixed
- **iOS Stacking Context Bug:** Resolved a critical positioning issue where the AI Floating Action Button (FAB) would not remain fixed on iOS devices. The fix involved moving the `AIIdeaGenerator` component to a top-level position in the `App.tsx` DOM structure, escaping the parent stacking context.
- **CSS Compatibility:** Addressed a browser compatibility warning by ensuring the `-webkit-mask-mode` property was included alongside `mask-mode` in `AIIdeaGenerator.css`.

## [0.3.2] - 2025-09-16

### Added
- **Local Development Environment:** Created a `.env` file to properly manage the PayPal Client ID, preventing configuration errors during local development.

### Changed
- **Code Simplification:** Removed the custom `.ai-fab-sticky` CSS class in favor of a more robust and maintainable Tailwind CSS implementation for component positioning.
- **Styling Architecture:** Refactored multiple components to eliminate inline styles, moving them to dedicated CSS classes to improve code quality and adherence to best practices.

### Fixed
- **AI Button Positioning:** Corrected a major layout bug causing the AI Floating Action Button (FAB) to be misaligned on iOS. The positioning logic was refactored to ensure consistent bottom-right placement across all devices.
- **Build Stability:** Resolved a critical TypeScript build error (TS1117) related to duplicate object properties in `AIIdeaGenerator.tsx`.
- **Accessibility:** Addressed an accessibility issue by adding a descriptive `aria-label` to the icon-only cart button, making it accessible to screen readers.
- **CSS Compatibility:** Ensured proper vendor prefixes for the `mask-mode` CSS property, resolving a minor browser compatibility warning.

---

## [0.3.1] - 2025-09-16

### Added
- Implemented a dynamic, OS-native theming system: "Material Expressive 3" for Android and "Liquid Glass" for iOS.
- Integrated the official PayPal React SDK for functional payment processing, replacing the previous simulation.
- Added a user-friendly modal for ATH Móvil payments.

### Changed
- Refactored the entire styling system from component-level conditional logic to a global, CSS variable-driven architecture for better maintainability.
- Enhanced TypeScript configuration by enabling strict mode for improved type safety.

### Fixed
- Resolved major text and button readability issues on the iOS "Liquid Glass" theme by adding text shadows and adjusting colors.
- Corrected multiple build and deployment errors related to environment variables (.env, Vite config) for local, cloud, and production builds on GitHub Pages.
- Addressed an accessibility issue by adding an aria-label to the icon-only cart button.
- Fixed TypeScript module resolution errors for .png files by adding a type declaration file.
- Resolved all outstanding CSS and linter warnings, including CSS prefix order and removing inline styles.

---

## [0.3.0] - 2025-09-13

### Added
- **Real PayPal Payments:** Integrated the official PayPal React SDK (`@paypal/react-paypal-js`) to replace the simulated payment flow with a fully functional transaction system.
- **ATH Móvil Payment Flow:** Implemented a user-friendly modal for ATH Móvil payments, displaying business information and a "Copy Number" button for convenience.

### Changed
- **Upgraded Checkout View:** Overhauled `components/CheckoutView.tsx` to include the live PayPal payment button and the trigger for the ATH Móvil modal.
- **Vite Configuration:** Modified `vite.config.ts` to securely load the PayPal Client ID from environment variables, including a workaround for environments that do not support `.env` files.

### Fixed
- **PayPal Configuration Error:** Resolved the application-blocking error by correctly providing the `VITE_PAYPAL_CLIENT_ID` to the application context.
- **Module Export Error:** Corrected a `SyntaxError` by properly exporting the `CheckoutView` and `OrderConfirmation` components from their module.
- **JSX Parsing Error:** Fixed a syntax issue in the ATH Móvil button that prevented the component from rendering.

---

## [0.2.0] - 2025-09-12

### Added
- **AI-Powered Design Generation:** Integrated a generative AI model allowing users to create unique, custom images from text descriptions directly within the application.
- **Interactive 360° Product Preview:** Implemented a realistic, spritesheet-based 360-degree rotating mockup for users to visualize their custom designs on products before purchasing.
- **Custom Product Integration with Cart:** Enabled users to apply their generated designs to base products (mugs, tumblers) and add these personalized items to the shopping cart.
- **Simulated Checkout Flow:** Built a complete, multi-view checkout process featuring an order summary, multiple payment options, and an order confirmation screen.

### Changed
- **UI/UX Enhancements:** Refined the AI generator's user flow with a smoother loading state and improved the overall navigation from design creation to purchase.
- **State Management:** Introduced a centralized view management system (`currentView`) in `App.tsx` to handle navigation between the store, cart, checkout, and confirmation pages.

### Fixed
- **LocalStorage Quota Errors:** Refactored cart persistence logic to store large custom image data separately, preventing storage overflow errors and allowing multiple custom items to be saved.

---

## [0.1.0] - 2025-09-11

The first public release of SubliGraphic! This release establishes the foundation of the project, deploys the site, and fixes theme detection for mobile devices.

### Added
- **Project Initialization:** Creation of the basic structure of the SubliGraphic website.
- **Deployment to GitHub Pages:** Configuration of the project to be publicly accessible via a URL.
- **Theme Detection Improvements:** Implemented robust script logic to correctly detect between iOS and Android devices, ensuring the corresponding visual theme is displayed (Material Expressive 3 for Android, Liquid Glass for iOS).

### Fixed
- **Resource Paths:** Adjusted script and icon paths to work correctly in the GitHub Pages environment.