import { FC } from "react"
import { Accommodation } from "../types/accommodation"
import { VStack } from "@chakra-ui/react"
import { AccommodationListItem } from "./AccommodationListItem"

type AccommodationListProps = {
  allAccommodation: Accommodation[]
}

export const AccommodationList: FC<AccommodationListProps> = ({
  allAccommodation,
}) => {
  return (
    <VStack spacing={6} pb={6} w="full" align="center">
      {allAccommodation.map((accommodation) => (
        <AccommodationListItem
          key={accommodation.id}
          accommodation={accommodation}
        />
      ))}
    </VStack>
  )
}
