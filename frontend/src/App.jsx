import { Route, Routes } from 'react-router-dom';
import './App.css'
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import TeacherRoutes from './Routes/TeacherRoutes';

const App = () => {


  return (
    <>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path='/admin/*' element={<AdminRoutes />} />
        <Route path='/teacher/*' element={<TeacherRoutes />} />
      </Routes>

    </>
  )
}

export default App;
