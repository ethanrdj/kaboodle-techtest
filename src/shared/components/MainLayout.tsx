import { Box, Button, Heading, StackProps, VStack } from "@chakra-ui/react"
import { PropsWithChildren, forwardRef } from "react"
import { useNavigate } from "react-router-dom"

export const MainLayout = forwardRef<
  HTMLDivElement,
  PropsWithChildren<StackProps>
>(({ children, ...props }, ref) => {
  const navigate = useNavigate()
  return (
    <VStack w="full" align="start" overflowX="hidden" {...props} ref={ref}>
      <Box w="full" position="fixed" bg="white" p={5} zIndex={2}>
        <Button variant="none" onClick={() => navigate("/")}>
          <Heading color="orange.500" _hover={{ color: "orange.400" }}>
            kaBooking.com
          </Heading>
        </Button>
      </Box>
      <Box w="full" mt="65px">
        {children}
      </Box>
    </VStack>
  )
})
