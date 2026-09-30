export function Titlebar({ title }: { title: string }) {
  return (
    <div className="titlebar" aria-hidden="true">
      <span className="titlebar-title">{title}</span>
      <span className="titlebar-controls">
        <span className="wm-btn" title="Minimize">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 11h8" />
          </svg>
        </span>
        <span className="wm-btn" title="Maximize">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="4" y="4" width="8" height="8" />
          </svg>
        </span>
        <span className="wm-btn wm-close" title="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 5l6 6M11 5l-6 6" />
          </svg>
        </span>
      </span>
    </div>
  );
}
