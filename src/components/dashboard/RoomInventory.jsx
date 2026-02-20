import { useState } from "react";
import { FaBed } from "react-icons/fa";
import { Tooltip } from "antd";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: white;
  padding: 2rem;
  min-height: 100vh;
`;

const LegendContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LegendBox = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
`;

const LegendLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  background-color: ${(props) => props.color};
  color: ${(props) => (props.isDark ? "white" : "black")};
  border-radius: 20px;
`;

const RoomsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const RoomSection = styled.div`
  margin-bottom: 1rem;
`;

const RoomTitle = styled.h3`
  font-size: 1.375rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  text-align: center;
`;

const BedsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const BedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const BedBox = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  border: 3px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
  transition: transform 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.1);
  }

  svg {
    width: 32px;
    height: 32px;
    color: ${(props) => props.iconColor || "white"};
  }
`;

const BedLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 0.25rem;
  text-align: center;
`;

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  max-width: 28rem;
  width: 100%;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #222a3a;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6b7280;
    transition: color 0.2s;

    &:hover {
      color: #222a3a;
    }
  }

  .info-section {
    margin-bottom: 1rem;
  }

  p {
    font-size: 0.875rem;
    margin-bottom: 0.75rem;
    color: #222a3a;

    span {
      font-weight: 600;
      color: #222a3a;
    }
  }

  .button-group {
    display: flex;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  button {
    flex: 1;
    padding: 0.6rem 1rem;
    border-radius: 0.5rem;
    border: none;
    font-weight: 600;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.2s;

    &.checkout-btn {
      background-color: #dc2626;
      color: white;

      &:hover {
        background-color: #b91c1c;
      }
    }

    &.change-btn {
      background-color: #3b82f6;
      color: white;

      &:hover {
        background-color: #2563eb;
      }
    }
  }
`;

const bedStatuses = {
  vacant: "#16a34a",
  occupied: "#dc2626",
  checkingOut: "#fff700",
  block: "#ea580c",
};

