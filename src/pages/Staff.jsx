import { useState } from "react";
import { Table, Button, Input, Select } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useParams } from "react-router-dom";
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
    background-color: #2d7d8f;
    color: white;
    font-weight: 600;
    font-size: 0.8rem;
    padding: 8px 12px !important;
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
    padding: 8px 10px;
    border-bottom: 1px solid #f0f0f0;
    text-align: center;
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

const staffData = [
  {
    key: "1",
    srNo: 1,
    name: "vinu dangar",
    phone: "9724044164",
    designation: "CLI",
    locationHQ: "DHAGANDHARA",
    type: "Railway",
    idProof: "N/A",
    policeVerification: "N/A",
    medicalCertificate: "N/A",
  },
  {
    key: "2",
    srNo: 2,
    name: "SHIVAM YADAV",
    phone: "9519704652",
    designation: "RECEPTION MANAGER",
    locationHQ: "DHAGANDHARA",
    type: "Contractor",
    idProof: "N/A",
    policeVerification: "View",
    medicalCertificate: "View",
  },
  {
    key: "3",
    srNo: 3,
    name: "Mukesh kumar",
    phone: "9935692525",
    designation: "Supervisor",
    locationHQ: "DHAGANDHARA",
    type: "Contractor",
    idProof: "View",
    policeVerification: "View",
    medicalCertificate: "View",
  },
  {
    key: "4",
    srNo: 4,
    name: "Avinash Rawat",
    phone: "0000000",
    designation: "Bearer",
    locationHQ: "DHAGANDHARA",
    type: "Contractor",
    idProof: "View",
    policeVerification: "View",
    medicalCertificate: "View",
  },
  {
    key: "5",
    srNo: 5,
    name: "Dhunaben",
    phone: "0000000",
    designation: "Bearer",
    locationHQ: "DHAGANDHARA",
    type: "Contractor",
    idProof: "View",
    policeVerification: "View",
    medicalCertificate: "View",
  },
  {
    key: "6",
    srNo: 6,
    name: "Manish kumar Rawat",
    phone: "88888888",
    designation: "Bearer",
    locationHQ: "DHAGANDHARA",
    type: "Contractor",
    idProof: "View",
    policeVerification: "View",
    medicalCertificate: "View",
  },
  {
    key: "7",
    srNo: 7,
    name: "Solanki suresh Bhai",
    phone: "000000",
    designation: "Sweeper",
    locationHQ: "DHAGANDHARA",
    type: "Contractor",
    idProof: "View",
    policeVerification: "View",
    medicalCertificate: "View",
  },
  {
    key: "8",
    srNo: 8,
    name: "Ashok kumar sharma",
    phone: "9999999",
    designation: "Cook",
    locationHQ: "DHAGANDHARA",
    type: "Contractor",
    idProof: "View",
    policeVerification: "View",
    medicalCertificate: "View",
  },
  {
    key: "9",
    srNo: 9,
    name: "Hemant meena",
    phone: "888888",
    designation: "Cook",
    locationHQ: "DHAGANDHARA",
    type: "Contractor",
    idProof: "View",
    policeVerification: "View",
    medicalCertificate: "View",
  },
  {
    key: "10",
    srNo: 10,
    name: "SITA BAI",
    phone: "88888888",
    designation: "Bearer",
    locationHQ: "DHAGANDHARA",
    type: "Contractor",
    idProof: "View",
    policeVerification: "View",
    medicalCertificate: "View",
  },
];

const Staff = () => {
  const { staffType } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);

  // Filter data based on staff type
  const filteredByType =
    staffType === "all"
      ? staffData
      : staffData.filter((item) => item.type === staffType);

  // Filter by search text
  const filteredData = filteredByType.filter((item) =>
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
      width: 120,
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
      width: 130,
      align: "center",
    },
    {
      title: "Location HQ",
      dataIndex: "locationHQ",
      key: "locationHQ",
      width: 120,
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 100,
      align: "center",
    },
    {
      title: "ID Proof",
      dataIndex: "idProof",
      key: "idProof",
      width: 100,
      align: "center",
      render: (text) =>
        text === "View" ? (
          <Button
            type="primary"
            size="small"
            style={{ backgroundColor: "#3b82f6" }}
          >
            {text}
          </Button>
        ) : (
          <span>{text}</span>
        ),
    },
    {
      title: "Police Verification",
      dataIndex: "policeVerification",
      key: "policeVerification",
      width: 140,
      align: "center",
      render: (text) =>
        text === "View" ? (
          <Button
            type="primary"
            size="small"
            style={{ backgroundColor: "#3b82f6" }}
          >
            {text}
          </Button>
        ) : (
          <span>{text}</span>
        ),
    },
    {
      title: "Medical Certificate",
      dataIndex: "medicalCertificate",
      key: "medicalCertificate",
      width: 140,
      align: "center",
      render: (text) =>
        text === "View" ? (
          <Button
            type="primary"
            size="small"
            style={{ backgroundColor: "#3b82f6" }}
          >
            {text}
          </Button>
        ) : (
          <span>{text}</span>
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
          <PageTitle>
            Staff - {staffType === "all" ? "All Staff" : staffType}
          </PageTitle>

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
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <Button
                  size="small"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from(
                  { length: Math.ceil(filteredData.length / pageSize) },
                  (_, i) => i + 1,
                ).map((page) => (
                  <Button
                    key={page}
                    size="small"
                    type={currentPage === page ? "primary" : "default"}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  size="small"
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
                >
                  Next
                </Button>
              </div>
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
        </MainContent>
      </ContentWrapper>
    </MainContainer>
  );
};

export default Staff;
