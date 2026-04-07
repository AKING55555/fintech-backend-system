import { useState, useEffect, useCallback } from "react";

/* ─────────────────────────── GLOBAL STYLES ─────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #04050f;
      --glass: rgba(255,255,255,0.05);
      --glass-border: rgba(255,255,255,0.12);
      --glass-hover: rgba(255,255,255,0.09);
      --accent-cyan: #00e5ff;
      --accent-pink: #ff2d78;
      --accent-purple: #9b5de5;
      --accent-green: #00f5a0;
      --text: #e8eaf6;
      --muted: rgba(232,234,246,0.5);
      --font-display: 'Syne', sans-serif;
      --font-body: 'DM Sans', sans-serif;
      --blur: blur(18px);
      --radius: 20px;
      --sidebar-w: 240px;
    }

    html, body, #root { height: 100%; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      overflow-x: hidden;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--glass-border); border-radius: 4px; }

    /* Blobs */
    .blob {
      position: fixed;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
      z-index: 0;
      animation: blobFloat 8s ease-in-out infinite alternate;
    }
    .blob-1 { width: 520px; height: 520px; background: radial-gradient(circle, #9b5de580, #9b5de510); top: -120px; left: -120px; }
    .blob-2 { width: 420px; height: 420px; background: radial-gradient(circle, #00e5ff60, #00e5ff10); bottom: 60px; right: -80px; animation-delay: -3s; }
    .blob-3 { width: 300px; height: 300px; background: radial-gradient(circle, #ff2d7870, #ff2d7810); bottom: -60px; left: 30%; animation-delay: -5s; }
    .blob-4 { width: 200px; height: 200px; background: radial-gradient(circle, #00f5a060, #00f5a010); top: 40%; right: 25%; animation-delay: -2s; }

    @keyframes blobFloat {
      0% { transform: translate(0,0) scale(1); }
      100% { transform: translate(30px, 20px) scale(1.06); }
    }

    /* Glass card */
    .glass {
      background: var(--glass);
      border: 1px solid var(--glass-border);
      backdrop-filter: var(--blur);
      -webkit-backdrop-filter: var(--blur);
      border-radius: var(--radius);
    }

    /* Glow button */
    .btn-glow {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.85rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      background: linear-gradient(135deg, var(--accent-cyan), #00bcd4);
      color: #04050f;
      border: none;
      border-radius: 50px;
      padding: 12px 32px;
      cursor: pointer;
      box-shadow: 0 0 24px rgba(0,229,255,0.55), 0 0 60px rgba(0,229,255,0.2);
      transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
      white-space: nowrap;
    }
    .btn-glow:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 0 36px rgba(0,229,255,0.75), 0 0 80px rgba(0,229,255,0.3); }
    .btn-glow:active { transform: scale(0.97); }
    .btn-glow:disabled { opacity: 0.5; cursor: not-allowed; }

    .btn-ghost {
      font-family: var(--font-body);
      font-size: 0.85rem;
      background: transparent;
      border: 1px solid var(--glass-border);
      color: var(--muted);
      border-radius: 50px;
      padding: 8px 20px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-ghost:hover { background: var(--glass-hover); color: var(--text); }

    /* Input */
    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .field label {
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--muted);
      font-family: var(--font-display);
    }
    .field input, .field select, .field textarea {
      background: rgba(255,255,255,0.06);
      border: 1px solid var(--glass-border);
      border-radius: 12px;
      color: var(--text);
      font-family: var(--font-body);
      font-size: 0.9rem;
      padding: 12px 16px;
      outline: none;
      transition: border-color 0.2s, background 0.2s;
      width: 100%;
    }
    .field input:focus, .field select:focus, .field textarea:focus {
      border-color: var(--accent-cyan);
      background: rgba(0,229,255,0.06);
    }
    .field select option { background: #0d0f1e; }

    /* Layout */
    .app-shell {
      display: flex;
      min-height: 100vh;
      position: relative;
      z-index: 1;
    }

    /* Sidebar */
    .sidebar {
      width: var(--sidebar-w);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      padding: 28px 0;
      position: fixed;
      left: 0; top: 0; bottom: 0;
      z-index: 100;
      border-right: 1px solid var(--glass-border);
      background: rgba(4,5,15,0.5);
      backdrop-filter: var(--blur);
    }
    .sidebar-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0 24px 28px;
      border-bottom: 1px solid var(--glass-border);
    }
    .logo-icon {
      width: 36px; height: 36px;
      border-radius: 10px;
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      display: flex; align-items: center; justify-content: center;
      font-size: 16px;
    }
    .logo-text {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1rem;
      letter-spacing: 0.05em;
    }
    .sidebar-nav {
      flex: 1;
      padding: 20px 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 11px 14px;
      border-radius: 12px;
      cursor: pointer;
      color: var(--muted);
      font-size: 0.88rem;
      transition: all 0.2s;
      border: 1px solid transparent;
    }
    .nav-item:hover { background: var(--glass-hover); color: var(--text); }
    .nav-item.active {
      background: rgba(0,229,255,0.1);
      color: var(--accent-cyan);
      border-color: rgba(0,229,255,0.25);
    }
    .nav-icon { font-size: 1.1rem; width: 20px; text-align: center; }

    .sidebar-footer { padding: 20px 12px 0; border-top: 1px solid var(--glass-border); }
    .user-chip {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 12px;
      background: var(--glass);
      border: 1px solid var(--glass-border);
    }
    .avatar {
      width: 32px; height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-pink), var(--accent-purple));
      display: flex; align-items: center; justify-content: center;
      font-size: 0.75rem;
      font-weight: 700;
    }
    .user-info { flex: 1; min-width: 0; }
    .user-name { font-size: 0.82rem; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .user-role {
      font-size: 0.68rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--accent-cyan);
    }

    /* Main content */
    .main {
      margin-left: var(--sidebar-w);
      flex: 1;
      padding: 32px;
      min-height: 100vh;
    }

    /* Page header */
    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 28px;
      gap: 16px;
    }
    .page-title {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.8rem;
    }
    .page-subtitle { color: var(--muted); font-size: 0.85rem; margin-top: 2px; }

    /* Stat cards */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 28px;
    }
    .stat-card {
      padding: 22px;
      position: relative;
      overflow: hidden;
    }
    .stat-card::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: var(--radius);
      pointer-events: none;
    }
    .stat-label { font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }
    .stat-value {
      font-family: var(--font-display);
      font-size: 1.9rem;
      font-weight: 800;
      line-height: 1;
    }
    .stat-change { font-size: 0.75rem; margin-top: 8px; }
    .stat-icon {
      position: absolute;
      right: 18px; top: 18px;
      font-size: 1.8rem;
      opacity: 0.18;
    }

    /* Table */
    .table-wrap { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; }
    thead tr { border-bottom: 1px solid var(--glass-border); }
    th {
      padding: 12px 16px;
      text-align: left;
      font-family: var(--font-display);
      font-size: 0.72rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--muted);
      font-weight: 600;
    }
    td { padding: 14px 16px; font-size: 0.88rem; border-bottom: 1px solid rgba(255,255,255,0.04); }
    tr:last-child td { border-bottom: none; }
    tbody tr { transition: background 0.15s; }
    tbody tr:hover { background: rgba(255,255,255,0.03); }

    /* Badge */
    .badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 50px;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .badge-income { background: rgba(0,245,160,0.15); color: var(--accent-green); }
    .badge-expense { background: rgba(255,45,120,0.15); color: var(--accent-pink); }
    .badge-admin { background: rgba(0,229,255,0.15); color: var(--accent-cyan); }
    .badge-analyst { background: rgba(155,93,229,0.15); color: var(--accent-purple); }
    .badge-viewer { background: rgba(255,255,255,0.08); color: var(--muted); }

    /* Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(4,5,15,0.75);
      backdrop-filter: blur(6px);
      z-index: 200;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      animation: fadeIn 0.2s;
    }
    .modal {
      width: 100%;
      max-width: 440px;
      padding: 32px;
      animation: slideUp 0.25s ease-out;
    }
    .modal-title {
      font-family: var(--font-display);
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 24px;
    }
    .modal-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 28px; }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

    /* Login page */
    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      position: relative;
      z-index: 1;
    }
    .login-card {
      width: 100%;
      max-width: 420px;
      padding: 44px 40px;
    }
    .login-logo {
      display: flex; align-items: center; gap: 12px;
      margin-bottom: 36px;
    }
    .login-logo-icon {
      width: 44px; height: 44px;
      border-radius: 14px;
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      display: flex; align-items: center; justify-content: center;
      font-size: 20px;
      box-shadow: 0 0 28px rgba(0,229,255,0.4);
    }
    .login-title {
      font-family: var(--font-display);
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 6px;
    }
    .login-subtitle { color: var(--muted); font-size: 0.9rem; margin-bottom: 36px; }
    .login-form { display: flex; flex-direction: column; gap: 18px; }
    .login-error {
      background: rgba(255,45,120,0.12);
      border: 1px solid rgba(255,45,120,0.3);
      border-radius: 12px;
      padding: 12px 16px;
      font-size: 0.85rem;
      color: #ff6b9d;
    }

    /* Filter bar */
    .filter-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 20px;
      align-items: flex-end;
    }
    .filter-bar .field { min-width: 140px; flex: 1; }

    /* Pagination */
    .pagination {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 20px;
      justify-content: flex-end;
    }
    .page-btn {
      width: 34px; height: 34px;
      border-radius: 8px;
      border: 1px solid var(--glass-border);
      background: var(--glass);
      color: var(--text);
      cursor: pointer;
      font-size: 0.85rem;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
    }
    .page-btn:hover { border-color: var(--accent-cyan); color: var(--accent-cyan); }
    .page-btn.active { background: rgba(0,229,255,0.15); border-color: var(--accent-cyan); color: var(--accent-cyan); }
    .page-btn:disabled { opacity: 0.3; cursor: not-allowed; }

    /* Action icons */
    .icon-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px;
      border-radius: 8px;
      color: var(--muted);
      transition: all 0.2s;
      font-size: 0.9rem;
    }
    .icon-btn:hover { background: var(--glass-hover); color: var(--text); }
    .icon-btn.danger:hover { background: rgba(255,45,120,0.15); color: var(--accent-pink); }

    /* Toast */
    .toast {
      position: fixed;
      bottom: 24px; right: 24px;
      z-index: 999;
      padding: 14px 20px;
      border-radius: 14px;
      font-size: 0.88rem;
      min-width: 240px;
      animation: slideUp 0.3s ease-out;
    }
    .toast-success { background: rgba(0,245,160,0.15); border: 1px solid rgba(0,245,160,0.3); color: var(--accent-green); }
    .toast-error { background: rgba(255,45,120,0.15); border: 1px solid rgba(255,45,120,0.3); color: #ff6b9d; }

    /* Empty state */
    .empty { text-align: center; padding: 60px 20px; color: var(--muted); }
    .empty-icon { font-size: 3rem; margin-bottom: 12px; opacity: 0.5; }

    /* Responsive */
    @media (max-width: 768px) {
      .sidebar { transform: translateX(-100%); transition: transform 0.3s; }
      .sidebar.open { transform: translateX(0); }
      .main { margin-left: 0; padding: 20px; }
      .stats-grid { grid-template-columns: 1fr 1fr; }
      .mobile-menu-btn {
        display: flex !important;
        position: fixed; top: 16px; left: 16px; z-index: 150;
        width: 40px; height: 40px;
        border-radius: 10px; align-items: center; justify-content: center;
        font-size: 1.2rem;
      }
      .login-card { padding: 32px 24px; }
    }
    .mobile-menu-btn { display: none; }

    /* Section card */
    .section-card { padding: 24px; margin-bottom: 20px; }
    .section-title {
      font-family: var(--font-display);
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* Amount colors */
    .amount-income { color: var(--accent-green); font-weight: 600; }
    .amount-expense { color: var(--accent-pink); font-weight: 600; }

    /* Skeleton */
    .skeleton {
      background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 8px;
    }
    @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
  `}</style>
);

/* ─────────────────────────── API ─────────────────────────── */
const BASE = "http://localhost:5000";
const api = async (path, opts = {}) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE}/api${path}`, {
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...opts.headers },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

/* ─────────────────────────── UTILS ─────────────────────────── */
const fmt = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
const initials = (name = "") => name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

/* ─────────────────────────── TOAST ─────────────────────────── */
const Toast = ({ msg, type, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return <div className={`toast toast-${type}`}>{msg}</div>;
};

/* ─────────────────────────── LOGIN PAGE ─────────────────────────── */
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(""); setLoading(true);
    try {
      const data = await api("/auth/login", { method: "POST", body: { email, password } });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onLogin(data.user);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="glass login-card">
        <div className="login-logo">
          <div className="login-logo-icon">💎</div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem" }}>GLASSFI</div>
            <div style={{ fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.1em" }}>FINANCE PLATFORM</div>
          </div>
        </div>
        <div className="login-title">Welcome back</div>
        <div className="login-subtitle">Sign in to your financial dashboard</div>
        <div className="login-form">
          {error && <div className="login-error">⚠ {error}</div>}
          <div className="field">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com"
              onKeyDown={e => e.key === "Enter" && handleSubmit()} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
              onKeyDown={e => e.key === "Enter" && handleSubmit()} />
          </div>
          <button className="btn-glow" onClick={handleSubmit} disabled={loading} style={{ marginTop: 8 }}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── DASHBOARD ─────────────────────────── */
const Dashboard = ({ user }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("/dashboard/summary").then(d => { setSummary(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  // unwrap your backend's nested shape
const overview = summary?.data?.overview ?? summary?.overview ?? summary ?? {};
const recent = summary?.data?.recent ?? summary?.recent ?? summary?.recentTransactions ?? [];

const totalIncome = overview.totalIncome ?? 0;
const totalExpense = overview.totalExpense ?? 0;
const balance = overview.netBalance ?? overview.balance ?? (totalIncome - totalExpense);

const stats = summary ? [
  { label: "Total Income", value: fmt(totalIncome), icon: "📈", color: "var(--accent-green)", change: "+12.4%" },
  { label: "Total Expense", value: fmt(totalExpense), icon: "📉", color: "var(--accent-pink)", change: "+3.1%" },
  { label: "Net Balance", value: fmt(balance), icon: "💰", color: "var(--accent-cyan)", change: balance >= 0 ? "Positive" : "Negative" },
  { label: "Transactions", value: recent.length, icon: "🔄", color: "var(--accent-purple)", change: "This period" },
] : Array(4).fill(null);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Dashboard</div>
          <div className="page-subtitle">Financial overview · {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="glass stat-card">
            {s ? (
              <>
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
                <div className="stat-change" style={{ color: "var(--muted)" }}>{s.change}</div>
              </>
            ) : (
              <>
                <div className="skeleton" style={{ height: 12, width: "60%", marginBottom: 12 }} />
                <div className="skeleton" style={{ height: 36, width: "80%", marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 10, width: "40%" }} />
              </>
            )}
          </div>
        ))}
      </div>

      <div className="glass section-card">
        <div className="section-title">🕐 Recent Transactions</div>
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 44 }} />)}
          </div>
        ) : recent?.length ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Category</th><th>Type</th><th>Amount</th><th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((t, i) => (
                  <tr key={i}>
                    <td>{t.category}</td>
                    <td><span className={`badge badge-${t.type}`}>{t.type}</span></td>
                    <td className={`amount-${t.type}`}>{t.type === "expense" ? "−" : "+"}{fmt(t.amount)}</td>
                    <td style={{ color: "var(--muted)", fontSize: "0.82rem" }}>{t.notes || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty"><div className="empty-icon">📭</div><div>No recent transactions</div></div>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────── RECORDS PAGE ─────────────────────────── */
const RecordsPage = ({ user }) => {
  const isAdmin = user.role === "admin";
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ type: "", category: "", startDate: "", endDate: "" });
  const [showModal, setShowModal] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [form, setForm] = useState({ amount: "", type: "income", category: "", notes: "" });
  const [toast, setToast] = useState(null);
  const limit = 10;

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit, ...Object.fromEntries(Object.entries(filters).filter(([,v]) => v)) });
    try {
      const data = await api(`/records?${params}`);
      setRecords(Array.isArray(data) ? data : data.records || data.data || []);
    } catch { setRecords([]); } finally { setLoading(false); }
  }, [page, filters]);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setEditRecord(null); setForm({ amount: "", type: "income", category: "", notes: "" }); setShowModal(true); };
  const openEdit = (r) => { setEditRecord(r); setForm({ amount: r.amount, type: r.type, category: r.category, notes: r.notes }); setShowModal(true); };

  const save = async () => {
  if (!form.amount || !form.category) {
    setToast({ msg: "Amount and category are required", type: "error" });
    return;
  }
  try {
    const payload = {
      amount: Number(form.amount),
      type: form.type,
      category: form.category.trim(),
      notes: form.notes.trim(),
    };
    if (editRecord) {
      await api(`/records/${editRecord._id || editRecord.id}`, { method: "PUT", body: payload });
      setToast({ msg: "Record updated!", type: "success" });
    } else {
      await api("/records", { method: "POST", body: payload });
      setToast({ msg: "Record created!", type: "success" });
    }
    setShowModal(false);
    load();
  } catch (e) {
    setToast({ msg: e.message, type: "error" });
  }
};

  const del = async (r) => {
    if (!confirm("Delete this record?")) return;
    try { await api(`/records/${r.id || r._id}`, { method: "DELETE" }); load(); setToast({ msg: "Record deleted", type: "success" }); }
    catch (e) { setToast({ msg: e.message, type: "error" }); }
  };

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <div className="page-header">
        <div>
          <div className="page-title">Records</div>
          <div className="page-subtitle">All financial transactions</div>
        </div>
        {isAdmin && <button className="btn-glow" onClick={openCreate}>+ New Record</button>}
      </div>

      <div className="glass section-card">
        <div className="filter-bar">
          <div className="field">
            <label>Type</label>
            <select value={filters.type} onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}>
              <option value="">All</option><option value="income">Income</option><option value="expense">Expense</option>
            </select>
          </div>
          <div className="field">
            <label>Category</label>
            <input value={filters.category} onChange={e => setFilters(f => ({ ...f, category: e.target.value }))} placeholder="e.g. Salary" />
          </div>
          <div className="field">
            <label>From</label>
            <input type="date" value={filters.startDate} onChange={e => setFilters(f => ({ ...f, startDate: e.target.value }))} />
          </div>
          <div className="field">
            <label>To</label>
            <input type="date" value={filters.endDate} onChange={e => setFilters(f => ({ ...f, endDate: e.target.value }))} />
          </div>
          <button className="btn-ghost" onClick={() => { setFilters({ type:"",category:"",startDate:"",endDate:"" }); setPage(1); }}>Reset</button>
        </div>

        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: 50 }} />)}
          </div>
        ) : records.length ? (
          <>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Category</th><th>Type</th><th>Amount</th><th>Notes</th><th>Date</th>
                    {isAdmin && <th style={{ textAlign: "right" }}>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {records.map((r, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>{r.category}</td>
                      <td><span className={`badge badge-${r.type}`}>{r.type}</span></td>
                      <td className={`amount-${r.type}`}>{r.type === "expense" ? "−" : "+"}{fmt(r.amount)}</td>
                      <td style={{ color: "var(--muted)", fontSize: "0.82rem" }}>{r.notes || "—"}</td>
                      <td style={{ color: "var(--muted)", fontSize: "0.82rem" }}>{r.date ? new Date(r.date).toLocaleDateString() : "—"}</td>
                      {isAdmin && (
                        <td style={{ textAlign: "right" }}>
                          <button className="icon-btn" onClick={() => openEdit(r)} title="Edit">✏️</button>
                          <button className="icon-btn danger" onClick={() => del(r)} title="Delete">🗑️</button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination">
              <button className="page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
              <button className="page-btn active">{page}</button>
              <button className="page-btn" disabled={records.length < limit} onClick={() => setPage(p => p + 1)}>›</button>
            </div>
          </>
        ) : (
          <div className="empty"><div className="empty-icon">📂</div><div>No records found</div></div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="glass modal">
            <div className="modal-title">{editRecord ? "Edit Record" : "New Record"}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="field">
                <label>Amount</label>
                <input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="0.00" />
              </div>
              <div className="field">
                <label>Type</label>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                  <option value="income">Income</option><option value="expense">Expense</option>
                </select>
              </div>
              <div className="field">
                <label>Category</label>
                <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="e.g. Salary, Rent" />
              </div>
              <div className="field">
                <label>Notes</label>
                <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3} placeholder="Optional notes…" style={{ resize: "vertical", background: "rgba(255,255,255,0.06)", border: "1px solid var(--glass-border)", borderRadius: 12, color: "var(--text)", fontFamily: "var(--font-body)", fontSize: "0.9rem", padding: "12px 16px", outline: "none" }} />
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-glow" onClick={save}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────── USERS PAGE ─────────────────────────── */
const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "analyst" });
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api("/users");
      setUsers(Array.isArray(data) ? data : data.users || []);
    } catch { setUsers([]); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const create = async () => {
    try {
      await api("/users", { method: "POST", body: form });
      setShowModal(false); setForm({ name: "", email: "", password: "", role: "analyst" });
      load(); setToast({ msg: "User created!", type: "success" });
    } catch (e) { setToast({ msg: e.message, type: "error" }); }
  };

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <div className="page-header">
        <div>
          <div className="page-title">User Management</div>
          <div className="page-subtitle">Manage team members and roles</div>
        </div>
        <button className="btn-glow" onClick={() => setShowModal(true)}>+ Invite User</button>
      </div>

      <div className="glass section-card">
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 60 }} />)}
          </div>
        ) : users.length ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Name</th><th>Email</th><th>Role</th></tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div className="avatar" style={{ width: 30, height: 30, fontSize: "0.65rem" }}>{initials(u.name)}</div>
                        {u.name}
                      </div>
                    </td>
                    <td style={{ color: "var(--muted)" }}>{u.email}</td>
                    <td><span className={`badge badge-${u.role}`}>{u.role}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty"><div className="empty-icon">👥</div><div>No users yet</div></div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="glass modal">
            <div className="modal-title">Invite Team Member</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="field"><label>Name</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" /></div>
              <div className="field"><label>Email</label><input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@company.com" /></div>
              <div className="field"><label>Password</label><input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Temporary password" /></div>
              <div className="field">
                <label>Role</label>
                <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
                  <option value="analyst">Analyst</option><option value="viewer">Viewer</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-glow" onClick={create}>Create User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────── APP SHELL ─────────────────────────── */
