import React, { useState } from "react";
import styled from "styled-components";
import { Table, DatePicker, Input, Button } from "antd";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/Sidebar";

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
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;

    input,
    .ant-picker {
      width: 100%;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;

    button {
      flex: 1;
    }
  }
`;

const TableWrapper = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  padding: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .ant-table {
    font-size: 0.75rem;
  }

  .ant-table-wrapper {
    overflow: auto;
  }

  .ant-table-thead > tr > th {
    background-color: #26c0a0 !important;
    color: white !important;
    font-weight: 700;
    padding: 0.5rem !important;
    text-align: center;
    white-space: nowrap;
  }

  .ant-table-tbody > tr > td {
    padding: 0.5rem !important;
    text-align: center;
    white-space: nowrap;
  }

  .ant-table-tbody > tr:hover > td {
    background-color: #f0fffe !important;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;

    .ant-table {
      font-size: 0.65rem;
    }

    .ant-table-thead > tr > th {
      padding: 0.35rem !important;
    }

    .ant-table-tbody > tr > td {
      padding: 0.35rem !important;
    }
  }
`;

const TableControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
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

const sampleData = [
  {
    key: "1",
    srNo: 1,
    name: "Hemraj kharol",
    cmsId: "COR1480",
    designation: "Sr ALP",
    hq: "COR",
    gender: "Male",
    roomNo: "Room No-17",
    bedNo: 2,
    wakeupTime: "Wakeup call not set",
    wakeupStatus: "Not Done",
  },
  {
    key: "2",
    srNo: 2,
    name: "Shridhar upadhyay",
    cmsId: "COR1361",
    designation: "LP(P)",
    hq: "COR",
    gender: "Male",
    roomNo: "Room No-1",
    bedNo: 4,
    wakeupTime: "13-02-2026 06:00:00",
    wakeupStatus: "Done",
  },
  {
    key: "3",
    srNo: 3,
    name: "Purushottam",
    cmsId: "COR1589",
    designation: "LP (Mi/Exp)",
    hq: "COR",
    gender: "Male",
    roomNo: "Room No-3",
    bedNo: 2,
    wakeupTime: "Wakeup call not set",
    wakeupStatus: "Not Done",
  },
  {
    key: "4",
    srNo: 4,
    name: "Mukesh meena",
    cmsId: "COR1479",
    designation: "Sr ALP",
    hq: "COR",
    gender: "Male",
    roomNo: "Room No-3",
    bedNo: 1,
    wakeupTime: "13-02-2026 05:30:00",
    wakeupStatus: "Done",
  },
  {
    key: "5",
    srNo: 5,
    name: "Ramesh Kumar Prajapat",
    cmsId: "FL2219",
    designation: "LP (G)",
    hq: "FL",
    gender: "Male",
    roomNo: "Room No-10",
    bedNo: 4,
    wakeupTime: "Wakeup call not set",
    wakeupStatus: "Not Done",
  },
  {
    key: "6",
    srNo: 6,
    name: "NARSI RAM MEENA",
    cmsId: "FL2209",
    designation: "LP (G)",
    hq: "FL",
    gender: "Male",
    roomNo: "Room No-10",
    bedNo: 3,
    wakeupTime: "13-02-2026 07:00:00",
    wakeupStatus: "Done",
  },
  {
    key: "7",
    srNo: 7,
    name: "Girraj kumar jangid",
    cmsId: "JP2130",
    designation: "Sr ALP",
    hq: "JP",
    gender: "Male",
    roomNo: "Room No-10",
    bedNo: 2,
    wakeupTime: "13-02-2026 06:30:00",
    wakeupStatus: "Done",
  },
  {
    key: "8",
    srNo: 8,
    name: "Nand kishore",
    cmsId: "JP1919",
    designation: "LP (Mi/Exp)",
    hq: "JP",
    gender: "Male",
    roomNo: "Room No-13",
    bedNo: 1,
    wakeupTime: "Wakeup call not set",
    wakeupStatus: "Not Done",
  },
  {
    key: "9",
    srNo: 9,
    name: "GOURAV JINGER",
    cmsId: "UDZ1339",
    designation: "Sr ALP",
    hq: "UDZ",
    gender: "Male",
    roomNo: "Room No-11",
    bedNo: 4,
    wakeupTime: "13-02-2026 05:00:00",
    wakeupStatus: "Done",
  },
  {
    key: "10",
    srNo: 10,
    name: "Mahaveer prasad kumawat",
    cmsId: "UDZ1291",
    designation: "LP(P)",
    hq: "UDZ",
    gender: "Male",
    roomNo: "Room No-13",
    bedNo: 2,
    wakeupTime: "13-02-2026 06:15:00",
    wakeupStatus: "Done",
  },
  {
    key: "11",
    srNo: 11,
    name: "Rahul Singh",
    cmsId: "COR1500",
    designation: "Sr ALP",
    hq: "COR",
    gender: "Male",
    roomNo: "Room No-5",
    bedNo: 3,
    wakeupTime: "Wakeup call not set",
    wakeupStatus: "Not Done",
  },
  {
    key: "12",
    srNo: 12,
    name: "Vikram Kumar",
    cmsId: "FL2300",
    designation: "LP (G)",
    hq: "FL",
    gender: "Male",
    roomNo: "Room No-8",
    bedNo: 1,
    wakeupTime: "13-02-2026 07:30:00",
    wakeupStatus: "Done",
  },
];

