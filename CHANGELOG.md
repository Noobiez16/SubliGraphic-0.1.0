# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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