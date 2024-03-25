import { FC } from "react"
import { Accommodation } from "../types/accommodation"
import { Heading, VStack } from "@chakra-ui/react"
import { FacilitiesList } from "./FacilitiesList"

type FacilitiesProps = {
  accommodation: Accommodation
}

export const Facilities: FC<FacilitiesProps> = ({ accommodation }) => {
  return (
    <VStack align="start" px={{ base: 3, sm: 6 }}>
      <Heading size="lg">{`${accommodation.type.name} Facilities`}</Heading>
      <VStack align="start">
        <FacilitiesList facilities={accommodation.facilities} />
      </VStack>
    </VStack>
  )
}
