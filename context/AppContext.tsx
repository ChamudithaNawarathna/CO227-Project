import { Owner } from "@/controller/Owner";
import { Ticket } from "@/controller/Ticket";
import { Transaction } from "@/controller/Transaction";
import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

type grapData = {
  value: number;
  date: string;
  label?: string;
};

type VehicleDetails = {
  vehicleRegNo: string;
  seats: number;
  date: string;
  departureTime: string;
  bookedSeats: string[];
};

type Bus = {
  id: string;
  regNo: string;
  service: string;
  seats: number;
  rides: number;
  ridesIncrement: number;
  earning: number;
  earningIncrement: number;
  rating: number;
  insuranceExp: string;
  VRL_Exp: string;
};

export type accountType = "Passenger" | "Operator" | "Owner";

interface AppContextProps {
  baseURL: string;
  profileImage: string;
  setProfileImage: Dispatch<SetStateAction<string>>;
  id: string;
  setID: Dispatch<SetStateAction<string>>;
  accountType: string;
  setAccountType: Dispatch<SetStateAction<accountType>>;
  myAccTypes: Map<string, boolean>;
  setMyAccTypes: Dispatch<SetStateAction<Map<string, boolean>>>;
  credits: number;
  setCredits: Dispatch<SetStateAction<number>>;
  fName: string;
  setFName: Dispatch<SetStateAction<string>>;
  lName: string;
  setLName: Dispatch<SetStateAction<string>>;
  phoneNo: string;
  setPhoneNo: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  nic: string;
  setNIC: Dispatch<SetStateAction<string>>;
  accountNo: string;
  setAccountNo: Dispatch<SetStateAction<string>>;
  accHolderName: string;
  setAccHolderName: Dispatch<SetStateAction<string>>;
  bankName: string;
  setBankName: Dispatch<SetStateAction<string>>;
  branchName: string;
  setBranchName: Dispatch<SetStateAction<string>>;
  ntcLicenseNo: string;
  setNTCLicenseNo: Dispatch<SetStateAction<string>>;
  driverLicenseNo: string;
  setDriverLicenseNo: Dispatch<SetStateAction<string>>;
  occupation: string;
  setOccupation: Dispatch<SetStateAction<string>>;
  seatNos: number[];
  setSeatNos: Dispatch<SetStateAction<number[]>>;
  busScheduleDetails: VehicleDetails[];
  setBusScheduleDetails: Dispatch<SetStateAction<VehicleDetails[]>>;
  myBuses: Bus[];
  setMyBuses: Dispatch<SetStateAction<Bus[]>>;
  myTickets?: Map<string, Ticket>;
  setMyTickets: Dispatch<SetStateAction<Map<string, Ticket> | undefined>>;
  income7: grapData[];
  income30: grapData[];
  incomeYear: grapData[];
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const baseURL = "http://192.168.54.221:20240";
  const [profileImage, setProfileImage] = useState("");
  const [id, setID] = useState("12");
  const [accountType, setAccountType] = useState<accountType>("Passenger");
  const [myAccTypes, setMyAccTypes] = useState<Map<string, boolean>>(
    new Map([
      ["Operator", true],
      ["Owner", true],
    ])
  );
  const [credits, setCredits] = useState(500);
  const [fName, setFName] = useState<string>("Chamuditha");
  const [lName, setLName] = useState<string>("Nawarathna");
  const [phoneNo, setPhoneNo] = useState<string>("0767601948");
  const [email, setEmail] = useState<string>("e20035@eng.pdn.ac.lk");
  const [nic, setNIC] = useState<string>("200109808082");
  const [accountNo, setAccountNo] = useState<string>("123-456-789-012");
  const [accHolderName, setAccHolderName] = useState<string>("C. Nawarathna");
  const [bankName, setBankName] = useState<string>("People's bank");
  const [branchName, setBranchName] = useState<string>("Balangoda");
  const [ntcLicenseNo, setNTCLicenseNo] = useState<string>("AB12321");
  const [driverLicenseNo, setDriverLicenseNo] = useState<string>("LA345666");
  const [occupation, setOccupation] = useState<string>("Both");
  const [seatNos, setSeatNos] = useState<number[]>([]);

