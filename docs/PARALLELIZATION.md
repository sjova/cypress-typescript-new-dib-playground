# Parallelization

Features that depend on other features:

- **Approval Process** depends on **Group** or **Employee**
- **Billing Profile** depends on **Group** or **Employee**
- **Payment Method (Billing profiles, Lodge Cards, Credit Cards)** depends on **Invoice Settings**
- **Profile/Internal Travel Agent** depends on **Employee**
- **Subscription** depends on the **Payment method (Billing profile or Credit Card)**
- **Travel Policy** depends on the **Approval Process**
