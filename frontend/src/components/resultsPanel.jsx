import ChatAssistant from './chatAssistant'

function ResultsPanel({ results, loading, medications }) {
    if (loading) {
        return (
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Analyzing your medications...</p>
        </div>
      </main>
    )
    }
    //welcome state
  if (!results) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="12" stroke="#16a34a" strokeWidth="2"/>
              <path d="M16 10V16M16 16L20 20" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
              <path d="M11 16H21M16 11V21" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Safer medications, clearer answers
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Add your medications on the left and click Analyze to check for dangerous interactions, allergy conflicts and risks.
          </p>
        </div>
      </main>
    )
  }
    //results state
  return (
    <main className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">

      {/* SUMMARY BANNER */}
      <div className={`rounded-xl p-4 border ${
        results.overallSeverity === 'severe'   ? 'bg-red-50 border-red-200' :
        results.overallSeverity === 'moderate' ? 'bg-yellow-50 border-yellow-200' :
        results.overallSeverity === 'low'      ? 'bg-green-50 border-green-200' :
                                                 'bg-green-50 border-green-200'
      }`}>
        <h3 className={`font-semibold text-sm mb-1 ${
          results.overallSeverity === 'severe'   ? 'text-red-800' :
          results.overallSeverity === 'moderate' ? 'text-yellow-800' :
                                                   'text-green-800'
        }`}>
          {results.overallSeverity === 'severe'   ? 'Serious risks detected' :
           results.overallSeverity === 'moderate' ? 'Moderate risks found' :
           results.overallSeverity === 'low'      ? 'Minor interactions noted' :
                                                    'No significant interactions'}
        </h3>
        <p className={`text-sm ${
          results.overallSeverity === 'severe'   ? 'text-red-700' :
          results.overallSeverity === 'moderate' ? 'text-yellow-700' :
                                                   'text-green-700'
        }`}>
          {results.summary}
        </p>
      </div>

      {/* INTERACTION CARDS */}
      {results.interactions && results.interactions.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Interactions & Risks
          </p>

          {results.interactions.map((interaction, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden">

              {/* Card header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2 flex-wrap">
                  {interaction.drugs.map((drug, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-md">
                      {drug}
                    </span>
                  ))}
                </div>

                {/* Severity badge */}
                <span className={`text-xs font-semibold px-2 py-1 rounded-full uppercase ${
                  interaction.severity === 'severe'   ? 'bg-red-100 text-red-700' :
                  interaction.severity === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-green-100 text-green-700'
                }`}>
                  {interaction.severity}
                </span>
              </div>

              {/* Card body */}
              <div className="px-4 py-3 flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-900">{interaction.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{interaction.explanation}</p>

                {/* Suggestion box */}
                <div className="bg-gray-50 rounded-lg px-3 py-2 border-l-2 border-green-500">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <span className="font-medium text-gray-800">What to do: </span>
                    {interaction.suggestion}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* CHAT ASSISTANT */}
      <ChatAssistant results={results} medications={medications} />

      {/* DISCLAIMER */}
      <p className="text-xs text-gray-400 text-center">
        This is for informational purposes only. Always consult your doctor or pharmacist.
      </p>

    </main>
  )
}

export default ResultsPanel