const roomData = [
  {
    roomNo: 1,
    beds: [
      {
        id: 1,
        status: "occupied",
        guestName: "Munna Lal Meena",
        cmsId: "CMS001",
        designation: "Sr ALP",
        locationHQ: "BKI",
        mobileNo: "9001033619",
        department: "Coaching",
        arrivingTrain: "19412",
        reqCheckinDate: "2026-02-10 07:00:00",
        actualCheckinDate: "2026-02-10 07:09:49",
        departureTrain: "19411",
        reqCheckoutDate: "2026-02-10 18:05:00",
      },
      { id: 2, status: "vacant" },
      {
        id: 3,
        status: "occupied",
        guestName: "Rajesh Kumar",
        cmsId: "CMS002",
        designation: "ALP",
        locationHQ: "AJMER",
        mobileNo: "9876543210",
        department: "Mechanical",
        arrivingTrain: "19536",
        reqCheckinDate: "2026-02-10 08:00:00",
        actualCheckinDate: "2026-02-10 08:15:30",
        departureTrain: "19535",
        reqCheckoutDate: "2026-02-10 19:00:00",
      },
      { id: 4, status: "vacant" },
    ],
  },
  {
    roomNo: 2,
    beds: [
      {
        id: 5,
        status: "checkingOut",
        guestName: "Priya Singh",
        cmsId: "CMS003",
        designation: "LP(M)",
        locationHQ: "JAIPUR",
        mobileNo: "9123456789",
        department: "Operations",
        arrivingTrain: "19412",
        reqCheckinDate: "2026-02-10 07:00:00",
        actualCheckinDate: "2026-02-10 07:10:00",
        departureTrain: "19411",
        reqCheckoutDate: "2026-02-10 18:00:00",
      },
      {
        id: 6,
        status: "checkingOut",
        guestName: "Vikram Patel",
        cmsId: "CMS004",
        designation: "Sr ALP",
        locationHQ: "BKI",
        mobileNo: "9456789012",
        department: "Coaching",
        arrivingTrain: "19412",
        reqCheckinDate: "2026-02-10 07:00:00",
        actualCheckinDate: "2026-02-10 07:08:00",
        departureTrain: "19411",
        reqCheckoutDate: "2026-02-10 18:05:00",
      },
      {
        id: 7,
        status: "checkingOut",
        guestName: "Amit Sharma",
        cmsId: "CMS005",
        designation: "ALP",
        locationHQ: "AJMER",
        mobileNo: "9789012345",
        department: "Electrical",
        arrivingTrain: "19536",
        reqCheckinDate: "2026-02-10 08:00:00",
        actualCheckinDate: "2026-02-10 08:12:00",
        departureTrain: "19535",
        reqCheckoutDate: "2026-02-10 19:00:00",
      },
      {
        id: 8,
        status: "checkingOut",
        guestName: "Suresh Kumar",
        cmsId: "CMS006",
        designation: "Conductor",
        locationHQ: "BKI",
        mobileNo: "9234567890",
        department: "Traffic",
        arrivingTrain: "19412",
        reqCheckinDate: "2026-02-10 07:00:00",
        actualCheckinDate: "2026-02-10 07:05:00",
        departureTrain: "19411",
        reqCheckoutDate: "2026-02-10 18:05:00",
      },
    ],
  },
  {
    roomNo: 3,
    beds: [
      {
        id: 9,
        status: "occupied",
        guestName: "RAMAVATAR MEENA",
        cmsId: "CMS007",
        designation: "Sr ALP",
        locationHQ: "AJMER",
        mobileNo: "9345678901",
        department: "Mechanical",
        arrivingTrain: "19536",
        reqCheckinDate: "2026-02-10 08:00:00",
        actualCheckinDate: "2026-02-10 08:20:00",
        departureTrain: "19535",
        reqCheckoutDate: "2026-02-10 19:00:00",
      },
      {
        id: 10,
        status: "occupied",
        guestName: "Puran Prakash",
        cmsId: "CMS008",
        designation: "LP(M/Exp)",
        locationHQ: "BKI",
        mobileNo: "9567890123",
        department: "Coaching",
        arrivingTrain: "19412",
        reqCheckinDate: "2026-02-10 07:00:00",
        actualCheckinDate: "2026-02-10 07:25:00",
        departureTrain: "19411",
        reqCheckoutDate: "2026-02-10 18:05:00",
      },
      { id: 11, status: "vacant" },
      { id: 12, status: "vacant" },
    ],
  },
  {
    roomNo: 4,
    beds: [
      {
        id: 13,
        status: "occupied",
        guestName: "Harish Kumar Avasthi",
        cmsId: "CMS009",
        designation: "Sr ALP",
        locationHQ: "JAIPUR",
        mobileNo: "9678901234",
        department: "Operations",
        arrivingTrain: "19412",
        reqCheckinDate: "2026-02-10 07:00:00",
        actualCheckinDate: "2026-02-10 07:18:00",
        departureTrain: "19411",
        reqCheckoutDate: "2026-02-10 18:05:00",
      },
      {
        id: 14,
        status: "occupied",
        guestName: "Rakesh Kumar Sharma",
        cmsId: "CMS010",
        designation: "LP(M/Exp)",
        locationHQ: "RAJASTHAN",
        mobileNo: "9789123456",
        department: "Mechanical",
        arrivingTrain: "19536",
        reqCheckinDate: "2026-02-10 08:00:00",
        actualCheckinDate: "2026-02-10 08:25:00",
        departureTrain: "19535",
        reqCheckoutDate: "2026-02-10 19:00:00",
      },
      {
        id: 15,
        status: "occupied",
        guestName: "Omprakash Meena",
        cmsId: "CMS011",
        designation: "LP(P)",
        locationHQ: "BKI",
        mobileNo: "9890234567",
        department: "Electrical",
        arrivingTrain: "19412",
        reqCheckinDate: "2026-02-10 07:00:00",
        actualCheckinDate: "2026-02-10 07:30:00",
        departureTrain: "19411",
        reqCheckoutDate: "2026-02-10 18:05:00",
      },
      {
        id: 16,
        status: "occupied",
        guestName: "Vinod Kumar Jangid",
        cmsId: "CMS012",
        designation: "Sr ALP",
        locationHQ: "AJMER",
        mobileNo: "9901345678",
        department: "Coaching",
        arrivingTrain: "19536",
        reqCheckinDate: "2026-02-10 08:00:00",
        actualCheckinDate: "2026-02-10 08:30:00",
        departureTrain: "19535",
        reqCheckoutDate: "2026-02-10 19:00:00",
      },
    ],
  },
  {
    roomNo: 5,
    beds: [
      { id: 17, status: "vacant" },
      { id: 18, status: "vacant" },
      { id: 19, status: "vacant" },
      { id: 20, status: "vacant" },
    ],
  },
  {
    roomNo: 6,
    beds: [
      { id: 19, status: "vacant" },
      {
        id: 20,
        status: "occupied",
        guestName: "Buddhi Prakash Saini",
        cmsId: "CMS013",
        designation: "ALP",
        locationHQ: "BKI",
        mobileNo: "9012456789",
        department: "Mechanical",
        arrivingTrain: "19536",
        reqCheckinDate: "2026-02-10 08:00:00",
        actualCheckinDate: "2026-02-10 08:35:00",
        departureTrain: "19535",
        reqCheckoutDate: "2026-02-10 19:00:00",
      },
      {
        id: 21,
        status: "occupied",
        guestName: "Kana Ram Meena",
        cmsId: "CMS014",
        designation: "ALP",
        locationHQ: "AJMER",
        mobileNo: "9123567890",
        department: "Operations",
        arrivingTrain: "19412",
        reqCheckinDate: "2026-02-10 07:00:00",
        actualCheckinDate: "2026-02-10 07:40:00",
        departureTrain: "19411",
        reqCheckoutDate: "2026-02-10 18:05:00",
      },
      { id: 22, status: "vacant" },
    ],
  },
  {
    roomNo: 7,
    beds: [
      { id: 23, status: "vacant" },
      { id: 24, status: "vacant" },
      { id: 25, status: "vacant" },
      { id: 26, status: "vacant" },
    ],
  },
  {
    roomNo: 8,
    beds: [
      { id: 27, status: "vacant" },
      {
        id: 28,
        status: "occupied",
        guestName: "Pukh Raj Meena",
        cmsId: "CMS015",
        designation: "Sr ALP",
        locationHQ: "JAIPUR",
        mobileNo: "9234678901",
        department: "Electrical",
        arrivingTrain: "19536",
        reqCheckinDate: "2026-02-10 08:00:00",
        actualCheckinDate: "2026-02-10 08:40:00",
        departureTrain: "19535",
        reqCheckoutDate: "2026-02-10 19:00:00",
      },
      {
        id: 29,
        status: "occupied",
        guestName: "Dushyant Upadhyay",
        cmsId: "CMS016",
        designation: "Technician",
        locationHQ: "BKI",
        mobileNo: "9345789012",
        department: "Mechanical",
        arrivingTrain: "19412",
        reqCheckinDate: "2026-02-10 07:00:00",
        actualCheckinDate: "2026-02-10 07:45:00",
        departureTrain: "19411",
        reqCheckoutDate: "2026-02-10 18:05:00",
      },
      {
        id: 30,
        status: "occupied",
        guestName: "K.S. Rawat",
        cmsId: "CMS017",
        designation: "Inspector",
        locationHQ: "RAJASTHAN",
        mobileNo: "9456890123",
        department: "Operations",
        arrivingTrain: "19536",
        reqCheckinDate: "2026-02-10 08:00:00",
        actualCheckinDate: "2026-02-10 08:45:00",
        departureTrain: "19535",
        reqCheckoutDate: "2026-02-10 19:00:00",
      },
    ],
  },
  {
    roomNo: 9,
    beds: [
      {
        id: 31,
        status: "occupied",
        guestName: "Guest Name 1",
        cmsId: "CMS018",
        designation: "Designation 1",
        locationHQ: "AJMER",
        mobileNo: "9567901234",
        department: "Coaching",
        arrivingTrain: "19412",
        reqCheckinDate: "2026-02-10 07:00:00",
        actualCheckinDate: "2026-02-10 07:50:00",
        departureTrain: "19411",
        reqCheckoutDate: "2026-02-10 18:05:00",
      },
      {
        id: 32,
        status: "occupied",
        guestName: "Guest Name 2",
        cmsId: "CMS019",
        designation: "Designation 2",
        locationHQ: "BKI",
        mobileNo: "9678012345",
        department: "Mechanical",
        arrivingTrain: "19536",
        reqCheckinDate: "2026-02-10 08:00:00",
        actualCheckinDate: "2026-02-10 08:50:00",
        departureTrain: "19535",
        reqCheckoutDate: "2026-02-10 19:00:00",
      },
      {
        id: 33,
        status: "occupied",
        guestName: "Guest Name 3",
        cmsId: "CMS020",
        designation: "Designation 3",
        locationHQ: "JAIPUR",
        mobileNo: "9789123450",
        department: "Electrical",
        arrivingTrain: "19412",
        reqCheckinDate: "2026-02-10 07:00:00",
        actualCheckinDate: "2026-02-10 07:55:00",
        departureTrain: "19411",
        reqCheckoutDate: "2026-02-10 18:05:00",
      },
      { id: 34, status: "vacant" },
    ],
  },
  {
    roomNo: 10,
    beds: [
      {
        id: 35,
        status: "occupied",
        guestName: "Guest Name 4",
        cmsId: "CMS021",
        designation: "Designation 4",
        locationHQ: "RAJASTHAN",
        mobileNo: "9890234561",
        department: "Coaching",
        arrivingTrain: "19536",
        reqCheckinDate: "2026-02-10 08:00:00",
        actualCheckinDate: "2026-02-10 08:55:00",
        departureTrain: "19535",
        reqCheckoutDate: "2026-02-10 19:00:00",
      },
      {
        id: 36,
        status: "occupied",
        guestName: "Guest Name 5",
        cmsId: "CMS022",
        designation: "Designation 5",
        locationHQ: "BKI",
        mobileNo: "9901345672",
        department: "Mechanical",
        arrivingTrain: "19412",
        reqCheckinDate: "2026-02-10 07:00:00",
        actualCheckinDate: "2026-02-10 08:00:00",
        departureTrain: "19411",
        reqCheckoutDate: "2026-02-10 18:05:00",
      },
      {
        id: 37,
        status: "occupied",
        guestName: "Guest Name 6",
        cmsId: "CMS023",
        designation: "Designation 6",
        locationHQ: "AJMER",
        mobileNo: "9012456783",
        department: "Operations",
        arrivingTrain: "19536",
        reqCheckinDate: "2026-02-10 08:00:00",
        actualCheckinDate: "2026-02-10 09:00:00",
        departureTrain: "19535",
        reqCheckoutDate: "2026-02-10 19:00:00",
      },
      {
        id: 38,
        status: "occupied",
        guestName: "Guest Name 7",
        cmsId: "CMS024",
        designation: "Designation 7",
        locationHQ: "JAIPUR",
        mobileNo: "9123567894",
        department: "Electrical",
        arrivingTrain: "19412",
        reqCheckinDate: "2026-02-10 07:00:00",
        actualCheckinDate: "2026-02-10 09:05:00",
        departureTrain: "19411",
        reqCheckoutDate: "2026-02-10 18:05:00",
      },
    ],
  },
  {
    roomNo: 11,
    beds: [
      {
        id: 39,
        status: "occupied",
        guestName: "Guest Name 8",
        cmsId: "CMS025",
        designation: "Designation 8",
        locationHQ: "BKI",
        mobileNo: "9234678905",
        department: "Coaching",
        arrivingTrain: "19536",
        reqCheckinDate: "2026-02-10 08:00:00",
        actualCheckinDate: "2026-02-10 09:10:00",
        departureTrain: "19535",
        reqCheckoutDate: "2026-02-10 19:00:00",
      },
      {
        id: 40,
        status: "occupied",
        guestName: "Guest Name 9",
        cmsId: "CMS026",
        designation: "Designation 9",
        locationHQ: "RAJASTHAN",
        mobileNo: "9345789016",
        department: "Mechanical",
        arrivingTrain: "19412",
        reqCheckinDate: "2026-02-10 07:00:00",
        actualCheckinDate: "2026-02-10 09:15:00",
        departureTrain: "19411",
        reqCheckoutDate: "2026-02-10 18:05:00",
      },
      {
        id: 41,
        status: "occupied",
        guestName: "Guest Name 10",
        cmsId: "CMS027",
        designation: "Designation 10",
        locationHQ: "AJMER",
        mobileNo: "9456890127",
        department: "Operations",
        arrivingTrain: "19536",
        reqCheckinDate: "2026-02-10 08:00:00",
        actualCheckinDate: "2026-02-10 09:20:00",
        departureTrain: "19535",
        reqCheckoutDate: "2026-02-10 19:00:00",
      },
      {
        id: 42,
        status: "occupied",
        guestName: "Guest Name 11",
        cmsId: "CMS028",
        designation: "Designation 11",
        locationHQ: "BKI",
        mobileNo: "9567901238",
        department: "Electrical",
        arrivingTrain: "19412",
        reqCheckinDate: "2026-02-10 07:00:00",
        actualCheckinDate: "2026-02-10 09:25:00",
        departureTrain: "19411",
        reqCheckoutDate: "2026-02-10 18:05:00",
      },
    ],
  },
  {
    roomNo: 12,
    beds: [
      {
        id: 43,
        status: "occupied",
        guestName: "Guest Name 12",
        cmsId: "CMS029",
        designation: "Designation 12",
        locationHQ: "JAIPUR",
        mobileNo: "9678012349",
        department: "Coaching",
        arrivingTrain: "19536",
        reqCheckinDate: "2026-02-10 08:00:00",
        actualCheckinDate: "2026-02-10 09:30:00",
        departureTrain: "19535",
        reqCheckoutDate: "2026-02-10 19:00:00",
      },
      {
        id: 44,
        status: "occupied",
        guestName: "Guest Name 13",
        cmsId: "CMS030",
        designation: "Designation 13",
        locationHQ: "RAJASTHAN",
        mobileNo: "9789123451",
        department: "Mechanical",
        arrivingTrain: "19412",
        reqCheckinDate: "2026-02-10 07:00:00",
        actualCheckinDate: "2026-02-10 09:35:00",
        departureTrain: "19411",
        reqCheckoutDate: "2026-02-10 18:05:00",
      },
      { id: 45, status: "vacant" },
      { id: 46, status: "vacant" },
    ],
  },
  {
    roomNo: 13,
    beds: [
      {
        id: 45,
        status: "occupied",
        guestName: "Guest Name 14",
        cmsId: "CMS031",
        designation: "Designation 14",
        locationHQ: "BKI",
        mobileNo: "9890234562",
        department: "Operations",
        arrivingTrain: "19536",
        reqCheckinDate: "2026-02-10 08:00:00",
        actualCheckinDate: "2026-02-10 09:40:00",
        departureTrain: "19535",
        reqCheckoutDate: "2026-02-10 19:00:00",
      },
      { id: 46, status: "vacant" },
      { id: 47, status: "vacant" },
      { id: 48, status: "vacant" },
    ],
  },
  {
    roomNo: 14,
    beds: [
      { id: 49, status: "vacant" },
      { id: 50, status: "vacant" },
      { id: 51, status: "vacant" },
      { id: 52, status: "abandoned" },
    ],
  },
  {
    roomNo: 15,
    beds: [
      {
        id: 50,
        status: "occupied",
        guestName: "Guest Name 15",
        cmsId: "CMS032",
        designation: "Designation 15",
        locationHQ: "AJMER",
        mobileNo: "9901345673",
        department: "Electrical",
        arrivingTrain: "19412",
        reqCheckinDate: "2026-02-10 07:00:00",
        actualCheckinDate: "2026-02-10 09:45:00",
        departureTrain: "19411",
        reqCheckoutDate: "2026-02-10 18:05:00",
      },
      {
        id: 51,
        status: "occupied",
        guestName: "Guest Name 16",
        cmsId: "CMS033",
        designation: "Designation 16",
        locationHQ: "JAIPUR",
        mobileNo: "9012456784",
        department: "Coaching",
        arrivingTrain: "19536",
        reqCheckinDate: "2026-02-10 08:00:00",
        actualCheckinDate: "2026-02-10 09:50:00",
        departureTrain: "19535",
        reqCheckoutDate: "2026-02-10 19:00:00",
      },
      { id: 52, status: "vacant" },
      { id: 53, status: "vacant" },
    ],
  },
  {
    roomNo: 16,
    beds: [
      {
        id: 52,
        status: "occupied",
        guestName: "Guest Name 17",
        cmsId: "CMS034",
        designation: "Designation 17",
        locationHQ: "BKI",
        mobileNo: "9123567895",
        department: "Mechanical",
        arrivingTrain: "19412",
        reqCheckinDate: "2026-02-10 07:00:00",
        actualCheckinDate: "2026-02-10 09:55:00",
        departureTrain: "19411",
        reqCheckoutDate: "2026-02-10 18:05:00",
      },
      {
        id: 53,
        status: "occupied",
        guestName: "Guest Name 18",
        cmsId: "CMS035",
        designation: "Designation 18",
        locationHQ: "RAJASTHAN",
        mobileNo: "9234678906",
        department: "Operations",
        arrivingTrain: "19536",
        reqCheckinDate: "2026-02-10 08:00:00",
        actualCheckinDate: "2026-02-10 10:00:00",
        departureTrain: "19535",
        reqCheckoutDate: "2026-02-10 19:00:00",
      },
      { id: 54, status: "vacant" },
      { id: 55, status: "vacant" },
    ],
  },
  {
    roomNo: 17,
    beds: [
      {
        id: 54,
        status: "occupied",
        guestName: "Guest Name 19",
        cmsId: "CMS036",
        designation: "Designation 19",
        locationHQ: "AJMER",
        mobileNo: "9345789017",
        department: "Electrical",
        arrivingTrain: "19412",
        reqCheckinDate: "2026-02-10 07:00:00",
        actualCheckinDate: "2026-02-10 10:05:00",
        departureTrain: "19411",
        reqCheckoutDate: "2026-02-10 18:05:00",
      },
      { id: 55, status: "vacant" },
      { id: 56, status: "vacant" },
      { id: 57, status: "vacant" },
    ],
  },
];

