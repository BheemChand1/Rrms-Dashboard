import { useState } from "react";
import { Button, Input, Select, DatePicker, AutoComplete, message } from "antd";
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

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 2.5rem;
  background: linear-gradient(135deg, #07a759 0%, #48a9d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
`;

const FormWrapper = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  width: 100%;
  max-width: none;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const FormContainer = styled.div`
  display: grid;
  gap: 2rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  &.full {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 0;
  display: flex;
  flex-direction: column;

  label {
    display: block;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
    letter-spacing: 0.3px;

    span {
      color: #ff4d4f;
      margin-left: 0.25rem;
    }
  }

  input,
  textarea,
  .ant-select,
  .ant-picker {
    width: 100%;
    border-radius: 8px;
    border: 1px solid #d9e8e4 !important;
    transition: all 0.3s ease;
    font-size: 0.95rem;

    &:focus,
    &:hover {
      border-color: #26c0a0 !important;
      box-shadow: 0 2px 12px rgba(38, 192, 160, 0.15) !important;
    }
  }

  .ant-select-selector {
    border-radius: 8px !important;
    font-size: 0.95rem;
  }

  .ant-picker {
    border-radius: 8px !important;
    font-size: 0.95rem;

    input {
      border: none !important;
      font-size: 0.95rem;
    }
  }

  textarea {
    resize: vertical;
    min-height: 120px;
    font-family: inherit;
    padding: 0.75rem;

    &:focus {
      outline: none;
    }
  }

  .ant-select-clear {
    font-size: 1rem;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 3rem;
  justify-content: flex-end;
  padding-top: 2rem;
  border-top: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }

  button {
    min-width: 140px;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;
    padding: 0.6rem 1.75rem;
    font-size: 0.95rem;
    height: 40px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }
  }
`;

const SuccessMessage = styled.div`
  background: linear-gradient(135deg, #f6ffed 0%, #f0fdf4 100%);
  border: 2px solid #b7eb8f;
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 2rem;
  color: #52c41a;
  font-weight: 600;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 2px 8px rgba(82, 196, 26, 0.1);
`;

// Sample user data - replace with API call
const sampleUsersData = [
  { id: 1, name: "Munna Lal Meena", cmsId: "CMS001", designation: "Sr ALP" },
  { id: 2, name: "Pukh raj meena", cmsId: "CMS002", designation: "Sr ALP" },
  { id: 3, name: "Vinod Kumar Jangid", cmsId: "CMS003", designation: "Sr ALP" },
  { id: 4, name: "Omprakash meena", cmsId: "CMS004", designation: "LP(P)" },
  { id: 5, name: "Buddhi Prakash Saini", cmsId: "CMS005", designation: "ALP" },
  { id: 6, name: "RAMAVATAR MEENA", cmsId: "CMS006", designation: "Sr ALP" },
  {
    id: 7,
    name: "Puran Prakash Shrivastav",
    cmsId: "CMS007",
    designation: "LP (M/Exp)",
  },
  {
    id: 8,
    name: "Harish kumar Avasthi",
    cmsId: "CMS008",
    designation: "Sr ALP",
  },
  {
    id: 9,
    name: "Rakesh kumar sharma",
    cmsId: "CMS009",
    designation: "LP (M/Exp)",
  },
  { id: 10, name: "Kana Ram Meena", cmsId: "CMS010", designation: "ALP" },
];

const reasonOptions = [
  { value: "checkout", label: "Checkout" },
  { value: "leave", label: "Leave" },
  { value: "medical", label: "Medical" },
  { value: "emergency", label: "Emergency" },
  { value: "personal", label: "Personal" },
  { value: "official_duty", label: "Official Duty" },
  { value: "other", label: "Other" },
];

const SetInOut = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [outDateTime, setOutDateTime] = useState(null);
  const [reason, setReason] = useState(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Generate autocomplete options
  const userOptions = sampleUsersData.map((user) => ({
    value: user.id.toString(),
    label: `${user.name} (${user.cmsId})`,
    user: user,
  }));

  const handleUserSelect = (userId) => {
    const user = sampleUsersData.find((u) => u.id === parseInt(userId));
    setSelectedUser(user);
  };

  const handleSubmit = async () => {
    if (!selectedUser || !outDateTime || !reason) {
      message.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      message.success("In-Out record has been set successfully!");
      // Reset form after 2 seconds
      setTimeout(() => {
        handleReset();
      }, 1500);
    }, 500);
  };

  const handleReset = () => {
    setSelectedUser(null);
    setOutDateTime(null);
    setReason(null);
    setNotes("");
    setSubmitted(false);
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
          <PageTitle>Set In-Out Register</PageTitle>

          <FormWrapper>
            {submitted && (
              <SuccessMessage>
                ✓ In-Out record set successfully for {selectedUser?.name}
              </SuccessMessage>
            )}

            <FormContainer>
              <FormRow className="full">
                <FormGroup>
                  <label>
                    Search & Select User <span>*</span>
                  </label>
                  <AutoComplete
                    placeholder="Search by name or CMS ID..."
                    options={userOptions}
                    onSelect={handleUserSelect}
                    value={
                      selectedUser
                        ? `${selectedUser.name} (${selectedUser.cmsId})`
                        : ""
                    }
                    onChange={(value) => {
                      if (!value) setSelectedUser(null);
                    }}
                    filterOption={(inputValue, option) =>
                      option.label
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    }
                  />
                  {selectedUser && (
                    <div
                      style={{
                        marginTop: "0.75rem",
                        fontSize: "0.85rem",
                        color: "#5a6c7d",
                        backgroundColor: "#f0f9f7",
                        padding: "0.75rem",
                        borderRadius: "6px",
                        border: "1px solid #e8f7f4",
                      }}
                    >
                      <div>
                        <strong style={{ color: "#07a759" }}>Name:</strong>{" "}
                        {selectedUser.name}
                      </div>
                      <div>
                        <strong style={{ color: "#07a759" }}>CMS ID:</strong>{" "}
                        {selectedUser.cmsId}
                      </div>
                      <div>
                        <strong style={{ color: "#07a759" }}>
                          Designation:
                        </strong>{" "}
                        {selectedUser.designation}
                      </div>
                    </div>
                  )}
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <label>
                    Out DateTime <span>*</span>
                  </label>
                  <DatePicker
                    showTime
                    format="DD-MM-YYYY HH:mm:ss"
                    value={outDateTime}
                    onChange={(date) => setOutDateTime(date)}
                    placeholder="Select out date and time"
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Reason for In-Out <span>*</span>
                  </label>
                  <Select
                    placeholder="Select a reason"
                    value={reason}
                    onChange={(value) => setReason(value)}
                    options={reasonOptions}
                  />
                </FormGroup>
              </FormRow>

              <FormRow className="full">
                <FormGroup>
                  <label>Additional Notes</label>
                  <textarea
                    placeholder="Add any additional notes or comments..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </FormGroup>
              </FormRow>
            </FormContainer>

            <FormActions>
              <Button
                onClick={handleReset}
                style={{
                  borderColor: "#26c0a0",
                  color: "#26c0a0",
                  fontWeight: "600",
                  backgroundColor: "#f0f9f7",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#e8f7f4";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#f0f9f7";
                }}
              >
                Clear Form
              </Button>
              <Button
                type="primary"
                loading={loading}
                onClick={handleSubmit}
                style={{
                  background: "linear-gradient(to right, #07a759, #48a9d4)",
                  borderColor: "transparent",
                  fontWeight: "600",
                  height: "40px",
                  paddingLeft: "28px",
                  paddingRight: "28px",
                  fontSize: "0.95rem",
                }}
              >
                Set In-Out
              </Button>
            </FormActions>
          </FormWrapper>
        </MainContent>
      </ContentWrapper>
    </MainContainer>
  );
};

export default SetInOut;
