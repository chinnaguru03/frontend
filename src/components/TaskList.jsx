import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Reusable Dialog Component
const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96 h-80 flex flex-col">
        {children}
      </div>
    </div>
  );
};

// TaskBoard Component
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [formType, setFormType] = useState('add'); // 'add', 'edit', 'view'

  // Fetch tasks from API on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tasks'); // Adjust URL if necessary
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const openTaskForm = (task = null, type = 'add') => {
    if (type === 'add') {
      setCurrentTask({ title: '', description: '', status: 'todo' }); // Default state for new tasks
    } else {
      setCurrentTask(task); // Ensure task is not null
    }
    setFormType(type);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentTask(null);
  };

  const saveTask = async () => {
    try {
      if (formType === 'add') {
        const response = await axios.post('http://localhost:3000/api/tasks', currentTask);
        setTasks([...tasks, response.data]);
      } else if (formType === 'edit') {
        const response = await axios.put(`http://localhost:3000/api/tasks/${currentTask._id}`, currentTask);
        setTasks(tasks.map(task => (task._id === currentTask._id ? response.data : task)));
      }
      closeDialog();
    } catch (error) {
      console.error(formType === 'add' ? 'Error creating task:' : 'Error updating task:', error);
    }
  };

  const deleteTask = async (_id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${_id}`);
      setTasks(tasks.filter((task) => task._id !== _id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const dragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const drop = async (e, status) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const taskToUpdate = tasks.find(task => task._id === taskId);

    if (taskToUpdate) {
      try {
        const updatedTask = { ...taskToUpdate, status }; // Update task's status
        const response = await axios.put(`http://localhost:3000/api/tasks/${taskId}`, updatedTask);
        setTasks(tasks.map(task => (task._id === taskId ? response.data : task))); // Update local state
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    }
  };

  return (
    <div className="p-6">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => openTaskForm(null, 'add')}
      >
        Add Task
      </button>

      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        {/* Todo Column */}
        <div className="w-full md:w-1/3 min-h-[150px] flex flex-col">
          <h2 className="text-lg font-semibold bg-blue-200 p-2 rounded-t">TODO</h2>
          <div
            className="bg-gray-100 p-4 rounded-b shadow-sm flex-grow"
            onDragOver={dragOver}
            onDrop={(e) => drop(e, 'todo')}
          >
            {tasks.filter((task) => task.status === 'todo').map((task) => (
              <div
                key={task._id}
                className="bg-white p-4 mb-4 rounded shadow"
                draggable
                onDragStart={(e) => dragStart(e, task._id)}
              >
                <h3 className="font-bold">{task.title}</h3>
                <p>{task.description}</p>
                <p className="text-sm text-gray-500">Created at: {task.createdAt}</p>
                <div className="flex justify-end space-x-2 mt-2">
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteTask(task._id)}>Delete</button>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => openTaskForm(task, 'edit')}>Edit</button>
                  <button className="bg-blue-300 text-white px-2 py-1 rounded" onClick={() => openTaskForm(task, 'view')}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="w-full md:w-1/3 min-h-[150px] flex flex-col">
          <h2 className="text-lg font-semibold bg-blue-200 p-2 rounded-t">IN PROGRESS</h2>
          <div
            className="bg-gray-100 p-4 rounded-b shadow-sm flex-grow"
            onDragOver={dragOver}
            onDrop={(e) => drop(e, 'in-progress')}
          >
            {tasks.filter((task) => task.status === 'in-progress').map((task) => (
              <div
                key={task._id}
                className="bg-white p-4 mb-4 rounded shadow"
                draggable
                onDragStart={(e) => dragStart(e, task._id)}
              >
                <h3 className="font-bold">{task.title}</h3>
                <p>{task.description}</p>
                <p className="text-sm text-gray-500">Created at: {task.createdAt}</p>
                <div className="flex justify-end space-x-2 mt-2">
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteTask(task._id)}>Delete</button>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => openTaskForm(task, 'edit')}>Edit</button>
                  <button className="bg-blue-300 text-white px-2 py-1 rounded" onClick={() => openTaskForm(task, 'view')}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Done Column */}
        <div className="w-full md:w-1/3 min-h-[150px] flex flex-col">
          <h2 className="text-lg font-semibold bg-blue-200 p-2 rounded-t">DONE</h2>
          <div
            className="bg-gray-100 p-4 rounded-b shadow-sm flex-grow"
            onDragOver={dragOver}
            onDrop={(e) => drop(e, 'done')}
          >
            {tasks.filter((task) => task.status === 'done').map((task) => (
              <div
                key={task._id}
                className="bg-white p-4 mb-4 rounded shadow"
                draggable
                onDragStart={(e) => dragStart(e, task._id)}
              >
                <h3 className="font-bold">{task.title}</h3>
                <p>{task.description}</p>
                <p className="text-sm text-gray-500">Created at: {task.createdAt}</p>
                <div className="flex justify-end space-x-2 mt-2">
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteTask(task._id)}>Delete</button>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => openTaskForm(task, 'edit')}>Edit</button>
                  <button className="bg-blue-300 text-white px-2 py-1 rounded" onClick={() => openTaskForm(task, 'view')}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dialog Logic */}
      <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
        {formType === 'view' ? (
          <>
            <h2 className="text-xl font-bold mt-3">{currentTask?.title}</h2>
            <p className='mt-5'>{currentTask?.description}</p>
            <p className="text-sm text-gray-500 mt-5">Created at: {currentTask?.createdAt}</p>
            <div className="flex justify-end mt-20">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={closeDialog}>Close</button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold">{formType === 'add' ? 'Add Task' : 'Edit Task'}</h2>
            <label className="mt-2">Title:</label>
            <input
              type="text"
              name="title"
              value={currentTask?.title || ''}
              onChange={handleInputChange}
              className="border rounded w-full p-2"
              required
            />
            <label className="mt-2">Description:</label>
            <textarea
              name="description"
              value={currentTask?.description || ''}
              onChange={handleInputChange}
              className="border rounded w-full p-2 h-24"
              required
            />
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={closeDialog}>Cancel</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={saveTask}>Save</button>
            </div>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default TaskList;