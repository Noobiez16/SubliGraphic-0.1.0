# SubliGraphic: Design and Payment Manager

**SubliGraphic** is a mobile application designed to manage sublimation designs and process payments efficiently, integrating popular gateways and a modern user interface.

---

## ✅ Current Achievements (Already Done)

This section summarizes the work completed to date, including the features that are implemented, although some require adjustments.

* **Initial Payment Integration with PayPal:** Payment functionality has been implemented using PayPal's React libraries (`paypal-react`), allowing transactions to be processed within the application.
* **ATH Móvil Implementation:** The ATH Móvil payment method has been added as an option for users, including the initial logic for its operation.
* **Liquid Glass Interface Design:** A custom visual style known as "Liquid Glass ios26" was developed and applied, giving the app a unique, fluid iOS aesthetic.
* **Base Application Structure:** The main architecture of the app is established, allowing for navigation and basic component management.

---

## 🛠️ Current Technology Stack

The key languages ​​and technologies being used are specified here. This information is crucial to understand the project's development environment.

* **Main Language:** **JavaScript (ES6+)**
* **Framework:** **React Native** (This explains the need to manage styles for iOS and Android).
* **Payment Libraries:**
* `react-paypal-button-v2` (or the specific library you are using for `paypal-react`).
* Custom components for integration with **ATH Móvil**.
* **Design and Styling:**
* **Styled Components** or **CSS-in-JS** for the implementation of the "Liquid Glass" theme.

---

## 🗺️ Future Plans

This is the roadmap of the critical upcoming tasks for the development and improvement of SubliGraphic.

* **1. User Interface (UI) Fix and Evolution:**
* **Immediate Priority:** Investigate and fix the rendering bug in the **"Liquid Glass ios26" style on Android**.
* **New Goal:** Deprecate the "Liquid Glass" style and migrate the entire user interface to **Material You (Material Expressive 3)**. This will unify the design, modernize it, and ensure a consistent, native experience, especially on Android.

* **2. PayPal Integration Refactoring:**
* Audit and **repair the `paypal-react` implementation**. The goal is to ensure that the payment gateway is 100% stable, functional, and error-free on all platforms (iOS/Android).

* **3. Restore PayPal Component:**
* **Re-implement the "box" or visual container** that sits above the ATH Movil "box" or "visual container." This component is crucial for guiding the user and must be visible and functional as in previous versions.