import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/Routes";
import AuthProvider from "./contexts/AuthProvider";
import { RouterProvider } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      {/* <Toaster position='top-right' reverseOrder={false} /> */}
    </AuthProvider>
  </StrictMode>
);
