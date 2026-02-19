import { useState } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  DatePicker,
  Pagination,
  Modal,
} from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
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

const FilterContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: flex-end;
  margin-bottom: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #222a3a;
  }

  input,
  select,
  .ant-select {
    font-size: 0.75rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;

    button {
      width: 100%;
    }
  }
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

// Meal report data
const mealReportData = [
  {
    key: "1",
    srNo: 1,
    name: "Kartar Singh panwar",
    cmsId: "COR1665",
    phone: "9770901737",
    designation: "ALP",
    baseLocation: "COR",
    mealType: "Lunch",
    mealBookingDate: "2026-02-19 15:57:45",
    paymentDate: "2026-02-19 15:57:54",
    amount: 5.0,
    paymentMode: "Cash",
    paymentStatus: "Paid",
  },
  {
    key: "2",
    srNo: 2,
    name: "NANA LAL KUMAWAT",
    cmsId: "COR1381",
    phone: "9001196329",
    designation: "LP(P)",
    baseLocation: "COR",
    mealType: "Dinner",
    mealBookingDate: "2026-02-19 15:56:37",
    paymentDate: "2026-02-19 15:57:13",
    amount: 5.0,
    paymentMode: "Cash",
    paymentStatus: "Paid",
  },
  {
    key: "3",
    srNo: 3,
    name: "NANA LAL KUMAWAT",
    cmsId: "COR1381",
    phone: "9001196329",
    designation: "LP(P)",
    baseLocation: "COR",
    mealType: "Lunch",
    mealBookingDate: "2026-02-19 15:56:25",
    paymentDate: "2026-02-19 15:57:20",
    amount: 5.0,
    paymentMode: "Cash",
    paymentStatus: "Paid",
  },
  {
    key: "4",
    srNo: 4,
    name: "Ramhari meena",
    cmsId: "1816",
    phone: "9001030163",
    designation: "ALP",
    baseLocation: "BKI",
    mealType: "Lunch",
    mealBookingDate: "2026-02-19 15:23:42",
    paymentDate: "2026-02-19 15:23:53",
    amount: 5.0,
    paymentMode: "Cash",
    paymentStatus: "Paid",
  },
  {
    key: "5",
    srNo: 5,
    name: "NITYANAND SHARMA",
    cmsId: "COR1682",
    phone: "9770901760",
    designation: "LP (G)",
    baseLocation: "COR",
    mealType: "Lunch",
    mealBookingDate: "2026-02-19 14:40:54",
    paymentDate: "2026-02-19 14:41:12",
    amount: 5.0,
    paymentMode: "Cash",
    paymentStatus: "Paid",
  },
  {
    key: "6",
    srNo: 6,
    name: "NITYANAND SHARMA",
    cmsId: "COR1682",
    phone: "9770901760",
    designation: "LP (G)",
    baseLocation: "COR",
    mealType: "Breakfast",
    mealBookingDate: "2026-02-19 14:40:32",
    paymentDate: "2026-02-19 14:41:21",
    amount: 5.0,
    paymentMode: "Cash",
    paymentStatus: "Paid",
  },
  {
    key: "7",
    srNo: 7,
    name: "Gangadhar saini",
    cmsId: "KOTA1131",
    phone: "9001015143",
    designation: "LP (M/Exp)",
    baseLocation: "KOTA",
    mealType: "Lunch",
    mealBookingDate: "2026-02-19 13:14:39",
    paymentDate: "2026-02-19 13:14:51",
    amount: 5.0,
    paymentMode: "Cash",
    paymentStatus: "Paid",
  },
  {
    key: "8",
    srNo: 8,
    name: "Gangadhar saini",
    cmsId: "KOTA1131",
    phone: "9001015143",
    designation: "LP (M/Exp)",
    baseLocation: "KOTA",
    mealType: "Breakfast",
    mealBookingDate: "2026-02-19 13:14:04",
    paymentDate: "2026-02-19 13:14:22",
    amount: 5.0,
    paymentMode: "Cash",
    paymentStatus: "Paid",
  },
  {
    key: "9",
    srNo: 9,
    name: "Bhera Ram Gurjar",
    cmsId: "JU1874",
    phone: "9001032174",
    designation: "LP(P)",
    baseLocation: "JU",
    mealType: "Lunch",
    mealBookingDate: "2026-02-19 13:09:44",
    paymentDate: "2026-02-19 13:10:03",
    amount: 5.0,
    paymentMode: "Cash",
    paymentStatus: "Paid",
  },
  {
    key: "10",
    srNo: 10,
    name: "Chart lal meena",
    cmsId: "JU2458",
    phone: "9001033091",
    designation: "Sr ALP",
    baseLocation: "JU",
    mealType: "Lunch",
    mealBookingDate: "2026-02-19 13:09:28",
    paymentDate: "2026-02-19 13:09:55",
    amount: 5.0,
    paymentMode: "Cash",
    paymentStatus: "Paid",
  },
  {
    key: "11",
    srNo: 11,
    name: "Raj Kumar Singh",
    cmsId: "COR1234",
    phone: "9876543210",
    designation: "ALP",
    baseLocation: "COR",
    mealType: "Dinner",
    mealBookingDate: "2026-02-19 18:30:15",
    paymentDate: "2026-02-19 18:30:45",
    amount: 6.0,
    paymentMode: "Card",
    paymentStatus: "Paid",
  },
  {
    key: "12",
    srNo: 12,
    name: "Priya Sharma",
    cmsId: "BKI1450",
    phone: "9765432101",
    designation: "LP(G)",
    baseLocation: "BKI",
    mealType: "Breakfast",
    mealBookingDate: "2026-02-19 08:15:20",
    paymentDate: "2026-02-19 08:15:55",
    amount: 3.5,
    paymentMode: "Cash",
    paymentStatus: "Paid",
  },
  {
    key: "13",
    srNo: 13,
    name: "Vikram Kumar",
    cmsId: "COR1999",
    phone: "9876543219",
    designation: "ALP",
    baseLocation: "COR",
    mealType: "Lunch",
    mealBookingDate: "2026-02-19 12:30:00",
    paymentDate: "",
    amount: 5.0,
    paymentMode: "Pending",
    paymentStatus: "Unpaid",
  },
];

