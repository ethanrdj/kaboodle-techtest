import { FC } from "react"
import { Room } from "../types/accommodation"
import { Button, HStack, Heading, Text, VStack } from "@chakra-ui/react"
import { faPerson } from "@fortawesome/free-solid-svg-icons"
import { CustomIconRow } from "./CustomIconRow"
import { useGetRoomAvailabilityQuery } from "../services/api"
import { FacilitiesList } from "./FacilitiesList"

export type RoomCardProps = { room: Room }

export const RoomCard: FC<RoomCardProps> = ({ room }) => {
  const { data: availability } = useGetRoomAvailabilityQuery(room.id, {
    skip: !room.id,
  })

  return (
    <VStack align="start" w="full" borderRadius="md" borderWidth="1px" p={4}>
      <Heading size="sm">{room.name}</Heading>
      <HStack>
        <Text>Price for</Text>
        <CustomIconRow amount={room.max_occupancy} icon={faPerson} />
      </HStack>
      <HStack wrap="wrap">
        <FacilitiesList facilities={room.facilities} />
      </HStack>
      {availability ? (
        <Text
          fontWeight={600}
          color="orange.500"
        >{`Only ${availability.available} left!`}</Text>
      ) : (
        <Text fontWeight={600} color="orange.500">
          This room is fully booked
        </Text>
      )}
      {room.price && (
        <HStack w="full" justify="space-between">
          <VStack spacing={0} align="start">
            <Text
              fontSize="sm"
              fontWeight={600}
            >{`Price for ${room.number_of_nights} nights`}</Text>
            <Text fontSize="md" fontWeight={600}>
              {room.price.price}
            </Text>
          </VStack>
          <Button colorScheme="teal" alignSelf="end">
            Book now
          </Button>
        </HStack>
      )}
    </VStack>
  )
}
