import AddTask from './AddTask';
import ListTask from './ListTask';
import Navbar from './Navbar';

const Tasks = () => {
  return (
    <>
      {/* <div className="w-full"> */}
      <Navbar />
      <div className="w-100">
        <AddTask />
        <ListTask />
      </div>
      {/* </div> */}
    </>
  );
};

export default Tasks;
