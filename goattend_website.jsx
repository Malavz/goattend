import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, GraduationCap } from "lucide-react";

const defaultEvents = [
  {
    id: 1,
    title: "Inter-school Drama Fest",
    date: "2025-06-15",
    audience: "School",
    location: "Chennai Public School",
    description: "A celebration of theatre with performances from top city schools."
  },
  {
    id: 2,
    title: "College Street Play Competition",
    date: "2025-06-20",
    audience: "College",
    location: "Loyola College",
    description: "Short plays on social themes by college theatre groups."
  },
  {
    id: 3,
    title: "Creative Writing Workshop",
    date: "2025-06-25",
    audience: "School",
    location: "Online",
    description: "Learn storytelling and poetry in this interactive session."
  }
];

export default function GoAttend() {
  const [filter, setFilter] = useState("All");
  const [events, setEvents] = useState(defaultEvents);
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const filteredEvents =
    filter === "All" ? events : events.filter(e => e.audience === filter);

  const handleAddEvent = (e) => {
    e.preventDefault();
    const form = e.target;
    const newEvent = {
      id: events.length + 1,
      title: form.title.value,
      date: form.date.value,
      audience: form.audience.value,
      location: form.location.value,
      description: form.description.value,
    };
    setEvents([newEvent, ...events]);
    form.reset();
  };

  const checkAdmin = () => {
    if (passwordInput === "admin123") setIsAdmin(true);
    else alert("Incorrect password");
  };

  return (
    <div className="min-h-screen bg-yellow-100 p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-800">GoAttend</h1>
        <p className="text-yellow-700">Your go-to place for student events</p>
      </header>

      <div className="flex justify-center gap-4 mb-6">
        {['All', 'School', 'College'].map(option => (
          <Button
            key={option}
            variant={filter === option ? "default" : "outline"}
            className="rounded-full text-yellow-800 border-yellow-600"
            onClick={() => setFilter(option)}
          >
            {option}
          </Button>
        ))}
      </div>

      {!isAdmin ? (
        <div className="text-center mb-8">
          <input
            type="password"
            placeholder="Admin password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="px-4 py-2 border rounded-xl mr-2"
          />
          <Button onClick={checkAdmin} className="bg-yellow-700 text-white rounded-xl">
            Login as Admin
          </Button>
        </div>
      ) : (
        <form onSubmit={handleAddEvent} className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow mb-10">
          <h2 className="text-xl font-bold text-yellow-800 mb-4">Add New Event</h2>
          <input name="title" placeholder="Event Title" required className="w-full mb-3 p-2 border rounded" />
          <input name="date" type="date" required className="w-full mb-3 p-2 border rounded" />
          <select name="audience" required className="w-full mb-3 p-2 border rounded">
            <option value="School">School</option>
            <option value="College">College</option>
          </select>
          <input name="location" placeholder="Location" required className="w-full mb-3 p-2 border rounded" />
          <textarea name="description" placeholder="Description" required className="w-full mb-4 p-2 border rounded" />
          <Button type="submit" className="bg-yellow-700 text-white w-full rounded-xl">
            Add Event
          </Button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <Card key={event.id} className="bg-white shadow-lg rounded-2xl">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-yellow-800 mb-2">{event.title}</h2>
              <p className="text-sm text-gray-600 flex items-center mb-1">
                <CalendarDays className="w-4 h-4 mr-2" /> {event.date}
              </p>
              <p className="text-sm text-gray-600 flex items-center mb-1">
                <GraduationCap className="w-4 h-4 mr-2" /> {event.audience} Students
              </p>
              <p className="text-sm text-gray-600 mb-3">📍 {event.location}</p>
              <p className="text-sm text-gray-700 mb-4">{event.description}</p>
              <Button className="bg-yellow-600 hover:bg-yellow-700 text-white w-full rounded-xl">
                View Event
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
