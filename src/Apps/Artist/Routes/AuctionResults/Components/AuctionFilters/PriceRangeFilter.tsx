import { Checkbox, Expandable, Spacer } from "@artsy/palette"
import {
  useAuctionResultsFilterContext,
  useCurrentlySelectedFiltersForAuctionResults,
} from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import type { Aggregations } from "Components/ArtworkFilter/ArtworkFilterContext"
import { aggregationsToHistogram } from "Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { PriceRange } from "Components/PriceRange/PriceRange"
import {
  type CustomRange,
  DEFAULT_PRICE_RANGE,
} from "Components/PriceRange/constants"
import type { FC } from "react"

export const PriceRangeFilter: FC<React.PropsWithChildren<unknown>> = () => {
  const { setFilter, aggregations } = useAuctionResultsFilterContext()
  const { priceRange, includeEstimateRange, includeUnknownPrices } =
    useCurrentlySelectedFiltersForAuctionResults()
  const bars = aggregationsToHistogram(aggregations as Aggregations)

  const handlePriceRangeUpdate = (updatedRange: CustomRange) => {
    setFilter?.("priceRange", updatedRange.join("-"))
  }

  return (
    <Expandable label="Price" expanded>
      <Spacer y={2} />
      <PriceRange
        bars={bars}
        priceRange={priceRange || DEFAULT_PRICE_RANGE}
        onDebouncedUpdate={handlePriceRangeUpdate}
      />
      <Spacer y={2} />
      <Checkbox
        selected={includeEstimateRange}
        onSelect={includeEstimateRange => {
          setFilter?.("includeEstimateRange", includeEstimateRange)
        }}
      >
        Include estimate range
      </Checkbox>
      <Spacer y={1} />
      <Checkbox
        selected={includeUnknownPrices}
        onSelect={includeUnknownPrices => {
          setFilter?.("includeUnknownPrices", includeUnknownPrices)
        }}
      >
        Include unknown and unavailable prices
      </Checkbox>
    </Expandable>
  )
}
