"use client";

import { useState } from "react";

const XMR =
  "8ApEjKiMyNgdsWcRXJUgLLFry6TdHRuSX23dNr5hjCDuEBYw3R9926HgT8ePVmp2DBcicds1hiQSiA5pNKtqufkJHTbNdxt";

export function Monero() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(XMR);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="xmr flex w-full flex-col items-center gap-2">
      <svg
        role="img"
        aria-label="Monero"
        viewBox="0 0 24 24"
        className="h-7 w-7 fill-bone"
      >
        <path d="M12 0C5.365 0 0 5.373 0 12.015c0 1.335.228 2.607.618 3.81h3.577V5.729L12 13.545l7.805-7.815v10.095h3.577c.389-1.203.618-2.475.618-3.81C24 5.375 18.635 0 12 0zm-1.788 15.307l-3.417-3.421v6.351H1.758C3.87 21.689 7.678 24 12 24s8.162-2.311 10.245-5.764h-5.04v-6.351l-3.386 3.421-1.788 1.79-1.814-1.79h-.005z" />
      </svg>
      <button
        type="button"
        onClick={copy}
        className="xmr-address"
        aria-label={`copy monero address ${XMR}`}
        data-copied={copied}
      >
        <code className="xmr-text">{XMR}</code>
        <svg
          className="xmr-clip"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <rect x="9" y="9" width="11" height="11" rx="1.5" />
          <path d="M5 15V5a1 1 0 0 1 1-1h10" />
        </svg>
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "address copied" : ""}
      </span>
    </div>
  );
}
