import { render, screen } from "@testing-library/react"
import { Provider as ReduxProvider } from "react-redux"
import { accommodations as accommodationData } from "../../shared/mocks/data/accommodation.json"
import { Accommodation } from "../../shared/types/accommodation"
import { useGetAccommodationQuery } from "../../shared/services/api"
import { AccommodationView } from "../AccommodationView"
import { BrowserRouter } from "react-router-dom"
import { store } from "../../shared/services/store"

const accommodation = accommodationData[0] as Accommodation

jest.mock("react-router-dom", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({ id: accommodation.id }),
    useNavigate: jest.fn(),
  }
})

jest.mock("../../shared/services/api", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../shared/services/api"),
    useGetAccommodationQuery: jest.fn(),
  }
})

describe("DetailsView", () => {
  beforeEach(() => {
    global.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }))
  })

  const setup = (data: Accommodation | undefined) => {
    ;(useGetAccommodationQuery as jest.Mock).mockReturnValue({
      data,
      isLoading: false,
    })

    return render(
      <BrowserRouter>
        <ReduxProvider store={store}>
          <AccommodationView />
        </ReduxProvider>
      </BrowserRouter>
    )
  }
  it("should render", () => {
    setup(accommodation)

    expect(screen.getByText(accommodation.name)).toBeVisible()
  })
})
