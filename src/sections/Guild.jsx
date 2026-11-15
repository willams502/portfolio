import { useState } from 'react';
import { Mail, MessageSquare, Copy, Check, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import HoneyBadger from '../components/HoneyBadger';
import { HUNTER } from '../data/portfolioData';
import { useGame } from '../game/GameContext';
import { sfx } from '../utils/audio';

export default function Guild() {
  const { unlock, say } = useGame();
  const [guild, setGuild] = useState('');
  const [role, setRole] = useState('');
  const [copied, setCopied] = useState(false);
  const c = HUNTER.contacts;

  const recruit = () => { sfx.playClick(); unlock('recruiter'); };

  const inviteText = encodeURIComponent(
    `Olá Matheus! Vi seu portfólio (Texugo do Mel 🦡).\n` +
    `A guilda *${guild || 'minha empresa'}* gostaria de te recrutar` +
    (role ? ` para: ${role}.` : '.') +
    `\nPodemos conversar?`
  );

  const copyEmail = () => {
    navigator.clipboard.writeText(c.email);
    setCopied(true);
    recruit();
    say('Copiado! Agora manda o e-mail, vai. 📨');
    setTimeout(() => setCopied(false), 1800);
  };

  const channels = [
    { label: 'WhatsApp', value: c.whatsappDisplay, href: `https://wa.me/${c.whatsapp}`, Icon: MessageSquare, color: 'hover:border-emerald-400 text-emerald-300' },
    { label: 'LinkedIn', value: 'in/matheuswillams', href: c.linkedin, Icon: LinkedinIcon, color: 'hover:border-sky-400 text-sky-300' },
    { label: 'GitHub', value: '@willams502', href: c.github, Icon: GithubIcon, color: 'hover:border-purple-300 text-purple-200' },
  ];

  return (
    <section className="grid lg:grid-cols-5 gap-6">
      {/* convite */}
      <div className="lg:col-span-3 sys-window p-6 sm:p-8 anim-pop">
        <div className="flex items-center justify-center gap-3">
          <span className="w-6 h-6 grid place-items-center border-2 border-orange-200 text-orange-100 font-bold text-sm">!</span>
          <span className="sys-title text-orange-100">CONVITE DE GUILDA</span>
        </div>
        <p className="text-center text-orange-100/90 mt-3">
          Um Texugo do Mel Rank S está disponível para recrutamento.<br />
          Preencha o convite e envie direto para ele.
        </p>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="font-code text-xs text-orange-300">NOME DA GUILDA (sua empresa)</span>
            <input
              value={guild}
              onChange={(e) => setGuild(e.target.value)}
              placeholder="Ex.: Guilda Bonfire Tech LTDA"
              className="mt-1 w-full bg-black/50 border border-orange-800/80 focus:border-orange-300 focus:outline-none px-3 py-2.5 text-white placeholder:text-orange-900/80 font-code text-sm"
            />
          </label>
          <label className="block">
            <span className="font-code text-xs text-orange-300">MISSÃO (vaga ou projeto)</span>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Ex.: Dev Full-Stack PHP/Laravel"
              className="mt-1 w-full bg-black/50 border border-orange-800/80 focus:border-orange-300 focus:outline-none px-3 py-2.5 text-white placeholder:text-orange-900/80 font-code text-sm"
            />
          </label>
        </div>

        <a
          href={`https://wa.me/${c.whatsapp}?text=${inviteText}`}
          target="_blank" rel="noopener noreferrer"
          onClick={recruit}
          className="mt-6 flex items-center justify-center gap-2 w-full py-3.5 bg-orange-600 hover:bg-orange-500 border border-orange-200 text-white font-system font-bold tracking-[0.2em] shadow-[0_0_25px_rgba(249,115,22,0.7)]"
        >
          <Send className="w-4 h-4" /> ENVIAR CONVITE
        </a>
        <p className="text-center font-code text-[11px] text-orange-400/80 mt-2">abre o WhatsApp com a mensagem pronta</p>
      </div>

      {/* canais */}
      <div className="lg:col-span-2 space-y-3">
        {channels.map(({ label, value, href, Icon, color }, i) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" onClick={recruit}
            className={`sys-window p-4 flex items-center gap-4 transition anim-pop ${color}`}
            style={{ animationDelay: `${0.08 * (i + 1)}s` }}>
            <Icon className="w-6 h-6" />
            <div>
              <div className="font-system font-bold text-white">{label}</div>
              <div className="font-code text-xs opacity-80">{value}</div>
            </div>
            <span className="ml-auto font-code text-xs opacity-70">▸</span>
          </a>
        ))}

        <button onClick={copyEmail} className="w-full sys-window p-4 flex items-center gap-4 text-rose-300 hover:brightness-125 transition anim-pop cursor-pointer text-left" style={{ animationDelay: '0.32s' }}>
          <Mail className="w-6 h-6" />
          <div className="min-w-0">
            <div className="font-system font-bold text-white">E-mail</div>
            <div className="font-code text-xs opacity-80 truncate">{c.email}</div>
          </div>
          <span className="ml-auto">{copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}</span>
        </button>

        <div className="sys-window p-4 flex items-center gap-3 anim-pop" style={{ animationDelay: '0.4s' }}>
          <HoneyBadger className="w-14 h-14 shrink-0" />
          <p className="text-sm text-orange-100 italic">"Ele responde rápido. Mais rápido que um Texugo do Mel atrás de bug."</p>
        </div>
      </div>
    </section>
  );
}

