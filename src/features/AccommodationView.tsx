import { VStack, HStack, Heading, Text, Image, Divider } from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import { useGetAccommodationQuery } from "../shared/services/api"
import { CustomIconRow } from "../shared/components/CustomIconRow"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { Rooms } from "../shared/components/Rooms"
import { MainLayout } from "../shared/components/MainLayout"
import { EmptyState } from "../shared/components/EmptyState"
import { Facilities } from "../shared/components/Facilities"

export const AccommodationView: FC = () => {
  const { id = "" } = useParams()
  const {
    data: accommodation,
    refetch,
    isError,
  } = useGetAccommodationQuery(id, { skip: !id })

  const accommodationAddress = useMemo(() => {
    if (!accommodation) return

    const addressParts = [
      accommodation.resort.name,
      accommodation.address_1,
      accommodation.address_2,
      accommodation.address_3,
      accommodation.postcode,
      accommodation.country.name,
    ].filter(Boolean)

    return addressParts.join(", ")
  }, [accommodation])

  if (!accommodation || isError)
    return (
      <EmptyState
        label="Uh oh, looks like something went wrong"
        onRefetch={refetch}
      />
    )

  const encodedAddress = encodeURIComponent(accommodation.location.name)

  const mapUrl = `https://www.google.com/maps?q=${encodedAddress}&ll=${accommodation.location.location_lat},${accommodation.location.location_long}`

  return (
    <MainLayout>
      <VStack spacing={9} align="stretch" padding={{ base: 5, sm: 9 }}>
        <HStack flexDir={{ base: "column", lg: "row" }}>
          <Image
            src={accommodation.images[0].filename}
            alt={accommodation.images[0].alt}
            borderRadius="md"
            height={{ base: "350px", sm: "500px" }}
            width={{ base: "350px", sm: "500px" }}
          />

          <VStack spacing={5} pt={6} px={{ base: 3, sm: 6 }} align="start">
            <VStack spacing={1} align="start">
              <Heading size={{ base: "lg", sm: "xl" }}>
                {accommodation.name}
              </Heading>
              <HStack wrap="wrap">
                <Text
                  fontSize={{ base: "sm", sm: "md" }}
                  color="gray.600"
                  fontWeight={600}
                >
                  {`${accommodationAddress} - `}
                </Text>
                <Link to={mapUrl} target="_blank" data-testid="map-link">
                  <Text
                    fontSize={{ base: "sm", sm: "md" }}
                    fontWeight={600}
                    color="blue"
                  >
                    View on map
                  </Text>
                </Link>
              </HStack>
            </VStack>
            <HStack align="end">
              <CustomIconRow
                amount={accommodation.rating.id}
                icon={faStar}
                size="2x"
                color="#fedc07"
              />
              <Text color="gray.600" fontWeight={600} fontSize="lg">
                {accommodation.type.name}
              </Text>
            </HStack>
            <Divider />
            <Text
              fontWeight={600}
              fontSize={{ base: "md", sm: "lg" }}
              dangerouslySetInnerHTML={{ __html: accommodation.description }}
            />
          </VStack>
        </HStack>

        <HStack
          spacing={{ base: 6, lg: 0 }}
          wrap="wrap"
          align="start"
          justify="space-around"
          flexDir={{ base: "column-reverse", lg: "row" }}
        >
          <Rooms rooms={accommodation.rooms} />
          <Facilities accommodation={accommodation} />
        </HStack>
      </VStack>
    </MainLayout>
  )
}
