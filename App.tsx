import { useState } from 'react';
import BottomNav, { type Tab } from '@/components/BottomNav';
import { useStudentProfile } from '@/hooks/useStudentProfile';
import type { StudentProfile, TopicInfo } from '@/types';
import WelcomeScreen from '@/screens/WelcomeScreen';
import SetupScreen from '@/screens/SetupScreen';
import LearningHome from '@/screens/LearningHome';
import ScanScreen from '@/screens/ScanScreen';
import TopicDetails from '@/screens/TopicDetails';
import ProgressScreen from '@/screens/ProgressScreen';
import ProfileScreen from '@/screens/ProfileScreen';

type Overlay = null | { name: 'scan' } | { name: 'topic'; topic: TopicInfo };

export default function App() {
  const { profile, save, clear } = useStudentProfile();
  const [tab, setTab] = useState<Tab>('home');
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [editingSetup, setEditingSetup] = useState(false);

  const goHome = () => {
    setOverlay(null);
    setTab('home');
  };

  const handleSetupComplete = (p: StudentProfile) => {
    save(p);
    setEditingSetup(false);
    setTab('home');
  };

  const handleTab = (t: Tab) => {
    setOverlay(null);
    setTab(t);
  };

  const handleReset = () => {
    clear();
    setOverlay(null);
    setEditingSetup(false);
    setTab('home');
  };

  const handleTopic = (topic: TopicInfo) => setOverlay({ name: 'topic', topic });
  const handleScan = () => setOverlay({ name: 'scan' });

  // Not set up yet: welcome screen or setup wizard
  if (!profile) {
    return (
      <div className="mx-auto min-h-screen max-w-md bg-ink-50">
        {editingSetup ? (
          <SetupScreen
            existing={null}
            onComplete={handleSetupComplete}
            onCancel={() => setEditingSetup(false)}
          />
        ) : (
          <WelcomeScreen
            profile={null}
            onStart={() => setEditingSetup(true)}
            onContinue={() => setEditingSetup(true)}
          />
        )}
      </div>
    );
  }

  // Editing setup from profile
  if (editingSetup) {
    return (
      <div className="mx-auto min-h-screen max-w-md bg-ink-50">
        <SetupScreen
          existing={profile}
          onComplete={handleSetupComplete}
          onCancel={() => setEditingSetup(false)}
        />
      </div>
    );
  }

  const showBottomNav = overlay === null;

  const renderTab = () => {
    switch (tab) {
      case 'home':
      case 'learn':
        return (
          <LearningHome
            profile={profile}
            onScan={handleScan}
            onProgress={() => setTab('progress')}
            onTopic={handleTopic}
          />
        );
      case 'progress':
        return <ProgressScreen profile={profile} />;
      case 'profile':
        return (
          <ProfileScreen
            profile={profile}
            onEditSetup={() => setEditingSetup(true)}
            onSignOut={handleReset}
          />
        );
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-md bg-ink-50">
      <main className="min-h-screen" style={{ paddingBottom: showBottomNav ? '5rem' : 0 }}>
        {overlay === null && renderTab()}
        {overlay?.name === 'scan' && <ScanScreen onBack={goHome} onTopic={handleTopic} />}
        {overlay?.name === 'topic' && <TopicDetails topic={overlay.topic} onBack={goHome} />}
      </main>
      {showBottomNav && <BottomNav active={tab} onChange={handleTab} />}
    </div>
  );
}
