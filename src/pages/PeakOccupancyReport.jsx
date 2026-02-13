import { useState } from "react";
import { Table, Input, Select, DatePicker } from "antd";
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

// Sample data for Peak Occupancy
const sampleData = [
  {
    key: "1",
    srNo: 1,
    peakOccupancy: 36,
    time: "February 1, 2026, 12:11 PM",
  },
  {
    key: "2",
    srNo: 2,
    peakOccupancy: 44,
    time: "February 2, 2026, 12:11 PM",
  },
  {
    key: "3",
    srNo: 3,
    peakOccupancy: 37,
    time: "February 3, 2026, 3:11 PM",
  },
  {
    key: "4",
    srNo: 4,
    peakOccupancy: 30,
    time: "February 4, 2026, 3:11 AM",
  },
  {
    key: "5",
    srNo: 5,
    peakOccupancy: 44,
    time: "February 5, 2026, 5:11 PM",
  },
  {
    key: "6",
    srNo: 6,
    peakOccupancy: 36,
    time: "February 6, 2026, 3:11 AM",
  },
  {
    key: "7",
    srNo: 7,
    peakOccupancy: 38,
    time: "February 7, 2026, 4:11 AM",
  },
  {
    key: "8",
    srNo: 8,
    peakOccupancy: 38,
    time: "February 8, 2026, 4:11 PM",
  },
  {
    key: "9",
    srNo: 9,
    peakOccupancy: 45,
    time: "February 9, 2026, 4:11 AM",
  },
  {
    key: "10",
    srNo: 10,
    peakOccupancy: 33,
    time: "February 10, 2026, 4:11 AM",
  },
  {
    key: "11",
    srNo: 11,
    peakOccupancy: 42,
    time: "February 11, 2026, 2:30 PM",
  },
  {
    key: "12",
    srNo: 12,
    peakOccupancy: 40,
    time: "February 12, 2026, 1:45 PM",
  },
];

const columns = [
  {
    title: "Sr.No.",
    dataIndex: "srNo",
    key: "srNo",
    width: 80,
    align: "center",
  },
  {
    title: "Peak Occupancy",
    dataIndex: "peakOccupancy",
    key: "peakOccupancy",
    width: 150,
    align: "center",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    width: 200,
  },
];

const PeakOccupancyReport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);

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
          <PageTitle>Peak Occupancy Hour Report</PageTitle>

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
                <button
                  style={{
                    backgroundColor: "#10b981",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    height: "2rem",
                  }}
                >
                  Go
                </button>
                <button
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    height: "2rem",
                  }}
                >
                  Reset
                </button>
              </ButtonGroup>
            </FilterRow>
          </FilterContainer>

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
              <Input
                placeholder="Search:"
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
                        currentPage === i + 1 ? "#10b981" : "white",
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

export default PeakOccupancyReport;
