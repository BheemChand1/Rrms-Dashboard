import { useState } from "react";
import {
  Table,
  Button,
  Space,
  Input,
  Select,
  DatePicker,
  Pagination,
} from "antd";
import {
  SearchOutlined,
  RedoOutlined,
  DownloadOutlined,
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
    width: ${(props) => (props.collapsed ? "4rem" : "14rem")};
    @media (min-width: 1280px) {
      width: ${(props) => (props.collapsed ? "4rem" : "16rem")};
    }
    @media (min-width: 1536px) {
      width: ${(props) => (props.collapsed ? "4rem" : "18rem")};
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

const SummaryInfo = styled.div`
  background: white;
  border-radius: 12px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  .label {
    font-size: 0.65rem;
    color: #6b7280;
    font-weight: 600;
    text-transform: uppercase;
  }

  .value {
    font-size: 1rem;
    font-weight: 700;
    color: #222a3a;
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

// Sample data
const sampleData = [
  {
    key: "1",
    srNo: 1,
    name: "Purushottam",
    cmsId: "COR1589",
    designation: "LP (MlExp)",
    hq: "COR",
    gender: "Male",
    checkInDateTime: "13-02-2026 14:08:22",
    checkOutDateTime: "Ongoing Booking",
    roomNo: "Room No.3",
    bedNo: 2,
    restHours: "3 hours : 18 minutes",
  },
  {
    key: "2",
    srNo: 2,
    name: "Mukesh meena",
    cmsId: "COR1479",
    designation: "Sr ALP",
    hq: "COR",
    gender: "Male",
    checkInDateTime: "13-02-2026 14:08:21",
    checkOutDateTime: "13.02.2026 14:51:06",
    roomNo: "Room No.3",
    bedNo: 1,
    restHours: "0 hours : 42 minutes",
  },
  {
    key: "3",
    srNo: 3,
    name: "Ramesh Kumar Prajapat",
    cmsId: "FL2219",
    designation: "LP (G)",
    hq: "FL",
    gender: "Male",
    checkInDateTime: "13-02-2026 13:26:40",
    checkOutDateTime: "Ongoing Booking",
    roomNo: "Room No.10",
    bedNo: 4,
    restHours: "3 hours : 59 minutes",
  },
  {
    key: "4",
    srNo: 4,
    name: "NARSI RAM MEENA",
    cmsId: "FL2209",
    designation: "LP (G)",
    hq: "FL",
    gender: "Male",
    checkInDateTime: "13-02-2026 13:26:41",
    checkOutDateTime: "Ongoing Booking",
    roomNo: "Room No.10",
    bedNo: 3,
    restHours: "3 hours : 59 minutes",
  },
  {
    key: "5",
    srNo: 5,
    name: "Girraj kumar jangid",
    cmsId: "JP2130",
    designation: "Sr ALP",
    hq: "JP",
    gender: "Male",
    checkInDateTime: "13-02-2026 13:26:39",
    checkOutDateTime: "Ongoing Booking",
    roomNo: "Room No.10",
    bedNo: 2,
    restHours: "3 hours : 59 minutes",
  },
  {
    key: "6",
    srNo: 6,
    name: "Nand kishore",
    cmsId: "JP1919",
    designation: "LP (MlExp)",
    hq: "JP",
    gender: "Male",
    checkInDateTime: "13-02-2026 13:26:38",
    checkOutDateTime: "Ongoing Booking",
    roomNo: "Room No.13",
    bedNo: 1,
    restHours: "3 hours : 59 minutes",
  },
  {
    key: "7",
    srNo: 7,
    name: "GOURAV JINGER",
    cmsId: "UDZ1339",
    designation: "Sr ALP",
    hq: "UDZ",
    gender: "Male",
    checkInDateTime: "13-02-2026 12:55:42",
    checkOutDateTime: "Ongoing Booking",
    roomNo: "Room No.11",
    bedNo: 4,
    restHours: "4 hours : 30 minutes",
  },
  {
    key: "8",
    srNo: 8,
    name: "Mahaveer prasad kumawat",
    cmsId: "UDZ1291",
    designation: "LP(P)",
    hq: "UDZ",
    gender: "Male",
    checkInDateTime: "13-02-2026 12:55:39",
    checkOutDateTime: "Ongoing Booking",
    roomNo: "Room No.13",
    bedNo: 2,
    restHours: "4 hours : 30 minutes",
  },
  {
    key: "9",
    srNo: 9,
    name: "बलनारायण",
    cmsId: "1953",
    designation: "LP (MlExp)",
    hq: "JP",
    gender: "Male",
    checkInDateTime: "13-02-2026 12:55:38",
    checkOutDateTime: "Ongoing Booking",
    roomNo: "Room No.1",
    bedNo: 3,
    restHours: "4 hours : 30 minutes",
  },
  {
    key: "10",
    srNo: 10,
    name: "Niraj Kumar",
    cmsId: "Jp2289",
    designation: "ALP",
    hq: "JP",
    gender: "Male",
    checkInDateTime: "13-02-2026 11:08:32",
    checkOutDateTime: "Ongoing Booking",
    roomNo: "Room No.1",
    bedNo: 2,
    restHours: "6 hours : 17 minutes",
  },
];

const columns = [
  {
    title: "Sr.No.",
    dataIndex: "srNo",
    key: "srNo",
    width: 50,
    align: "center",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 120,
  },
  {
    title: "CMS ID",
    dataIndex: "cmsId",
    key: "cmsId",
    width: 85,
  },
  {
    title: "Designation",
    dataIndex: "designation",
    key: "designation",
    width: 100,
  },
  {
    title: "HQ",
    dataIndex: "hq",
    key: "hq",
    width: 60,
    align: "center",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    width: 80,
  },
  {
    title: "Check-in Date & Time",
    dataIndex: "checkInDateTime",
    key: "checkInDateTime",
    width: 150,
  },
  {
    title: "Check-out Date & Time",
    dataIndex: "checkOutDateTime",
    key: "checkOutDateTime",
    width: 150,
  },
  {
    title: "Room No.",
    dataIndex: "roomNo",
    key: "roomNo",
    width: 85,
  },
  {
    title: "Bed No.",
    dataIndex: "bedNo",
    key: "bedNo",
    width: 70,
    align: "center",
  },
  {
    title: "Rest Hours",
    dataIndex: "restHours",
    key: "restHours",
    width: 120,
  },
];

const OccupancySummary = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const handleExport = () => {
    // Export functionality can be implemented here
    alert("Export functionality to be implemented");
  };

  const handleReset = () => {
    // Reset filters
    alert("Reset functionality to be implemented");
  };

  const handleSearch = () => {
    // Search functionality
    alert("Search functionality to be implemented");
  };

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
          <PageTitle>Occupancy Summary</PageTitle>

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
                  danger
                  icon={<RedoOutlined />}
                  onClick={handleReset}
                  style={{
                    height: "2rem",
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.75rem",
                  }}
                >
                  Reset
                </Button>
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={handleExport}
                  style={{
                    backgroundColor: "#10b981",
                    height: "2rem",
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.75rem",
                  }}
                >
                  Export
                </Button>
              </ButtonGroup>
            </FilterRow>
          </FilterContainer>

          {/* Summary Info */}
          <SummaryInfo>
            <SummaryItem>
              <div className="label">Location</div>
              <div className="value">Ajmer</div>
            </SummaryItem>
            <SummaryItem>
              <div className="label">Date From</div>
              <div className="value">13-02-2026</div>
            </SummaryItem>
            <SummaryItem>
              <div className="label">Date To</div>
              <div className="value">13-02-2026</div>
            </SummaryItem>
            <SummaryItem>
              <div className="label">Total No. Of Occupancy</div>
              <div className="value">47</div>
            </SummaryItem>
            <SummaryItem>
              <div className="label">Avg Rest Hours</div>
              <div className="value">7 hours : 51 min</div>
            </SummaryItem>
            <SummaryItem>
              <div className="label">Male</div>
              <div className="value">47</div>
            </SummaryItem>
            <SummaryItem>
              <div className="label">Female</div>
              <div className="value">0</div>
            </SummaryItem>
            <SummaryItem>
              <div className="label">Avg Occupancy</div>
              <div className="value">47</div>
            </SummaryItem>
          </SummaryInfo>

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
        </MainContent>
      </ContentWrapper>
    </MainContainer>
  );
};

export default OccupancySummary;
