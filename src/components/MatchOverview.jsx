// components/MatchOverview.jsx (adds 'Imposta 7' actions per period)
import React, { useState } from "react";
import { ArrowLeft, Download, FileText, ClipboardCheck, Users, Settings2 } from "lucide-react";
import { calculatePoints, calculateTotalGoals } from "../utils/matchUtils";
import LineupModal from "./modals/LineupModal";

const REQUIRED_ON_FIELD = 7;

const MatchOverview = ({
  match,
  onStartPeriod,
  onViewPeriod,
  onSave,
  onExportExcel,
  onExportPDF,
  onSummary,
  onFIGCReport,
  isTimerRunning,
  onBack,
  onSetLineup, // pass-through to set lineup from overview
}) => {
  const [openLineupFor, setOpenLineupFor] = useState(null);

  const lineupCount = (p) => Array.isArray(p.lineup) ? p.lineup.length : 0;
  const lineupBadge = (p) => {
    const count = lineupCount(p);
    const ok = count === REQUIRED_ON_FIELD;
    return (
      <span title={`Formazione: ${count}/${REQUIRED_ON_FIELD}`}
        className={`ml-2 inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded border ${ok ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
        <Users className="w-3 h-3" /> {count}/{REQUIRED_ON_FIELD}
      </span>
    );
  };

  const handleConfirmLineup = (periodIndex, lineup) => {
    onSetLineup?.(periodIndex, lineup);
    setOpenLineupFor(null);
  };

  const availablePlayers = match?.notCalled && Array.isArray(match.notCalled)
    ? (window.PLAYERS || []).filter((p)=>!match.notCalled.includes(p.num))
    : (window.PLAYERS || []);

  return (
    <div className="min-h-screen bg-neutral-50 p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <button
          onClick={onBack}
          className="text-primary hover:text-primary-dark flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Abbandona Partita
        </button>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Header con titolo */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-neutral-900">
              USMA Padova vs {match.opponent}
            </h2>
          </div>

          {isTimerRunning && (
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full animate-pulse inline-flex items-center gap-1 mb-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              LIVE
            </span>
          )}
          
          <p className="text-sm text-neutral-600 mb-2">
            {match.isHome ? "🏠 Casa" : "✈️ Trasferta"}
          </p>
          
          <p className="text-sm text-neutral-600 mb-4">
            {match.competition}
            {match.matchDay && ` - Giornata ${match.matchDay}`}
            {" • "}
            {new Date(match.date).toLocaleDateString("it-IT")}
          </p>

          <div className="bg-gradient-to-r from-brand-start to-brand-end rounded-lg p-4 mb-6 text-white">
            <div className="text-center">
              <p className="text-sm font-semibold mb-2">Risultato Attuale</p>
              <div className="flex justify-center items-center gap-6">
                <div className="text-center">
                  <p className="text-xs opacity-90">Punti</p>
                  <p className="text-4xl font-bold">
                    {calculatePoints(match, "usma")}
                  </p>
                </div>
                <span className="text-2xl">-</span>
                <div className="text-center">
                  <p className="text-xs opacity-90">Punti</p>
                  <p className="text-4xl font-bold">
                    {calculatePoints(match, "opponent")}
                  </p>
                </div>
              </div>
              <p className="text-xs opacity-90 mt-2">
                Gol: {calculateTotalGoals(match, "usma")} - {" "}
                {calculateTotalGoals(match, "opponent")}
              </p>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            {match.periods.map((period, idx) => {
              const completed = !!period.completed;
              const isPT = period.name === 'PROVA TECNICA';
              const canPlay = isPT || lineupCount(period) === REQUIRED_ON_FIELD;
              return (
                <div
                  key={idx}
                  className={`border rounded-lg p-4 ${
                    completed ? "bg-neutral-50" : "bg-white"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div>
                        <h3 className="font-semibold text-neutral-900 flex items-center">
                          {period.name}
                          {!isPT && lineupBadge(period)}
                        </h3>
                        <p className="text-sm text-neutral-600">
                          {period.usma ?? 0} - {period.opponent ?? 0}
                          {period.goals && period.goals.length > 0 && ` (${period.goals.length} eventi)`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!completed && (
                        <button
                          onClick={() => onStartPeriod(idx)}
                          disabled={!canPlay}
                          className={`px-3 py-1 rounded text-sm ${canPlay ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'}`}
                          title={canPlay? (isPT? 'Inizia' : 'Gioca') : `Seleziona ${REQUIRED_ON_FIELD} giocatori`}
                        >
                          {isPT ? "Inizia" : "Gioca"}
                        </button>
                      )}
                      {!completed && !isPT && (
                        <button
                          onClick={() => setOpenLineupFor(idx)}
                          className="px-3 py-1 rounded text-sm border border-neutral-300 hover:bg-neutral-50 flex items-center gap-1"
                          title="Imposta 7 ora"
                        >
                          <Settings2 className="w-3 h-3" /> Imposta 7
                        </button>
                      )}
                      {completed && (
                        <button
                          onClick={() => onViewPeriod(idx)}
                          className="border border-primary text-primary px-3 py-1 rounded hover:bg-primary-light flex items-center gap-1 text-sm"
                        >
                          <FileText className="w-3 h-3" />
                          Dettagli
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rapporto FIGC */}
          <div className="mb-6 bg-secondary-light border-2 border-secondary-dark rounded-lg p-4">
            <div className="flex items-start gap-3">
              <ClipboardCheck className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-neutral-900 mb-1">Rapporto Gara FIGC</h3>
                <p className="text-xs text-neutral-600 mb-3">Compila il rapporto gara ufficiale da inviare alla Delegazione Provinciale di Padova</p>
                <button
                  onClick={onFIGCReport}
                  className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <ClipboardCheck className="w-4 h-4" />
                  Compila Rapporto FIGC
                </button>
              </div>
            </div>
          </div>

          {/* Azioni */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onExportExcel}
                className="bg-secondary text-neutral-900 py-2 rounded hover:bg-secondary-dark flex items-center justify-center gap-2 text-sm"
              >
                <Download className="w-4 h-4" /> Excel
              </button>
              <button
                onClick={onExportPDF}
                className="bg-primary text-white py-2 rounded hover:bg-primary-dark flex items-center justify-center gap-2 text-sm"
              >
                <Download className="w-4 h-4" /> PDF
              </button>
            </div>
            <button
              onClick={onSave}
              className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark font-medium flex items-center justify-center gap-2 text-sm"
            >
              Salva Partita
            </button>
          </div>
        </div>
      </div>

      {openLineupFor !== null && (
        <LineupModal
          availablePlayers={availablePlayers}
          initialLineup={match.periods[openLineupFor]?.lineup || []}
          onConfirm={(lineup)=>handleConfirmLineup(openLineupFor, lineup)}
          onCancel={()=>setOpenLineupFor(null)}
        />
      )}
    </div>
  );
};

export default MatchOverview;
