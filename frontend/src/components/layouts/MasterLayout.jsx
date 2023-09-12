import { Navigate, Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
const MasterLayout = () => {
  const token = localStorage.getItem('userToken');
  if (!token) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="bg-[#e8e8ec] min-h-screen w-full mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default MasterLayout;