  /* Data for passenger account */

  // const [myTickets, setMyTickets] = useState<Map<string, Ticket> | undefined>();
  const [myTickets, setMyTickets] = useState<Map<string, Ticket> | undefined>(
    () => {
      const ticket1 = new Ticket(
        "TKT001",
        new Date("2024-10-01"),
        "VH123",
        "BusOrg",
        "Luxury",
        "RT101",
        "City A - City B",
        new Date("2024-10-10T08:00:00"),
        "City A, Kandy, Srilanka",
        "City B, Kandy, Srilanka",
        "08:00",
        "10:00",
        "200km",
        "50",
        "5",
        "45",
        "TXN001",
        "30",
        "20",
        ["1A", "1B"],
        "booked",
        true,
        true
      );

      const ticket2 = new Ticket(
        "TKT002",
        new Date("2024-10-02"),
        "VH124",
        "BusOrg",
        "Semi-Luxury",
        "RT102",
        "City C - City D",
        new Date("2024-10-11T09:00:00"),
        "City C, Kandy, Srilanka",
        "City D, Kandy, Srilanka",
        "09:00",
        "11:00",
        "150km",
        "40",
        "4",
        "36",
        "TXN002",
        "25",
        "15",
        ["2A", "2B"],
        "booked",
        false,
        false
      );

      const ticket3 = new Ticket(
        "TKT003",
        new Date("2024-10-03"),
        "VH125",
        "BusOrg",
        "Normal",
        "RT103",
        "City E - City F",
        new Date("2024-10-12T10:00:00"),
        "City E, Kandy, Srilanka",
        "City F, Kandy, Srilanka",
        "10:00",
        "12:00",
        "100km",
        "30",
        "3",
        "27",
        "TXN003",
        "20",
        "10",
        ["3A", "3B"],
        "booked",
        true,
        false
      );

      // Create a map with ticketNo as the key
      const ticketMap = new Map<string, Ticket>();
      ticketMap.set(ticket1.ticketNo, ticket1);
      ticketMap.set(ticket2.ticketNo, ticket2);
      ticketMap.set(ticket3.ticketNo, ticket3);

      return ticketMap;
    }
  );

  /* Data for bus operator account */

  const [busScheduleDetails, setBusScheduleDetails] = useState<
    VehicleDetails[]
  >([]);

  /* Data for bus owner account */

  const [myBuses, setMyBuses] = useState<Bus[]>([]);

  const income7 = [
    {
      value: 12600,
      date: "11 Apr 2022",
      label: "11 Apr",
    },
    {
      value: 25000,
      date: "12 Apr 2022",
      label: "12 Apr",
    },
    {
      value: 8950,
      date: "13 Apr 2022",
      label: "13 Apr",
    },
    {
      value: 23700,
      date: "14 Apr 2022",
      label: "14 Apr",
    },
    {
      value: 30900,
      date: "15 Apr 2022",
      label: "15 Apr",
    },
    {
      value: 16300,
      date: "16 Apr 2022",
      label: "16 Apr",
    },
  ];

