"use client";

type Props = {
  addLog: (message: string) => void;
};

export default function GMButton({ addLog }: Props) {
  const handleGM = () => {
    addLog("🚀 GM sent!");
  };

  const handleGN = () => {
    addLog("🌙 GN sent!");
  };

  return (
    <div className="gm-container">
      <button className="button success" onClick={handleGM}>
        Send GM
      </button>

      <button className="button danger" onClick={handleGN}>
        Send GN
      </button>
    </div>
  );
}
