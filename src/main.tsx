import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { DesignTokensProvider } from "@/lib/design-tokens-provider"
import Layout from "@/components/layout"
import Home from "@/pages/Home"
import Profile from "@/pages/Profile"
import Lab from "@/pages/Lab"
import Contact from "@/pages/Contact"
import RAG from "@/pages/RAG"
import DesignSystem from "@/pages/DesignSystem"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="aliya-theme">
      <DesignTokensProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/lab" element={<Lab />} />
              <Route path="/chat" element={<RAG />} />
              <Route path="/rag" element={<Navigate to="/chat" replace />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/design-system" element={<DesignSystem />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DesignTokensProvider>
    </ThemeProvider>
  </StrictMode>
)
