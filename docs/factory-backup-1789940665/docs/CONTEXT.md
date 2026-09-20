# CONTEXT.md — project glossary (ubiquitous language)

> Active glossary, not a dictionary. Agents MUST use these terms and flag
> conflicts. Challenge, sharpen, and scenario-test terms; update inline.
> ADR only if hard-to-reverse + surprising + real tradeoff.

## Terms

| Term | Definition | Avoid |
|---|---|---|
| Vendor | A store selling fashion, e.g. Dera's Store | shop, seller, merchant |
| Listing | One sellable ready-made item with price NGN + sizes + photos | item, entry, product |
| Thread | A shopper concierge conversation with AI messages + recommended Listing ids | chat, session |
| Order | A shopper commitment on one Listing with size + buyer contact + status | reservation, booking, cart |
| InboxEvent | An AgentMail email in/out linked to an Order timeline | email, notification |

## Relationships

- Listing belongs to exactly one Vendor.
- Order belongs to exactly one Listing and one Vendor.
- Thread recommends zero or more Listings.
- Order has many InboxEvents forming its timeline.

## Ambiguities (resolve, don't keep)

- `jara extra` means bonus value, not discount — say `jara` for the brand, `deal` for price cut.
