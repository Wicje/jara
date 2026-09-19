# CONTEXT.md — project glossary (ubiquitous language)

> Active glossary, not a dictionary. Agents MUST use these terms and flag
> conflicts. Challenge, sharpen, and scenario-test terms; update inline.
> ADR only if hard-to-reverse + surprising + real tradeoff.

## Terms

| Term | Definition | Avoid |
|---|---|---|
| _e.g. Listing_ | _A rentable unit with price + availability_ | _item, entry, property_ |
| _e.g. Booking_ | _A confirmed hold on a Listing for dates_ | _reservation, order_ |

## Relationships

- _e.g. Booking belongs to exactly one Listing._

## Ambiguities (resolve, don't keep)

- _e.g. `backlog` is banned — say `ticket` or `TODO`._
