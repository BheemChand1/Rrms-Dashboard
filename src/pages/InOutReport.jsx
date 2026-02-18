import { useState } from "react";
import { Table, Button, Input, Select, DatePicker, Space } from "antd";
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
  padding: 0.75rem;
  overflow: auto;

  @media (min-width: 1024px) {
    padding: 1rem;
  }
  @media (min-width: 1280px) {
    padding: 1.5rem;
  }
  @media (min-width: 1536px) {
    padding: 2rem;
  }
`;

const TableWrapper = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;

  .ant-table {
    font-size: 0.875rem;
  }

  .ant-table-thead > tr > th {
    background-color: #26c0a0;
    color: white;
    font-weight: 600;
    font-size: 0.875rem;
    padding: 12px 16px !important;
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
    padding: 14px 12px;
    border-bottom: 1px solid #f0f0f0;
    text-align: center;
  }

  .ant-table-wrapper {
    border-radius: 8px;
    overflow: hidden;
  }

  .ant-pagination {
    margin-top: 1.5rem;
    text-align: right;

    .ant-pagination-item-active {
      background-color: #26c0a0;
      border-color: #26c0a0;

      a {
        color: white;
      }
    }

    .ant-pagination-item:hover {
      color: #26c0a0;
      border-color: #26c0a0;
    }

    .ant-pagination-prev:hover a,
    .ant-pagination-next:hover a {
      color: #26c0a0;
    }
  }

  /* Scrollbar styling */
  .ant-table-body {
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: #26c0a0;
      border-radius: 10px;

      &:hover {
        background: #1f9a7e;
      }
    }
  }
`;

const FilterContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
  background: linear-gradient(135deg, #f9fffe 0%, #f0f9f7 100%);
  padding: 1.25rem 1.5rem;
  border-radius: 10px;
  border: 1px solid #e8f7f4;

  .filter-group {
    display: flex;
    gap: 0.75rem;
    align-items: center;

    label {
      font-weight: 600;
      min-width: auto;
      color: #2c3e50;
      font-size: 0.9rem;
      white-space: nowrap;
    }

    input,
    select {
      border-radius: 6px;
      border: 1px solid #d9e8e4;
      transition: all 0.3s ease;

      &:focus,
      &:hover {
        border-color: #26c0a0;
        box-shadow: 0 2px 8px rgba(38, 192, 160, 0.1);
      }
    }

    .ant-picker {
      border-radius: 6px !important;
    }

    span {
      color: #5a6c7d;
      font-weight: 500;
    }
  }

  .search-section {
    margin-left: auto;
    display: flex;
    gap: 0.75rem;
    align-items: center;

    @media (max-width: 768px) {
      margin-left: 0;
      width: 100%;

      input {
        flex: 1;
      }
    }
  }
`;

const inOutData = [
  {
    key: "1",
    sNo: 1,
    name: "MUKESH KUMAR PANDEY",
    cmsId: "HAPA7138",
    headQuarter: "HAPA",
    designation: "TM",
    department: "Freight",
    outTime: "2025-08-01 17:30:00",
    inTime: "2025-08-01 18:30:00",
    reason: "working",
  },
  {
    key: "2",
    sNo: 2,
    name: "Dilip Gohil",
    cmsId: "HAPA1301",
    headQuarter: "HAPA",
    designation: "LP(G)",
    department: "Freight",
    outTime: "2025-08-01 17:30:00",
    inTime: "2025-08-01 18:30:00",
    reason: "working",
  },
  {
    key: "3",
    sNo: 3,
    name: "HITEN MANSUKHLAL VARAN",
    cmsId: "HAPA1354",
    headQuarter: "HAPA",
    designation: "LP(G)",
    department: "Freight",
    outTime: "2025-08-02 19:00:00",
    inTime: "2025-08-02 19:21:00",
    reason: "market",
  },
  {
    key: "4",
    sNo: 4,
    name: "BHARAT BHUSHAN",
    cmsId: "HAPA1207",
    headQuarter: "HAPA",
    designation: "LP(G)",
    department: "Freight",
    outTime: "2025-08-02 18:10:00",
    inTime: "2025-08-02 18:40:00",
    reason: "working",
  },
  {
    key: "5",
    sNo: 5,
    name: "Ravish Kumar",
    cmsId: "HAPA1493",
    headQuarter: "HApa",
    designation: "Sr ALP",
    department: "Freight",
    outTime: "2025-08-02 18:10:00",
    inTime: "2025-08-02 18:40:00",
    reason: "working",
  },
  {
    key: "6",
    sNo: 6,
    name: "Dharamshi R",
    cmsId: "RJT1480",
    headQuarter: "RJT",
    designation: "LP (M/Exp)",
    department: "Coaching",
    outTime: "2025-08-03 17:10:00",
    inTime: "2025-08-03 18:20:00",
    reason: "MANDIR",
  },
  {
    key: "7",
    sNo: 7,
    name: "Jaydip Girishbhai babariya",
    cmsId: "RJT1398",
    headQuarter: "RAJKOT",
    designation: "Sr ALP",
    department: "Coaching",
    outTime: "2025-08-03 17:10:00",
    inTime: "2025-08-03 18:20:00",
    reason: "MANDIR",
  },
  {
    key: "8",
    sNo: 8,
    name: "D K PARMAR",
    cmsId: "RJT077",
    headQuarter: "OKHa",
    designation: "TM",
    department: "Coaching",
    outTime: "2025-08-04 18:35:00",
    inTime: "2025-08-04 19:00:00",
    reason: "market",
  },
  {
    key: "9",
    sNo: 9,
    name: "D D JADEJA",
    cmsId: "RJT1353",
    headQuarter: "RJt",
    designation: "LP(P)",
    department: "Coaching",
    outTime: "2025-08-05 18:41:00",
    inTime: "2025-08-05 18:50:00",
    reason: "market",
  },
  {
    key: "10",
    sNo: 10,
    name: "Anu Ranjan",
    cmsId: "HAPA7059",
    headQuarter: "HAPa",
    designation: "TM",
    department: "Coaching",
    outTime: "2025-08-06 18:20:00",
    inTime: "2025-08-06 19:00:00",
    reason: "working",
  },
];

const columns = [
  {
    title: "S.No",
    dataIndex: "sNo",
    key: "sNo",
    width: 60,
    align: "center",
    render: (text) => (
      <span
        style={{
          fontWeight: "700",
          color: "white",
          backgroundColor: "#26c0a0",
          padding: "4px 8px",
          borderRadius: "4px",
          display: "inline-block",
          minWidth: "32px",
          textAlign: "center",
        }}
      >
        {text}
      </span>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 140,
    align: "center",
  },
  {
    title: "CMS_id",
    dataIndex: "cmsId",
    key: "cmsId",
    width: 110,
    align: "center",
  },
  {
    title: "Head Quarter",
    dataIndex: "headQuarter",
    key: "headQuarter",
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
    title: "Department",
    dataIndex: "department",
    key: "department",
    width: 110,
    align: "center",
  },
  {
    title: "Out_Time",
    dataIndex: "outTime",
    key: "outTime",
    width: 150,
    align: "center",
  },
  {
    title: "In_Time",
    dataIndex: "inTime",
    key: "inTime",
    width: 150,
    align: "center",
  },
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    width: 120,
    align: "center",
    render: (text) => (
      <span
        style={{
          color: "#004225",
          fontWeight: "600",
          fontSize: "0.8rem",
          textTransform: "capitalize",
          backgroundColor: "#e6f7f0",
          padding: "4px 8px",
          borderRadius: "4px",
          display: "inline-block",
          border: "1px solid #87d5c0",
        }}
      >
        {text}
      </span>
    ),
  },
];

const InOutReport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchText, setSearchText] = useState("");

  const filteredData = inOutData.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchText.toLowerCase()),
    ),
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
          <FilterContainer>
            <div className="filter-group">
              <label>From:</label>
              <DatePicker
                format="DD-MM-YYYY"
                value={startDate}
                onChange={(date) => setStartDate(date)}
                style={{ width: 150 }}
              />
            </div>
            <div className="filter-group">
              <label>To:</label>
              <DatePicker
                format="DD-MM-YYYY"
                value={endDate}
                onChange={(date) => setEndDate(date)}
                style={{ width: 150 }}
              />
            </div>
            <div className="filter-group">
              <label>Show</label>
              <Select defaultValue="10" style={{ width: 80 }}>
                <Select.Option value="10">10</Select.Option>
                <Select.Option value="25">25</Select.Option>
                <Select.Option value="50">50</Select.Option>
                <Select.Option value="100">100</Select.Option>
              </Select>
              <span>entries</span>
            </div>
            <div className="search-section">
              <label>Search:</label>
              <Input
                placeholder="Search by name, CMS ID, reason..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 300 }}
              />
            </div>
          </FilterContainer>

          <TableWrapper>
            <Table
              columns={columns}
              dataSource={filteredData}
              pagination={{
                total: filteredData.length,
                pageSize: 10,
                current: 1,
                showSizeChanger: false,
                showQuickJumper: true,
              }}
              scroll={{ x: 1400 }}
              size="small"
            />
          </TableWrapper>
        </MainContent>
      </ContentWrapper>
    </MainContainer>
  );
};

export default InOutReport;