const MealReport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [otpInput, setOtpInput] = useState("");

  const handleGenerateReport = () => {
    alert("Generating meal report...");
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedRecord(null);
    setOtpInput("");
  };

  const handleOtpDone = () => {
    if (otpInput.trim()) {
      alert(`OTP Verified: ${otpInput}. Payment confirmed.`);
      handleCloseModal();
    } else {
      alert("Please enter OTP");
    }
  };

  const handleOtpReject = () => {
    alert("Payment rejected.");
    handleCloseModal();
  };

  const filteredData = mealReportData.filter((item) =>
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
      width: 140,
      align: "center",
    },
    {
      title: "CMS Id",
      dataIndex: "cmsId",
      key: "cmsId",
      width: 100,
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
      width: 110,
      align: "center",
    },
    {
      title: "Base Location",
      dataIndex: "baseLocation",
      key: "baseLocation",
      width: 110,
      align: "center",
    },
    {
      title: "Meal Type",
      dataIndex: "mealType",
      key: "mealType",
      width: 100,
      align: "center",
    },
    {
      title: "Meal Booking Date",
      dataIndex: "mealBookingDate",
      key: "mealBookingDate",
      width: 150,
      align: "center",
    },
    {
      title: "Payment Date",
      dataIndex: "paymentDate",
      key: "paymentDate",
      width: 150,
      align: "center",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 80,
      align: "center",
      render: (amount) => `₹${amount.toFixed(2)}`,
    },
    {
      title: "Payment Mode",
      dataIndex: "paymentMode",
      key: "paymentMode",
      width: 110,
      align: "center",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: 110,
      align: "center",
      render: (status) => (
        <span
          style={{
            color: status === "Paid" ? "#10b981" : "#ef4444",
            fontWeight: "600",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Details",
      key: "action",
      width: 80,
      align: "center",
      render: (_, record) => {
        const isPaid = record.paymentStatus === "Paid";
        return isPaid ? (
          <Button
            type="text"
            icon={
              <EyeInvisibleOutlined
                style={{ fontSize: "1.1rem", color: "#9ca3af" }}
              />
            }
            disabled
          />
        ) : (
          <Button
            type="text"
            icon={
              <EyeOutlined style={{ fontSize: "1.1rem", color: "#3b82f6" }} />
            }
            onClick={() => handleViewDetails(record)}
          />
        );
      },
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
          <PageTitle>Meal Report</PageTitle>

          {/* Filters */}
          <FilterContainer>
            <FilterRow>
              <FilterGroup>
                <label>Date From</label>
                <DatePicker
                  format="dd-MM-yyyy"
                  style={{ width: "110px", fontSize: "0.75rem" }}
                />
              </FilterGroup>

              <FilterGroup>
                <label>Date To</label>
                <DatePicker
                  format="dd-MM-yyyy"
                  style={{ width: "110px", fontSize: "0.75rem" }}
                />
              </FilterGroup>

              <ButtonGroup>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleSearch}
                  style={{
                    backgroundColor: "#10b981",
                    height: "2rem",
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.75rem",
                  }}
                >
                  Go
                </Button>
                <Button
                  type="primary"
                  onClick={handleGenerateReport}
                  style={{
                    backgroundColor: "#10b981",
                    height: "2rem",
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.75rem",
                  }}
                >
                  Generate Meal Report
                </Button>
              </ButtonGroup>
            </FilterRow>
          </FilterContainer>

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

          {/* Meal Details Modal */}
          <Modal
            title={
              selectedRecord?.paymentStatus === "Paid"
                ? "Meal Booking Details"
                : "Verify OTP for Payment"
            }
            open={modalVisible}
            onCancel={handleCloseModal}
            footer={
              selectedRecord?.paymentStatus === "Unpaid"
                ? [
                    <Button
                      key="reject"
                      onClick={handleOtpReject}
                      style={{ backgroundColor: "#ef4444", color: "white" }}
                    >
                      Reject
                    </Button>,
                    <Button
                      key="done"
                      type="primary"
                      onClick={handleOtpDone}
                      style={{ backgroundColor: "#10b981" }}
                    >
                      Done
                    </Button>,
                  ]
                : [
                    <Button
                      key="close"
                      type="primary"
                      onClick={handleCloseModal}
                    >
                      Close
                    </Button>,
                  ]
            }
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
                {selectedRecord.paymentStatus === "Unpaid" && (
                  <div
                    style={{
                      padding: "1rem",
                      backgroundColor: "#fef3c7",
                      borderRadius: "8px",
                      border: "1px solid #fbbf24",
                      marginBottom: "1rem",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.85rem",
                        color: "#78350f",
                        fontWeight: "600",
                        display: "block",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Enter OTP to verify payment
                    </label>
                    <Input
                      placeholder="Enter 6-digit OTP"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      maxLength="6"
                      style={{
                        height: "2.5rem",
                        fontSize: "1rem",
                        letterSpacing: "0.2rem",
                        textAlign: "center",
                      }}
                    />
                  </div>
                )}
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
                      CMS ID
                    </label>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {selectedRecord.cmsId}
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
                      Base Location
                    </label>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {selectedRecord.baseLocation}
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
                      Meal Type
                    </label>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {selectedRecord.mealType}
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
                      Meal Booking Date & Time
                    </label>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {selectedRecord.mealBookingDate}
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
                      Payment Date & Time
                    </label>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {selectedRecord.paymentDate}
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
                      Amount
                    </label>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      ₹{selectedRecord.amount.toFixed(2)}
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
                      Payment Mode
                    </label>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {selectedRecord.paymentMode}
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
                      Payment Status
                    </label>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        margin: "0.25rem 0 0 0",
                        color:
                          selectedRecord.paymentStatus === "Paid"
                            ? "#10b981"
                            : "#ef4444",
                      }}
                    >
                      {selectedRecord.paymentStatus}
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

export default MealReport;
