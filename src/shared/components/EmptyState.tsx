import { Button, Center, Heading, Spinner, VStack } from "@chakra-ui/react"
import { FC, useMemo } from "react"

type EmptyStateProps = {
  label: string
  isLoading?: boolean
  onRefetch?: () => void
}

export const EmptyState: FC<EmptyStateProps> = ({
  label,
  isLoading,
  onRefetch,
}) => {
  const renderBody = useMemo(() => {
    if (isLoading)
      return <Spinner color="teal" size="lg" data-testid="loading-spinner" />
    if (onRefetch)
      return (
        <Button
          colorScheme="teal"
          onClick={onRefetch}
          data-testid="refetch-button"
        >
          Retry
        </Button>
      )
  }, [isLoading, onRefetch])

  return (
    <Center w="full" h="100vh" p={4}>
      <VStack spacing={6}>
        <Heading size="lg" color="orange.400">
          {label}
        </Heading>
        {renderBody}
      </VStack>
    </Center>
  )
}
