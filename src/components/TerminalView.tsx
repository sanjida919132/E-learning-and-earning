import React, { useState, useEffect, useRef } from 'react';
import { TerminalLog } from '../types';
import { Terminal, Send, RefreshCw, Trash2, Cpu, HardDrive, Wifi, Shield } from 'lucide-react';

interface TerminalViewProps {
  logs: TerminalLog[];
  onClearLogs: () => void;
  onAddLog: (message: string, level: TerminalLog['level']) => void;
  totalEarnings: number;
  activeNodes: number;
}

export const TerminalView: React.FC<TerminalViewProps> = ({
  logs,
  onClearLogs,
  onAddLog,
  totalEarnings,
  activeNodes
}) => {
  const [levelFilter, setLevelFilter] = useState<'ALL' | TerminalLog['level']>('ALL');
  const [cliCommand, setCliCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    consoleBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliCommand.trim().toLowerCase();
    if (!cmd) return;

    onAddLog(`> ${cliCommand}`, 'SYS');
    setCommandHistory(prev => [...prev, cliCommand]);
    setCliCommand('');

    // Handle interactive CLI commands
    if (cmd === 'help') {
      setTimeout(() => {
        onAddLog('AVAILABLE COMMANDS: status, yield, nodes, ping, benchmarks, clear, top, whoami', 'SYS');
      }, 100);
    } else if (cmd === 'status') {
      setTimeout(() => {
        onAddLog(`SYSTEM STATUS: 128 NODES ENROLLED // ${activeNodes} ONLINE // 99.98% HEALTH // DHAKA-CORE-01`, 'SYS');
      }, 100);
    } else if (cmd === 'yield') {
      setTimeout(() => {
        onAddLog(`AGGREGATE FREELANCE YIELD: $${totalEarnings.toLocaleString()} USD // RUN-RATE: +18.4%`, 'EARN');
      }, 100);
    } else if (cmd === 'nodes') {
      setTimeout(() => {
        onAddLog('LAB-01: 31/32 ACTIVE | LAB-02: 32/32 ACTIVE | LAB-03: 29/32 ACTIVE | LAB-04: 32/32 ACTIVE', 'SYS');
      }, 100);
    } else if (cmd === 'ping') {
      setTimeout(() => {
        onAddLog('PING upwork.com: 14ms | github.com: 18ms | us-central1.gcp: 22ms // 0% LOSS', 'NETWORK');
      }, 100);
    } else if (cmd === 'benchmarks') {
      setTimeout(() => {
        onAddLog('H100 SXM5 BENCHMARK: 1,840 TFLOPS FP16 // GEMINI 2.0 EMBEDDINGS 42,000 VECTORS/SEC', 'HARDWARE');
      }, 100);
    } else if (cmd === 'clear') {
      onClearLogs();
    } else if (cmd === 'whoami') {
      setTimeout(() => {
        onAddLog('OPERATOR: SANJIDA // PRIVILEGE: ROOT-SEC-LVL-4 // WORKSPACE: COMMAND-CENTER-ICT', 'SYS');
      }, 100);
    } else {
      setTimeout(() => {
        onAddLog(`COMMAND NOT RECOGNIZED: "${cmd}". TYPE "help" FOR AVAILABLE COMMANDS.`, 'ALERT');
      }, 100);
    }
  };

  const filteredLogs = logs.filter((log) => {
    if (levelFilter === 'ALL') return true;
    return log.level === levelFilter;
  });

  const getLevelColor = (level: TerminalLog['level']) => {
    switch (level) {
      case 'SYS':
        return 'text-[#10B981] bg-[#064E3B] border-[#10B981]';
      case 'EARN':
        return 'text-[#6EE7B7] bg-[#022c22] border-[#10B981]';
      case 'NETWORK':
        return 'text-[#7DD3FC] bg-[#0C4A6E] border-[#0284C7]';
      case 'ALERT':
        return 'text-[#FCD34D] bg-[#78350F] border-[#F59E0B]';
      case 'HARDWARE':
        return 'text-[#d4e4fa] bg-[#122846] border-[#334E68]';
    }
  };

  return (
    <div className="space-y-4">
      {/* Hardware Node Racks Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#0B1E36] border border-[#1E3A5F] p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#94A3B8] uppercase">CORE CLUSTER ALPHA</span>
            <span className="text-[#10B981] font-bold">ONLINE</span>
          </div>
          <div className="font-space font-bold text-lg text-[#F8FAFC]">32x Ryzen 9 7950X</div>
          <div className="w-full bg-[#1E3A5F] h-1.5">
            <div className="bg-[#10B981] h-full" style={{ width: '84%' }}></div>
          </div>
          <div className="text-[10px] font-mono text-[#64748B] flex justify-between">
            <span>84% CPU ALLOCATED</span>
            <span>2.1 KW DRAW</span>
          </div>
        </div>

        <div className="bg-[#0B1E36] border border-[#1E3A5F] p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#94A3B8] uppercase">AI TENSOR POD (H100)</span>
            <span className="text-[#F59E0B] font-bold">HIGH LOAD</span>
          </div>
          <div className="font-space font-bold text-lg text-[#F8FAFC]">4x NVIDIA H100 80GB</div>
          <div className="w-full bg-[#1E3A5F] h-1.5">
            <div className="bg-[#F59E0B] h-full" style={{ width: '92%' }}></div>
          </div>
          <div className="text-[10px] font-mono text-[#64748B] flex justify-between">
            <span>92% GPU MEMORY</span>
            <span>71°C STABLE</span>
          </div>
        </div>

        <div className="bg-[#0B1E36] border border-[#1E3A5F] p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#94A3B8] uppercase">CORE SFP+ FIBER</span>
            <span className="text-[#0284C7] font-bold">100% NOMINAL</span>
          </div>
          <div className="font-space font-bold text-lg text-[#F8FAFC]">10 Gbps Synchronous</div>
          <div className="w-full bg-[#1E3A5F] h-1.5">
            <div className="bg-[#0284C7] h-full" style={{ width: '68%' }}></div>
          </div>
          <div className="text-[10px] font-mono text-[#64748B] flex justify-between">
            <span>6.8 Gbps EGRESS</span>
            <span>0.000% LOSS</span>
          </div>
        </div>

        <div className="bg-[#0B1E36] border border-[#1E3A5F] p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#94A3B8] uppercase">SECURITY GUARD</span>
            <span className="text-[#10B981] font-bold">PROTECTED</span>
          </div>
          <div className="font-space font-bold text-lg text-[#F8FAFC]">Zero-Trust Perimeter</div>
          <div className="w-full bg-[#1E3A5F] h-1.5">
            <div className="bg-[#10B981] h-full" style={{ width: '100%' }}></div>
          </div>
          <div className="text-[10px] font-mono text-[#64748B] flex justify-between">
            <span>SOC-2 MONITORED</span>
            <span>0 THREATS</span>
          </div>
        </div>
      </div>

      {/* Terminal Console Container */}
      <div className="bg-[#010F1F] border border-[#334E68] shadow-2xl flex flex-col h-[520px]">
        {/* Terminal Header */}
        <div className="bg-[#050D1A] border-b border-[#1E3A5F] px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-[#10B981]" />
            <span className="font-mono text-xs font-bold text-[#F8FAFC] tracking-wider uppercase">
              ICT OPERATIONAL KERNEL // TELEMETRY BUS CONSOLE
            </span>
            <span className="w-2 h-2 bg-[#10B981] animate-cursor-blink inline-block"></span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Log level filter pills */}
            <div className="hidden sm:flex items-center space-x-1 text-[10px] font-mono">
              {(['ALL', 'SYS', 'EARN', 'NETWORK', 'ALERT', 'HARDWARE'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevelFilter(lvl)}
                  className={`px-2 py-0.5 border ${
                    levelFilter === lvl
                      ? 'bg-[#10B981] text-[#050D1A] border-[#10B981] font-bold'
                      : 'bg-[#0B1E36] text-[#94A3B8] border-[#1E3A5F] hover:text-[#F8FAFC]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <button
              onClick={onClearLogs}
              title="Clear Terminal Screen"
              className="text-[#94A3B8] hover:text-[#EF4444] p-1 border border-[#1E3A5F] hover:border-[#EF4444] transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Console Log Area */}
        <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 select-text tech-grid">
          <div className="text-[#64748B] border-b border-[#1E3A5F]/60 pb-2 mb-3">
            COMMAND CENTER ICT v4.2 // SECURITY CLEARANCE: LEVEL 4 // ALL TRANSMISSIONS LOGGED
            <br />
            Type "help" below to query system metrics, nodes, or financial aggregates.
          </div>

          {filteredLogs.map((log) => (
            <div key={log.id} className="flex items-start space-x-2.5 leading-relaxed">
              <span className="text-[#64748B] shrink-0 tabular-nums">[{log.timestamp}]</span>
              <span className={`text-[9px] font-bold px-1.5 py-0.2 border uppercase shrink-0 ${getLevelColor(log.level)}`}>
                {log.level}
              </span>
              <span className={`break-all ${log.level === 'ALERT' ? 'text-[#FCD34D]' : log.level === 'EARN' ? 'text-[#6EE7B7]' : 'text-[#F8FAFC]'}`}>
                {log.message}
              </span>
            </div>
          ))}

          <div ref={consoleBottomRef} />
        </div>

        {/* Interactive CLI Prompt */}
        <form onSubmit={handleCommandSubmit} className="bg-[#050D1A] border-t border-[#1E3A5F] p-2.5 flex items-center space-x-2">
          <span className="font-mono text-xs font-bold text-[#10B981] pl-2 select-none">
            root@ict-nexus:~#
          </span>
          <input
            type="text"
            value={cliCommand}
            onChange={(e) => setCliCommand(e.target.value)}
            placeholder='Type command (e.g. "help", "yield", "status", "nodes")...'
            className="flex-1 bg-transparent border-none text-[#F8FAFC] text-xs font-mono outline-none placeholder:text-[#475569]"
          />
          <button
            type="submit"
            className="bg-[#122846] hover:bg-[#1E3A5F] border border-[#334E68] text-[#10B981] px-3 py-1.5 text-xs font-mono uppercase font-bold flex items-center space-x-1"
          >
            <Send className="w-3 h-3" />
            <span className="hidden sm:inline">Exec</span>
          </button>
        </form>
      </div>
    </div>
  );
};
