import './App.css'
import Sidebar from './components/Sidebar'
import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AddType from './pages/AddType'
import Viewtype from './pages/ViewType'
import AddMembership from './pages/AddMembership'
import ManageMembers from './pages/ManageMember'
import EditMembership from './pages/EditMember'
import EditType from './pages/EditPlan'
import Renewal from './pages/Renewal'
import RenewalForm from './pages/RenewalFrom'
import MemberProfile from './pages/MemberProfile'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Sidebar/>}>
    <Route index element={<Navigate to="/dashboard" />} />
    <Route path='dashboard' element={<Dashboard/>} />
    <Route path='add-type' element={<AddType/>} />
    <Route path='edit-type/:id' element={<EditType/>} />
    <Route path='view-type' element={<Viewtype/>} />
    <Route path='add-membership' element={<AddMembership/>} />
    <Route path='manage-members' element={<ManageMembers/>} />
    <Route path='manage-members/:id' element={<EditMembership/>} />
    <Route path='profile/:id' element={<MemberProfile/>} />
    <Route path='renewal' element={<Renewal/>} />
    <Route path='renewal/:id' element={<RenewalForm/>} />
  </Route> 
  
))

function App() {
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
