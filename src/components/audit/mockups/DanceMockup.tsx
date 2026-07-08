export function DanceMockup() {
  const p = {
    primary: '#8b3a8b',
    secondary: '#e06098',
    bg: '#fef7ff',
    text: '#2d1a2d',
    textLight: '#7a6080',
    headerBg: '#2d1a2d',
    pink: '#f0a0c0',
    lavender: '#e8d0f0',
  };

  const classes = [
    { name: 'Pre-Primary Ballet', age: '3–4 years', day: 'Saturday 9:00am', desc: 'Introduction to movement and musicality through creative play' },
    { name: 'Primary Ballet', age: '5–6 years', day: 'Tuesday 4:00pm & Saturday 9:45am', desc: 'RAD syllabus — building coordination, posture, and confidence' },
    { name: 'Grade 1 Ballet', age: '7–8 years', day: 'Wednesday 4:15pm', desc: 'RAD Grade 1 — developing technique and artistry' },
    { name: 'Grade 2–3 Ballet', age: '9–11 years', day: 'Thursday 4:30pm', desc: 'RAD Grades 2 & 3 — preparing for examinations' },
    { name: 'Tap & Modern', age: '6–8 years', day: 'Monday 4:15pm', desc: 'ISTD syllabus — rhythm, expression, and fun!' },
    { name: 'Tap & Modern', age: '9–12 years', day: 'Monday 5:00pm', desc: 'ISTD syllabus — building on technique and performance skills' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", color: p.text, background: p.bg, lineHeight: 1.6 }}>
      {/* Nav */}
      <nav style={{ background: '#fff', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f0e0f8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>💃</span>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: p.primary }}>Farnham Dance</div>
            <div style={{ fontSize: 11, color: p.textLight, letterSpacing: 1 }}>RAD & ISTD · Ballet, Tap & Modern</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          {['Classes', 'Timetable', 'Our Teachers', 'Shows & Events', 'Parents'].map((item) => (
            <span key={item} style={{ color: p.text, fontSize: 14, cursor: 'pointer' }}>{item}</span>
          ))}
          <button style={{ background: p.secondary, color: '#fff', padding: '10px 22px', borderRadius: 20, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Enrol Now
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${p.primary} 0%, ${p.secondary} 50%, #c060a0 100%)`, padding: '80px 40px', position: 'relative' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: 44, fontWeight: 700, margin: 0, lineHeight: 1.15 }}>
              Where Little Dancers Find Their Spark ✨
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 17, marginTop: 16 }}>
              Ballet, tap, and modern dance classes for children aged 3–12 in Farnham. RAD and ISTD trained teachers in a nurturing, joyful environment.
            </p>
            <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
              <button style={{ background: '#fff', color: p.primary, padding: '14px 28px', borderRadius: 24, border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                View Classes & Enrol
              </button>
              <button style={{ background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: 24, border: '2px solid rgba(255,255,255,0.4)', fontSize: 15, cursor: 'pointer' }}>
                Free Trial Class
              </button>
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 24 }}>
              {[
                { icon: '🏅', label: 'RAD Registered' },
                { icon: '⭐', label: 'ISTD Approved' },
                { icon: '❤️', label: '20+ Years' },
              ].map((b) => (
                <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>{b.icon}</span>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: 48, textAlign: 'center', border: '2px dashed rgba(255,255,255,0.2)' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>📷 Happy Young Dancers</span>
          </div>
        </div>
      </div>

      {/* Age groups */}
      <div style={{ padding: '64px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, color: p.primary, margin: '0 0 8px' }}>Classes for Every Age</h2>
          <p style={{ color: p.textLight, marginBottom: 32 }}>From first steps to exam preparation, we nurture dancers at every stage</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16 }}>
            {[
              { age: '3–4', label: 'Tiny Dancers', emoji: '🌸', color: '#f8e0f0' },
              { age: '5–6', label: 'Little Stars', emoji: '⭐', color: '#e8e0f8' },
              { age: '7–9', label: 'Rising Dancers', emoji: '🌟', color: '#f0e0f0' },
              { age: '10–12', label: 'Young Performers', emoji: '💫', color: '#e0e8f8' },
            ].map((g) => (
              <div key={g.age} style={{ background: g.color, borderRadius: 16, padding: 24, textAlign: 'center' }}>
                <span style={{ fontSize: 32 }}>{g.emoji}</span>
                <div style={{ fontSize: 24, fontWeight: 700, color: p.primary, margin: '8px 0 2px' }}>{g.age}</div>
                <div style={{ fontSize: 13, color: p.textLight }}>{g.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timetable */}
      <div style={{ background: p.lavender + '44', padding: '64px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, color: p.primary, margin: '0 0 32px' }}>Class Timetable — 2025/26</h2>
          <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #e8d8f0' }}>
            {classes.map((c, i) => (
              <div key={c.name + c.age} style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr 200px', padding: '16px 24px', borderBottom: i < classes.length - 1 ? '1px solid #f0e8f4' : 'none', alignItems: 'center', fontSize: 14 }}>
                <div style={{ fontWeight: 600, color: p.primary }}>{c.name}</div>
                <div style={{ background: p.secondary + '22', color: p.secondary, padding: '2px 8px', borderRadius: 10, fontSize: 12, fontWeight: 600, textAlign: 'center' }}>{c.age}</div>
                <div style={{ color: p.textLight, paddingLeft: 16 }}>{c.desc}</div>
                <div style={{ color: p.text, fontSize: 13, textAlign: 'right' }}>{c.day}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <button style={{ background: p.secondary, color: '#fff', padding: '12px 28px', borderRadius: 20, border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
              Enrol Your Child
            </button>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div style={{ padding: '64px 40px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, color: p.primary, margin: '0 0 32px' }}>Our Teachers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {[
              { name: 'Miss Sarah', quals: 'RAD RTS, ISTD DipDT', exp: 'Principal & founder. 20+ years teaching experience with a passion for nurturing young dancers.', specialty: 'Ballet & Creative Movement' },
              { name: 'Miss Emily', quals: 'ISTD Associate, BA Dance', exp: 'Specialist in tap and modern. Brings energy and creativity to every class.', specialty: 'Tap & Modern Dance' },
            ].map((t) => (
              <div key={t.name} style={{ background: '#fff', border: '1px solid #e8d8f0', borderRadius: 16, padding: 24, textAlign: 'center' }}>
                <div style={{ width: 100, height: 100, borderRadius: '50%', background: `linear-gradient(135deg, ${p.primary}22, ${p.secondary}22)`, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px dashed ${p.primary}44` }}>
                  <span style={{ fontSize: 12, color: p.textLight }}>Photo</span>
                </div>
                <h3 style={{ fontSize: 20, margin: '0 0 2px', color: p.primary }}>{t.name}</h3>
                <div style={{ fontSize: 12, color: p.secondary, fontWeight: 600 }}>{t.quals}</div>
                <div style={{ fontSize: 13, color: p.textLight, marginTop: 4 }}>{t.specialty}</div>
                <p style={{ fontSize: 13, color: p.text, marginTop: 8 }}>{t.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: `linear-gradient(135deg, ${p.primary}, ${p.secondary})`, padding: '56px 40px', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: 28, margin: 0, fontWeight: 700 }}>Start Your Child's Dance Journey</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8, fontSize: 16 }}>
          Book a free trial class — no obligation, just fun!
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 24 }}>
          <button style={{ background: '#fff', color: p.primary, padding: '14px 32px', borderRadius: 24, border: 'none', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
            Book a Free Trial
          </button>
          <button style={{ background: 'transparent', color: '#fff', padding: '14px 32px', borderRadius: 24, border: '2px solid rgba(255,255,255,0.4)', fontSize: 16, cursor: 'pointer' }}>
            Contact Us
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: p.headerBg, padding: '32px 40px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'start', fontSize: 13, color: '#a088b0' }}>
          <div>
            <div style={{ color: p.pink, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Farnham Dance</div>
            <p style={{ margin: 0 }}>RAD & ISTD Registered Dance School<br />Farnham, Surrey</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0 0 4px' }}>📞 01252 XXX XXX</p>
            <p style={{ margin: '0 0 4px' }}>✉️ info@farnhamdance.co.uk</p>
            <p style={{ margin: 0 }}>📍 Farnham, Surrey GU9</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', color: '#666', fontSize: 11, marginTop: 16, borderTop: '1px solid #3d2a4d', paddingTop: 16 }}>
          © 2026 Farnham Dance. All rights reserved.
        </div>
      </div>
    </div>
  );
}
