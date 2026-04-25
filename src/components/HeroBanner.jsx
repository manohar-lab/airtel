import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { heroSlides } from '../data/mockData';

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (idx) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(idx);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % heroSlides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + heroSlides.length) % heroSlides.length);
  }, [current, goTo]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = heroSlides[current];

  return (
    <div id="hero-banner" className="neo-card relative overflow-hidden rounded-3xl">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-airtel-red/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-airtel-red/5 rounded-full blur-3xl animate-float" />
        <div className="absolute right-1/4 top-1/2 w-40 h-40 bg-airtel-red/5 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 p-8 md:p-14 lg:p-16 min-h-[340px] md:min-h-[400px] flex flex-col justify-center">
        {/* Slide content */}
        <div
          key={slide.id}
          className="animate-fade-in space-y-5 max-w-2xl"
        >
          {/* Highlight badge */}
          <div className="inline-flex items-center gap-2 neo-inset-sm px-4 py-2 rounded-full">
            <Zap size={14} className="text-airtel-red" />
            <span className="text-xs font-bold text-airtel-red uppercase tracking-wider">
              {slide.highlight}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 leading-[1.1]">
            {slide.title.split(' ').map((word, i) =>
              i === slide.title.split(' ').length - 1 ? (
                <span key={i} className="text-airtel-red">
                  {word}
                </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h1>

          <p className="text-gray-500 text-lg md:text-xl max-w-lg leading-relaxed">
            {slide.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to={slide.ctaLink}
              className="neo-btn-red px-8 py-3.5 text-base font-bold"
            >
              {slide.cta}
            </Link>
            <Link
              to="/plans"
              className="neo-btn-ghost px-8 py-3.5 text-base"
            >
              Explore Plans
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={prev}
            id="hero-prev"
            className="neo-card-flat p-2.5 rounded-full text-gray-500 hover:text-airtel-red transition-all duration-300 hover:-translate-x-0.5"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-500 ${
                  i === current
                    ? 'w-8 h-2.5 bg-airtel-red'
                    : 'w-2.5 h-2.5 bg-neuro-dark/40 hover:bg-neuro-dark/60'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            id="hero-next"
            className="neo-card-flat p-2.5 rounded-full text-gray-500 hover:text-airtel-red transition-all duration-300 hover:translate-x-0.5"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
