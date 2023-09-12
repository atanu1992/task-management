import { BiLogOut } from 'react-icons/bi';
import logo from '../../../../assets/images/todo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../api/reducers/AuthSlice';
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <nav className="bg-gray-800 p-4">
      <div className="w-full mx-auto flex justify-between items-center">
        <Link href="/tasks" className="flex items-center">
          <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-normal whitespace-nowrap dark:text-white">
            Tasks Management
          </span>
        </Link>
        <div className="space-x-5">
          <Link
            to="#"
            onClick={() => logoutUser()}
            className="text-white flex items-center"
          >
            <BiLogOut className="text-2xl cursor-pointer" title="logout" />
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
