import React from "react";
import TanzilaImg from "../assets/ahona.jpg";  
import DurjoyImg from "../assets/durjoy.jpg";
import FemaImg from "../assets/fema.jpg";
import AnupomaImg from "../assets/anupoma.jpeg";

const About = () => {
  return (
    <div className="flex h-screen">
    
      <div className="flex-1 p-8 bg-blue-50">


        <section id="about" className="mb-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">About Hishab Nikash</h2>
          <p className="text-gray-700 mb-4">
            Hishab Nikash is a smart personal expense tracking system designed to help users manage their finances easily and efficiently.
          </p>
          <p className="text-gray-700 mb-4">
            With Hishab Nikash, users can:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Track daily, weekly, and monthly expenses</li>
            <li>Set personal budgets for different categories (e.g., food, transport, entertainment)</li>
            <li>Receive AI-powered alerts if expenses exceed the budget</li>
            <li>Get a visual monthly overview of income vs. expenses</li>
            <li>Stay financially aware and organized with a personalized dashboard</li>
          </ul>
          <p className="text-gray-700 mb-4">
            The goal of this system is to promote better money management habits by giving users real-time insights and alerts about their spending behavior.
          </p>

          <h3 className="text-xl font-bold text-blue-800 mb-4">Target Audience</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Individuals who want to manage their personal expenses effectively</li>
            <li>Students and young professionals trying to live within a limited budget</li>
            <li>Anyone who wants to develop better financial habits</li>
            <li>Budget-conscious people who aim to live within their means</li>
          </ul>

          <h3 className="text-xl font-bold text-blue-800 mb-4">Tech Stack</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Backend: Laravel (PHP)</li>
            <li>Frontend: React with Vite</li>
            <li>Database: MySQL</li>
            <li>Styling: Bootstrap / Tailwind</li>
            <li>Rendering: Client-Side Rendering (CSR)</li>
          </ul>
        </section>


        <section id="developers" className="mb-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Meet the Developers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[ 
              { name: "Tanzila Tabassum Ahona", img: TanzilaImg },
              { name: "Mohammad Ashfaq Hossain Bhuiyan Durjoy", img: DurjoyImg },
              { name: "Zarin Tasnim Fema", img: FemaImg },
              { name: "Anupoma Haque Anika", img: AnupomaImg }
            ].map((developer, index) => (
              <div key={index} className="text-center">
                <img
                  src={developer.img}
                  alt={developer.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h4 className="text-lg font-semibold text-blue-800">{developer.name}</h4>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
