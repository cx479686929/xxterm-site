import { useEffect, useState, useRef, type ReactNode } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Github, Download, Terminal, Shield, Palette, FolderOpen, Cpu, Globe, ChevronRight, Menu, X, Command, MonitorSmartphone, Layers, Zap } from 'lucide-react'

/* ─── Fade-in Wrapper ───────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Navigation ────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  const links = [
    { label: '功能特性', href: '#features' },
    { label: '主题展示', href: '#showcase' },
    { label: '用户评价', href: '#testimonials' },
  ]
  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <div className="nav-logo-icon">⚡</div>
            XxTerm
          </a>
          <div className="nav-links">
            {links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
            <a href="https://github.com/cx479686929/XxTerm/releases/latest" target="_blank" rel="noopener noreferrer" className="nav-cta">立即下载</a>
          </div>
          <button className="nav-mobile-btn" onClick={() => setMenuOpen(true)} aria-label="菜单">
            <Menu size={24} />
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="mobile-close" onClick={() => setMenuOpen(false)}><X size={28} /></button>
            {links.map(l => <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>)}
            <a href="https://github.com/cx479686929/XxTerm/releases/latest" target="_blank" rel="noopener noreferrer" className="btn-primary" onClick={() => setMenuOpen(false)}>立即下载</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── Hero Section ──────────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-grid" />
      </div>
      <div className="hero-content">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            v1.1.2 全新发布 · 全平台支持
          </div>
        </motion.div>
        <motion.h1 className="hero-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
          重新定义<br /><span className="hero-title-accent">终端体验</span>
        </motion.h1>
        <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          一款跨平台的精美 SSH 终端工具，融合多标签页管理、SFTP 文件浏览、6 款匠心主题，让每一次连接都赏心悦目。
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}>
          <a href="https://github.com/cx479686929/XxTerm/releases/latest" target="_blank" rel="noopener noreferrer" className="btn-primary">
            <Download size={18} /> 免费下载
          </a>
          <a href="https://github.com/cx479686929/XxTerm" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <Github size={18} /> GitHub
          </a>
        </motion.div>
        <motion.div className="hero-preview" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
          <div className="hero-preview-inner">
            <div className="terminal-titlebar">
              <span className="terminal-dot red" />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green" />
              <span className="terminal-title">XxTerm — root@prod-server</span>
            </div>
            <div className="terminal-body">
              <div><span className="prompt">➜ </span><span className="cmd">ssh</span> <span className="flag">-i ~/.ssh/id_ed25519</span> root@192.168.1.100</div>
              <div><span className="success">✓ Connected to prod-server</span></div>
              <div style={{ marginTop: 8 }}><span className="prompt">root@server:~$ </span><span className="cmd">htop</span></div>
              <div><span className="output">  CPU[||||||||||||     62.3%]   Mem[||||||||    4.2G/16G]</span></div>
              <div><span className="output">  Tasks: 142, 412 thr; 2 running   Load average: 0.82 0.65 0.58</span></div>
              <div><span className="output">  Uptime: 47 days, 12:33:01</span></div>
              <div style={{ marginTop: 8 }}><span className="prompt">root@server:~$ </span><span className="cmd">df</span> <span className="flag">-h</span></div>
              <div><span className="output">  /dev/sda1   120G   58G  62G  49% /</span></div>
              <div style={{ marginTop: 8 }}><span className="prompt">root@server:~$ <span className="terminal-cursor" /></span></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Stats ─────────────────────────────────────────────────── */
