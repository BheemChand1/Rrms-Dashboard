import { useState } from "react";
import { Table, Button, Input, Select, DatePicker } from "antd";
import { Volume2 } from "lucide-react";
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

const StatisticsRow = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 1rem;
  padding: 0.75rem 0;
  flex-wrap: wrap;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1f2937;

  @media (max-width: 768px) {
    gap: 0.75rem;
    font-size: 0.8rem;
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
    background-color: #3fa9d6;
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

const feedbackData = [
  {
    key: "1",
    srNo: 1,
    name: "RAJ KISHOR SINGH",
    phone: "8140354414",
    designation: "LP(G)",
    location: "Dhagandhara",
    date: "10-02-2026",
    score: 4.8,
    rating: "48%",
  },
  {
    key: "2",
    srNo: 2,
    name: "Rajeev Kumar",
    phone: "9724044289",
    designation: "LP(G)",
    location: "Dhagandhara",
    date: "28-01-2026",
    score: 5.8,
    rating: "58%",
  },
  {
    key: "3",
    srNo: 3,
    name: "Rajeev Kumar",
    phone: "9724044289",
    designation: "LP(G)",
    location: "Dhagandhara",
    date: "13-01-2026",
    score: 6.4,
    rating: "64%",
  },
  {
    key: "4",
    srNo: 4,
    name: "Manoj. B. Parmar",
    phone: "9724044618",
    designation: "LP(G)",
    location: "Dhagandhara",
    date: "30-12-2025",
    score: 7.8,
    rating: "78%",
  },
  {
    key: "5",
    srNo: 5,
    name: "Manoj. B. Parmar",
    phone: "9724044618",
    designation: "LP(G)",
    location: "Dhagandhara",
    date: "30-12-2025",
    score: 7.8,
    rating: "78%",
  },
  {
    key: "6",
    srNo: 6,
    name: "Manoj. B. Parmar",
    phone: "9724044618",
    designation: "LP(G)",
    location: "Dhagandhara",
    date: "10-12-2025",
    score: 7.6,
    rating: "76%",
  },
  {
    key: "7",
    srNo: 7,
    name: "Amit singh",
    phone: "9451260895",
    designation: "TM",
    location: "Dhagandhara",
    date: "18-11-2025",
    score: 3.3,
    rating: "33%",
  },
  {
    key: "8",
    srNo: 8,
    name: "Abhay Kumar Prasad",
    phone: "9724045935",
    designation: "LP(G)",
    location: "Dhagandhara",
    date: "14-11-2025",
    score: 8.1,
    rating: "81%",
  },
  {
    key: "9",
    srNo: 9,
    name: "Rajat sachan",
    phone: "7043784058",
    designation: "TM",
    location: "Dhagandhara",
    date: "27-10-2025",
    score: 1.1,
    rating: "11%",
  },
  {
    key: "10",
    srNo: 10,
    name: "SHER SINGH SHEKHAWAT",
    phone: "8955051671",
    designation: "ALP",
    location: "Dhagandhara",
    date: "14-10-2025",
    score: 5.9,
    rating: "59%",
  },
];

const FeedbackReport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const filteredData = feedbackData.filter((item) =>
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

  // Calculate statistics
  const totalFeedback = feedbackData.length;
  const highRating = feedbackData.filter((item) => item.score >= 7).length;
  const lowRating = feedbackData.filter((item) => item.score <= 3).length;
  const overallRating =
    (feedbackData.reduce((sum, item) => sum + item.score, 0) /
      feedbackData.length /
      10) *
    100;

  const columns = [
    {
      title: "Sr.No.",
      dataIndex: "srNo",
      key: "srNo",
      width: 60,
      align: "center",
    },
    {
      title: "Details",
      key: "details",
      width: 80,
      align: "center",
      render: () => (
        <Button
          type="text"
          icon={<Volume2 size={18} style={{ color: "#999" }} />}
          style={{ padding: 0 }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
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
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 120,
      align: "center",
    },
    {
      title: "Dates",
      dataIndex: "date",
      key: "date",
      width: 110,
      align: "center",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      width: 80,
      align: "center",
    },
    {
      title: "RATING",
      dataIndex: "rating",
      key: "rating",
      width: 100,
      align: "center",
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
          <PageTitle>Feedback Report</PageTitle>

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
                  onClick={() => alert("Filtering...")}
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
                  onClick={() => alert("Reset filters")}
                  style={{
                    backgroundColor: "#ef4444",
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

          {/* Statistics */}
          <StatisticsRow>
            <div>
              Total Feedback: <strong>{totalFeedback}</strong>
            </div>
            <div>
              High Rating: <strong>{highRating}</strong>
            </div>
            <div>
              Low Rating: <strong>{lowRating}</strong>
            </div>
            <div>
              Overall Rating: <strong>{overallRating.toFixed(2)}%</strong>
            </div>
          </StatisticsRow>

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

export default FeedbackReport;
