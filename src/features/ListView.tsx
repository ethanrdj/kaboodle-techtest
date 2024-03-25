import { Button, Grid, VStack } from "@chakra-ui/react"
import { FC, useCallback } from "react"
import { AccommodationList } from "../shared/components/AccommodationList"
import { MainLayout } from "../shared/components/MainLayout"
import { SortFilters } from "../shared/components/SortFilters"
import { useDispatch } from "react-redux"
import { setPageAmount } from "../shared/services/slices/filterSlice"

import { EmptyState } from "../shared/components/EmptyState"
import { useGetSortedData } from "../shared/hooks/useGetSortedData"

export const ListView: FC = () => {
  const { accommodation, isLoading, isError, refetch } = useGetSortedData()
  const dispatch = useDispatch()

  const onLoadMore = useCallback(() => {
    dispatch(setPageAmount(10))
  }, [dispatch])

  if (isLoading) return <EmptyState label="Loading listings" isLoading />
  if (isError)
    return (
      <EmptyState
        label="Uh oh, looks like something went wrong"
        onRefetch={refetch}
      />
    )

  return (
    <MainLayout pb={6}>
      <VStack w="full">
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 3fr" }}
          w="full"
          gap="20px"
          px={{ base: "0px", sm: "40px", "2xl": "200px" }}
          pt={6}
        >
          <SortFilters />
          <AccommodationList allAccommodation={accommodation} />
        </Grid>
        <Button
          colorScheme="teal"
          alignSelf="center"
          onClick={onLoadMore}
          isLoading={isLoading}
          data-testid="load-more-button"
        >
          Load more
        </Button>
      </VStack>
    </MainLayout>
  )
}