const WakeupHistory = () => {
  const [filteredData, setFilteredData] = useState(sampleData);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  React.useEffect(() => {
    let filtered = sampleData;

    if (searchText) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.cmsId.toLowerCase().includes(searchText.toLowerCase()) ||
          item.roomNo.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchText]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const columns = [
    {
      title: "Sr.No.",
      dataIndex: "srNo",
      key: "srNo",
      width: 45,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "CMS ID",
      dataIndex: "cmsId",
      key: "cmsId",
      width: 80,
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      width: 90,
    },
    {
      title: "HQ",
      dataIndex: "hq",
      key: "hq",
      width: 50,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 60,
    },
    {
      title: "Room No.",
      dataIndex: "roomNo",
      key: "roomNo",
      width: 90,
    },
    {
      title: "Bed No.",
      dataIndex: "bedNo",
      key: "bedNo",
      width: 60,
    },
    {
      title: "Wakeup Time",
      dataIndex: "wakeupTime",
      key: "wakeupTime",
      width: 120,
    },
    {
      title: "Wakeup Status",
      dataIndex: "wakeupStatus",
      key: "wakeupStatus",
      width: 90,
    },
  ];

  return (
    <MainContainer>
      <Sidebar />
      <SidebarSpacer collapsed={false} />
      <ContentWrapper>
        <Header />
        <HeaderSpacer />
        <MainContent>
          <FilterContainer>
            <FilterRow>
              <FilterGroup>
                <span style={{ fontSize: "0.75rem", fontWeight: "600" }}>
                  From:
                </span>
                <DatePicker
                  placeholder="dd-mm-yyyy"
                  style={{ width: "150px", height: "2rem" }}
                />
              </FilterGroup>
              <FilterGroup>
                <span style={{ fontSize: "0.75rem", fontWeight: "600" }}>
                  To:
                </span>
                <DatePicker
                  placeholder="dd-mm-yyyy"
                  style={{ width: "150px", height: "2rem" }}
                />
              </FilterGroup>
              <ButtonGroup>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#26c0a0",
                    height: "2rem",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  Go
                </Button>
                <Button
                  danger
                  style={{
                    height: "2rem",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  Reset
                </Button>
                <Button
                  style={{
                    backgroundColor: "#26c0a0",
                    color: "white",
                    height: "2rem",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  Export
                </Button>
              </ButtonGroup>
            </FilterRow>
          </FilterContainer>

          <TableWrapper>
            <TableControlsWrapper>
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <span style={{ fontSize: "0.75rem", fontWeight: "600" }}>
                  Show
                </span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  style={{
                    padding: "0.25rem 0.5rem",
                    fontSize: "0.75rem",
                    height: "2rem",
                    border: "1px solid #d9d9d9",
                    borderRadius: "4px",
                  }}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
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

            <Table
              columns={columns}
              dataSource={paginatedData}
              pagination={false}
              bordered
              size="small"
              scroll={{ x: 785 }}
            />

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

export default WakeupHistory;
