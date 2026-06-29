# Design QA

- source visual truth: `design/selected-reference.png`
- implementation screenshots: `qa/cart-390x844.png`, `qa/assets-390x844.png`, `qa/assets-multiselect-390x844.png`, `qa/plan-multiasset-390x844.png`
- combined comparison evidence: `qa/design-comparison.png`
- viewport: 390 × 844, Chrome
- state: shopping cart recommendation, unselected asset center, four-asset selection, and combined renewal plan

## Full-view comparison evidence

The implementation preserves the selected Option 3 structure: high-value 3C cart rows, a lightweight purchased-assets entry, an expanded trade-in decision section, and a fixed checkout action. Assets are intentionally unselected on entry. The asset center now supports tablet, phone, and earbuds selection, then clearly changes the combined offset from ¥0 to ¥3,800 only after explicit selection.

## Focused-region comparison evidence

`qa/assets-390x844.png` and `qa/assets-multiselect-390x844.png` confirm that product images, residual-value curves, selection state, one-time bonus, and fixed next-step action remain readable without overlap. `qa/plan-multiasset-390x844.png` confirms that current recovery value and the 90-day expected loss are separated into different decision surfaces.

## Required fidelity surfaces

- Fonts and typography: system Chinese UI stack matches the source's compact commerce treatment; heading, price, secondary text, and disclaimer weights remain distinct without truncation.
- Spacing and layout rhythm: 390 px frame, 14 px page gutters, grouped white surfaces, lightweight dividers, and restrained radii track the source. The implementation adds a required cart title and explanatory copy but keeps the same hierarchy.
- Colors and visual tokens: neutral gray page, white surfaces, commerce red actions, green current deductions, and neutral future-risk copy are consistent. Future depreciation is deliberately not green and is never shown as a discount.
- Image quality and asset fidelity: generated tablet, phone, and earbuds assets are installed at appropriate product-image sizes with clean white backgrounds and a consistent 3C catalog art direction. No placeholders remain.
- Copy and content: the target product remains iQOO Pad6 Pro, while historical assets span iQOO/vivo tablets, phone, and earbuds. Every value curve labels today and 90-day estimates. The expected depreciation is never included in today's discount, and all values reconcile to the documented formulas.
- Icons and controls: Ant Design icons are used consistently; cart selection, quantity, navigation, upload, reminder, success, and export controls are interactive.
- Responsiveness and accessibility: verified at 390 × 844 and below 370 px; no horizontal overflow. Main controls are semantic buttons, images have alt text, forms are labelled, focus-visible styling is present, and the complete core flow is keyboard-addressable.

## Findings

No actionable P0, P1, or P2 findings remain.

## Patches made since the first QA pass

- Reset scroll position on every route so the decision hero cannot open underneath the sticky header.
- Locked the target mobile frame and fixed checkout bar to 390 px.
- Kept the old device unselected until the user confirms, while preserving the selected state after confirmation.
- Separated tablet net upgrade cost from cart payable including accessories.
- Replaced Apple products with generated iQOO Pad6 Pro, iQOO keyboard, and iQOO Pad2 Pro assets.
- Added cross-category multi-select with generated iQOO phone and vivo earbuds imagery.
- Added per-asset today/30/60/90-day residual-value curves and explicit non-discount copy.
- Kept the renewal bonus to one application per order while summing all selected asset estimates.

## Follow-up polish

- [P3] A future iteration could reduce vertical density further after usability testing, but the current scroll depth is acceptable for the additional trust and calculation evidence requested.

final result: passed
