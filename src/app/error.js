"use client";

import { useEffect } from "react";

const GlobalError = ({ error, unstable_retry }) => {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf9f7",
          color: "#1a1a18",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <p
          style={{
            fontSize: "clamp(64px, 14vw, 112px)",
            lineHeight: 1,
            fontWeight: 700,
            color: "rgba(26,26,24,0.12)",
            letterSpacing: "-0.04em",
            userSelect: "none",
            marginBottom: "1.5rem",
          }}
          aria-hidden
        >
          500
        </p>

        <h1
          style={{
            fontSize: "clamp(22px, 3vw, 30px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            marginBottom: "0.75rem",
          }}
        >
          Something went wrong
        </h1>

        <p
          style={{
            fontSize: "15px",
            color: "rgba(26,26,24,0.55)",
            maxWidth: "360px",
            lineHeight: 1.6,
            marginBottom: "2rem",
          }}
        >
          An unexpected error occurred. Refreshing the page usually fixes it.
        </p>

        <button
          onClick={unstable_retry}
          style={{
            padding: "0.5rem 1.75rem",
            background: "#c1440e",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            letterSpacing: "-0.01em",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
};

export default GlobalError;
