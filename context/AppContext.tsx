import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

export type accountType = "Passenger" | "Operator" | "Owner";

interface AppContextProps {
  id: string;
  setID: Dispatch<SetStateAction<string>>;
  accountType: string;
  setAccountType: Dispatch<SetStateAction<accountType>>;
  fName: string;
  lName: string;
  phoneNo: string;
  nic: string;
  accountNo: string;
  accHolderName: string;
  bankName: string;
  branchName: string;
  nameOnLicense: string;
  ntcLicenseNo: string;
  driverLicenseNo: string;
  occupation: string;
  seatNo: number;
  setSeatNo: Dispatch<SetStateAction<number>>;
  seatStatus: string[];
  setSeatStatus: Dispatch<React.SetStateAction<any[]>>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [id, setID] = useState("1234ggfdg");
  const [accountType, setAccountType] = useState<accountType>("Passenger");
  const fName = "Chamuditha";
  const lName = "Nawarathna";
  const phoneNo = "0767601948";
  const nic = "200109801854";
  const accountNo = "100234569817";
  const accHolderName = "C. Nawarathna";
  const bankName = "Commercial Bank";
  const branchName = "Balangoda";
  const nameOnLicense = "C. Nawarathna";
  const ntcLicenseNo = "D-980726";
  const driverLicenseNo = "12343423423";
  const occupation = "Driver and Conductor";
  const [seatNo, setSeatNo] = useState(0);
  const [seatStatus, setSeatStatus] = useState(Array(50).fill("Available"));

  return (
    <AppContext.Provider
      value={{
        id,
        setID,
        accountType,
        setAccountType,
        fName,
        lName,
        phoneNo,
        nic,
        accountNo,
        accHolderName,
        bankName,
        branchName,
        nameOnLicense,
        ntcLicenseNo,
        driverLicenseNo,
        occupation,
        seatNo,
        setSeatNo,
        seatStatus,
        setSeatStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Error: App Context is empty");
  }
  return context;
};
