'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa';

// Event interface
interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  isFeatured?: boolean;
}

export default function EventsPage() {
  // Sample upcoming events data
  const upcomingEvents: Event[] = [
    {
      id: 1,
      title: "Janmashtami Celebration",
      date: "August 30, 2023",
      time: "6:00 PM - 12:00 AM",
      location: "ISKCON Temple Main Hall",
      description: "Join us for the celebration of Lord Krishna's appearance day with kirtan, abhishek, and feast.",
      image: "/images/events/janmashtami-celebration.jpg",
      isFeatured: true,
    },
    {
      id: 2,
      title: "Sunday Feast Program",
      date: "Every Sunday",
      time: "5:00 PM - 8:00 PM",
      location: "ISKCON Temple",
      description: "Weekly Sunday program featuring kirtan, lecture, and prasadam feast.",
      image: "/images/iskcon-logo.png",
    },
    {
      id: 3,
      title: "Bhagavad Gita Study Group",
      date: "Every Wednesday",
      time: "6:30 PM - 8:00 PM",
      location: "Online via Zoom",
      description: "Weekly study and discussion of Bhagavad Gita As It Is by Srila Prabhupada.",
      image: "/images/iskcon-logo.png",
    },
    {
      id: 4,
      title: "Ratha Yatra Festival",
      date: "July 15, 2023",
      time: "10:00 AM - 6:00 PM",
      location: "City Center Park",
      description: "Annual Chariot Festival featuring a procession, cultural performances, and free vegetarian feast.",
      image: "/images/events/ratha-yatra-festival.jpg",
      isFeatured: true,
    },
    {
      id: 5,
      title: "Kirtan Meditation",
      date: "Every Friday",
      time: "7:00 PM - 8:30 PM",
      location: "ISKCON Temple",
      description: "Experience the bliss of mantra meditation through kirtan (sacred sound vibration).",
      image: "/images/iskcon-logo.png",
    },
    {
      id: 6,
      title: "Cooking Workshop: Vedic Cuisine",
      date: "June 24, 2023",
      time: "2:00 PM - 5:00 PM",
      location: "ISKCON Community Center Kitchen",
      description: "Learn to prepare traditional Vedic dishes offered to Krishna.",
      image: "/images/iskcon-logo.png",
    },
  ];

  // Filter featured events
  const featuredEvents = upcomingEvents.filter(event => event.isFeatured);

  // Calendar months
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonth = new Date().getMonth();

  return (
    <main className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/events-and-festival.jpg"
            alt="ISKCON Events and Festivals"
            fill
            sizes="100vw"
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="z-10 container mx-auto px-4 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Events & Festivals
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join us in celebration of Krishna consciousness through various spiritual and cultural events
          </motion.p>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-iskcon-blue">Featured Events</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredEvents.map((event) => (
            <motion.div
              key={event.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-64">
                <Link href="/events/janmashtami">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  />
                </Link>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <FaCalendarAlt className="text-iskcon-orange mr-2" />
                  <span className="text-gray-600">{event.date}</span>
                </div>
                <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FaClock className="mr-1 text-iskcon-orange" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-1 text-iskcon-orange" />
                    {event.location}
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href={`/events/${event.id}`}
                    className="inline-block bg-iskcon-orange text-white px-6 py-2 rounded-md hover:bg-iskcon-orange-dark transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Event Calendar */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-iskcon-blue">Event Calendar</h2>

          <div className="bg-amber-50 p-6 rounded-lg shadow-md mb-12">
            <h3 className="text-2xl font-semibold mb-4 text-center">{months[currentMonth]} 2023</h3>
            <div className="grid grid-cols-7 gap-1 mb-2 text-center font-medium">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {Array(35).fill(0).map((_, index) => {
                const day = index - 3 + 1; // Adjust based on month start day
                return (
                  <div
                    key={index}
                    className={`h-16 p-1 border ${day > 0 && day <= 31 ? 'bg-white' : 'bg-gray-100'} 
                    ${day === 15 || day === 30 || (day > 0 && day % 7 === 0) ? 'relative' : ''}`}
                  >
                    {day > 0 && day <= 31 && (
                      <>
                        <span>{day}</span>
                        {day === 15 && (
                          <div className="absolute bottom-0 left-0 right-0 bg-iskcon-orange text-white text-xs p-1">
                            Ratha Yatra
                          </div>
                        )}
                        {day === 30 && (
                          <div className="absolute bottom-0 left-0 right-0 bg-iskcon-blue text-white text-xs p-1">
                            Janmashtami
                          </div>
                        )}
                        {day > 0 && day % 7 === 0 && (
                          <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-xs p-1">
                            Sunday Feast
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/events/calendar"
              className="inline-block bg-iskcon-blue text-white px-6 py-3 rounded-md hover:bg-iskcon-blue-dark transition-colors"
            >
              View Full Calendar
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-iskcon-blue">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <motion.div
              key={event.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-48">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <div className="flex items-center mb-2 text-sm text-gray-600">
                  <FaCalendarAlt className="mr-1 text-iskcon-orange" />
                  {event.date}
                </div>
                <div className="flex items-center mb-2 text-sm text-gray-600">
                  <FaClock className="mr-1 text-iskcon-orange" />
                  {event.time}
                </div>
                <div className="flex items-center mb-4 text-sm text-gray-600">
                  <FaMapMarkerAlt className="mr-1 text-iskcon-orange" />
                  {event.location}
                </div>
                <Link
                  href={`/events/${event.id}`}
                  className="text-iskcon-orange hover:text-iskcon-orange-dark transition-colors font-medium"
                >
                  Learn More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-16 bg-iskcon-blue text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Register for an Event</h2>
            <p className="mb-8 text-lg">
              Join our upcoming events and festivals. Register in advance to secure your spot and receive important updates.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <form className="space-y-6 text-left">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="event" className="block text-gray-700 font-medium mb-2">Select Event</label>
                  <select
                    id="event"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                    required
                  >
                    <option value="">Choose an event</option>
                    {upcomingEvents.map(event => (
                      <option key={event.id} value={event.id}>
                        {event.title} - {event.date}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="participants" className="block text-gray-700 font-medium mb-2">Number of Participants</label>
                  <div className="flex items-center">
                    <FaUsers className="text-gray-500 mr-2" />
                    <input
                      type="number"
                      id="participants"
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                      placeholder="Number of people"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Special Requests (Optional)</label>
                  <textarea
                    id="message"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                    placeholder="Any special requests or questions?"
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-iskcon-orange text-white px-8 py-3 rounded-md hover:bg-iskcon-orange-dark transition-colors font-medium"
                  >
                    Register Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Connect & Share */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-iskcon-blue">Connect & Share</h2>
          <p className="mb-8 text-lg">
            Help spread the word about our events by sharing them with friends and family.
            Follow us on social media to stay updated on all our activities.
          </p>
          <div className="flex justify-center space-x-6">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
              Share on Facebook
            </button>
            <button className="bg-sky-500 text-white px-6 py-3 rounded-md hover:bg-sky-600 transition-colors">
              Share on Twitter
            </button>
            <a
              href="https://wa.me/919563786224"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
            >
              Share on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
} 