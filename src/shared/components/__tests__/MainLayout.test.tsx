import { render, screen } from "@testing-library/react"
import { MainLayout } from "../MainLayout"

jest.mock("react-router-dom", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
  }
})

describe("MainLayout", () => {
  it("should render", () => {
    render(
      <MainLayout>
        <div />
      </MainLayout>
    )

    expect(screen.getByText(/kabooking.com/i)).toBeVisible()
  })
})
