import React from "react";
///Servicios
import AppWeb from "../../pages/app";
import SignIn from "../../pages/SignIn";
import SignUp from "../../pages/SignUp";
import Record from "../../pages/Record";
///Info
import AboutUs from "../../pages/AboutUs";
import ContactUs from "../../pages/ContactUs";
import CopyR from "../../pages/CopyRight";
import License from "../../pages/License";
import Manual from "../../pages/Manual";
import PrivacyP from "../../pages/PrivacyP";

///Provedores
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../_partials/Protectedroute";
import { AuthProvider } from "../../context/authContext";

function Navigation() {
  return (
    <div className="Navigation">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/copyright" element={<CopyR />} />
          <Route path="/license" element={<License />} />
          <Route path="/manual" element={<Manual />} />
          <Route path="/privacy-policy" element={<PrivacyP />} />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppWeb />
              </ProtectedRoute>
            }
          />
          <Route
            path="/record"
            element={
              <ProtectedRoute>
                <Record />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default Navigation;
