import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { BrowserRouter } from "react-router-dom"
import { Provider as ReduxProvider } from "react-redux"
import { worker } from "./shared/mocks/browser.ts"
import { store } from "./shared/services/store.ts"
import { ChakraProvider } from "@chakra-ui/react"

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return
  }

  return worker.start()
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ChakraProvider>
        <ReduxProvider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ReduxProvider>
      </ChakraProvider>
    </React.StrictMode>
  )
})
