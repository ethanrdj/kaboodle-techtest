import { FC } from "react"
import { Room } from "../types/accommodation"
import { Heading, VStack, useMediaQuery } from "@chakra-ui/react"
import { RoomTable } from "./RoomTable"
import { RoomCard } from "./RoomCard"

type RoomsProps = {
  rooms: Room[]
}

export const Rooms: FC<RoomsProps> = ({ rooms }) => {
  const [isSmallScreen] = useMediaQuery("(max-width: 850px)")

  return (
    <VStack spacing={4} align="start" w={isSmallScreen ? "full" : "auto"}>
      <Heading size="lg">Rooms</Heading>
      <VStack align="start" w="full">
        {isSmallScreen ? (
          rooms.map((room) => <RoomCard key={room.id} room={room} />)
        ) : (
          <RoomTable rooms={rooms} />
        )}
      </VStack>
    </VStack>
  )
}
