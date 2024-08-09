import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../pages/api';

// Helper function to format date to yyyy-mm-dd
const formatDateToInput = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function EditEventForm({ event, onClose, onUpdate }) {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [date, setDate] = useState(formatDateToInput(event.date));
  const [time, setTime] = useState(event.time);
  const [endtime, setEndtime] = useState(event.endtime || ''); // Handle optional endtime
  const [location, setLocation] = useState(event.location);
  const [capacity, setCapacity] = useState(event.capacity);
  const [registrationdeadline, setRegistrationDeadline] = useState(formatDateToInput(event.registrationdeadline));
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setTitle(event.title);
    setDescription(event.description);
    setDate(formatDateToInput(event.date));
    setTime(event.time);
    setEndtime(event.endtime || '');
    setLocation(event.location);
    setCapacity(event.capacity);
    setRegistrationDeadline(formatDateToInput(event.registrationdeadline));
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/updateEvent', {
        eventid: event.id,
        title,
        description,
        date,
        time,
        endtime,
        location,
        capacity,
        registrationdeadline
      }, { withCredentials: true });
      onUpdate(); // Notify parent component to refresh events
      onClose();
    } catch (error) {
      setErrors([error.response?.data?.message || "Unknown error"]);
    }
  };

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-[40%]">
        <h2 className="text-xl font-bold mb-4">Edit Event</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">End Time (Optional)</label>
            <input
              type="time"
              value={endtime}
              onChange={(e) => setEndtime(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Capacity</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Registration Deadline</label>
            <input
              type="date"
              value={registrationdeadline}
              onChange={(e) => setRegistrationDeadline(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
            {errors.length > 0 && (
          <div className="mb-4 text-red-600">
            {errors.map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        )}
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 py-2 px-4 bg-gray-300 rounded-md">Cancel</button>
            <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-md">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEventForm;
