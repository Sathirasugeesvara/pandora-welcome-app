import "./About.css";

const TEAM = [
  { role: "Event Director",       name: "Coming Soon", icon: "◈" },
  { role: "Co-Director",          name: "Coming Soon", icon: "◈" },
  { role: "Creative Lead",        name: "Coming Soon", icon: "◈" },
  { role: "Logistics Head",       name: "Coming Soon", icon: "◈" },
  { role: "Design Team",          name: "Coming Soon", icon: "◈" },
  { role: "Web Development",      name: "Coming Soon", icon: "◈" },
];

const EVENT_DETAILS = [
  { label: "Date",       value: "21st June",  icon: "📅", ready: true },
  { label: "Time",       value: "All day",  icon: "🕐", ready: true },
  { label: "Venue",      value: "Botany Auditorium", icon: "📍", ready: true },
  { label: "Dress Code", value: "Dark Blue or Black",        icon: "🖤", ready: true  },
  { label: "Entry",      value: "By Invitation", icon: "✦",  ready: true  },
  { label: "Organised By", value: "AMT Family", icon: "🏛",  ready: true  },
];

export default function About() {
  return (
    <div className="about">
      {/* Background */}
      <div className="about__bg" aria-hidden="true">
        <div className="about__bg-orb about__bg-orb--1" />
        <div className="about__bg-orb about__bg-orb--2" />
        <div className="about__bg-grid" />
      </div>

      <div className="about__container">

        {/* ── Hero banner ── */}
        <div className="about__hero">
          <p className="about__hero-eyebrow">University of Sri Jayewardenepura · Faculty of Applied Sciences</p>
          <h1 className="about__hero-title">
            <span className="about__hero-pmt">AMT Family</span>
            <span className="about__hero-presents">presents</span>
            <span className="about__hero-pandora">PANDORA</span>
          </h1>
          <p className="about__hero-sub">A New Journey Begins</p>
          <div className="about__hero-divider">
            <span /><span className="about__diamond" /><span />
          </div>
        </div>

        {/* ── What is this event ── */}
        <section className="about__section">
          <div className="about__section-label">
            <span className="about__section-line" />
            <span>About the Event</span>
            <span className="about__section-line" />
          </div>
          <div className="about__event-card">
            <div className="about__event-card-glow" />
            <div className="about__event-icon">✦</div>
            <h2 className="about__event-title">Freshers' Welcome</h2>
            <p className="about__event-body">
              <strong>PANDORA</strong> is the official Freshers' Welcome event of the
              Pure Maths Combination, Faculty of Applied Sciences,
              University of Sri Jayewardenepura. This day is dedicated to welcoming the newest
              members of the PMT family into a world unlike any other — a world of bioluminescent
              wonder, clan spirit, and lifelong bonds.
            </p>
            <p className="about__event-body">
              Every fresher will be sorted into one of the six great clans of Pandora, each carrying
              their own identity, colour, and story. Through challenges, performances, and shared
              moments, they will discover what it means to belong — not just to a clan, but to a family
              that will walk with them through their entire university journey.
            </p>
            <div className="about__event-quote">
              <span className="about__event-quote-mark">"</span>
              Together as One. Stronger as a Family.
              <span className="about__event-quote-mark">"</span>
            </div>
          </div>
        </section>

        {/* ── Event Details grid ── */}
        <section className="about__section">
          <div className="about__section-label">
            <span className="about__section-line" />
            <span>Event Details</span>
            <span className="about__section-line" />
          </div>
          <div className="about__details-grid">
            {EVENT_DETAILS.map((d, i) => (
              <div
                key={d.label}
                className={`about__detail-card ${d.ready ? "about__detail-card--ready" : "about__detail-card--soon"}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className="about__detail-icon">{d.icon}</span>
                <span className="about__detail-label">{d.label}</span>
                <span className="about__detail-value">
                  {d.value}
                  {!d.ready && <span className="about__detail-badge">TBA</span>}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Dress code spotlight ── */}
        <section className="about__section">
          <div className="about__section-label">
            <span className="about__section-line" />
            <span>Dress Code</span>
            <span className="about__section-line" />
          </div>
          <div className="about__dress-card">
            <div className="about__dress-left">
              <div className="about__dress-icon">💙🖤</div>
              <h3 className="about__dress-title">Dark Blue or Black</h3>
              <p className="about__dress-desc">
                Enter Pandora in deep tones of night. Dress in dark blue or black to match the
                glowing atmosphere of Pandora’s world.
                Smart dark-themed attire is required for all attendees.
              </p>
              <div className="about__dress-tags">
                <span>Dark Blue Top</span>
                <span>Black Top</span>
                <span>Dark Bottom</span>
                <span>Dark Shoes</span>
              </div>
            </div>
            <div className="about__dress-right" aria-hidden="true">
              <div className="about__dress-orb" />
              <div className="about__dress-text">BLACK</div>
            </div>
          </div>
        </section>

        {/* ── Organiser ── */}
        <section className="about__section">
          <div className="about__section-label">
            <span className="about__section-line" />
            <span>Organised By</span>
            <span className="about__section-line" />
          </div>
          <div className="about__organiser-card">
            <div className="about__organiser-glow" />
            <div className="about__organiser-logo">
              <img
                src="/favicon.png"
                alt="PMT Logo"
                className="about__organiser-img"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>
            <div className="about__organiser-info">
              <h3 className="about__organiser-name">AMT Family</h3>
              <p className="about__organiser-sub">
                Applied Maths Combination<br />
                Faculty of Applied Sciences<br />
                University of Sri Jayewardenepura
              </p>
              <p className="about__organiser-desc">
                The AMT Family is the student community that nurtures every individual who steps
                through the doors of the department. From academics to events, from challenges to
                celebrations — the AMT Family has always stood together, and PANDORA is our proudest
                gift to the new generation joining our ranks.
              </p>
              <div className="about__organiser-tags">
                <span>#AMTFamily</span>
                <span>#PMTFamily</span>
                <span>#Pandora2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="about__section">
          <div className="about__section-label">
            <span className="about__section-line" />
            <span>The Team Behind Pandora</span>
            <span className="about__section-line" />
          </div>
          <p className="about__team-note">
            The dedicated team making this day possible — names will be revealed soon.
          </p>
          <div className="about__team-grid">
            {TEAM.map((member, i) => (
              <div
                key={member.role}
                className="about__team-card"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="about__team-icon">{member.icon}</div>
                <p className="about__team-role">{member.role}</p>
                <p className="about__team-name">{member.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Venue / Map ── */}
        <section className="about__section">
          <div className="about__section-label">
            <span className="about__section-line" />
            <span>Venue</span>
            <span className="about__section-line" />
          </div>
          <div className="about__venue-card">
            <div className="about__venue-top">
              <div className="about__venue-icon">📍</div>
              <div>
                <h3 className="about__venue-title">Botany Auditorium</h3>
                <p className="about__venue-sub">
                  University of Sri Jayewardenepura. See the map below for directions.
                </p>
              </div>
            </div>

            <div className="about__map-wrap">
              <iframe
                className="about__map-iframe"
                title="Event Venue"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495.16247273304367!2d79.90382359273733!3d6.8546254779891385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b99309c25c9%3A0x7a646478ddd03d78!2sBotany%20Auditorium!5e0!3m2!1sen!2slk!4v1781699917759!5m2!1sen!2slk"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="about__venue-tags">
              <span>🚗 Parking details TBA</span>
              <span>🚌 Transport info TBA</span>
            </div>
          </div>
        </section>

        {/* ── Bottom tagline ── */}
        <div className="about__footer-line">
          <div className="about__footer-divider">
            <span /><span className="about__diamond" /><span />
          </div>
          <p className="about__footer-text">
            Together as One. Stronger as a Family.
          </p>
          <p className="about__footer-hash">#PMTFamily &nbsp;#AMTFamily &nbsp;#Pandora</p>
        </div>

      </div>
    </div>
  );
}
