import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Parties from "./pages/Parties"
import PartyDetails from "./pages/PartyDetails"
import CreateParty from "./pages/CreateParty"
import EditParty from "./pages/EditParty"
import Services from "./pages/Services"
import CreateService from "./pages/CreateService"
import EditService from "./pages/EditService"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parties" element={<Parties />} />
        <Route path="/parties/:id" element={<PartyDetails />} />
        <Route path="/parties/create" element={<CreateParty />} />
        <Route path="/parties/edit/:id" element={<EditParty />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/create" element={<CreateService />} />
        <Route path="/services/edit/:id" element={<EditService />} />
      </Routes>
    </Layout>
  )
}

export default App
