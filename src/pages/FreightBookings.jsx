import { useState } from "react";
import { Table, Button, Input, Select, Pagination, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
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
    padding: 8px 12px !important;
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
    padding: 8px 10px;
    border-bottom: 1px solid #f0f0f0;
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

// Freight booking data
const freightData = [
  {
    key: "f1",
    srNo: 1,
    name: "Raj Kumar Singh",
    phone: "9876543210",
    designation: "Freight Handler",
    department: "Freight",
    locationHQ: "CENTRAL",
    requestDate: "18-Feb-2026",
    location: "Delhi",
    room: "Room No-1",
    bed: 5,
    arrivingTrain: "12345",
    departureTrain: "12346",
    checkInDate: "18-Feb-2026 10:00:00",
    actualCheckInDate: "18-Feb-2026 10:15:30",
    checkOutDate: "18-Feb-2026 20:00:00",
  },
  {
    key: "f2",
    srNo: 2,
    name: "Priya Sharma",
    phone: "9765432101",
    designation: "Freight Operator",
    department: "Freight",
    locationHQ: "NORTH",
    requestDate: "19-Feb-2026",
    location: "Pune",
    room: "Room No-2",
    bed: 10,
    arrivingTrain: "12347",
    departureTrain: "12348",
    checkInDate: "19-Feb-2026 09:00:00",
    actualCheckInDate: "19-Feb-2026 09:20:00",
    checkOutDate: "19-Feb-2026 18:00:00",
  },
  {
    key: "f3",
    srNo: 3,
    name: "Vikram Patel",
    phone: "9654321012",
    designation: "Freight Supervisor",
    department: "Freight",
    locationHQ: "SOUTH",
    requestDate: "19-Feb-2026",
    location: "Chennai",
    room: "Room No-3",
    bed: 7,
    arrivingTrain: "12349",
    departureTrain: "12350",
    checkInDate: "19-Feb-2026 11:00:00",
    actualCheckInDate: "19-Feb-2026 11:25:45",
    checkOutDate: "20-Feb-2026 07:00:00",
  },
  {
    key: "f4",
    srNo: 4,
    name: "Akshay Kumar",
    phone: "9543210123",
    designation: "Freight Coordinator",
    department: "Freight",
    locationHQ: "EAST",
    requestDate: "18-Feb-2026",
    location: "Kolkata",
    room: "Room No-4",
    bed: 20,
    arrivingTrain: "12351",
    departureTrain: "12352",
    checkInDate: "18-Feb-2026 13:00:00",
    actualCheckInDate: "18-Feb-2026 13:30:15",
    checkOutDate: "19-Feb-2026 08:30:00",
  },
  {
    key: "f5",
    srNo: 5,
    name: "Neha Gupta",
    phone: "9432101234",
    designation: "Freight Handler",
    department: "Freight",
    locationHQ: "WEST",
    requestDate: "19-Feb-2026",
    location: "Mumbai",
    room: "Room No-5",
    bed: 11,
    arrivingTrain: "12353",
    departureTrain: "12354",
    checkInDate: "19-Feb-2026 08:00:00",
    actualCheckInDate: "19-Feb-2026 08:45:20",
    checkOutDate: "19-Feb-2026 17:30:00",
  },
  {
    key: "f6",
    srNo: 6,
    name: "Sanjay Mishra",
    phone: "9321012345",
    designation: "Freight Supervisor",
    department: "Freight",
    locationHQ: "CENTRAL",
    requestDate: "18-Feb-2026",
    location: "Bangalore",
    room: "Room No-6",
    bed: 16,
    arrivingTrain: "12355",
    departureTrain: "12356",
    checkInDate: "18-Feb-2026 14:00:00",
    actualCheckInDate: "18-Feb-2026 14:35:45",
    checkOutDate: "19-Feb-2026 09:00:00",
  },
  {
    key: "f7",
    srNo: 7,
    name: "Anjali Singh",
    phone: "9210123456",
    designation: "Freight Operator",
    department: "Freight",
    locationHQ: "NORTH",
    requestDate: "19-Feb-2026",
    location: "Chandigarh",
    room: "Room No-7",
    bed: 9,
    arrivingTrain: "12357",
    departureTrain: "12358",
    checkInDate: "19-Feb-2026 10:00:00",
    actualCheckInDate: "19-Feb-2026 10:20:30",
    checkOutDate: "19-Feb-2026 19:00:00",
  },
];

const FreightBookings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedRecord(null);
  };

  const filteredData = freightData.filter((item) =>
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

  const columns = [
    {
      title: "Sr.No.",
      dataIndex: "srNo",
      key: "srNo",
      width: 60,
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 130,
      align: "center",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 110,
      align: "center",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      width: 120,
      align: "center",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      width: 110,
      align: "center",
    },
    {
      title: "Location HQ",
      dataIndex: "locationHQ",
      key: "locationHQ",
      width: 100,
      align: "center",
    },
    {
      title: "Request Date",
      dataIndex: "requestDate",
      key: "requestDate",
      width: 110,
      align: "center",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 100,
      align: "center",
    },
    {
      title: "Details",
      key: "action",
      width: 80,
      align: "center",
      render: (_, record) => (
        <Button
          type="text"
          icon={
            <EyeOutlined style={{ fontSize: "1.1rem", color: "#10b981" }} />
          }
          onClick={() => handleViewDetails(record)}
        />
      ),
    },
  ];

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
          <PageTitle>Freight Bookings</PageTitle>

          {/* Table with Show Entries */}
          <TableWrapper>
            <div
              style={{
                marginBottom: "1rem",
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
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
              <Input
                placeholder="Search"
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
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredData.length}
                onChange={setCurrentPage}
                showSizeChanger={false}
                size="small"
              />
            </PaginationWrapper>
          </TableWrapper>

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

          {/* Booking Details Modal */}
          <Modal
            title="Booking Details"
            open={modalVisible}
            onCancel={handleCloseModal}
            footer={[
              <Button key="close" type="primary" onClick={handleCloseModal}>
                Close
              </Button>,
            ]}
            width={600}
          >
            {selectedRecord && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        fontWeight: "600",
                      }}
                    >
                      Name
                    </label>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {selectedRecord.name}
                    </p>
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        fontWeight: "600",
                      }}
                    >
                      Phone
                    </label>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {selectedRecord.phone}
                    </p>
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        fontWeight: "600",
                      }}
                    >
                      Designation
                    </label>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {selectedRecord.designation}
                    </p>
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        fontWeight: "600",
                      }}
                    >
                      Department
                    </label>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {selectedRecord.department}
                    </p>
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        fontWeight: "600",
                      }}
                    >
                      Head Quarter
                    </label>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {selectedRecord.locationHQ}
                    </p>
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        fontWeight: "600",
                      }}
                    >
                      Arriving Train
                    </label>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {selectedRecord.arrivingTrain}
                    </p>
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        fontWeight: "600",
                      }}
                    >
                      Departure Train
                    </label>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {selectedRecord.departureTrain}
                    </p>
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        fontWeight: "600",
                      }}
                    >
                      Location
                    </label>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {selectedRecord.location}
                    </p>
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        fontWeight: "600",
                      }}
                    >
                      Room
                    </label>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {selectedRecord.room}
                    </p>
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        fontWeight: "600",
                      }}
                    >
                      Bed
                    </label>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {selectedRecord.bed}
                    </p>
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        fontWeight: "600",
                      }}
                    >
                      Request Checkin Date & Time
                    </label>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {selectedRecord.checkInDate}
                    </p>
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        fontWeight: "600",
                      }}
                    >
                      Actual Checkin Date
                    </label>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {selectedRecord.actualCheckInDate}
                    </p>
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        fontWeight: "600",
                      }}
                    >
                      Requested Checkout Date & Time
                    </label>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {selectedRecord.checkOutDate}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Modal>
        </MainContent>
      </ContentWrapper>
    </MainContainer>
  );
};

export default FreightBookings;
