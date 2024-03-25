import { FC } from "react"
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome"

import { HStack } from "@chakra-ui/react"

type StarRatingProps = FontAwesomeIconProps & {
  amount: number
}

export const CustomIconRow: FC<StarRatingProps> = ({ amount, ...props }) => {
  return (
    <HStack spacing={1}>
      {Array.from({ length: amount }).map((_, index) => (
        <FontAwesomeIcon key={index} {...props} data-testid="custom-icon" />
      ))}
    </HStack>
  )
}