  const income30 = [
    {
      value: 15100,
      date: "10 Apr 2022",
      label: "10 Apr",
    },
    {
      value: 11100,
      date: "11 Apr 2022",
    },
    {
      value: 19000,
      date: "12 Apr 2022",
    },
    {
      value: 15100,
      date: "13 Apr 2022",
    },
    {
      value: 14100,
      date: "14 Apr 2022",
    },
    {
      value: 15100,
      date: "15 Apr 2022",
      label: "15 Apr",
    },
    {
      value: 11100,
      date: "16 Apr 2022",
    },
    {
      value: 19000,
      date: "17 Apr 2022",
    },
    {
      value: 20100,
      date: "18 Apr 2022",
    },
    {
      value: 14100,
      date: "19 Apr 2022",
    },
    {
      value: 15100,
      date: "20 Apr 2022",
      label: "20 Apr",
    },
    {
      value: 11100,
      date: "21 Apr 2022",
    },
    {
      value: 19000,
      date: "22 Apr 2022",
    },
    {
      value: 30100,
      date: "23 Apr 2022",
    },
    {
      value: 14100,
      date: "24 Apr 2022",
    },
    {
      value: 15100,
      date: "25 Apr 2022",
      label: "25 Apr",
    },
    {
      value: 11100,
      date: "26 Apr 2022",
    },
    {
      value: 28000,
      date: "26 Apr 2022",
    },
    {
      value: 12100,
      date: "27 Apr 2022",
    },
    {
      value: 9100,
      date: "27 Apr 2022",
    },
    {
      value: 8100,
      date: "28 Apr 2022",
      label: "28 Apr",
    },
    {
      value: 23100,
      date: "29 Apr 2022",
    },
    {
      value: 13000,
      date: "30 Apr 2022",
    },
    {
      value: 27100,
      date: "31 Apr 2022",
    },
    {
      value: 14100,
      date: "1 May 2022",
    },
    {
      value: 12100,
      date: "2 May 2022",
      label: "2 May",
    },
    {
      value: 1100,
      date: "3 May 2022",
    },
    {
      value: 19000,
      date: "4 May 2022",
    },
    {
      value: 23100,
      date: "5 May 2022",
    },
    {
      value: 14100,
      date: "6 May 2022",
    },
    {
      value: 16100,
      date: "7 May 2022",
      label: "7 May",
    },
    {
      value: 7100,
      date: "8 May 2022",
    },
    {
      value: 19000,
      date: "9 May 2022",
    },
    {
      value: 21100,
      date: "10 May 2022",
    },
  ];

  const incomeYear = [
    {
      value: 1260000,
      date: "11 Jan 2022",
      label: "Jan",
    },
    {
      value: 2500000,
      date: "12 Feb 2022",
      label: "Feb",
    },
    {
      value: 895000,
      date: "13 Mar 2022",
      label: "Mar",
    },
    {
      value: 2370000,
      date: "14 Apr 2022",
      label: "Apr",
    },
    {
      value: 3090000,
      date: "15 May 2022",
      label: "May",
    },
    {
      value: 1430000,
      date: "16 Jun 2022",
      label: "Jun",
    },
    {
      value: 1630000,
      date: "16 Jul 2022",
      label: "Jul",
    },
    {
      value: 5130000,
      date: "16 Aug 2022",
      label: "Aug",
    },
    {
      value: 7630000,
      date: "16 Sep 2022",
      label: "Sep",
    },
    {
      value: 1130000,
      date: "16 Oct 2022",
      label: "Oct",
    },
    {
      value: 2630000,
      date: "16 Nov 2022",
      label: "Nov",
    },
    {
      value: 8630000,
      date: "16 Dec 2022",
      label: "Dec",
    },
  ];

  return (
    <AppContext.Provider
      value={{
        baseURL,
        profileImage,
        setProfileImage,
        id,
        setID,
        accountType,
        setAccountType,
        myAccTypes,
        setMyAccTypes,
        credits,
        setCredits,
        fName,
        setFName,
        lName,
        setLName,
        phoneNo,
        setPhoneNo,
        email,
        setEmail,
        nic,
        setNIC,
        accountNo,
        setAccountNo,
        accHolderName,
        setAccHolderName,
        bankName,
        setBankName,
        branchName,
        setBranchName,
        ntcLicenseNo,
        setNTCLicenseNo,
        driverLicenseNo,
        setDriverLicenseNo,
        occupation,
        setOccupation,
        seatNos,
        setSeatNos,
        busScheduleDetails,
        setBusScheduleDetails,
        myBuses,
        setMyBuses,
        myTickets,
        setMyTickets,
        income7,
        income30,
        incomeYear,
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
