import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const token = localStorage.getItem('userToken');
  if (token) {
    return <Navigate to="/tasks" />;
  }
  return (
    <>
      <div className="container-fluid mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
