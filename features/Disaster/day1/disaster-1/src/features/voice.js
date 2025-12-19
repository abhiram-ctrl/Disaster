// src/features/voice.js
export function startListening(onResult, onError) {
  const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Speech) {
    const err = new Error("SpeechRecognition not supported in this browser");
    if (onError) onError(err);
    return { start: () => {}, stop: () => {} };
  }

  const recog = new Speech();
  recog.lang = "en-US"; // change to "te-IN" if you want Telugu recognition (browser dependent)
  recog.interimResults = false;
  recog.maxAlternatives = 1;

  recog.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    if (onResult) onResult(transcript);
  };

  recog.onerror = (e) => {
    if (onError) onError(e);
  };

  return {
    start: () => { try { recog.start(); } catch(e){ /* ignore */ } },
    stop: () => { try { recog.stop(); } catch(e){ /* ignore */ } }
  };
}
