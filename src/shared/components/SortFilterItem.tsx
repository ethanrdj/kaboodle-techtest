import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC } from "react"
import { HStack, Heading } from "@chakra-ui/react"

export type SortFilterItemProps = {
  label: string
  icon: IconDefinition
  isSelected: boolean
  onClick: () => void
}

export const SortFilterItem: FC<SortFilterItemProps> = ({
  label,
  icon,
  isSelected,
  onClick,
}) => {
  return (
    <HStack
      w="full"
      p={2}
      justify="space-between"
      cursor="pointer"
      bg={isSelected ? "teal" : "white"}
      borderRadius="md"
      onClick={onClick}
      data-testid="sort-row"
    >
      <Heading size="sm" color={isSelected ? "white" : "teal"}>
        {label}
      </Heading>
      <FontAwesomeIcon icon={icon} color={isSelected ? "white" : "teal"} />
    </HStack>
  )
}
