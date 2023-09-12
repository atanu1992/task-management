import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTask,
  clearCurrentTask,
  updateTask,
} from '../../../../api/reducers/taskSlice';
import { MdOutlineCancel } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';

const AddTask = () => {
  const dispatch = useDispatch();
  const currentTask = useSelector((state) => state.task.currentTask);
  const [editTask, setEditTask] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors: formErrors },
  } = useForm();

  const onAddTask = async (data) => {
    let result = undefined;
    if (editTask) {
      result = await dispatch(updateTask({ editTask, data }));
    } else {
      result = await dispatch(addTask(data));
    }

    if (!result.error) {
      reset();
      toast.success(
        editTask ? 'Task updated successfully' : 'Task added successfully',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: 'light',
        }
      );
      if (editTask) {
        setEditTask(null);
      }
    }
  };

  const cancelUpdate = () => {
    dispatch(clearCurrentTask());
    setEditTask(null);
    reset();
  };
  useEffect(() => {
    if (currentTask && currentTask.length) {
      setValue('title', currentTask[0].title);
      setValue('description', currentTask[0].description);
      setValue('priority', currentTask[0].priority);
      setEditTask(currentTask[0]._id);
    }
  }, [currentTask, setValue]);
  return (
    <section className="add-todo-section my-2 px-2">
      <ToastContainer />
      <form method="post" onSubmit={handleSubmit(onAddTask)}>
        <div className="grid grid-flow-col justify-stretch">
          <div className="p-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Title"
              {...register('title', {
                required: 'Enter title',
              })}
            />
            {formErrors?.title && formErrors?.title?.message && (
              <small className="text-red-500 text-sm mt-1">
                {formErrors?.title?.message}
              </small>
            )}
          </div>
          <div className="p-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              type="text"
              name="description"
              placeholder="Description"
              {...register('description', {
                required: 'Enter description',
              })}
            />
            {formErrors?.description && formErrors?.description?.message && (
              <small className="text-red-500 text-sm mt-1">
                {formErrors?.description?.message}
              </small>
            )}
          </div>
          <div className="p-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="priority"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register('priority', {
                required: 'Enter priority',
              })}
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {formErrors?.priority && formErrors?.priority?.message && (
              <small className="text-red-500 text-sm mt-1">
                {formErrors?.priority?.message}
              </small>
            )}
          </div>
          <div className="p-1">
            {editTask ? (
              <div className="inline-flex">
                <div>
                  <label className="w-full text-gray-700 text-sm font-bold mb-2"></label>
                  <button
                    type="submit"
                    className="text-center cursor-pointer mt-7 w-full py-1.5 px-3 text-sm text-white rounded-r-md bg-[#D63691]"
                  >
                    Edit
                  </button>
                </div>
                <div className="mt-8 ml-2">
                  <label className="w-full text-gray-700 text-sm font-bold mb-2"></label>
                  <MdOutlineCancel
                    className="w-5 h-5 cursor-pointer text-size-10"
                    onClick={() => cancelUpdate()}
                  />
                </div>
              </div>
            ) : (
              <>
                <label className="w-full text-gray-700 text-sm font-bold mb-2"></label>
                <button
                  type="submit"
                  className="text-center cursor-pointer mt-7 w-full py-2 px-3 text-sm text-white rounded-r-md bg-[#D63691]"
                >
                  Add
                </button>
              </>
            )}
          </div>
        </div>
      </form>

      <br />
    </section>
  );
};

export default AddTask;
