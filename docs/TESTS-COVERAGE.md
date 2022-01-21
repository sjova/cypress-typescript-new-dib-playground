# Tests Coverage

## DONE

- dev-playground (internal) [Sasa Jovanovic]
- accounts-fixture (internal) [Sasa Jovanovic]
- dib-travel, dib-travel-iframe (internal) [Sasa Jovanovic]
- sign-up [Dusan Petrovic, Nenad Tripunovic]
- sign-in (user, agent) [Dusan Petrovic, Stefan Nikolic]
- forgot-password [Dusan Petrovic, Stefan Nikolic]
- personal-settings
  - profile [Stefan Nikolic]
  - credit-cards [Stefan Nikolic]
- company-employees
  - employees-user [Dusan Petrovic, Stefan Nikolic]
  - employees-agent [Dusan Petrovic, Stefan Nikolic]
  - groups-user [Dusan Petrovic, Nenad Tripunovic]
  - groups-agent [Dusan Petrovic, Nenad Tripunovic]
- company-settings
  - invoice-settings (agent) [Stefan Nikolic]
  - payment-method [Nenad Tripunovic]
  - travel-settings [Nenad Tripunovic]
  - approval-process [Nenad Tripunovic]
  - reference-fields [Stefan Nikolic]
  - subscription [Nenad Tripunovic]
- company-report (invoices, analytics-reporting) [Nenad Tripunovic]
- my-travels (active, past) [Stefan Nikolic]
- group [Stefan Nikolic]
- other (agent) [Nenad Tripunovic]

## IN PROGRESS

- Maintenance, fixes and cleanup

## TODO (MAIN FEATURES)

- Zendesk support chat
- flights
  - fare families (medium scope)
  - loyalty program (small scope)
- hotels
  - a lot of UI/UX, flow, functionality changes (large scope)
- rail-bus
  - maybe changes after 6-9-12 months?
- cars
  - search (small scope)
  - booking (small scope)
  - travel policy (medium scope)
  - automatic cancellation (medium scope)
  - replace radius search with maps (6+ months)

## BLOCKERS

- company-employees / groups (user, agent) (DT-11016) (CI, Staging) [Nenad Tripunovic]
- company-settings / invoice-settings (agent) (DT-10506) [Stefan Nikolic]
- company-report / analytics-reporting (DT-10568) (CI, Staging) [Nenad Tripunovic]

## DISCUSSION

- company-employees / employees-agent (discussion, do we really need agent flow?)
  - revisit: `cypress/integration/dib-travel/company-employees/employees-agent.spec.ts`
- company-employees / groups-agent (discussion, do we really need agent flow?)
  - revisit: `cypress/integration/dib-travel/company-employees/groups-agent.spec.ts`
- `cypress/fixtures/other/generic-product.json` - revisit approach for `tripId` (tests should work in all environments)
- company-settings / subscription / purchase-history [Nenad Tripunovic] (docs ref, file download)
- company-settings / invoice-settings (agent) [Stefan Nikolic] (docs ref)
- sign-up / subscription plan [Nenad Tripunovic] (docs ref)
- company-report / invoices (file download)
- single feature / checkout (file download)
- company-settings / payment-method / billing profiles (docs ref)
- company-settings / payment-method / credit cards (docs ref)
