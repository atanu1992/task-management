import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentTask,
  removeTask,
  tasksList,
  // removeTask,
  // getCurrentTask,
} from '../../../../api/reducers/taskSlice';
import { toast, ToastContainer } from 'react-toastify';
import { createColumnHelper } from '@tanstack/react-table';
import ReactTable from '../../../react-table/ReactTable';

const ListTask = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
    total: 0,
  });

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('title', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Title',
    }),
    columnHelper.accessor('description', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Description',
    }),
    columnHelper.accessor('priority', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Priority',
    }),
    columnHelper.accessor('createdAt', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Date',
    }),
    columnHelper.accessor((row) => row._id, {
      cell: (info) => (
        <>
          <button
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            onClick={() => editTaskHandler(info.getValue())}
          >
            Edit
          </button>
          <button
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ml-1"
            onClick={() => removeTaskHandler(info.getValue())}
          >
            Delete
          </button>
        </>
      ),
      header: 'Action',
    }),
  ];

  const removeTaskHandler = async (taskId) => {
    let result = await dispatch(removeTask(taskId));
    if (!result.error) {
      toast.success('Todo removed successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const {
    tasks: taskList,
    totalTasks,
    error,
  } = useSelector((state) => state.task);

  const editTaskHandler = (id) => {
    dispatch(getCurrentTask(id));
  };

  useEffect(() => {
    if (taskList && taskList.length) {
      setData(taskList);
      setPagination((prev) => ({
        ...prev,
        total: totalTasks,
      }));
    }
  }, [taskList, totalTasks]);

  const fetchData = useCallback((currentPagination) => {
    setPagination(currentPagination);
    dispatch(tasksList(currentPagination));
  }, []);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  return (
    <>
      <section id="task-list" className="p-2">
        <ToastContainer />
        <ReactTable
          columns={columns}
          data={data}
          paginationData={pagination}
          fetchData={fetchData}
        />
      </section>
    </>
  );
};

export default ListTask;
