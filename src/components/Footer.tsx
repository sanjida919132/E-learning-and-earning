import React from 'react';
import { Logo } from './Logo';
import { PageView } from '../types/elearning';
import { MapPin, Phone, Mail, Globe, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Logo */}
          <div className="space-y-4">
            <Logo size="md" light={true} />
            <p className="text-xs text-slate-400 leading-relaxed">
              E-Learning and Earning Development Project (LEDP), Sirajganj Branch. An official skills and freelancing empowerment initiative by the ICT Division, Government of the People’s Republic of Bangladesh.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Govt. Approved Training Center</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Portal Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-emerald-400 transition-colors">
                  Main Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-emerald-400 transition-colors">
                  Freelancing Courses & Tracks
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('labs')} className="hover:text-emerald-400 transition-colors">
                  Two Dedicated Labs (Freelancing & AI Lab)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('batches')} className="hover:text-emerald-400 transition-colors">
                  Batch Schedules & Rosters
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('announcements')} className="hover:text-emerald-400 transition-colors">
                  Center Notices & Circulars
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: The 2 Labs Overview */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Sirajganj Lab Infrastructure (2 Labs)
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center justify-between">
                <span>Freelancing Lab:</span>
                <span className="text-emerald-400 font-medium">75 Seats</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Artificial Intelligence Lab:</span>
                <span className="text-purple-400 font-medium">25 Seats</span>
              </li>
              <li className="pt-1 text-[11px] text-slate-500">
                Total 100 Dedicated Workstations
              </li>
            </ul>
          </div>

          {/* Col 4: Sirajganj Center Contact */}
          <div className="space-y-2.5 text-xs text-slate-400">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Sirajganj Center Contact
            </h4>
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-slate-200">Hayder Complex (4th Floor), SB Fazlul Haque Road, Railgate, Sirajganj</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-mono text-slate-200">01332852680 - 01332852681</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-200">sirajganj.elel@gmail.com</span>
            </div>
            <div className="pt-2 text-[11px] text-slate-500">
              National Helpline: <strong className="text-white">333</strong> / ICT Helpdesk: <strong className="text-white">16122</strong>
            </div>
          </div>
        </div>

        {/* Official Sirajganj Center Location & Map Banner Card */}
        <div className="mt-8 p-3 sm:p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="w-full sm:w-48 h-28 rounded-xl overflow-hidden border border-emerald-500/30 shrink-0 bg-slate-950">
              <img 
                src="/assets/aistudio/image_41da00d0.png" 
                alt="Sirajganj Center Map Location - Hayder Complex, Railgate"
                className="w-full h-full object-cover object-center" 
              />
            </div>
            <div className="text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <h5 className="text-base font-bold text-white">Sirajganj Center Campus</h5>
              </div>
              <p className="text-xs text-slate-300 flex items-center justify-center sm:justify-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Hayder Complex (4th Floor), SB Fazlul Haque Road, Railgate, Sirajganj</span>
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-400 pt-0.5">
                <span className="flex items-center gap-1 font-mono text-emerald-300">
                  <Phone className="w-3 h-3 text-emerald-400" />
                  01332852680 - 01332852681
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Mail className="w-3 h-3 text-emerald-400" />
                  sirajganj.elel@gmail.com
                </span>
              </div>
            </div>
          </div>

          <a 
            href="https://maps.google.com/?q=Hayder+Complex+SB+Fazlul+Haque+Road+Railgate+Sirajganj" 
            target="_blank" 
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shrink-0 flex items-center space-x-1.5 shadow-sm"
          >
            <span>View on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>
            © {new Date().getFullYear()} E-Learning and Earning, Sirajganj Branch. All rights reserved. ICT Division, Government of Bangladesh.
          </p>
          <div className="flex items-center space-x-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
