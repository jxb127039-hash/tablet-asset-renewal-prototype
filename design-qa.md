# Design QA

- source visual truth: `design/selected-reference.png`
- implementation screenshots: `qa/cart-390x844.png`, `qa/cart-recommendation-390x844.png`, `qa/plan-full.png`
- combined comparison evidence: `qa/design-comparison.png`
- viewport: 390 × 844, Chrome
- state: shopping cart recommendation before old-device trade-in is applied

## Full-view comparison evidence

The implementation preserves the selected Option 3 structure: high-value 3C cart rows, a lightweight purchased-assets entry, an expanded trade-in decision section, and a fixed checkout action. The current implementation is intentionally in the unselected recommendation state; the source mock showed the old device already applied, which was superseded by the confirmed product rule that checkout payable must not change before explicit consent.

## Focused-region comparison evidence

`qa/cart-recommendation-390x844.png` was inspected against the trade-in panel in the source. A focused comparison was required because the full page is scrollable and the fixed checkout bar represents the actual mobile viewport behavior. The focused region confirms that current value, bonus, today cost, 90-day comparison, and primary action remain readable without overlap.

## Required fidelity surfaces

- Fonts and typography: system Chinese UI stack matches the source's compact commerce treatment; heading, price, secondary text, and disclaimer weights remain distinct without truncation.
- Spacing and layout rhythm: 390 px frame, 14 px page gutters, grouped white surfaces, lightweight dividers, and restrained radii track the source. The implementation adds a required cart title and explanatory copy but keeps the same hierarchy.
- Colors and visual tokens: neutral gray page, white surfaces, commerce red actions, green current deductions, and neutral future-risk copy are consistent. Future depreciation is deliberately not green and is never shown as a discount.
- Image quality and asset fidelity: three generated product assets are installed at appropriate product-image sizes with clean white backgrounds and consistent iQOO art direction. No CSS drawings, inline SVG substitutes, emojis, or placeholders replace product imagery.
- Copy and content: all product-specific text uses iQOO tablets. The distinction between current discount and future estimated loss is explicit, and all values reconcile to the documented formulas.
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

## Follow-up polish

- [P3] A future iteration could reduce vertical density further after usability testing, but the current scroll depth is acceptable for the additional trust and calculation evidence requested.

final result: passed
