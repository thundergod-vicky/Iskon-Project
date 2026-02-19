'use client';

import React from 'react';

export default function NewsletterPage() {
    return (
        <main className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-2xl w-full text-center">
                <h1 className="text-4xl font-bold text-iskcon-orange mb-4">Subscribe to our Newsletter</h1>
                <p className="text-gray-600 mb-8 text-lg">Stay updated with the latest news, events, and spiritual inspiration from ISKCON Durgapur.</p>

                <form className="flex flex-col gap-4">
                    <input type="text" placeholder="Your Name" className="w-full border p-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-iskcon-orange" />
                    <input type="email" placeholder="Your Email Address" className="w-full border p-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-iskcon-orange" />
                    <button className="bg-iskcon-orange text-white font-bold py-4 rounded-lg text-xl hover:bg-iskcon-orange-dark transition">Subscribe Now</button>
                </form>
                <p className="text-sm text-gray-400 mt-6">We respect your privacy. Unsubscribe at any time.</p>
            </div>
        </main>
    );
}
