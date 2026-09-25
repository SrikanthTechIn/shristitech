import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, Send, CheckCircle, Clock, ShieldCheck, Copy, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: 'Startup',
    category: 'Custom App Development',
    requirements: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Project Requirement: ${formData.category} (${formData.name})`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone/WhatsApp: ${formData.phone}\n` +
      `Business Type: ${formData.businessType}\n` +
      `Project Category: ${formData.category}\n\n` +
      `Detailed Requirements:\n${formData.requirements}\n\n` +
      `Sent via Shristi Tech Website`
    );

    // Open mail client
    window.location.href = `mailto:Srikanth12231@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleCopyScope = () => {
    const text =
      `Project Requirement for Shristi Tech:\n` +
      `Name: ${formData.name || 'Not specified'}\n` +
      `Category: ${formData.category}\n` +
      `Type: ${formData.businessType}\n` +
      `Phone: ${formData.phone}\n` +
      `Requirements:\n${formData.requirements || 'Pending discussion'}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppDirect = () => {
    const message = encodeURIComponent(
      `Hi Srikanth! My name is ${formData.name || 'a prospective client'}. I would like to discuss a project with Shristi Tech regarding: ${formData.category}. ${formData.requirements ? `Requirements summary: ${formData.requirements}` : ''}`
    );
    window.open(`https://wa.me/917013707890?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-slate-100 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Founder Contacts (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 uppercase tracking-wider mb-2">
                <span>Direct Founder Consultation</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
                Let's Build Your Idea Into Working Software
              </h2>
              <p className="text-base text-slate-600 mt-3 leading-relaxed">
                Whether you need a custom mobile app, a smart AI automation agent for your business, or an engaging indie game prototype — share your requirements and get a detailed response within 24 hours.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              <a
                href="https://wa.me/917013707890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-sm transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-emerald-700 font-bold uppercase">WhatsApp Quick Chat</div>
                  <div className="text-base font-bold text-slate-900">+91 70137 07890</div>
                  <div className="text-xs text-slate-500">Fastest response for initial queries & scope talks</div>
                </div>
              </a>

              <a
                href="mailto:Srikanth12231@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-blue-700 font-bold uppercase">Official Founder Email</div>
                  <div className="text-base font-bold text-slate-900">Srikanth12231@gmail.com</div>
                  <div className="text-xs text-slate-500">Send RFP documents, specs, and wireframes</div>
                </div>
              </a>
            </div>

            {/* Trust commitments */}
            <div className="p-5 rounded-xl bg-blue-50/60 border border-blue-100 space-y-3 text-xs text-slate-700">
              <div className="flex items-center gap-2 font-bold text-blue-900">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Guaranteed Response within 1 Business Day</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We review every requirement carefully, offer honest feasibility advice, and provide a clear timeline estimate. No pushy sales calls.
              </p>
              <div className="flex items-center gap-2 text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Confidentiality assured: NDAs signed on request</span>
              </div>
            </div>
          </div>

          {/* Right Column: Requirement Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-9 border border-slate-200 shadow-xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="font-display font-bold text-xl text-slate-900">Send Project Requirement</h3>
                <p className="text-xs text-slate-500 mt-0.5">Fill this quick brief to get an actionable proposal.</p>
              </div>
              <span className="text-[11px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
                ● Active Inquiries Open
              </span>
            </div>

            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-xs text-emerald-800">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Opening your mail client...</div>
                  <p className="mt-0.5 text-emerald-700">
                    If your email client didn't open automatically, you can also send the requirements directly via WhatsApp below.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ramesh@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Business / Sector *
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  >
                    <option>Startup / New Product</option>
                    <option>Local Retail / Wholesale</option>
                    <option>Clinic / Healthcare</option>
                    <option>Restaurant / Food Service</option>
                    <option>Education / EdTech</option>
                    <option>Logistics / Distribution</option>
                    <option>Individual Creator / Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Project Domain *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                >
                  <option>Custom Mobile App (Android / iOS)</option>
                  <option>AI Agent & Work Automation (WhatsApp / n8n / CRM)</option>
                  <option>Indie Mobile Game (2D / Casual / Godot)</option>
                  <option>Smart TV / Hardware Utility (like AG TV Remote)</option>
                  <option>Full-Stack SaaS & Web Dashboard</option>
                  <option>Other Custom Solution</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Requirements & Goals *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe what you want to build, key problems to solve, any reference apps, or expected launch date..."
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Requirements via Email</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="py-3 px-5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                <button
                  type="button"
                  onClick={handleCopyScope}
                  className="hover:text-blue-600 flex items-center gap-1 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary to Clipboard'}</span>
                </button>
                <span>🔒 Confidential & Direct to Srikanth</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
