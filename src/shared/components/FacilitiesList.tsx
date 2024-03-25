import { FC } from "react"
import { Facility } from "../types/accommodation"
import { HStack, Text } from "@chakra-ui/react"
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

type FacilitiesListProps = {
  facilities: Facility[] | undefined
  size?: FontAwesomeIconProps["size"]
}

export const FacilitiesList: FC<FacilitiesListProps> = ({
  facilities = [],
  size = "lg",
}) => {
  return facilities.map((facility) => (
    <HStack key={facility.id} wrap="wrap">
      <FontAwesomeIcon
        icon={faCheck}
        size={size as FontAwesomeIconProps["size"]}
        color="lightGreen"
        data-testid="tick-icon"
      />
      <Text fontSize={size} fontWeight={300}>
        {facility.label}
      </Text>
    </HStack>
  ))
}
