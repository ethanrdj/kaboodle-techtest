import {
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { Accommodation } from "../types/accommodation"
import { CustomIconRow } from "./CustomIconRow"
import { useNavigate } from "react-router-dom"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FacilitiesList } from "./FacilitiesList"

type AccommodationListItemProps = {
  accommodation: Accommodation
}

export const AccommodationListItem: FC<AccommodationListItemProps> = ({
  accommodation,
}) => {
  const navigate = useNavigate()

  const priceRange = useMemo(() => {
    if (
      !accommodation.rooms.length ||
      accommodation.rooms.every((room) => !room.price)
    )
      return

    const prices = accommodation.rooms
      .map((room) => room.price)
      .filter((price) => price)

    if (prices.length === 1) return prices[0].price

    const sortedPrices = prices.toSorted((a, b) => a.value - b.value)
    const lowestPrice = sortedPrices[0].price
    const highestPrice = sortedPrices[sortedPrices.length - 1].price

    if (lowestPrice === highestPrice) return lowestPrice

    return `${lowestPrice} to ${highestPrice}`
  }, [accommodation])

  const pluralRoomCount = useMemo(() => {
    const roomCount = accommodation.rooms.length
    return `room${roomCount > 1 ? "s" : ""} on our site`
  }, [accommodation])

  return (
    <Grid
      templateColumns={{ base: "1fr", sm: "1fr 3fr" }}
      gap={4}
      w={{ base: "90%", sm: "full" }}
    >
      <Image
        src={accommodation.images[0].filename}
        alt={accommodation.images[0].alt}
        borderRadius="md"
        height={{ base: "auto", sm: "250px" }}
        width={{ base: "100%", sm: "auto" }}
      />

      <VStack
        w="full"
        minH="250px"
        bg="white"
        border="1px solid"
        borderRadius="md"
        borderColor="gray.300"
        spacing={2}
        p={5}
        align="start"
        justify="space-between"
      >
        <VStack align="start">
          <VStack spacing={0} align="start">
            <Heading size={{ base: "md", sm: "lg" }}>
              {accommodation.name}
            </Heading>
            <Text
              fontSize={{ base: "md", sm: "lg" }}
              fontWeight={600}
              color="gray.600"
            >
              {`${accommodation.resort.name}, ${accommodation.country.name}`}
            </Text>
          </VStack>
          <CustomIconRow
            amount={accommodation.rating.id}
            icon={faStar}
            size="lg"
            color="#fedc07"
          />

          <HStack wrap="wrap" py={1}>
            <FacilitiesList facilities={accommodation.facilities} size="sm" />
          </HStack>
        </VStack>

        <HStack
          spacing={5}
          w="full"
          align="end"
          justify="space-between"
          wrap="wrap"
        >
          <VStack spacing={1} align="start">
            {accommodation.rooms.length > 0 && (
              <HStack>
                <Heading size="md" color="orange.400" fontWeight={800}>
                  {accommodation.rooms.length}
                </Heading>
                <Heading size="md" color="gray.600" fontWeight={700}>
                  {pluralRoomCount}
                </Heading>
              </HStack>
            )}
            {priceRange && (
              <HStack>
                <Heading size="md" color="gray.600" fontWeight={700}>
                  Prices from
                </Heading>
                <Heading size="md" color="orange.400" fontWeight={800}>
                  {priceRange}
                </Heading>
              </HStack>
            )}
          </VStack>

          <Button
            colorScheme="teal"
            onClick={() => navigate(`/${accommodation.id}`)}
            data-testid="view-rooms-button"
          >
            View rooms
          </Button>
        </HStack>
      </VStack>
    </Grid>
  )
}
