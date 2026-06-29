# Prototype Instructions

Run the local server yourself and open the preview in the in-app browser. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Durable product decisions

- Use the user's second JD screenshot containing Apple, NAS, and other high-value 3C purchases as the category reference; do not use the earlier book-heavy screenshot.
- Use iQOO Pad products throughout the prototype, not iPad products.
- Position the feature as an upstream decision layer that reuses existing trade-in fulfillment: automatically match a historical purchase, compare timing, and calculate net upgrade cost.
- Never count future depreciation as a current discount. Show 90-day expected loss only as a separate timing comparison.
- Do not preselect or apply an old device. The checkout payable changes only after explicit user confirmation.
- Keep tablet upgrade cost separate from the cart total when accessories are also selected.
- Let users select any eligible 3C asset across categories and combine multiple assets in one renewal calculation.
- Show a residual-value curve on every asset, but keep forecast depreciation separate from current discounts.
- Apply the renewal bonus once per order, regardless of how many assets are selected.
