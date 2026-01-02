import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Globe,
  Zap,
  Brain,
  Heart,
  ArrowLeft
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-24">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
          About <span className="text-orange-500">Dishcovery</span>
        </h1>
        <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
          A web kitchen built with love, memories, and a passion for cooking
        </p>
      </motion.div>

      {/* Story */}
      <div className="max-w-4xl mx-auto space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
        <p>
          <strong className="text-slate-900 dark:text-white">
            Hey! Welcome to my web kitchen.
          </strong>
        </p>

        <p>
          If you are searching for a specific site that can help you develop and
          improve your cooking skills, then you are at the right place.
          Dishcovery is all about sharing easy and delicious worldwide recipes.
          I specially started this site because I have always loved my mother’s
          cooking since I was a little kid. I have seen her cooking with her
          magical hands while keeping a sweet smile on her face.
        </p>

        <p>
          I love turning small and simple ingredients into something special.
        </p>

        <p>
          Now, you might be thinking that there are various sites available —
          what makes our page different? Dishcovery focuses on every recipe,
          from everyday meals to festive treats. Whether you are cooking for a
          special occasion, for your loved one, or to surprise someone,
          Dishcovery shares step-by-step guides that even a teen can understand
          and cook — or even if you have never been to the kitchen before.
        </p>

        <p>
          Our goal is to make cooking easy and full of fun so that you can make
          delicious dishes without facing any difficulties. So now, search the
          dish you like, explore the recipes, and start cooking something yummy
          together <span className="text-orange-500">{"<3"}</span>
        </p>
      </div>

      {/* Feature Cards */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Globe />}
          title="Global Recipes"
          description="Explore thousands of recipes from international cuisines. Our API brings a world of flavors to your kitchen."
        />

        <FeatureCard
          icon={<Zap />}
          title="Simple & Fast"
          description="Built for speed and simplicity. Dishcovery ensures smooth browsing and instant recipe discovery."
        />

        <FeatureCard
          icon={<Brain />}
          title="Powered by APIs & AI"
          description="Integrated with powerful APIs and AI tools that fetch real-time recipe data and help reimagine dishes."
        />
      </div>

      {/* Closing Note */}
      <div className="mt-20 flex justify-center">
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
          <Heart className="text-orange-500" size={16} />
          Built with love for food and technology
        </div>
      </div>
      <div className="mt-12 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-orange-500 font-bold hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
      </div>
    </div>
  );
}

/* --- Reusable Feature Card --- */
function FeatureCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-900
                    border border-slate-100 dark:border-slate-800
                    rounded-3xl p-8
                    shadow-xl
                    hover:shadow-2xl
                    transition-shadow">
      <div className="w-12 h-12 rounded-xl
                      bg-orange-100 dark:bg-orange-500/10
                      text-orange-500
                      flex items-center justify-center mb-6">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        {title}
      </h3>

      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
