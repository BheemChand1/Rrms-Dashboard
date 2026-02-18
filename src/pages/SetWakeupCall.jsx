import { useState, useEffect } from "react";
import { Table, Input, Select, Button, DatePicker, TimePicker } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Header from "../components/dashboard/Header.jsx";
import Sidebar from "../components/dashboard/Sidebar.jsx";

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  width: 100%;
  background-color: #f5f5f5;
`;

const SidebarSpacer = styled.div`
  display: none;
  @media (min-width: 1024px) {
    display: block;
    flex-shrink: 0;
    transition: all 0.3s;
    width: ${(props) => (props.collapsed ? "4rem" : "11rem")};
    @media (min-width: 1280px) {
      width: ${(props) => (props.collapsed ? "4rem" : "13rem")};
    }
    @media (min-width: 1536px) {
      width: ${(props) => (props.collapsed ? "4rem" : "15rem")};
    }
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const HeaderSpacer = styled.div`
  height: 3rem;
  @media (min-width: 1280px) {
    height: 3.5rem;
  }
  @media (min-width: 1536px) {
    height: 4rem;
  }
  flex-shrink: 0;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 0.5rem;
  overflow: auto;

  @media (min-width: 1024px) {
    padding: 0.75rem;
  }
  @media (min-width: 1280px) {
    padding: 1rem;
  }
  @media (min-width: 1536px) {
    padding: 1.25rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #222a3a;
`;

const TableWrapper = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;

  .ant-table {
    font-size: 0.8rem;
  }

  .ant-table-thead > tr > th {
    background-color: #26c0a0;
    color: white;
    font-weight: 600;
    font-size: 0.8rem;
    padding: 10px 12px !important;
    text-align: center;
  }

  .ant-table-tbody > tr {
    transition: all 0.3s ease;

    &:nth-child(even) > td {
      background-color: #f9fffe;
    }

    &:hover > td {
      background-color: #e8f7f4;
      transition: all 0.2s ease;
    }
  }

  .ant-table-tbody > tr > td {
    padding: 10px 8px;
    border-bottom: 1px solid #f0f0f0;
    text-align: center;
  }

  .ant-table-tbody > tr > td:nth-child(2) {
    text-align: left;
  }

  .ant-table-tbody > tr > td:nth-child(4) {
    text-align: left;
  }
`;

const TableControlsWrapper = styled.div`
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const WakeupCallButton = styled.button`
  background-color: #26c0a0;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1fa691;
  }
`;

const ModalOverlay = styled.div`
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
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;

const ModalHeader = styled.div`
  background-color: #26c0a0;
  color: white;
  padding: 0.6rem 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.2;
`;

const ModalBody = styled.div`
  padding: 0.75rem;
  overflow: visible;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem 0.75rem;
`;

const FormGroup = styled.div`
  margin-bottom: 0;
`;

const FormLabel = styled.label`
  display: block;
  font-weight: 600;
  font-size: 0.7rem;
  margin-bottom: 0.1rem;
  color: #222a3a;
`;

const FormValue = styled.div`
  font-size: 0.7rem;
  color: #222a3a;
  padding: 0.15rem 0;
  line-height: 1.2;
`;

const ModalFooter = styled.div`
  padding: 0.6rem 0.75rem;
  background-color: #f9fafb;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0;
  display: flex;
  align-items: center;

  &:hover {
    color: #e0e0e0;
  }
`;

// Sample data for Wakeup Call
const sampleData = [
  {
    key: "1",
    srNo: 1,
    name: "Shridhar upadhyay",
    headQuarter: "COR",
    roomName: "Room No-1",
    bedNo: 4,
    designation: "LP(P)",
    department: "Coaching",
    checkinDateTime: "13-Feb-2026 18:00:05",
  },
  {
    key: "2",
    srNo: 2,
    name: "Hemraj kharol",
    headQuarter: "COR",
    roomName: "Room No-17",
    bedNo: 55,
    designation: "Sr ALP",
    department: "Coaching",
    checkinDateTime: "13-Feb-2026 18:00:00",
  },
  {
    key: "3",
    srNo: 3,
    name: "Purushottam",
    headQuarter: "CQr",
    roomName: "Room No-3",
    bedNo: 10,
    designation: "LP (MlExp)",
    department: "Coaching",
    checkinDateTime: "13-Feb-2026 14:08:22",
  },
  {
    key: "4",
    srNo: 4,
    name: "NARSI RAM MEENA",
    headQuarter: "FL",
    roomName: "Room No-10",
    bedNo: 37,
    designation: "LP (G)",
    department: "Freight",
    checkinDateTime: "13-Feb-2026 13:26:41",
  },
  {
    key: "5",
    srNo: 5,
    name: "Ramesh Kumar Prajapat",
    headQuarter: "Fl",
    roomName: "Room No-10",
    bedNo: 38,
    designation: "LP (G)",
    department: "Freight",
    checkinDateTime: "13-Feb-2026 13:26:40",
  },
  {
    key: "6",
    srNo: 6,
    name: "Girraj kumar jangid",
    headQuarter: "Jp",
    roomName: "Room No-10",
    bedNo: 36,
    designation: "Sr ALP",
    department: "Coaching",
    checkinDateTime: "13-Feb-2026 13:26:39",
  },
  {
    key: "7",
    srNo: 7,
    name: "Nand kishore",
    headQuarter: "Jp",
    roomName: "Room No-13",
    bedNo: 45,
    designation: "LP (MlExp)",
    department: "Coaching",
    checkinDateTime: "13-Feb-2026 13:26:38",
  },
  {
    key: "8",
    srNo: 8,
    name: "GOURAV JINGER",
    headQuarter: "UDZ",
    roomName: "Room No-11",
    bedNo: 42,
    designation: "Sr ALP",
    department: "Coaching",
    checkinDateTime: "13-Feb-2026 12:55:42",
  },
  {
    key: "9",
    srNo: 9,
    name: "Mahaveer prasad kumawat",
    headQuarter: "UDZ",
    roomName: "Room No-13",
    bedNo: 46,
    designation: "LP(P)",
    department: "Coaching",
    checkinDateTime: "13-Feb-2026 12:55:39",
  },
  {
    key: "10",
    srNo: 10,
    name: "सत्यनारायण",
    headQuarter: "Jp",
    roomName: "Room No-1",
    bedNo: 3,
    designation: "LP (MlExp)",
    department: "Coaching",
    checkinDateTime: "13-Feb-2026 12:55:38",
  },
];

const columns = [
  {
    title: "S.NO",
    dataIndex: "srNo",
    key: "srNo",
    width: 60,
    align: "center",
  },
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
    width: 140,
    align: "center",
  },
  {
    title: "HEAD QUARTER",
    dataIndex: "headQuarter",
    key: "headQuarter",
    width: 100,
    align: "center",
  },
  {
    title: "ROOM NAME",
    dataIndex: "roomName",
    key: "roomName",
    width: 110,
    align: "center",
  },
  {
    title: "BED NO",
    dataIndex: "bedNo",
    key: "bedNo",
    width: 70,
    align: "center",
  },
  {
    title: "DESIGNATION",
    dataIndex: "designation",
    key: "designation",
    width: 100,
    align: "center",
  },
  {
    title: "DEPARTMENT",
    dataIndex: "department",
    key: "department",
    width: 100,
    align: "center",
  },
  {
    title: "CHECKIN DATE/TIME",
    dataIndex: "checkinDateTime",
    key: "checkinDateTime",
    width: 140,
    align: "center",
  },
  {
    title: "WAKE UP CALL",
    key: "wakeupCall",
    width: 130,
    align: "center",
    render: (_, record) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <WakeupCallButton onClick={() => window.setWakeupCallData(record)}>
          Set Wakeup Call
        </WakeupCallButton>
      </div>
    ),
  },
];

const SetWakeupCall = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [wakeupDate, setWakeupDate] = useState("");
  const [wakeupTime, setWakeupTime] = useState("");

  // Make setWakeupCallData available globally
  useEffect(() => {
    window.setWakeupCallData = (guest) => {
      setSelectedGuest(guest);
      setModalOpen(true);
    };
  }, []);

  const filteredData = sampleData.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase()),
    ),
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <MainContainer>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <SidebarSpacer collapsed={sidebarCollapsed} />

      <ContentWrapper>
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          sidebarCollapsed={sidebarCollapsed}
        />

        <HeaderSpacer />

        <MainContent>
          <PageTitle>Set Wakeup Call</PageTitle>

          {/* Table */}
          <TableWrapper>
            <TableControlsWrapper>
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <span style={{ fontSize: "0.75rem", fontWeight: "600" }}>
                  Show
                </span>
                <Select
                  value={pageSize}
                  onChange={(value) => {
                    setPageSize(value);
                    setCurrentPage(1);
                  }}
                  style={{ width: "60px", fontSize: "0.75rem" }}
                  options={[
                    { label: "10", value: 10 },
                    { label: "25", value: 25 },
                    { label: "50", value: 50 },
                    { label: "100", value: 100 },
                  ]}
                />
                <span style={{ fontSize: "0.75rem", fontWeight: "600" }}>
                  entries
                </span>
              </div>
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <span style={{ fontSize: "0.75rem", fontWeight: "600" }}>
                  Search:
                </span>
                <Input
                  placeholder=""
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    width: "150px",
                    height: "2rem",
                    fontSize: "0.75rem",
                  }}
                />
              </div>
            </TableControlsWrapper>

            <div style={{ overflowX: "auto" }}>
              <Table
                columns={columns}
                dataSource={paginatedData}
                pagination={false}
                bordered
                size="small"
              />
            </div>

            {/* Pagination */}
            <PaginationWrapper>
              <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                Showing{" "}
                {filteredData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}{" "}
                to {Math.min(currentPage * pageSize, filteredData.length)} of{" "}
                {filteredData.length} entries
              </div>
              <div style={{ display: "flex", gap: "0.25rem" }}>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: "0.25rem 0.5rem",
                    fontSize: "0.75rem",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    opacity: currentPage === 1 ? 0.5 : 1,
                  }}
                >
                  Previous
                </button>
                {Array.from({
                  length: Math.ceil(filteredData.length / pageSize),
                }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    style={{
                      padding: "0.25rem 0.5rem",
                      fontSize: "0.75rem",
                      backgroundColor:
                        currentPage === i + 1 ? "#26c0a0" : "white",
                      color: currentPage === i + 1 ? "white" : "black",
                      border: "1px solid #d9d9d9",
                      cursor: "pointer",
                      minWidth: "2rem",
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage(
                      Math.min(
                        Math.ceil(filteredData.length / pageSize),
                        currentPage + 1,
                      ),
                    )
                  }
                  disabled={
                    currentPage === Math.ceil(filteredData.length / pageSize)
                  }
                  style={{
                    padding: "0.25rem 0.5rem",
                    fontSize: "0.75rem",
                    cursor:
                      currentPage === Math.ceil(filteredData.length / pageSize)
                        ? "not-allowed"
                        : "pointer",
                    opacity:
                      currentPage === Math.ceil(filteredData.length / pageSize)
                        ? 0.5
                        : 1,
                  }}
                >
                  Next
                </button>
              </div>
            </PaginationWrapper>
          </TableWrapper>

          {/* Wakeup Call Modal */}
          {modalOpen && selectedGuest && (
            <ModalOverlay onClick={() => setModalOpen(false)}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                  <span>
                    Room {selectedGuest.roomName} - Bed No {selectedGuest.bedNo}
                  </span>
                  <CloseButton onClick={() => setModalOpen(false)}>
                    <CloseOutlined />
                  </CloseButton>
                </ModalHeader>

                <ModalBody>
                  <FormGrid>
                    <FormGroup>
                      <FormLabel>Name:</FormLabel>
                      <FormValue>{selectedGuest.name}</FormValue>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Booking Location:</FormLabel>
                      <FormValue>Ajmer</FormValue>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Location HQ:</FormLabel>
                      <FormValue>{selectedGuest.headQuarter}</FormValue>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Mobile:</FormLabel>
                      <FormValue>9116039405</FormValue>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Department:</FormLabel>
                      <FormValue>{selectedGuest.department}</FormValue>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Arriving Train:</FormLabel>
                      <FormValue>19605</FormValue>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Req Checkin Date:</FormLabel>
                      <FormValue>13-02-2026 15:00:00</FormValue>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Req Checkout Date:</FormLabel>
                      <FormValue>13-02-2026 21:05:00</FormValue>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Checkin Status:</FormLabel>
                      <FormValue>Ongoing Booking</FormValue>
                    </FormGroup>
                  </FormGrid>

                  <div style={{ marginTop: "0.5rem" }}>
                    <FormLabel>Set Wakeup Call:</FormLabel>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      <DatePicker
                        format="dd-MM-yyyy"
                        value={wakeupDate}
                        onChange={(date) => setWakeupDate(date)}
                        style={{ flex: 1, height: "1.75rem" }}
                      />
                      <Input
                        type="time"
                        placeholder="Select Time"
                        value={wakeupTime}
                        onChange={(e) => setWakeupTime(e.target.value)}
                        style={{ flex: 1, height: "1.75rem" }}
                      />
                    </div>
                  </div>
                </ModalBody>

                <ModalFooter>
                  <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                  <Button
                    type="primary"
                    style={{ backgroundColor: "#26c0a0" }}
                    onClick={() => {
                      alert(
                        `Wakeup call set for ${wakeupDate} at ${wakeupTime}`,
                      );
                      setModalOpen(false);
                    }}
                  >
                    Wakeup Call
                  </Button>
                </ModalFooter>
              </ModalContent>
            </ModalOverlay>
          )}

          {/* Footer */}
          <footer
            style={{
              marginTop: "1rem",
              paddingTop: "0.75rem",
              borderTop: "1px solid #e5e7eb",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "0.7rem", color: "#9ca3af", margin: 0 }}>
              © 2026 Reception Manager • Designed by beatleanalytics.com
            </p>
          </footer>
        </MainContent>
      </ContentWrapper>
    </MainContainer>
  );
};

export default SetWakeupCall;
