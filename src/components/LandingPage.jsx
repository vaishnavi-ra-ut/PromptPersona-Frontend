import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-base-100 text-base-content transition-colors duration-500">
      {/* 🔵 Color Blobs in Background */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        {/* 🌞 Light mode blobs */}
        <div className="block dark:hidden">
          {/* Top Left */}
          <div className="absolute top-[-100px] left-[-80px] w-[300px] h-[300px] bg-[#636ae8] opacity-50 blur-[100px] rounded-full" />
          {/* Bottom Right */}
          <div className="absolute bottom-[-100px] right-[-80px] w-[300px] h-[300px] bg-[#636ae8] opacity-50 blur-[100px] rounded-full" />
          {/* Center */}
          <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#636ae8] opacity-50 blur-[120px] rounded-full" />
        </div>

        {/* 🌙 Dark mode blobs */}
        <div className="hidden dark:block">
          {/* Top Left */}
          <div className="absolute top-[-100px] left-[-80px] w-[300px] h-[300px] bg-[#636ae8] opacity-50 blur-[120px] rounded-full" />
          {/* Bottom Right */}
          <div className="absolute bottom-[-100px] right-[-80px] w-[300px] h-[300px] bg-[#636ae8] opacity-50 blur-[120px] rounded-full" />
          {/* Center */}
          <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#636ae8] opacity-70 blur-[140px] rounded-full" />
        </div>
      </div>

      {/* 🧠 Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 mt-9 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
          Meet Your AI Personas
        </h1>
        <p className="text-lg opacity-80 mb-5">
          Discover powerful AI characters tailored to your needs — from creative collaborators to expert assistants.
        </p>

       {/* 🚀 CTA Buttons */}
<div className="flex justify-center flex-wrap">
  <Link to='/personas'> <button className="btn btn-ghost text-[#f7438b] text-lg">Explore Personas →</button> </Link>
</div>

{/* 🌟 Feature Highlights Section */}
<section className="mt-24 grid gap-24 sm:grid-cols-2 text-left text-base-content">
  <div className="flex flex-col gap-5">
    <h2 className="text-2xl font-bold text-primary">Why PromptPersona?</h2>
    <ul className="space-y-3">
      <li className="flex items-start gap-3">
        <span className="text-primary">🧠</span>
        <span><strong>Smart AI Personas:</strong> Chat with characters designed for creativity, learning, and productivity.</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="text-primary">🎭</span>
        <span><strong>Variety of Roles:</strong> From life coach to coding buddy to writing partner — pick your vibe.</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="text-primary">⚡</span>
        <span><strong>Instant Access:</strong> No complex setup. Just click and chat.</span>
      </li>
    </ul>
  </div>

  {/* 🎨 Custom Persona Builder Section */}
  <div className="flex flex-col gap-5">
    <h2 className="text-2xl font-bold text-primary">Create Your Own Persona</h2>
    <p className="opacity-80">
      Want your AI to behave a specific way? Use our simple persona builder to define how your assistant talks, acts, and thinks.
    </p>
    <Link to="/personas/custom"><button className="btn bg-[#f7438b] secondary w-fit mt-2">Build Your Persona</button></Link>
  </div>
</section>

      </div>
      <footer className="mt-20 flex justify-center text-sm opacity-50">
    <p>Vaishnavi Raut</p>
</footer>
    </div>
  );
};

export default LandingPage;
