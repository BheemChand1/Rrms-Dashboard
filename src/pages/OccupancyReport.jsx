import { useState } from "react";
import { Table, Button, Space, Input, Select, DatePicker } from "antd";
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

  .filter-item {
    display: flex;
    gap: 0.75rem;
    align-items: center;

    label {
      font-weight: 600;
      min-width: 80px;
      color: #2c3e50;
      font-size: 0.9rem;
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

    span {
      color: #5a6c7d;
      font-weight: 500;
    }
  }
`;

const occupancyData = [
  {
    key: "1",
    sNo: 1,
    name: "Munna Lal Meena",
    headQuarter: "COR",
    roomName: "Room No-10",
    bedNo: 38,
    designation: "Sr ALP",
    department: "Freight",
    checkinDate: "09-Feb-2026 15:38:19",
    checkoutDate: "Plan Checkout",
    status: "Checked-in",
    action: "Checked-Out",
  },
  {
    key: "2",
    sNo: 2,
    name: "Pukh raj meena",
    headQuarter: "cor",
    roomName: "Room No-10",
    bedNo: 37,
    designation: "Sr ALP",
    department: "Freight",
    checkinDate: "09-Feb-2026 15:38:17",
    checkoutDate: "Plan Checkout",
    status: "Checked-in",
    action: "Checked-Out",
  },
  {
    key: "3",
    sNo: 3,
    name: "Vinod Kumar Jangid",
    headQuarter: "COR",
    roomName: "Room No-13",
    bedNo: 45,
    designation: "Sr ALP",
    department: "Coaching",
    checkinDate: "09-Feb-2026 15:38:16",
    checkoutDate: "09-02-2026 21:05:00",
    status: "Checked-in",
    action: "Checked-Out",
  },
  {
    key: "4",
    sNo: 4,
    name: "Omprakash meena",
    headQuarter: "COr",
    roomName: "Room No-12",
    bedNo: 44,
    designation: "LP(P)",
    department: "Coaching",
    checkinDate: "09-Feb-2026 15:38:13",
    checkoutDate: "09-02-2026 21:05:00",
    status: "Checked-in",
    action: "Checked-Out",
  },
  {
    key: "5",
    sNo: 5,
    name: "Buddhi Prakash Saini",
    headQuarter: "Mj",
    roomName: "Room No-1",
    bedNo: 1,
    designation: "ALP",
    department: "Freight",
    checkinDate: "09-Feb-2026 14:39:31",
    checkoutDate: "Plan Checkout",
    status: "Checked-in",
    action: "Checked-Out",
  },
  {
    key: "6",
    sNo: 6,
    name: "RAMAVATAR MEENA",
    headQuarter: "CHITTORGARh",
    roomName: "Room No-3",
    bedNo: 10,
    designation: "Sr ALP",
    department: "Coaching",
    checkinDate: "09-Feb-2026 14:23:07",
    checkoutDate: "09-02-2026 21:05:00",
    status: "Checked-in",
    action: "Checked-Out",
  },
  {
    key: "7",
    sNo: 7,
    name: "Puran Prakash Shrivastav",
    headQuarter: "COR",
    roomName: "Room No-3",
    bedNo: 9,
    designation: "LP (M/Exp)",
    department: "Coaching",
    checkinDate: "09-Feb-2026 14:23:06",
    checkoutDate: "09-02-2026 21:05:00",
    status: "Checked-in",
    action: "Checked-Out",
  },
  {
    key: "8",
    sNo: 8,
    name: "Harish kumar Avasthi",
    headQuarter: "BKi",
    roomName: "Room No-4",
    bedNo: 13,
    designation: "Sr ALP",
    department: "Coaching",
    checkinDate: "09-Feb-2026 13:51:35",
    checkoutDate: "09-02-2026 20:35:00",
    status: "Checked-in",
    action: "Checked-Out",
  },
  {
    key: "9",
    sNo: 9,
    name: "Rakesh kumar sharma",
    headQuarter: "BKi",
    roomName: "Room No-4",
    bedNo: 14,
    designation: "LP (M/Exp)",
    department: "Coaching",
    checkinDate: "09-Feb-2026 13:51:33",
    checkoutDate: "09-02-2026 20:35:00",
    status: "Checked-in",
    action: "Checked-Out",
  },
  {
    key: "10",
    sNo: 10,
    name: "Kana Ram Meena",
    headQuarter: "Jp",
    roomName: "Room No-12",
    bedNo: 43,
    designation: "ALP",
    department: "Coaching",
    checkinDate: "09-Feb-2026 13:26:34",
    checkoutDate: "10-02-2026 01:10:00",
    status: "Checked-in",
    action: "Checked-Out",
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
    width: 120,
  },
  {
    title: "Head Quarter",
    dataIndex: "headQuarter",
    key: "headQuarter",
    width: 100,
  },
  {
    title: "Room Name",
    dataIndex: "roomName",
    key: "roomName",
    width: 100,
  },
  {
    title: "Bed No",
    dataIndex: "bedNo",
    key: "bedNo",
    width: 80,
    align: "center",
  },
  {
    title: "Designation",
    dataIndex: "designation",
    key: "designation",
    width: 100,
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
    width: 100,
  },
  {
    title: "Checkin Date/Time",
    dataIndex: "checkinDate",
    key: "checkinDate",
    width: 150,
  },
  {
    title: "Checkout Date/Time",
    dataIndex: "checkoutDate",
    key: "checkoutDate",
    width: 150,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 100,
    render: (text) => (
      <span
        style={{
          color: "#52c41a",
          fontWeight: "700",
          fontSize: "0.8rem",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          backgroundColor: "#f6ffed",
          padding: "4px 8px",
          borderRadius: "4px",
          display: "inline-block",
          border: "1px solid #b7eb8f",
        }}
      >
        {text}
      </span>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: 120,
    render: (text) => (
      <Button
        danger
        size="middle"
        style={{
          backgroundColor: "#ff4d4f",
          borderColor: "#ff4d4f",
          color: "white",
          fontWeight: "600",
          fontSize: "0.8rem",
          borderRadius: "6px",
          padding: "5px 12px",
          boxShadow: "0 2px 8px rgba(255, 77, 79, 0.2)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#ff7875";
          e.target.style.boxShadow = "0 4px 12px rgba(255, 77, 79, 0.4)";
          e.target.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#ff4d4f";
          e.target.style.boxShadow = "0 2px 8px rgba(255, 77, 79, 0.2)";
          e.target.style.transform = "translateY(0)";
        }}
      >
        {text}
      </Button>
    ),
  },
];

const OccupancyReport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredData = occupancyData.filter((item) =>
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
            <div className="filter-item">
              <label>Search:</label>
              <Input
                placeholder="Search by name, room, bed, etc..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 300 }}
              />
            </div>
            <div className="filter-item">
              <label>Show</label>
              <Select defaultValue="10" style={{ width: 80 }}>
                <Select.Option value="10">10</Select.Option>
                <Select.Option value="25">25</Select.Option>
                <Select.Option value="50">50</Select.Option>
                <Select.Option value="100">100</Select.Option>
              </Select>
              <span>entries</span>
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
              scroll={{ x: 1200 }}
              size="small"
            />
          </TableWrapper>
        </MainContent>
      </ContentWrapper>
    </MainContainer>
  );
};

export default OccupancyReport;