const PAGES = {
  dashboard: { label: "Dashboard", icon: "⬡", roles: ["admin", "analyst"] },
  records: { label: "Records", icon: "◈", roles: ["admin", "analyst", "viewer"] },
  users: { label: "Users", icon: "◉", roles: ["admin"] },
};

export default function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  });
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token"); localStorage.removeItem("user"); setUser(null);
  };

  if (!user) return (
    <>
      <GlobalStyle />
      <div className="blob blob-1" /><div className="blob blob-2" /><div className="blob blob-3" /><div className="blob blob-4" />
      <LoginPage onLogin={u => { setUser(u); setPage("dashboard"); }} />
    </>
  );

  const allowedPages = Object.entries(PAGES).filter(([, v]) => v.roles.includes(user.role));

  return (
    <>
      <GlobalStyle />
      <div className="blob blob-1" /><div className="blob blob-2" /><div className="blob blob-3" /><div className="blob blob-4" />

      {/* Mobile menu */}
      <button className="glass mobile-menu-btn" onClick={() => setSidebarOpen(o => !o)}>☰</button>
      {sidebarOpen && <div style={{ position: "fixed", inset: 0, zIndex: 99 }} onClick={() => setSidebarOpen(false)} />}

      <div className="app-shell">
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="sidebar-logo">
            <div className="logo-icon">💎</div>
            <div className="logo-text">GLASSFI</div>
          </div>

          <nav className="sidebar-nav">
            {allowedPages.map(([key, { label, icon }]) => (
              <div key={key} className={`nav-item ${page === key ? "active" : ""}`}
                onClick={() => { setPage(key); setSidebarOpen(false); }}>
                <span className="nav-icon">{icon}</span>
                {label}
              </div>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="user-chip">
              <div className="avatar">{initials(user.name)}</div>
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-role">{user.role}</div>
              </div>
              <button className="icon-btn" onClick={logout} title="Logout" style={{ fontSize: "1rem" }}>⏻</button>
            </div>
          </div>
        </aside>

        <main className="main">
          {page === "dashboard" && <Dashboard user={user} />}
          {page === "records" && <RecordsPage user={user} />}
          {page === "users" && user.role === "admin" && <UsersPage />}
        </main>
      </div>
    </>
  );
}
