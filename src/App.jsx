import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useMe } from './components/useMe.js'
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
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'

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

function initials(member) {
  const name = (member?.name || '').trim()
  if (name) {
    const parts = name.split(/\s+/).filter(Boolean)
    const a = parts[0]?.[0] || 'U'
    const b = parts.length > 1 ? parts[parts.length - 1][0] : ''
    return (a + b).toUpperCase()
  }
  const email = String(member?.email || '')
  return (email[0] || 'U').toUpperCase()
}

export default function App() {
  const nav = useNavigate()
  const { member, refresh, setMember } = useMe()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function onDocClick(e) {
      if (!menuRef.current) return
      if (!menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  async function logout() {
    try {
      await fetch('/auth/logout', { method: 'POST', credentials: 'include' })
    } finally {
      setMenuOpen(false)
      setMember(null)
      // ensure session cleared
      refresh()
      nav('/')
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
              <TopNavLink to="/community">COMMUNITY</TopNavLink>
              <TopNavLink to="/labs">LABS</TopNavLink>
              <TopNavLink to="/ocala">OCALA</TopNavLink>
              <TopNavLink to="/manifesto">MANIFESTO</TopNavLink>
              <TopNavLink to="/sponsors">SPONSORS</TopNavLink>
              <TopNavLink to="/podcast">PODCAST</TopNavLink>
              <TopNavLink to="/blog">BLOG</TopNavLink>
            </nav>

            {!member ? (
              <Link
                className="font-['Space_Grotesk'] font-bold uppercase tracking-wider text-[11px] text-cyan-400 border-2 border-cyan-400 px-4 py-2 hover:bg-cyan-400 hover:text-black active:translate-y-0.5 active:shadow-none transition-all shrink-0"
                to="/login"
              >
                LOGIN
              </Link>
            ) : (
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  className="h-9 w-9 rounded-full border-2 border-cyan-400 text-cyan-300 font-mono text-xs grid place-items-center hover:bg-cyan-400 hover:text-black transition-colors"
                  aria-label="User menu"
                >
                  {initials(member)}
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-zinc-950 border border-zinc-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-3">
                    <div className="text-zinc-200 font-['Space_Grotesk'] font-bold uppercase text-xs tracking-wider">
                      {member.name || 'Member'}
                    </div>
                    <div className="text-zinc-500 text-xs mt-1 break-all">{member.email}</div>
                    <div className="h-px bg-zinc-800 my-3" />
                    <button
                      type="button"
                      onClick={logout}
                      className="w-full text-left font-mono text-sm text-zinc-300 hover:text-cyan-400"
                    >
                      / LOG OUT
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/community" element={<Community />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/ocala" element={<Ocala />} />
            <Route path="/manifesto" element={<Manifesto />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
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
          <a className="flex flex-col items-center justify-center text-zinc-500 p-2 hover:text-cyan-300 active:scale-95 transition-all duration-75" href="/community">
            <span className="material-symbols-outlined">hub</span>
            <span className="font-['Space_Grotesk'] font-medium text-[10px] uppercase tracking-tighter">COMMUNITY</span>
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
