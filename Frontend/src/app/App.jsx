import { useState } from "react";

const steps = [
  {
    id: 1,
    label: "Permohonan Diterima",
    desc: "Berkas permohonan telah masuk ke sistem",
    date: "10 Mar 2026",
    time: "09:14 WIB",
    status: "done",
  },
  {
    id: 2,
    label: "Verifikasi Dokumen",
    desc: "Kelengkapan dan keabsahan dokumen diperiksa",
    date: "11 Mar 2026",
    time: "11:30 WIB",
    status: "done",
  },
  {
    id: 3,
    label: "Evaluasi Teknis",
    desc: "Tim teknis sedang mengkaji kelayakan permohonan",
    date: "11 Mar 2026",
    time: "14:00 WIB",
    status: "active",
  },
  {
    id: 4,
    label: "Persetujuan",
    desc: "Menunggu keputusan pejabat berwenang",
    date: "—",
    time: "—",
    status: "pending",
  },
  {
    id: 5,
    label: "Izin Diterbitkan",
    desc: "Surat izin resmi telah diterbitkan",
    date: "—",
    time: "—",
    status: "pending",
  },
];

const statCards = [
  {
    label: "Total Permohonan",
    value: "128",
    icon: "📋",
    color: "#6366f1",
    bg: "#eef2ff",
  },
  {
    label: "Dalam Proses",
    value: "34",
    icon: "⚙️",
    color: "#f59e0b",
    bg: "#fef3c7",
  },
  {
    label: "Selesai Bulan Ini",
    value: "57",
    icon: "✅",
    color: "#22c55e",
    bg: "#dcfce7",
  },
  { label: "Ditolak", value: "7", icon: "❌", color: "#ef4444", bg: "#fee2e2" },
];

const recentApps = [
  {
    id: "IMB-2026-004821",
    type: "Gedung Komersial",
    date: "11 Mar 2026",
    status: "active",
  },
  {
    id: "IMB-2026-004790",
    type: "Rumah Tinggal",
    date: "10 Mar 2026",
    status: "done",
  },
  { id: "IMB-2026-004755", type: "Ruko", date: "09 Mar 2026", status: "done" },
  {
    id: "IMB-2026-004701",
    type: "Gudang Industri",
    date: "07 Mar 2026",
    status: "pending",
  },
];