const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.875rem;

  p {
    margin: 0;
    font-weight: 500;

    span {
      font-weight: 700;
      color: #26c0a0;
    }
  }
`;

const BedIcon = ({ status, guestName, cmsId, designation }) => {
  const getColor = () => {
    return bedStatuses[status] || bedStatuses.vacant;
  };

  const getIconColor = () => {
    return status === "checkingOut" ? "black" : "white";
  };

  const tooltipContent = guestName ? (
    <TooltipContent>
      <p>
        <span>Name:</span> {guestName}
      </p>
      <p>
        <span>CMSID:</span> {cmsId}
      </p>
      <p>
        <span>Designation:</span> {designation}
      </p>
    </TooltipContent>
  ) : null;

  return (
    <Tooltip title={tooltipContent} color="#1a1a1a">
      <BedBox color={getColor()} iconColor={getIconColor()}>
        <FaBed />
      </BedBox>
    </Tooltip>
  );
};

const RoomInventory = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <Container>
      {/* Legend */}
      <LegendContainer>
        <LegendItem>
          <LegendLabel color="#16a34a" isDark={false}>
            Vacant
          </LegendLabel>
        </LegendItem>
        <LegendItem>
          <LegendLabel color="#ea580c" isDark={true}>
            Block
          </LegendLabel>
        </LegendItem>
        <LegendItem>
          <LegendLabel color="#dc2626" isDark={true}>
            Checkin
          </LegendLabel>
        </LegendItem>
        <LegendItem>
          <LegendLabel color="#fff700" isDark={false}>
            Checking out
          </LegendLabel>
        </LegendItem>
      </LegendContainer>

      {/* Rooms Grid */}
      <RoomsWrapper>
        {roomData.map((room) => (
          <RoomSection key={room.roomNo}>
            <RoomTitle>Room No-{room.roomNo}</RoomTitle>

            {/* Beds Grid */}
            <BedsGrid>
              {room.beds.map((bed) => (
                <BedContainer key={bed.id} onClick={() => setSelectedRoom(bed)}>
                  <BedIcon
                    status={bed.status}
                    guestName={bed.guestName}
                    cmsId={bed.cmsId}
                    designation={bed.designation}
                  />
                  <BedLabel>Bed: {bed.id}</BedLabel>
                </BedContainer>
              ))}
            </BedsGrid>
          </RoomSection>
        ))}
      </RoomsWrapper>

      {/* Bed Details Modal */}
      {selectedRoom && (
        <Modal onClick={() => setSelectedRoom(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>
              Booking Details for Bed: {selectedRoom.id}
              <button
                className="close-btn"
                onClick={() => setSelectedRoom(null)}
              >
                ✕
              </button>
            </h3>
            {selectedRoom.guestName ? (
              <>
                <div className="info-section">
                  <p>
                    <span>User Name:</span> {selectedRoom.guestName}
                  </p>
                  <p>
                    <span>Location HQ:</span> {selectedRoom.locationHQ}
                  </p>
                  <p>
                    <span>Mobile No.:</span> {selectedRoom.mobileNo}
                  </p>
                  <p>
                    <span>Department:</span> {selectedRoom.department}
                  </p>
                  <p>
                    <span>Arriving Train:</span> {selectedRoom.arrivingTrain}
                  </p>
                  <p>
                    <span>Req Checkin Date:</span> {selectedRoom.reqCheckinDate}
                  </p>
                  <p>
                    <span>Actual Checkin Date:</span>{" "}
                    {selectedRoom.actualCheckinDate}
                  </p>
                  <p>
                    <span>Departure Train:</span> {selectedRoom.departureTrain}
                  </p>
                  <p>
                    <span>Req Checkout Date:</span>{" "}
                    {selectedRoom.reqCheckoutDate}
                  </p>
                </div>
                <div className="button-group">
                  <button className="checkout-btn">Check Out</button>
                  <button className="change-btn">Change Bed</button>
                </div>
              </>
            ) : (
              <p>This bed is currently vacant.</p>
            )}
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default RoomInventory;
