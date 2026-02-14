import { createContext, useState, useContext, ReactNode } from "react";

interface WalletContextType {
  publicKey: string | null;
  setPublicKey: (key: string | null) => void;
}

const WalletContext = createContext<WalletContextType>({
  publicKey: null,
  setPublicKey: () => {},
});

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  return (
    <WalletContext.Provider value={{ publicKey, setPublicKey }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
