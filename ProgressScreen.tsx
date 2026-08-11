import { TrendingUp, Clock, Target, Award, type LucideIcon } from 'lucide-react';
import type { StudentProfile } from '@/types';

interface Props {
  profile: StudentProfile;
}

export default function ProgressScreen({ profile }: Props) {
  return (
    <div className="px-5 pt-8 pb-6">
      <h1 className="text-2xl font-bold text-ink-900">My Progress</h1>
      <p className="mt-1 text-sm text-ink-500">Hi {profile.name}, here's your learning overview.</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <StatCard icon={Clock} label="Daily goal" value={profile.studyTime} tone="accent" />
        <StatCard icon={Target} label="Subjects" value={`${profile.subjects.length}`} tone="primary" />
        <StatCard icon={Award} label="Topics done" value="—" tone="primary" />
        <StatCard icon={TrendingUp} label="Streak" value="—" tone="accent" />
      </div>

      <div className="mt-6 card">
        <p className="text-sm font-semibold text-ink-900">Recent activity</p>
        <div className="mt-4 space-y-3">
          {profile.subjects.slice(0, 3).map((s) => (
            <div key={s}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-700">{s}</span>
                <span className="text-xs font-medium text-ink-400">Not started</span>
              </div>
              <div className="mt-1.5 h-2 rounded-full bg-ink-100">
                <div className="h-2 w-0 rounded-full bg-primary-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-dashed border-ink-300 bg-ink-50 p-4">
        <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-ink-400" />
        <p className="text-sm text-ink-600">
          Real progress tracking, AI diagnosis, and adaptive study plans will arrive in
          Phase 2. Right now your subjects and goals are saved and ready.
        </p>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tone: 'primary' | 'accent';
}) {
  const bg = tone === 'primary' ? 'bg-primary-50' : 'bg-accent-50';
  const fg = tone === 'primary' ? 'text-primary-600' : 'text-accent-600';
  return (
    <div className="card">
      <div className={`h-10 w-10 rounded-xl ${bg} grid place-items-center`}>
        <Icon className={`h-5 w-5 ${fg}`} />
      </div>
      <p className="mt-3 text-lg font-bold text-ink-900">{value}</p>
      <p className="text-xs text-ink-500">{label}</p>
    </div>
  );
}
