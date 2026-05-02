import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Labs from './pages/Labs.jsx'
import Events from './pages/Events.jsx'
import Community from './pages/Community.jsx'
import Manifesto from './pages/Manifesto.jsx'
import Ocala from './pages/Ocala.jsx'
import Sponsors from './pages/Sponsors.jsx'
import Podcast from './pages/Podcast.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Account from './pages/Account.jsx'
import Admin from './pages/Admin.jsx'
import Login from './pages/Login.jsx'

function TopNavLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "font-['Space_Grotesk'] font-bold uppercase tracking-wider text-[11px] px-1.5 py-1 transition-colors duration-150",
          isActive
            ? 'text-cyan-400 border-b-2 border-cyan-400'
            : 'text-zinc-500 hover:bg-cyan-400 hover:text-black'
        ].join(' ')
      }
      end
    >
      {children}
    </NavLink>
  )
}

export default function App() {
  const navigate = useNavigate()
  const [member, setMember] = useState(null)
  const [loadingMember, setLoadingMember] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  async function loadMember() {
    setLoadingMember(true)
    try {
      const res = await fetch('/api/me', { credentials: 'include', cache: 'no-store' })
      const data = await res.json()
      if (res.ok && data?.ok) {
        setMember(data.member || null)
      } else {
        setMember(null)
      }
    } catch {
      setMember(null)
    } finally {
      setLoadingMember(false)
    }
  }

  useEffect(() => {
    loadMember()
  }, [])

  const initials = useMemo(() => {
    if (!member?.name && !member?.email) return 'U'
    const source = String(member.name || member.email).trim()
    const parts = source.split(/\s+/).filter(Boolean)
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }, [member])

  async function logout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include', cache: 'no-store' })
    } finally {
      setMenuOpen(false)
      setMember(null)
      navigate('/login')
      loadMember()
    }
  }

  return (
    <div className="dark">
      <div className="bg-[#131313] text-zinc-100 font-['Inter'] min-h-screen pb-24 md:pb-0">
        <header className="bg-zinc-950 border-b-2 border-zinc-800 sticky top-0 z-50 shadow-[inset_0_-1px_0_0_#00F0FF22]">
          <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img
                alt="Brick City Tech Logo"
                className="h-10 w-10 object-contain brightness-110 shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                src={`${import.meta.env.BASE_URL}brand/bct-stitch-logo.png`}
              />
              <h1 className="text-lg lg:text-xl font-black italic tracking-tighter text-cyan-400 font-['Space_Grotesk']">BRICK CITY TECH</h1>
            </Link>

            <nav className="hidden md:flex gap-3 lg:gap-5 items-center">
              <TopNavLink to="/">HOME</TopNavLink>
              <TopNavLink to="/events">EVENTS</TopNavLink>
              <TopNavLink to="/labs">LABS</TopNavLink>
              <TopNavLink to="/ocala">OCALA</TopNavLink>
              <TopNavLink to="/manifesto">MANIFESTO</TopNavLink>
              <TopNavLink to="/sponsors">SPONSORS</TopNavLink>
              <TopNavLink to="/podcast">PODCAST</TopNavLink>
              <TopNavLink to="/blog">BLOG</TopNavLink>
            </nav>

            {loadingMember ? (
              <div className="text-zinc-500 font-mono text-xs uppercase">...</div>
            ) : member ? (
              <div className="relative shrink-0">
                <button
                  className="h-10 w-10 rounded-full border-2 border-cyan-400 text-cyan-400 font-['Space_Grotesk'] font-bold"
                  onClick={() => setMenuOpen((v) => !v)}
                  type="button"
                >
                  {initials}
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-zinc-950 border border-zinc-800 p-3 shadow-xl">
                    <div className="text-zinc-200 text-sm font-semibold truncate">{member.name || 'Member'}</div>
                    <div className="text-zinc-400 text-xs font-mono truncate">{member.email}</div>
                    <div className="mt-1 text-[10px] uppercase font-mono text-cyan-400">
                      {member.is_admin ? 'Admin' : 'Member'}
                    </div>
                    <div className="mt-3 border-t border-zinc-800 pt-3 flex flex-col gap-2">
                      <Link className="text-sm text-zinc-300 hover:text-cyan-400" onClick={() => setMenuOpen(false)} to="/account">
                        Account
                      </Link>
                      {member.is_admin && (
                        <Link className="text-sm text-zinc-300 hover:text-cyan-400" onClick={() => setMenuOpen(false)} to="/admin">
                          Admin Settings
                        </Link>
                      )}
                      <button className="text-left text-sm text-zinc-300 hover:text-cyan-400" onClick={logout} type="button">
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a
                className="font-['Space_Grotesk'] font-bold uppercase tracking-wider text-[11px] text-cyan-400 border-2 border-cyan-400 px-4 py-2 hover:bg-cyan-400 hover:text-black active:translate-y-0.5 active:shadow-none transition-all shrink-0"
                href="/login"
              >
                LOGIN
              </a>
            )}
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12">
          <Routes>
            <Route path="/" element={member ? <Community /> : <Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/community" element={member ? <Community /> : <Home />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/ocala" element={<Ocala />} />
            <Route path="/manifesto" element={<Manifesto />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/login" element={<Login onAuthSuccess={loadMember} />} />
            <Route path="/account" element={<Account member={member} />} />
            <Route path="/admin" element={<Admin member={member} />} />
          </Routes>
        </main>

        <footer className="bg-zinc-950 border-t-2 border-zinc-800 py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <h2 className="text-2xl font-black italic tracking-tighter text-cyan-400 font-['Space_Grotesk'] mb-2">BRICK CITY TECH</h2>
              <p className="font-mono text-xs text-zinc-500 uppercase">Makers &amp; Builders Collective // Based at Powerplant Incubator</p>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-4">
              <a className="text-zinc-400 hover:text-cyan-400 font-mono text-sm" href="#">/ TWITTER</a>
              <a className="text-zinc-400 hover:text-cyan-400 font-mono text-sm" href="#">/ GITHUB</a>
              <a className="text-zinc-400 hover:text-cyan-400 font-mono text-sm" href="#">/ DISCORD</a>
              <a className="text-zinc-400 hover:text-cyan-400 font-mono text-sm" href="#">/ LINKEDIN</a>
            </div>
            <div className="bg-zinc-900 p-4 border border-zinc-800 text-[10px] font-mono text-zinc-600">
              COLLECTIVE_ID: BCT_PR_2026<br />
              BASE: POWERPLANT_OCALA<br />
              LICENSE: COMMUNITY
            </div>
          </div>
        </footer>

        <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2 bg-zinc-950 border-t-2 border-zinc-800 z-50 backdrop-blur-md">
          <a className="flex flex-col items-center justify-center bg-cyan-400 text-black p-2 scale-105 transition-transform" href="/">
            <span className="material-symbols-outlined">home</span>
            <span className="font-['Space_Grotesk'] font-medium text-[10px] uppercase tracking-tighter">HOME</span>
          </a>
          <a className="flex flex-col items-center justify-center text-zinc-500 p-2 hover:text-cyan-300 active:scale-95 transition-all duration-75" href="/events">
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="font-['Space_Grotesk'] font-medium text-[10px] uppercase tracking-tighter">EVENTS</span>
          </a>
          <a className="flex flex-col items-center justify-center text-zinc-500 p-2 hover:text-cyan-300 active:scale-95 transition-all duration-75" href="/labs">
            <span className="material-symbols-outlined">terminal</span>
            <span className="font-['Space_Grotesk'] font-medium text-[10px] uppercase tracking-tighter">LABS</span>
          </a>
          <a className="flex flex-col items-center justify-center text-zinc-500 p-2 hover:text-cyan-300 active:scale-95 transition-all duration-75" href="/podcast">
            <span className="material-symbols-outlined">mic</span>
            <span className="font-['Space_Grotesk'] font-medium text-[10px] uppercase tracking-tighter">PODCAST</span>
          </a>
        </nav>
      </div>
    </div>
  )
}
