// import React from "react";
// import { WalletProvider, useWalletContext } from "./context/WalletContext";
// import { ClubProvider } from "./context/ClubContext";
// import LoginPage from "./pages/LoginPage";
// import Dashboard from "./pages/Dashboard";

// // Component that conditionally renders LoginPage or Dashboard based on wallet connection
// const AppContent = () => {
//   const { isConnected } = useWalletContext();

//   return (
//     <ClubProvider>{isConnected ? <Dashboard /> : <LoginPage />}</ClubProvider>
//   );
// };

// // Main component that wraps the app with WalletProvider
// const ClubPresidentDashboard = () => {
//   return (
//     <WalletProvider>
//       <AppContent />
//     </WalletProvider>
//   );
// };

// export default ClubPresidentDashboard;
