import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Testimonial } from '../types';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .is('archived_at', null)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTestimonials(data || []);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (loading || testimonials.length === 0) {
    return null;
  }

  const testimonial = testimonials[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-24 border-t border-slate-700">
      <h2 className="text-4xl font-bold text-white mb-12 text-center">What Clients Say</h2>

      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <img
                src={testimonial.client_image_url || 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg'}
                alt={testimonial.client_name}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white">{testimonial.client_name}</h3>
                <p className="text-slate-400">{testimonial.client_role}</p>
                {testimonial.client_company && (
                  <p className="text-slate-500 text-sm">{testimonial.client_company}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-1">
            {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-emerald-400 text-emerald-400" />
            ))}
          </div>

          <p className="text-lg text-slate-300 leading-relaxed italic">
            "{testimonial.content}"
          </p>

          <div className="flex items-center justify-between pt-4">
            <div className="text-sm text-slate-500">
              {currentIndex + 1} of {testimonials.length}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-400" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? 'bg-emerald-500 w-8' : 'bg-slate-700 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
