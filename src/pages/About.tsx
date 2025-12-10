import { Award, Code2, Zap, Shield, Target, TrendingUp } from 'lucide-react';

export default function About() {
  const skills = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'Next.js'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'GraphQL'] },
    { category: 'DevOps & Cloud', items: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD'] },
    { category: 'Tools & Platforms', items: ['Supabase', 'Firebase', 'Stripe', 'Git', 'Linux'] },
    { category: 'Specializations', items: ['E-Commerce', 'API Development', 'Automation', 'SEO', 'Security'] },
    { category: 'Leadership', items: ['Project Management', 'Team Building', 'Mentoring', 'Agile', 'Strategy'] },
  ];

  const milestones = [
    { year: '2024', title: 'Technical Leadership', description: 'Led 10+ successful enterprise projects' },
    { year: '2023', title: 'AI Integration Specialist', description: 'Pioneered ML/AI solutions for clients' },
    { year: '2022', title: 'Cloud Architecture', description: 'Designed scalable cloud infrastructure' },
    { year: '2021', title: 'Full-Stack Mastery', description: 'Became proficient across entire tech stack' },
    { year: '2020', title: 'Remote Work Pioneer', description: 'Successfully managed remote teams' },
    { year: '2019', title: 'Agency Founder', description: 'Launched MekiTech Solutions' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white">About Mathew Imulia</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            A technology visionary with 8+ years of experience crafting elegant solutions to complex problems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">The Journey</h2>
              <p className="text-slate-300 leading-relaxed">
                I started my technology journey with a simple mission: to solve real problems with elegant code. Over the years, that passion has evolved into a comprehensive approach to technology that spans frontend and backend development, cloud architecture, and strategic consulting.
              </p>
              <p className="text-slate-300 leading-relaxed">
                My work has touched everything from e-commerce platforms to healthcare systems, supply chain optimization to digital marketing infrastructure. Each project has taught me something valuable about technology, business, and the intersection of both.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">What Drives Me</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: Code2, text: 'Writing clean, maintainable code' },
                  { icon: Target, text: 'Solving meaningful problems' },
                  { icon: Shield, text: 'Building secure systems' },
                  { icon: TrendingUp, text: 'Creating business impact' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <Icon className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                      <span className="text-slate-300">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 h-fit">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-400" />
              Highlights
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-emerald-400 font-semibold">50+</div>
                <div className="text-slate-400">Projects Delivered</div>
              </div>
              <div>
                <div className="text-emerald-400 font-semibold">8+</div>
                <div className="text-slate-400">Years of Experience</div>
              </div>
              <div>
                <div className="text-emerald-400 font-semibold">30+</div>
                <div className="text-slate-400">Satisfied Clients</div>
              </div>
              <div>
                <div className="text-emerald-400 font-semibold">500M+</div>
                <div className="text-slate-400">User Impact</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-16 space-y-8">
          <h2 className="text-3xl font-bold text-white">Timeline</h2>
          <div className="space-y-4">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="w-24 flex-shrink-0">
                  <div className="text-2xl font-bold text-emerald-400">{milestone.year}</div>
                </div>
                <div className="flex-1 pb-6 border-b border-slate-700">
                  <h3 className="text-xl font-semibold text-white mb-1">{milestone.title}</h3>
                  <p className="text-slate-400">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-700 pt-16 space-y-8">
          <h2 className="text-3xl font-bold text-white">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
              >
                <h3 className="font-semibold text-white mb-4">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, itemIdx) => (
                    <span
                      key={itemIdx}
                      className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm rounded-full border border-emerald-500/30"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl p-8 text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">Let's Create Something Great</h2>
          <p className="text-slate-300">
            Whether you need a technical partner for a specific project or strategic guidance for your technology journey, I'm here to help.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  );
}
