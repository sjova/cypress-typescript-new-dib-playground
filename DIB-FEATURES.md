# DIB Features - Parent Selectors

## OUTSIDE

- [Sign up](https://develop--dib-travel.netlify.app/sign-up) - `dib-signup`
- [Sign in](https://develop--dib-travel.netlify.app/login) - `new-login`
- [Agent login](https://develop--dib-travel.netlify.app/login/agent) - `new-agent-login`
- [Forgot password](https://develop--dib-travel.netlify.app/forgot-password) - `new-forgot-password`

## MY TRAVELS

- [My Travels/Active](https://develop--dib-travel.netlify.app/my-travels/active) - `app-my-travels dib-travels-list`
- [My Travels/Past](https://develop--dib-travel.netlify.app/my-travels/past) - `app-my-travels dib-travels-list`

## PERSONAL SETTINGS

- [PERSONAL SETTINGS/PROFILE](https://develop--dib-travel.netlify.app/profile/account) - `dib-profile dib-account`
- [PERSONAL SETTINGS/CREDIT CARDS](https://develop--dib-travel.netlify.app/profile/payment) - `dib-profile dib-payment`

## COMPANY EMPLOYEES

- [COMPANY EMPLOYEES/EMPLOYEES](https://develop--dib-travel.netlify.app/people-management/employees) - `dib-people-management new-dib-employees`
- [COMPANY EMPLOYEES/GROUPS](https://develop--dib-travel.netlify.app/people-management/groups) - `dib-people-management dib-groups`

## COMPANY SETTINGS

- [COMPANY SETTINGS/PAYMENT METHOD/BILLING PROFILES](https://develop--dib-travel.netlify.app/company-management/payment-method/billing-profiles) - `dib-company-management dib-payment-method dib-billing-profiles`
- [COMPANY SETTINGS/PAYMENT METHOD/CREDIT CARDS](https://develop--dib-travel.netlify.app/company-management/payment-method/credit-cards) - `dib-company-management dib-payment-method dib-payment-method-credit-cards`
- [COMPANY SETTINGS/PAYMENT METHOD/LODGE CARDS](https://develop--dib-travel.netlify.app/company-management/payment-method/lodge-cards) - `dib-company-management dib-payment-method dib-lodge-cards`
- [COMPANY SETTINGS/TRAVEL POLICY](https://develop--dib-travel.netlify.app/company-management/travel-policy) - `dib-company-management dib-travel-policy`
- [COMPANY SETTINGS/APPROVAL PROCESS](https://develop--dib-travel.netlify.app/company-management/approval-process) - `dib-company-management dib-approval-process`
- [COMPANY SETTINGS/REFERENCE FIELDS/COST CENTER](https://develop--dib-travel.netlify.app/company-management/reference-fields/cost-center) - `dib-company-management dib-reference-fields dib-cost-center`
- [COMPANY SETTINGS/REFERENCE FIELDS/PROJECT](https://develop--dib-travel.netlify.app/company-management/reference-fields/project) - `dib-company-management dib-reference-fields dib-project`
- [COMPANY SETTINGS/REFERENCE FIELDS/PURPOSE OF TRIP](https://develop--dib-travel.netlify.app/company-management/reference-fields/purpose-of-trip) - `dib-company-management dib-reference-fields dib-purpose-of-trip`
- [COMPANY SETTINGS/REFERENCE FIELDS/YOUR REFERENCE](https://develop--dib-travel.netlify.app/company-management/reference-fields/your-reference) - `dib-company-management dib-reference-fields dib-your-reference`
- [COMPANY SETTINGS/SUBSCRIPTION/OVERVIEW](https://develop--dib-travel.netlify.app/company-management/subscription/overview) - `dib-company-management dib-subscription dib-subscription-overview`
- [COMPANY SETTINGS/SUBSCRIPTION/PRICING PLANS](https://develop--dib-travel.netlify.app/company-management/subscription/pricing-plans) - `dib-company-management dib-subscription dib-subscription-pricing-plans`
- [COMPANY SETTINGS/SUBSCRIPTION/LICENSES](https://develop--dib-travel.netlify.app/company-management/subscription/licenses) - `dib-company-management dib-subscription dib-subscription-licenses`
- [COMPANY SETTINGS/SUBSCRIPTION/PAYMENT METHOD](https://develop--dib-travel.netlify.app/company-management/subscription/payment-method) - `dib-company-management dib-subscription dib-subscription-payment-method`
- [COMPANY SETTINGS/SUBSCRIPTION/PURCHASE HISTORY](https://develop--dib-travel.netlify.app/company-management/subscription/purchase-history) - `dib-company-management dib-subscription dib-subscription-purchase-history`

## COMPANY REPORT

- [COMPANY REPORT/REPORTING](https://develop--dib-travel.netlify.app/reporting/analytics) - `dib-reporting dib-analytics-page`
- [COMPANY REPORT/INVOICES](https://develop--dib-travel.netlify.app/reporting/invoices) - `dib-reporting dib-invoices`

## FLIGHTS, HOTELS, RAIL & BUS, CARS, GROUP, OTHER

- [HOME](https://develop--dib-travel.netlify.app/) - `home dib-product-pickers .pickers-form` (temp. solution)

## FLIGHTS

- [FLIGHTS](https://develop--dib-travel.netlify.app/flights) - `dib-flights`

## RAIL & BUS

- [RAIL & BUS](https://develop--dib-travel.netlify.app/city) - `dib-trains`

## CARS

- [CARS](https://develop--dib-travel.netlify.app/cars) - `dib-cars`

## GROUP

- [GROUP](https://develop--dib-travel.netlify.app/<todo>) - `TBD`

## OTHER

- [OTHER](https://develop--dib-travel.netlify.app/<todo>) - `TBD`

## PRODUCTS PICKER (HOME CENTRAL NAVIGATION)

- `dib-navbar`

## MAIN SIDEBAR NAVIGATION ICON (HAMBURGER ICON)

- `dib-navbar dib-hamburger-icon`

## MAIN SIDEBAR NAVIGATION

- `.cdk-overlay-container dib-navbar-panel`

## COOKIES POPUP

- `cookies-popup .cookies-popup__content .cookies-popup__text` - HTML text
- `cookies-popup .cookies-popup__content .close-icon` - button

## DIALOG (MODAL)

`.cdk-overlay-container dib-*-dialog` - in most cases
or
`.cdk-overlay-container *-dialog`

## SELECT (DROPDOWN)

`.cdk-overlay-container ui-panel`

## SNACKBAR

- `.cdk-overlay-container simple-snack-bar > span` - message
- `.cdk-overlay-container simple-snack-bar button` - button

## ANGULAR APPLICATION PARENT

- `app-root`

## ANGULAR APPLICATION ROUTER

- `router-outlet`
  - `routerLink`

Note: Should not be used as selectors.