const StatusIcon = ({ status }) => {
  if (status === "done")
    return (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <circle cx="12" cy="12" r="12" fill="#22c55e" />
        <path
          d="M7 12.5l3.5 3.5 6.5-7"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (status === "active")
    return (
      <span className="pulse-ring">
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
          <circle cx="12" cy="12" r="12" fill="#f59e0b" />
          <circle cx="12" cy="12" r="4" fill="#fff" />
        </svg>
      </span>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <circle
        cx="12"
        cy="12"
        r="11"
        stroke="#cbd5e1"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};

export default function App() {
  const [hovered, setHovered] = useState(null);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const activeIdx = steps.findIndex((s) => s.status === "active");

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "permohonan", label: "Permohonan", icon: "📋" },
    { id: "dokumen", label: "Dokumen", icon: "📁" },
    { id: "laporan", label: "Laporan", icon: "📊" },
    { id: "pengaturan", label: "Pengaturan", icon: "⚙️" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        fontFamily: "'Georgia', serif",
        display: "flex",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Sans+3:wght@300;400;600&display=swap');
        * { box-sizing: border-box; }
        .pulse-ring { display: inline-flex; position: relative; }
        .pulse-ring::before {
          content: '';
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 2.5px solid #f59e0b;
          animation: pulse 1.6s ease-out infinite;
          opacity: 0;
        }
        @keyframes pulse {
          0% { transform: scale(0.85); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .step-row { transition: background 0.2s, transform 0.18s; cursor: default; }
        .step-row:hover { background: #f8fafc; transform: translateX(4px); }
        .connector-fill { transition: height 0.6s cubic-bezier(.4,0,.2,1); }
        .badge-done { background: #dcfce7; color: #15803d; }
        .badge-active { background: #fef3c7; color: #b45309; }
        .badge-pending { background: #f1f5f9; color: #94a3b8; }
        .nav-item { transition: background 0.18s, color 0.18s; cursor: pointer; border-radius: 10px; }
        .nav-item:hover { background: rgba(255,255,255,0.10); }
        .nav-item.active { background: rgba(255,255,255,0.15); }
        .stat-card { transition: transform 0.18s, box-shadow 0.18s; }
        .stat-card:hover { transform: translateY(-3px); box-shadow: 0 10px 32px rgba(30,41,59,0.13); }
        .recent-row { transition: background 0.15s; cursor: pointer; }
        .recent-row:hover { background: #f8fafc; }
        .topbar-btn { background: none; border: none; cursor: pointer; padding: 6px 10px; border-radius: 8px; transition: background 0.15s; }
        .topbar-btn:hover { background: #e2e8f0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }
      `}</style>

      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen ? 240 : 72,
          minHeight: "100vh",
          background: "#1e293b",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.25s cubic-bezier(.4,0,.2,1)",
          overflow: "hidden",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "24px 18px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "#f59e0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: 18,
            }}
          >
            🏛️
          </div>
          {sidebarOpen && (
            <div>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fff",
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
              >
                DINAS PU
              </p>
              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: 10,
                  color: "#94a3b8",
                  margin: 0,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                Perizinan Online
              </p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav
          style={{
            padding: "16px 12px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`nav-item${activeNav === item.id ? " active" : ""}`}
              onClick={() => setActiveNav(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                color: activeNav === item.id ? "#fff" : "#94a3b8",
              }}
            >
              <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && (
                <span
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: 13.5,
                    fontWeight: activeNav === item.id ? 600 : 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </span>
              )}
              {sidebarOpen && activeNav === item.id && (
                <div
                  style={{
                    marginLeft: "auto",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#f59e0b",
                  }}
                />
              )}
            </div>
          ))}
        </nav>

        {/* User */}
        <div
          style={{
            padding: "16px 12px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#6366f1,#a78bfa)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              color: "#fff",
              fontFamily: "'Source Sans 3',sans-serif",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            AS
          </div>
          {sidebarOpen && (
            <div style={{ overflow: "hidden" }}>
              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#fff",
                  margin: 0,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Ahmad Subagyo
              </p>
              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: 11,
                  color: "#94a3b8",
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
              >
                Admin Perizinan
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          overflow: "auto",
        }}
      >
        {/* Topbar */}
        <div
          style={{
            background: "#fff",
            borderBottom: "1px solid #e2e8f0",
            padding: "0 28px",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              className="topbar-btn"
              onClick={() => setSidebarOpen((v) => !v)}
              style={{ fontSize: 18, color: "#475569" }}
            >
              ☰
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#f1f5f9",
                borderRadius: 8,
                padding: "6px 14px",
              }}
            >
              <span style={{ fontSize: 13, color: "#94a3b8" }}>🔍</span>
              <input
                placeholder="Cari permohonan..."
                style={{
                  border: "none",
                  background: "transparent",
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: 13,
                  color: "#475569",
                  outline: "none",
                  width: 180,
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              className="topbar-btn"
              style={{ fontSize: 18, color: "#475569", position: "relative" }}
            >
              🔔
              <span
                style={{
                  position: "absolute",
                  top: 4,
                  right: 6,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#ef4444",
                  border: "2px solid #fff",
                }}
              />
            </button>
            <button
              className="topbar-btn"
              style={{ fontSize: 18, color: "#475569" }}
            >
              📬
            </button>
            <div
              style={{
                width: 1,
                height: 24,
                background: "#e2e8f0",
                margin: "0 4px",
              }}
            />
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#6366f1,#a78bfa)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontFamily: "'Source Sans 3',sans-serif",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              AS
            </div>
          </div>
        </div>

        {/* Page content */}
        <div style={{ padding: "28px 28px 40px", flex: 1 }}>
          {/* Page title */}
          <div style={{ marginBottom: 24 }}>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22,
                fontWeight: 700,
                color: "#1e293b",
                margin: "0 0 4px",
              }}
            >
              Dashboard Perizinan
            </p>
            <p
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: 13,
                color: "#94a3b8",
                margin: 0,
              }}
            >
              Selamat datang kembali, Ahmad. Berikut ringkasan aktivitas hari
              ini.
            </p>
          </div>

          {/* Stat Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 16,
              marginBottom: 28,
            }}
          >
            {statCards.map((card) => (
              <div
                key={card.label}
                className="stat-card"
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "20px 22px",
                  boxShadow: "0 2px 12px rgba(30,41,59,0.07)",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    background: card.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    flexShrink: 0,
                  }}
                >
                  {card.icon}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: 11,
                      color: "#94a3b8",
                      margin: "0 0 4px",
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                    }}
                  >
                    {card.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 26,
                      fontWeight: 700,
                      color: card.color,
                      margin: 0,
                      lineHeight: 1,
                    }}
                  >
                    {card.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Main grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 380px",
              gap: 20,
              alignItems: "start",
            }}
          >
            {/* Left: Tracking + Recent */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Recent Applications */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  boxShadow: "0 2px 12px rgba(30,41,59,0.07)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "18px 22px 14px",
                    borderBottom: "1px solid #f1f5f9",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#1e293b",
                      margin: 0,
                    }}
                  >
                    Permohonan Terbaru
                  </p>
                  <button
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: 12,
                      color: "#6366f1",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Lihat Semua →
                  </button>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      {["Nomor", "Jenis Bangunan", "Tanggal", "Status"].map(
                        (h) => (
                          <th
                            key={h}
                            style={{
                              fontFamily: "'Source Sans 3', sans-serif",
                              fontSize: 11,
                              color: "#94a3b8",
                              fontWeight: 700,
                              letterSpacing: 1,
                              textTransform: "uppercase",
                              padding: "10px 22px",
                              textAlign: "left",
                            }}
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {recentApps.map((app, i) => (
                      <tr
                        key={app.id}
                        className="recent-row"
                        style={{ borderTop: "1px solid #f1f5f9" }}
                      >
                        <td
                          style={{
                            padding: "13px 22px",
                            fontFamily: "'Source Sans 3', sans-serif",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#1e293b",
                          }}
                        >
                          {app.id}
                        </td>
                        <td
                          style={{
                            padding: "13px 22px",
                            fontFamily: "'Source Sans 3', sans-serif",
                            fontSize: 13,
                            color: "#475569",
                          }}
                        >
                          {app.type}
                        </td>
                        <td
                          style={{
                            padding: "13px 22px",
                            fontFamily: "'Source Sans 3', sans-serif",
                            fontSize: 12,
                            color: "#94a3b8",
                          }}
                        >
                          {app.date}
                        </td>
                        <td style={{ padding: "13px 22px" }}>
                          <span
                            className={`badge-${app.status}`}
                            style={{
                              fontFamily: "'Source Sans 3', sans-serif",
                              fontSize: 10,
                              fontWeight: 700,
                              letterSpacing: 1.2,
                              textTransform: "uppercase",
                              padding: "3px 10px",
                              borderRadius: 40,
                            }}
                          >
                            {app.status === "done"
                              ? "Selesai"
                              : app.status === "active"
                                ? "Berlangsung"
                                : "Menunggu"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Quick Stats bar */}
              <div
                style={{
                  background: "#1e293b",
                  borderRadius: 14,
                  padding: "18px 24px",
                  display: "flex",
                  justifyContent: "space-around",
                  gap: 12,
                }}
              >
                {[
                  { label: "Rata-rata Proses", value: "4.2 Hari" },
                  { label: "Tingkat Persetujuan", value: "89%" },
                  { label: "Antrian Aktif", value: "12" },
                ].map((s) => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 20,
                        fontWeight: 700,
                        color: "#f59e0b",
                        margin: "0 0 4px",
                      }}
                    >
                      {s.value}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: 11,
                        color: "#94a3b8",
                        margin: 0,
                        letterSpacing: 0.5,
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Tracking card */}
            <div style={{ width: "100%", maxWidth: 380 }}>
              <div
                style={{
                  background: "#1e293b",
                  borderRadius: "18px 18px 0 0",
                  padding: "22px 24px 20px",
                  color: "#fff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: 10,
                        letterSpacing: 3,
                        textTransform: "uppercase",
                        color: "#94a3b8",
                        margin: "0 0 5px",
                      }}
                    >
                      Nomor Permohonan
                    </p>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 18,
                        fontWeight: 700,
                        margin: "0 0 2px",
                        letterSpacing: 0.5,
                      }}
                    >
                      IMB-2026-004821
                    </p>
                    <p
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: 12,
                        color: "#94a3b8",
                        margin: 0,
                      }}
                    >
                      Izin Mendirikan Bangunan · Gedung Komersial
                    </p>
                  </div>
                  <span
                    style={{
                      background: "#f59e0b",
                      color: "#1e293b",
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                      padding: "5px 11px",
                      borderRadius: 40,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    Dalam Proses
                  </span>
                </div>
                {/* Progress bar */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: 11,
                      color: "#94a3b8",
                      marginBottom: 6,
                    }}
                  >
                    <span>Progress</span>
                    <span style={{ color: "#f59e0b", fontWeight: 600 }}>
                      {Math.round(((activeIdx + 0.5) / steps.length) * 100)}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: 5,
                      background: "#334155",
                      borderRadius: 99,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${((activeIdx + 0.5) / steps.length) * 100}%`,
                        background: "linear-gradient(90deg,#22c55e,#f59e0b)",
                        borderRadius: 99,
                        transition: "width 1s",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "0 0 18px 18px",
                  padding: "8px 0 4px",
                  boxShadow: "0 8px 40px rgba(30,41,59,0.10)",
                }}
              >
                {steps.map((step, idx) => {
                  const isLast = idx === steps.length - 1;
                  return (
                    <div
                      key={step.id}
                      className="step-row"
                      onMouseEnter={() => setHovered(step.id)}
                      onMouseLeave={() => setHovered(null)}
                      style={{ display: "flex", gap: 0, padding: "0 22px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          minWidth: 32,
                          paddingTop: 18,
                        }}
                      >
                        <StatusIcon status={step.status} />
                        {!isLast && (
                          <div
                            style={{
                              width: 2,
                              flex: 1,
                              minHeight: 22,
                              background: "#f1f5f9",
                              borderRadius: 2,
                              margin: "4px 0",
                              position: "relative",
                              overflow: "hidden",
                            }}
                          >
                            {step.status === "done" && (
                              <div
                                className="connector-fill"
                                style={{
                                  position: "absolute",
                                  inset: 0,
                                  background: "#22c55e",
                                }}
                              />
                            )}
                            {step.status === "active" && (
                              <div
                                className="connector-fill"
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  height: "40%",
                                  background:
                                    "linear-gradient(#f59e0b,#f1f5f9)",
                                }}
                              />
                            )}
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          flex: 1,
                          padding: isLast
                            ? "18px 0 20px 14px"
                            : "18px 0 14px 14px",
                          borderBottom: isLast ? "none" : "1px solid #f8fafc",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <p
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              fontSize: 14,
                              fontWeight: 700,
                              margin: 0,
                              color:
                                step.status === "pending"
                                  ? "#94a3b8"
                                  : "#1e293b",
                            }}
                          >
                            {step.label}
                          </p>
                          <span
                            className={`badge-${step.status}`}
                            style={{
                              fontFamily: "'Source Sans 3', sans-serif",
                              fontSize: 9,
                              fontWeight: 700,
                              letterSpacing: 1.2,
                              textTransform: "uppercase",
                              padding: "2px 8px",
                              borderRadius: 40,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {step.status === "done"
                              ? "Selesai"
                              : step.status === "active"
                                ? "Berlangsung"
                                : "Menunggu"}
                          </span>
                        </div>
                        <p
                          style={{
                            fontFamily: "'Source Sans 3', sans-serif",
                            fontSize: 12,
                            color:
                              step.status === "pending" ? "#cbd5e1" : "#64748b",
                            margin: "3px 0 4px",
                            lineHeight: 1.5,
                          }}
                        >
                          {step.desc}
                        </p>
                        {step.date !== "—" && (
                          <p
                            style={{
                              fontFamily: "'Source Sans 3', sans-serif",
                              fontSize: 11,
                              color: "#94a3b8",
                              margin: 0,
                              letterSpacing: 0.3,
                            }}
                          >
                            🕐 {step.date}, {step.time}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div
                  style={{
                    margin: "4px 22px 18px",
                    padding: "12px 16px",
                    background: "#f8fafc",
                    borderRadius: 12,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: 10,
                        color: "#94a3b8",
                        margin: "0 0 2px",
                        letterSpacing: 1.5,
                        textTransform: "uppercase",
                      }}
                    >
                      Estimasi Selesai
                    </p>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#1e293b",
                        margin: 0,
                      }}
                    >
                      17 Maret 2026
                    </p>
                  </div>
                  <button
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      background: "#1e293b",
                      color: "#fff",
                      border: "none",
                      borderRadius: 40,
                      padding: "8px 16px",
                      cursor: "pointer",
                    }}
                  >
                    Hubungi Petugas →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
