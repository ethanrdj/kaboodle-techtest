import { Route, Routes } from "react-router-dom"
import { ListView } from "./features/ListView"
import { AccommodationView } from "./features/AccommodationView"

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListView />} />
      <Route path="/:id" element={<AccommodationView />} />
    </Routes>
  )
}

export default App
