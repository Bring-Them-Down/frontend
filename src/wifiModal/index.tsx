import { useEffect, useRef, useState } from "react";
import "./wifimodal.css";

export interface IWifiModalProps {
  isOpen: boolean;
  setIsOpen: (i: boolean) => void;
  onClose: () => void;
}

export default function WifiModal({
  isOpen,
  setIsOpen,
  onClose,
}: IWifiModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [items] = useState(undefined);

  useEffect(() => {
    if (!isOpen) {
      ref.current = null;
      setIsOpen(false);
      return;
    }

    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        zIndex: 9999,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      }}
    >
      <div
        ref={ref}
        style={{
          position: "fixed",
          width: "30%",
          height: "70%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10000,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          padding: "15px",
          backgroundColor: "whiteSmoke", //TODO find better color,
        }}
      >
        {!items ? (
          <div
            style={{
              padding: "10px",
              width: "100%",
              height: "90%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <span className="loader"></span>
            <p>Loading items...</p>
          </div>
        ) : (
          <div style={{ padding: "10px", width: "100%", height: "90%" }}>
            loaded
          </div>
        )}
        <div
          style={{
            padding: "10px",
            width: "100%",
            height: "10%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
