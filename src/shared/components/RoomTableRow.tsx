import { FC, useMemo } from "react"
import { Room } from "../types/accommodation"
import { TableRowProps, Td, Text, Tr, VStack } from "@chakra-ui/react"

import { faPerson } from "@fortawesome/free-solid-svg-icons"
import { useGetRoomAvailabilityQuery } from "../services/api"
import { CustomIconRow } from "./CustomIconRow"

import { FacilitiesList } from "./FacilitiesList"

type RoomTableRowProps = TableRowProps & {
  room: Room
}

export const RoomTableRow: FC<RoomTableRowProps> = ({ room, ...props }) => {
  const { data: availability } = useGetRoomAvailabilityQuery(room.id, {
    skip: !room.id,
  })

  const uniqueNameAndType = useMemo(
    () => room.name.trim() !== room.type.trim(), // Do not show type if it's the same as the room name
    [room]
  )

  return (
    <Tr h="80px" {...props}>
      <Td>
        <VStack align="start">
          <VStack spacing={0} align="start">
            <Text fontSize="md" fontWeight={600} isTruncated>
              {room.name}
            </Text>
            {uniqueNameAndType && (
              <Text fontSize="xs" color="gray.600" fontWeight={600} isTruncated>
                {room.type}
              </Text>
            )}
          </VStack>
          <VStack spacing={0} align="start">
            <FacilitiesList facilities={room.facilities} size="sm" />
          </VStack>
        </VStack>
      </Td>

      <Td>
        <CustomIconRow amount={room.max_occupancy} icon={faPerson} />
      </Td>
      <Td>
        <Text>{room.number_of_nights}</Text>
      </Td>

      <Td>
        <Text>{room?.price ? room.price.price : "N/A"}</Text>
      </Td>

      <Td>
        <Text>
          {availability?.available ? `${availability.available} rooms` : "N/A"}
        </Text>
      </Td>
    </Tr>
  )
}
