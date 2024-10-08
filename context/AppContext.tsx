import { Bus } from "@/controller/Bus";
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

type busLocationData = {
  id: string;
  latitude: number;
  longitude: number;
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
  seatStatus: string[];
  setSeatStatus: Dispatch<SetStateAction<string[]>>;
  busData: Bus[];
  myBuses: Bus[];
  myBusLocations: busLocationData[];
  setMyBusLocations: Dispatch<SetStateAction<busLocationData[]>>;
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
  const [seatStatus, setSeatStatus] = useState(Array(60).fill("Available"));

  /* Data for passenger account */

  const [myTickets, setMyTickets] = useState<Map<string, Ticket> | undefined>(
    new Map([
      [
        "001",
        new Ticket(
          "001",
          new Date("2024-10-06"),
          "AB1234",
          "Express",
          "Luxury",
          "E01 Colombo - Galle",
          "Colombo - Galle",
          new Date("2024-10-06T08:00"),
          "Colombo",
          "Galle",
          "20:15",
          "1:30",
          "120 km",
          "1500",
          "0",
          "1500",
          "TXN001",
          "1",
          "0",
          ["A1", "A2"],
          "Confirmed",
          true,
          false
        ),
      ],
      [
        "002",
        new Ticket(
          "002",
          new Date("2024-10-06"),
          "CD5678",
          "Rapid",
          "Standard",
          "E01 Colombo - Galle",
          "Galle - Colombo",
          new Date("2024-10-06T18:00"),
          "Galle",
          "Colombo",
          "12:45",
          "2:51",
          "120 km",
          "1200",
          "0",
          "1200",
          "TXN002",
          "2",
          "1",
          ["B1", "B2"],
          "Confirmed",
          true,
          true
        ),
      ],
    ])
  );

  // ["a12345", new Ticket("a12345")],
  //     ["b12345", new Ticket("b12345")],

  const busData = [
    new Bus(
      "srtf234546",
      "NA-35678",
      "ads3546567",
      new Map([[1, "d-234466"]]),
      new Map([[1, "c-234466"]]),
      "Kurunduwatte, Kandy",
      new Date(),
      "Akbar, Kandy",
      new Date(),
      new Date(),
      new Map(),
      6.93548,
      79.84868,
      new Owner("123abc", 1200)
    ),
    new Bus(
      "srdtf24509",
      "NA-35678",
      "ads3546567",
      new Map([[1, "d-234466"]]),
      new Map([[1, "c-234466"]]),
      "Peradeniya, Kandy",
      new Date(),
      "Galaha Junction, Kandy",
      new Date(),
      new Date(),
      new Map(),
      9.66845,
      80.00742,
      new Owner("123abc", 1200)
    ),
    new Bus(
      "s35hh34546",
      "NA-35678",
      "ads3546567",
      new Map([[1, "d-234466"]]),
      new Map([[1, "c-234466"]]),
      "Botanical Garden, Kandy",
      new Date(),
      "Hospital, Kandy",
      new Date(),
      new Date(),
      new Map(),
      6.0461,
      80.2103,
      new Owner("123fgc", 8000)
    ),
    new Bus(
      "s35hh34549",
      "NA-35678",
      "ads3546567",
      new Map([[1, "d-234466"]]),
      new Map([[1, "c-234466"]]),
      "Akbar, Kandy",
      new Date(),
      "Dangolla Junction, Kandy",
      new Date(),
      new Date(),
      new Map(),
      7.7102,
      81.6924,
      new Owner("123fgc", 8000)
    ),
    new Bus(
      "s35hh35546",
      "NA-35678",
      "ads3546567",
      new Map([[1, "d-234466"]]),
      new Map([[1, "c-234466"]]),
      "Gatambe, Kandy",
      new Date(),
      "Kandy Hospital, Kandy",
      new Date(),
      new Date(),
      new Map(),
      7.2906,
      80.6336,
      new Owner("123fgc", 8000)
    ),
  ];

  /* Data for bus operator account */

  const [bookedTickets, setBookedTickets] =
    useState();

    // new Map([
    //   ["9015776", new Ticket("9015776")],
    //   ["6578799", new Ticket("6578799")],
    // ])

  /* Data for bus owner account */

  const myBuses = [
    new Bus(
      "srtf234546",
      "NA-35678",
      "ads3546567",
      new Map([[1, "d-234466"]]),
      new Map([[1, "c-234466"]]),
      "Badulla",
      new Date(),
      "Colombo",
      new Date(),
      new Date(),
      new Map(),
      6.93548,
      79.84868,
      new Owner("123abc", 1200)
    ),
    new Bus(
      "srdtf24509",
      "NA-35679",
      "ads3546567",
      new Map([[1, "d-234466"]]),
      new Map([[1, "c-234466"]]),
      "Colombo",
      new Date(),
      "Kandy",
      new Date(),
      new Date(),
      new Map(),
      9.66845,
      80.00742,
      new Owner("123abc", 1200)
    ),
    new Bus(
      "s35hh34546",
      "NA-35680",
      "ads3546567",
      new Map([[1, "d-234466"]]),
      new Map([[1, "c-234466"]]),
      "Anuradapura",
      new Date(),
      "Hambantota",
      new Date(),
      new Date(),
      new Map(),
      6.0461,
      80.2103,
      new Owner("123fgc", 8000)
    ),
    new Bus(
      "s35hh34549",
      "NA-35681",
      "ads3546567",
      new Map([[1, "d-234466"]]),
      new Map([[1, "c-234466"]]),
      "Anuradapura",
      new Date(),
      "Hambantota",
      new Date(),
      new Date(),
      new Map(),
      7.7102,
      81.6924,
      new Owner("123fgc", 8000)
    ),
  ];

  const [myBusLocations, setMyBusLocations] = useState<busLocationData[]>(
    myBuses.map((bus) => ({
      id: bus.id,
      latitude: bus.latitude,
      longitude: bus.longitude,
    }))
  );

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
        seatStatus,
        setSeatStatus,
        busData,
        myBuses,
        myBusLocations,
        setMyBusLocations,
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
