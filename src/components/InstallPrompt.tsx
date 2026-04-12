"use client";

import { useEffect, useState } from "react";
import { Smartphone, X, Download } from "lucide-react";
import { config } from "@/lib/config";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // Si deja installé (mode standalone), ne pas afficher
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    // Si l'utilisateur a deja masqué le prompt il y a moins de 14j
    const dismissed = localStorage.getItem("pwa-dismissed");
    if (dismissed && Date.now() - parseInt(dismissed) < 14 * 24 * 60 * 60 * 1000) return;

    // Detection iOS
    const ua = navigator.userAgent;
    const isIosDevice = /iphone|ipad|ipod/i.test(ua) && !/crios|fxios/i.test(ua);
    if (isIosDevice) {
      setIsIos(true);
      setTimeout(() => setShow(true), 5000); // attend 5s avant de proposer
      return;
    }

    // Android / Chrome : evenement beforeinstallprompt
    function handler(e: Event) {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setTimeout(() => setShow(true), 5000);
    }
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  function dismiss() {
    localStorage.setItem("pwa-dismissed", String(Date.now()));
    setShow(false);
  }

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "accepted") {
      setShow(false);
    }
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-40 animate-fade-in-up">
      <div className="card-dark p-4 shadow-2xl border-[#C9A84C]/30 bg-[#141414]">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C9A84C] to-[#A07D2E] flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5 text-black" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm mb-1">Installer {config.brand}</p>
            <p className="text-xs text-zinc-400 leading-relaxed mb-3">
              {isIos
                ? "Ajoutez cette icône à votre écran d'accueil : appuyez sur le bouton Partager puis \"Sur l'écran d'accueil\"."
                : "Réservez en 1 clic depuis votre écran d'accueil, comme une vraie app."}
            </p>
            {!isIos && deferred && (
              <button onClick={install} className="btn-gold !py-2 !px-4 !text-xs flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" /> Installer
              </button>
            )}
          </div>
          <button onClick={dismiss} className="p-1 text-zinc-500 hover:text-white transition shrink-0" aria-label="Fermer">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