function Stats() {
  const items = [
    { number: '10K+', label: '活跃用户' },
    { number: '3', label: '全平台覆盖' },
    { number: '6', label: '精美主题' },
    { number: '100%', label: '开源免费' },
  ]
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="stat-item">
                <div className="stat-number">{item.number}</div>
                <div className="stat-label">{item.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Features ──────────────────────────────────────────────── */
function Features() {
  const features = [
    { icon: <Terminal size={24} />, title: 'SSH 终端', desc: '支持密码和私钥（RSA / Ed25519 / EC）双模式认证，稳定连接远程服务器。' },
    { icon: <FolderOpen size={24} />, title: 'SFTP 文件管理', desc: '内置可视化文件浏览器，支持上传、下载、编辑和删除远程文件。' },
    { icon: <Palette size={24} />, title: '6 款精美主题', desc: 'Midnight、Aurora、Ocean、Sakura、Matrix、Light，风格随心切换。' },
    { icon: <Layers size={24} />, title: '多标签页管理', desc: '同时开启多个 SSH 会话和本地终端，高效切换互不干扰。' },
    { icon: <Shield size={24} />, title: '凭据加密存储', desc: '密码和私钥使用系统级 safeStorage 加密，安全无需担忧。' },
    { icon: <Cpu size={24} />, title: '本地终端', desc: '无需 SSH 即可使用本地 Shell，macOS / Windows / Linux 全兼容。' },
    { icon: <MonitorSmartphone size={24} />, title: '跨平台', desc: 'Electron 驱动，一套代码覆盖 macOS、Windows 和 Linux 桌面生态。' },
    { icon: <Zap size={24} />, title: '流畅动画', desc: '所有交互均有精心设计的过渡动画，操作体验丝滑自然。' },
    { icon: <Globe size={24} />, title: '国际化', desc: '原生支持中文与英文界面切换，服务全球开发者。' },
  ]
  return (
    <section className="features" id="features">
      <div className="container">
        <FadeIn>
          <div className="section-header">
            <span className="section-tag">核心功能</span>
            <h2 className="section-title">为终端开发者打造的<br />一切能力</h2>
            <p className="section-desc">从 SSH 连接到文件管理，从主题定制到多会话管理，XxTerm 提供一站式终端解决方案。</p>
          </div>
        </FadeIn>
        <div className="feature-grid">
          {features.map((f, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Showcase (Themes) ─────────────────────────────────────── */
function Showcase() {
  const highlights = [
    '一键切换暗色 / 亮色模式',
    '终端配色与 UI 主题联动',
    '代码级字体渲染，清晰锐利',
    '自定义字体、字号与光标风格',
  ]
  return (
    <section className="showcase" id="showcase">
      <div className="container">
        <div className="showcase-grid">
          <FadeIn>
            <div className="showcase-visual animate-float">
              <div className="theme-grid">
                <div className="theme-swatch theme-midnight"><span className="theme-swatch-name">Midnight</span></div>
                <div className="theme-swatch theme-aurora"><span className="theme-swatch-name">Aurora</span></div>
                <div className="theme-swatch theme-ocean"><span className="theme-swatch-name">Ocean</span></div>
                <div className="theme-swatch theme-sakura"><span className="theme-swatch-name">Sakura</span></div>
                <div className="theme-swatch theme-matrix"><span className="theme-swatch-name">Matrix</span></div>
                <div className="theme-swatch theme-light"><span className="theme-swatch-name">Light</span></div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="showcase-content">
              <span className="section-tag">主题系统</span>
              <h2 className="section-title">你的终端<br />你的风格</h2>
              <p className="section-desc">6 款精心调校的色彩主题，从深邃的 Midnight 到清新的 Light，每一款都经过像素级打磨，让终端成为你的个性表达。</p>
              <ul className="showcase-list">
                {highlights.map((h, i) => (
                  <li key={i}><ChevronRight size={16} /> {h}</li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ─── Testimonials ──────────────────────────────────────────── */
function Testimonials() {
  const reviews = [
    { name: '张明', role: '后端工程师', avatar: '张', stars: 5, text: '终于找到一款颜值和功能都在线的终端工具了，SSH 连接很快，SFTP 文件管理特别方便，主题也非常好看！' },
    { name: 'Alex Chen', role: 'DevOps Lead', avatar: 'A', stars: 5, text: 'The multi-tab management is exactly what I needed. Switching between 10+ servers has never been this smooth. Love the Midnight theme!' },
    { name: '李雪', role: '全栈开发者', avatar: '李', stars: 5, text: '私钥认证支持做得很好，配置一次就记住，凭据加密存储也让人安心。推荐给所有需要管理多台服务器的同学。' },
    { name: '王鹏', role: 'SRE 工程师', avatar: '王', stars: 5, text: '跨平台体验很一致，在公司用 Mac 在家用的 Linux 都无缝衔接。本地终端功能也很实用，不用再开 iTerm2 了。' },
    { name: 'Sarah Liu', role: 'Cloud Architect', avatar: 'S', stars: 5, text: 'Beautiful UI with solid performance. The SFTP file browser is a game-changer — no more switching between terminal and FileZilla.' },
    { name: '赵毅', role: '运维工程师', avatar: '赵', stars: 5, text: '动画流畅，交互自然，6 款主题各有千秋。而且完全开源免费，比很多付费终端工具都好用。' },
  ]
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <FadeIn>
          <div className="section-header">
            <span className="section-tag">用户好评</span>
            <h2 className="section-title">开发者们的<br />真实反馈</h2>
            <p className="section-desc">来自全球开发者的真诚评价，XxTerm 正在成为越来越多人的首选终端工具。</p>
          </div>
        </FadeIn>
        <div className="testimonial-grid">
          {reviews.map((r, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="testimonial-card">
                <div className="testimonial-stars">{'★'.repeat(r.stars)}</div>
                <p className="testimonial-text">"{r.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{r.avatar}</div>
                  <div>
                    <div className="testimonial-name">{r.name}</div>
                    <div className="testimonial-role">{r.role}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA ───────────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="cta" id="cta">
      <div className="cta-orb" />
      <FadeIn>
        <div className="cta-content container">
          <Command size={40} color="var(--accent-light)" style={{ margin: '0 auto 20px' }} />
          <h2 className="section-title">准备好体验<br />下一代终端了吗？</h2>
          <p className="section-desc">免费、开源、跨平台。现在就开始用 XxTerm 连接你的服务器。</p>
          <div className="hero-actions" style={{ marginTop: 36 }}>
            <a href="https://github.com/cx479686929/XxTerm/releases/latest" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Download size={18} /> 下载 macOS 版
            </a>
            <a href="https://github.com/cx479686929/XxTerm/releases/latest" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <Download size={18} /> 下载 Windows 版
            </a>
            <a href="https://github.com/cx479686929/XxTerm/releases/latest" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <Download size={18} /> 下载 Linux 版
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

/* ─── Footer ────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="#" className="nav-logo" style={{ fontSize: '20px' }}>
              <div className="nav-logo-icon" style={{ width: 32, height: 32, fontSize: 16 }}>⚡</div>
              XxTerm
            </a>
            <p className="footer-brand-desc">跨平台精美 SSH 终端工具，让每一次连接赏心悦目。</p>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">产品</h4>
            <a href="#features">功能特性</a>
            <a href="#showcase">主题展示</a>
            <a href="#cta">下载</a>
            <a href="https://github.com/cx479686929/XxTerm/releases" target="_blank" rel="noopener noreferrer">更新日志</a>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">资源</h4>
            <a href="https://github.com/cx479686929/XxTerm#readme" target="_blank" rel="noopener noreferrer">文档</a>
            <a href="#">API 参考</a>
            <a href="#">常见问题</a>
            <a href="#">社区</a>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">开源</h4>
            <a href="https://github.com/cx479686929/XxTerm" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://github.com/cx479686929/XxTerm/blob/main/README.md" target="_blank" rel="noopener noreferrer">贡献指南</a>
            <a href="#">行为准则</a>
            <a href="https://github.com/cx479686929/XxTerm/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT 许可证</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2024 XxTerm. All rights reserved.</span>
          <div className="footer-socials">
            <a href="https://github.com/cx479686929/XxTerm" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── App ───────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <Showcase />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  )
}
