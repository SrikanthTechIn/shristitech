import React, { useState } from 'react';
import { X, Shield, FileText, Check } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: 'privacy' | 'terms';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'privacy',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'privacy'
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>

            <button
              onClick={() => setActiveTab('terms')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'terms'
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms of Use</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-slate-600 leading-relaxed">
          {activeTab === 'privacy' ? (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-display font-bold text-slate-900">Privacy Policy</h3>
                <p className="text-slate-500 mt-1">
                  How Shristi Tech handles information submitted through this website, utility apps, and communication channels.
                </p>
                <div className="text-[11px] font-mono text-slate-400 mt-1">Last updated: 24 September 2026</div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-900">
                <strong>Privacy at a glance:</strong> Shristi Tech respects your privacy. You can browse this website and use our in-house utility apps without creating accounts or submitting mandatory personal data.
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">1. Information you may provide</h4>
                <p>
                  You may voluntarily share your name, email address, phone number, business category, and project requirements when contacting Shristi Tech. These details are used solely to assess your project requirements and communicate directly with you.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">2. How the website sends requirements</h4>
                <p>
                  The project requirement forms on this website prepare messages sent directly via your device's email client to <strong>Srikanth12231@gmail.com</strong> or via WhatsApp. The website does not sell, lease, or distribute your contact details to third-party brokers.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">3. AG TV Remote and Utility App Privacy</h4>
                <p>
                  The AG TV Remote utility application communicates locally with compatible Smart TVs over your private Wi-Fi network (via mDNS and local WebSockets). It does not transmit keystrokes, viewing logs, or personal identity records to external cloud trackers.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">4. Direct Contact</h4>
                <p>
                  For any privacy inquiries or data removal requests, email{' '}
                  <a href="mailto:Srikanth12231@gmail.com" className="text-blue-600 font-semibold underline">
                    Srikanth12231@gmail.com
                  </a>.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-display font-bold text-slate-900">Terms of Use</h3>
                <p className="text-slate-500 mt-1">
                  Terms governing use of the Shristi Tech website, utility products, and freelance consulting engagements.
                </p>
                <div className="text-[11px] font-mono text-slate-400 mt-1">Last updated: 24 September 2026</div>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">1. About Shristi Tech</h4>
                <p>
                  Shristi Tech is an independent digital product and automation studio founded by Srikanth, focusing on custom mobile and web applications, AI-assisted development, n8n workflow automations, utility tools, and casual game development.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">2. AG TV Remote Compatibility Note</h4>
                <p>
                  AG TV Remote is designed to control compatible Smart TVs (Google TV, Android TV, Samsung Tizen, LG webOS, Fire OS). Because TV manufacturers periodically update firmware and network authentication protocols, functionality may vary by model and operating system version.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">3. Custom Development Engagements</h4>
                <p>
                  Submitting a scope inquiry or using the interactive scope estimator does not constitute a binding contract. Precise scope, milestones, deliverables, pricing, and IP transfer terms are formalized through individual client service agreements.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">4. AI-Assisted Engineering</h4>
                <p>
                  Shristi Tech leverages modern AI models during ideation, prototype drafting, automated testing, and asset styling. All deliverables undergo senior human code review and engineering validation prior to client handover.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">5. Governing Law</h4>
                <p>
                  These terms are governed by the applicable laws of India, with disputes subject to appropriate jurisdictional courts in India.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">© 2026 Shristi Tech. All rights reserved.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
