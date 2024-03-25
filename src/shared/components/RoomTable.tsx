import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react"
import { Room } from "../types/accommodation"
import { FC } from "react"
import { RoomTableRow } from "./RoomTableRow"

type RoomTableProps = { rooms: Room[] }

export const RoomTable: FC<RoomTableProps> = ({ rooms }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Room type</Th>
            <Th>Number of guests</Th>
            <Th>Number of nights</Th>
            <Th>Price</Th>
            <Th>Availability</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rooms.map((room, index) => (
            <RoomTableRow
              key={room.id}
              room={room}
              bg={index % 2 ? "auto" : "blue.100"}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
