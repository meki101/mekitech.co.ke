import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Project } from '../types';
import { ArrowRight } from 'lucide-react';

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setProjects(data || []);

        const tags = new Set<string>();
        data?.forEach(project => {
          project.service_tags?.forEach(tag => tags.add(tag));
        });
        setAllTags(Array.from(tags));
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = selectedTag
    ? projects.filter(p => p.service_tags?.includes(selectedTag))
    : projects;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white">Portfolio</h1>
          <p className="text-xl text-slate-300">
            Showcase of projects that showcase real-world impact and technical excellence.
          </p>
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedTag === null
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Projects
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tag.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="text-slate-400">Loading projects...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map(project => (
              <a
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all hover:transform hover:-translate-y-2"
              >
                <div className="aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-slate-700 text-slate-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies && project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-slate-700 text-slate-300 text-sm rounded-full">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 group-hover:gap-3 transition-all">
                    <span>View Case Study</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No projects found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
