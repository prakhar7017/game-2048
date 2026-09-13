import type { Status } from "../hooks/useGame2048";

type OverlayProps = {
  status: Status;
  onRestart: () => void;
  onKeepPlaying: () => void;
};

export function Overlay({ status, onRestart, onKeepPlaying }: OverlayProps) {
  if (status === "playing") return null;

  const message = status === "won" ? "You reached 2048!" : "No moves left";

  return (
    <div className="overlay">
      <div className="overlay-card">
        <p className="overlay-title">{message}</p>
        <div className="overlay-actions">
          {status === "won" && (
            <button className="btn btn-ghost" onClick={onKeepPlaying}>
              Keep Playing
            </button>
          )}
          <button className="btn btn-primary" onClick={onRestart}>
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}
