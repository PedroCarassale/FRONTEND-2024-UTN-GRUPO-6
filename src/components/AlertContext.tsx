import React, { createContext, useContext, useState, ReactNode } from "react";
import "./AlertContext.css";

// Definir tipos para el contexto
interface AlertContextType {
  showAlert: (message: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert debe usarse dentro de un AlertProvider");
  }
  return context;
};

export const AlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(null), 3000); // Oculta la alerta después de 3 segundos
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alertMessage && <Alert message={alertMessage} />}
    </AlertContext.Provider>
  );
};

// Componente de la Alerta
const Alert: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="alert-overlay">
      <div className="alert-content">{message}</div>
    </div>
  );
};
