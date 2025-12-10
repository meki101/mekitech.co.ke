import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Project } from '../types';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function PortfolioDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProject = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .maybeSingle();

        if (error) throw error;
        if (!data) {
          navigate('/portfolio');
          return;
        }

        setProject(data);
      } catch (err) {
        console.error('Error fetching project:', err);
        navigate('/portfolio');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/portfolio')}
          className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Portfolio
        </button>

        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-white">{project.title}</h1>
            <p className="text-xl text-slate-300">{project.description}</p>
          </div>

          <div className="aspect-video rounded-xl overflow-hidden">
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.client_name && (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-slate-400 mb-2">CLIENT</h3>
                <p className="text-lg text-white">{project.client_name}</p>
              </div>
            )}
            {project.technologies && project.technologies.length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-slate-400 mb-3">TECHNOLOGIES</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm rounded-full border border-emerald-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {project.service_tags && project.service_tags.length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-slate-400 mb-3">SERVICES</h3>
                <div className="space-y-2">
                  {project.service_tags.map((tag, idx) => (
                    <div key={idx} className="text-sm text-white capitalize">
                      {tag.split('-').join(' ')}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-700 pt-8 space-y-8">
            {project.problem_context && (
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-white">The Challenge</h2>
                <p className="text-slate-300 leading-relaxed">{project.problem_context}</p>
              </div>
            )}

            {project.approach && (
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-white">Our Approach</h2>
                <p className="text-slate-300 leading-relaxed">{project.approach}</p>
              </div>
            )}

            {project.delivered_impact && (
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-white">Results & Impact</h2>
                <p className="text-slate-300 leading-relaxed">{project.delivered_impact}</p>
              </div>
            )}
          </div>

          {project.gallery_urls && project.gallery_urls.length > 0 && (
            <div className="border-t border-slate-700 pt-8 space-y-4">
              <h2 className="text-2xl font-bold text-white">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery_urls.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`${project.title} - Gallery ${idx + 1}`}
                    className="rounded-lg w-full h-auto object-cover"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-slate-700 pt-8">
            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl p-8 text-center space-y-4">
              <h2 className="text-3xl font-bold text-white">Interested in a Similar Project?</h2>
              <p className="text-slate-300">Let's discuss how we can help bring your vision to life.</p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all"
              >
                Get In Touch
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
