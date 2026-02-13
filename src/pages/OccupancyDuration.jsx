import { useState } from "react";
import { Table, Input, Select, DatePicker, Button } from "antd";
import { SearchOutlined, RedoOutlined } from "@ant-design/icons";
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
  select {
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

const SummaryStatistics = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1024px) {
    gap: 1rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

const StatItem = styled.div`
  font-size: 0.875rem;
  color: #222a3a;
  font-weight: 600;

  .label {
    color: #6b7280;
  }

  .value {
    color: #222a3a;
    font-weight: 700;
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

// Sample data for Occupancy Duration
const sampleData = [
  {
    key: "1",
    srNo: 1,
    date: "01-02-2026",
    lessThan8: 16,
    between8to10: 14,
    between10to12: 14,
    moreThan12: 28,
    totalOccupancy: 72,
  },
  {
    key: "2",
    srNo: 2,
    date: "02-02-2026",
    lessThan8: 18,
    between8to10: 19,
    between10to12: 17,
    moreThan12: 14,
    totalOccupancy: 68,
  },
  {
    key: "3",
    srNo: 3,
    date: "03-02-2026",
    lessThan8: 27,
    between8to10: 10,
    between10to12: 16,
    moreThan12: 13,
    totalOccupancy: 66,
  },
  {
    key: "4",
    srNo: 4,
    date: "04-02-2026",
    lessThan8: 16,
    between8to10: 17,
    between10to12: 14,
    moreThan12: 17,
    totalOccupancy: 64,
  },
  {
    key: "5",
    srNo: 5,
    date: "05-02-2026",
    lessThan8: 22,
    between8to10: 13,
    between10to12: 13,
    moreThan12: 26,
    totalOccupancy: 74,
  },
  {
    key: "6",
    srNo: 6,
    date: "06-02-2026",
    lessThan8: 24,
    between8to10: 5,
    between10to12: 13,
    moreThan12: 18,
    totalOccupancy: 60,
  },
  {
    key: "7",
    srNo: 7,
    date: "07-02-2026",
    lessThan8: 28,
    between8to10: 11,
    between10to12: 14,
    moreThan12: 20,
    totalOccupancy: 73,
  },
  {
    key: "8",
    srNo: 8,
    date: "08-02-2026",
    lessThan8: 11,
    between8to10: 10,
    between10to12: 23,
    moreThan12: 31,
    totalOccupancy: 75,
  },
  {
    key: "9",
    srNo: 9,
    date: "09-02-2026",
    lessThan8: 23,
    between8to10: 10,
    between10to12: 22,
    moreThan12: 13,
    totalOccupancy: 68,
  },
  {
    key: "10",
    srNo: 10,
    date: "10-02-2026",
    lessThan8: 27,
    between8to10: 8,
    between10to12: 16,
    moreThan12: 16,
    totalOccupancy: 67,
  },
];

const columns = [
  {
    title: "Sr.No.",
    dataIndex: "srNo",
    key: "srNo",
    width: 70,
    align: "center",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: 100,
    align: "center",
  },
  {
    title: "Less Than 8 Hours",
    dataIndex: "lessThan8",
    key: "lessThan8",
    width: 120,
    align: "center",
  },
  {
    title: "Between 8-10 Hours",
    dataIndex: "between8to10",
    key: "between8to10",
    width: 120,
    align: "center",
  },
  {
    title: "Between 10-12 Hours",
    dataIndex: "between10to12",
    key: "between10to12",
    width: 120,
    align: "center",
  },
  {
    title: "More Than 12 Hours",
    dataIndex: "moreThan12",
    key: "moreThan12",
    width: 120,
    align: "center",
  },
  {
    title: "Total Occupancy",
    dataIndex: "totalOccupancy",
    key: "totalOccupancy",
    width: 110,
    align: "center",
  },
];

const OccupancyDuration = () => {
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

  // Calculate totals
  const totals = {
    totalOccupancy: sampleData.reduce(
      (sum, item) => sum + item.totalOccupancy,
      0,
    ),
    lessThan8: sampleData.reduce((sum, item) => sum + item.lessThan8, 0),
    between8to10: sampleData.reduce((sum, item) => sum + item.between8to10, 0),
    between10to12: sampleData.reduce(
      (sum, item) => sum + item.between10to12,
      0,
    ),
    moreThan12: sampleData.reduce((sum, item) => sum + item.moreThan12, 0),
  };

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
          <PageTitle>Occupancy Duration</PageTitle>

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
                  style={{
                    height: "2rem",
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.75rem",
                  }}
                >
                  Reset
                </Button>
              </ButtonGroup>
            </FilterRow>
          </FilterContainer>

          {/* Summary Statistics */}
          <SummaryStatistics>
            <StatItem>
              <span className="label">Total Occupancy: </span>
              <span className="value">{totals.totalOccupancy}</span>
            </StatItem>
            <StatItem>
              <span className="label">Total Less Than 8 Hours: </span>
              <span className="value">{totals.lessThan8}</span>
            </StatItem>
            <StatItem>
              <span className="label">Total Between 8-10 Hours: </span>
              <span className="value">{totals.between8to10}</span>
            </StatItem>
            <StatItem>
              <span className="label">Total Between 10-12 Hours: </span>
              <span className="value">{totals.between10to12}</span>
            </StatItem>
            <StatItem>
              <span className="label">Total More Than 12 Hours: </span>
              <span className="value">{totals.moreThan12}</span>
            </StatItem>
          </SummaryStatistics>

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

export default OccupancyDuration;
