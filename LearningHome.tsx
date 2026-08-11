import { BookOpen, Clock, QrCode, TrendingUp, Play, ChevronRight } from 'lucide-react';
import Logo from '@/components/Logo';
import type { StudentProfile, TopicInfo } from '@/types';
import { DEMO_TOPIC } from '@/data/demoData';

interface Props {
  profile: StudentProfile;
  onScan: () => void;
  onProgress: () => void;
  onTopic: (t: TopicInfo) => void;
}

export default function LearningHome({ profile, onScan, onProgress, onTopic }: Props) {
  return (
    <div className="px-5 pt-8 pb-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size="sm" />
          <div>
            <p className="text-xs text-ink-500">Welcome back,</p>
            <p className="text-base font-bold text-ink-900">{profile.name}</p>
          </div>
        </div>
        <div className="rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700">
          {profile.language}
        </div>
      </header>

      <section className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">My Learning</p>
        <h1 className="mt-1 text-2xl font-bold text-ink-900">{profile.grade}</h1>
      </section>

      <section className="mt-5">
        <p className="mb-2.5 text-sm font-semibold text-ink-700">Subjects</p>
        <div className="flex flex-wrap gap-2">
          {profile.subjects.map((s) => (
            <span
              key={s}
              className="rounded-xl bg-white px-3.5 py-2 text-sm font-medium text-ink-700 shadow-card"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <p className="mb-2.5 text-sm font-semibold text-ink-700">Current topic</p>
        <button
          onClick={() => onTopic(DEMO_TOPIC)}
          className="card flex w-full items-center gap-4 text-left active:scale-[0.99]"
        >
          <div className="h-12 w-12 shrink-0 rounded-xl bg-primary-600 grid place-items-center">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-ink-900">{DEMO_TOPIC.chapter}</p>
            <p className="text-xs text-ink-500">{DEMO_TOPIC.subject} · {DEMO_TOPIC.grade}</p>
          </div>
          <ChevronRight className="h-5 w-5 text-ink-300" />
        </button>
      </section>

      <section className="mt-5">
        <p className="mb-2.5 text-sm font-semibold text-ink-700">Today's study time</p>
        <div className="card flex items-center gap-4">
          <div className="h-12 w-12 shrink-0 rounded-xl bg-accent-100 grid place-items-center">
            <Clock className="h-6 w-6 text-accent-600" />
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold text-ink-900">{profile.studyTime}</p>
            <p className="text-xs text-ink-500">Your daily goal</p>
          </div>
        </div>
      </section>

      <section className="mt-6 space-y-3">
        <button
          onClick={() => onTopic(DEMO_TOPIC)}
          className="btn-primary flex items-center justify-center gap-2"
        >
          <Play className="h-5 w-5 fill-current" />
          Start Session
        </button>
        <button onClick={onScan} className="btn-secondary flex items-center justify-center gap-2">
          <QrCode className="h-5 w-5" />
          Scan QR / Learning Material
        </button>
        <button onClick={onProgress} className="btn-ghost flex items-center justify-center gap-2">
          <TrendingUp className="h-5 w-5" />
          My Progress
        </button>
      </section>
    </div>
  );
}
