import React, { useState } from 'react';
import { Bot, Cpu, Database, Check, Play, RefreshCw, MessageSquare, ArrowRight, Zap, FileSpreadsheet, Sparkles, Terminal } from 'lucide-react';
import { AI_WORKFLOW_PIPELINE } from '../assets/images/index.ts';

interface WorkflowStep {
  title: string;
  sub: string;
  type: 'trigger' | 'ai' | 'action' | 'store';
  status: 'idle' | 'running' | 'success';
}

export const AutomationVisualizer: React.FC = () => {
  const [activeWorkflow, setActiveWorkflow] = useState<'leads' | 'invoice' | 'game'>('leads');
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [logs, setLogs] = useState<string[]>([
    'System ready. Select a workflow scenario and click "Run Live Simulation".'
  ]);

  const workflows = {
    leads: {
      name: 'WhatsApp AI Sales Agent & CRM Sync',
      desc: 'Qualifies incoming customer inquiries 24/7 on WhatsApp, answers pricing questions, and schedules consultations without manual intervention.',
      steps: [
        { title: 'Inbound WhatsApp Message', sub: '"Hi, do you build custom inventory apps for pharmacies?"', type: 'trigger' as const },
        { title: 'AI Intent & Entity Parsing', sub: 'Gemini 2.5 Flash extracts: Industry="Healthcare", Need="Inventory", Urgency="High"', type: 'ai' as const },
        { title: 'Knowledge Base Retrieval', sub: 'Pulls portfolio case studies & pricing sheet from vector database', type: 'ai' as const },
        { title: 'Automated Intelligent Reply', sub: 'Generates empathetic, context-rich WhatsApp response + booking link', type: 'action' as const },
        { title: 'CRM & Notification Dispatch', sub: 'Syncs lead to Notion / Google Sheets & pings Srikanth on Telegram', type: 'store' as const },
      ],
    },
    invoice: {
      name: 'Automated Invoice & Expense Extractor',
      desc: 'Processes vendor bills, PDF receipts, and handwritten orders into structured accounting data in seconds.',
      steps: [
        { title: 'Receipt Uploaded', sub: 'PDF or image received via email webhook or mobile camera', type: 'trigger' as const },
        { title: 'Multimodal Vision OCR', sub: 'AI Vision parses raw image into line items, GSTIN, totals & dates', type: 'ai' as const },
        { title: 'Validation & Fraud Check', sub: 'Verifies totals against math sum and vendor registration records', type: 'action' as const },
        { title: 'Accounting Software Sync', sub: 'Writes verified JSON payload to QuickBooks / Tally / Zoho Books', type: 'store' as const },
      ],
    },
    game: {
      name: 'AI-Assisted Game Dev Asset Pipeline',
      desc: 'How Shristi Tech rapidly generates 2D pixel-art sprites, dialogues, and sound effects for mobile games.',
      steps: [
        { title: 'Character & World Spec', sub: 'Game design parameters: Cyberpunk Roguelite Hero, 4-frame run cycle', type: 'trigger' as const },
        { title: 'AI Concept & Sprite Generation', sub: 'Automated diffusion pipelines generate transparent PNG sprite atlas', type: 'ai' as const },
        { title: 'Automated Physics Mesh Rig', sub: 'Scripts trace outlines to auto-generate 2D polygon collision boxes', type: 'action' as const },
        { title: 'Unity / Godot Engine Export', sub: 'Assembled asset bundle deployed into game engine ready to playtest', type: 'store' as const },
      ],
    },
  };

  const handleRunSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStepIndex(0);
    const currentWf = workflows[activeWorkflow];

    const initialLog = `[${new Date().toLocaleTimeString()}] Triggering workflow: ${currentWf.name}`;
    setLogs([initialLog]);

    currentWf.steps.forEach((step, idx) => {
      setTimeout(() => {
        setCurrentStepIndex(idx);
        setLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] Step ${idx + 1}: ${step.title} -> ${step.sub}`
        ]);

        if (idx === currentWf.steps.length - 1) {
          setTimeout(() => {
            setIsRunning(false);
            setLogs((prev) => [
              ...prev,
              `[${new Date().toLocaleTimeString()}] ✅ Workflow finished successfully. Zero manual hours required!`
            ]);
          }, 600);
        }
      }, (idx + 1) * 900);
    });
  };

  const currentWf = workflows[activeWorkflow];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider mb-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>n8n • Custom Python • Gemini AI • Cloud Functions</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
            AI Agent & Workflow Automation Playground
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            See how autonomous AI agents eliminate repetitive manual tasks for businesses, reducing human work from hours to milliseconds.
          </p>
        </div>

        {/* Workflow Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
          <button
            onClick={() => {
              setActiveWorkflow('leads');
              setCurrentStepIndex(-1);
              setIsRunning(false);
              setLogs(['Selected: WhatsApp AI Sales Agent. Click "Run Live Simulation" to test.']);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeWorkflow === 'leads' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            WhatsApp Sales Agent
          </button>
          <button
            onClick={() => {
              setActiveWorkflow('invoice');
              setCurrentStepIndex(-1);
              setIsRunning(false);
              setLogs(['Selected: Invoice & Expense Extractor. Click "Run Live Simulation" to test.']);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeWorkflow === 'invoice' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Invoice Extractor
          </button>
          <button
            onClick={() => {
              setActiveWorkflow('game');
              setCurrentStepIndex(-1);
              setIsRunning(false);
              setLogs(['Selected: Game Dev AI Pipeline. Click "Run Live Simulation" to test.']);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeWorkflow === 'game' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Game Dev Pipeline
          </button>
        </div>
      </div>

      {/* Description & Action Trigger */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
        <div>
          <div className="text-sm font-semibold text-slate-200">{currentWf.name}</div>
          <div className="text-xs text-slate-400 mt-0.5">{currentWf.desc}</div>
        </div>

        <button
          onClick={handleRunSimulation}
          disabled={isRunning}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow-md flex items-center justify-center gap-2 whitespace-nowrap transition-all active:scale-95 flex-shrink-0"
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Simulating Execution...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Live Simulation</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Node Graph */}
      <div className="mt-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3 relative z-10">
          {currentWf.steps.map((step, idx) => {
            const isCurrent = currentStepIndex === idx;
            const isCompleted = currentStepIndex > idx;
            const isPending = currentStepIndex < idx;

            return (
              <div
                key={idx}
                className={`relative rounded-xl p-4 border transition-all duration-300 flex flex-col justify-between min-h-[140px] ${
                  isCurrent
                    ? 'bg-blue-950/70 border-blue-500 shadow-lg shadow-blue-500/20 ring-1 ring-blue-500 scale-[1.02]'
                    : isCompleted
                    ? 'bg-slate-950/90 border-emerald-500/60'
                    : 'bg-slate-950/50 border-slate-800/80 opacity-80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-slate-500">Node 0{idx + 1}</span>
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCompleted
                          ? 'bg-emerald-500 text-white'
                          : isCurrent
                          ? 'bg-blue-500 text-white animate-pulse'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                    </span>
                  </div>

                  <h5 className="font-semibold text-xs text-white leading-snug">{step.title}</h5>
                  <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                    {step.sub}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono">
                  <span
                    className={`capitalize ${
                      step.type === 'trigger'
                        ? 'text-amber-400'
                        : step.type === 'ai'
                        ? 'text-purple-400'
                        : step.type === 'action'
                        ? 'text-sky-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {step.type}
                  </span>
                  <span className="text-slate-500">
                    {isCurrent ? 'Processing...' : isCompleted ? 'Success' : 'Ready'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-time execution logs terminal */}
      <div className="mt-6 bg-black/60 rounded-xl p-3.5 border border-slate-800/90 font-mono text-xs">
        <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800/60 mb-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[11px] font-semibold text-slate-300">Live Agent Execution Console</span>
          </div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Active Engine
          </span>
        </div>
        <div className="max-h-24 overflow-y-auto space-y-1 text-[11px] text-slate-300 select-text">
          {logs.map((log, i) => (
            <div key={i} className="leading-relaxed">
              <span className="text-blue-400 select-none mr-1.5">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
