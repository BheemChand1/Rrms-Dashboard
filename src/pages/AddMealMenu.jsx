import { useState } from "react";
import { Button, Input, Tabs, Space } from "antd";
import { Edit2, Trash2 } from "lucide-react";
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

const BackButton = styled(Button)`
  margin-bottom: 1rem;
  border-color: #3b82f6;
  color: #3b82f6;

  &:hover {
    color: #1d4ed8;
    border-color: #1d4ed8;
  }
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 1.875rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: #6b7280;
  }
`;

const LocationBadge = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.875rem;

  @media (max-width: 768px) {
    top: auto;
    right: auto;
    position: static;
    margin-bottom: 1rem;
  }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const LeftPanel = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  border-left: 5px solid #3b82f6;
`;

const RightPanel = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  border-left: 5px solid #3b82f6;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
  border-left: 4px solid #3b82f6;
  padding-left: 0.75rem;
`;

const MealTypeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const MealTypeButton = styled(Button)`
  padding: 0.5rem 1.25rem;
  height: 2.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 20px;
  transition: all 0.3s ease;

  &.selected {
    background-color: #3b82f6 !important;
    color: white !important;
    border-color: #3b82f6 !important;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
  }

  input {
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 0.875rem;

    &:focus {
      border-color: #3b82f6;
      outline: none;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 2rem;

  button {
    flex: 1;
    padding: 0.75rem;
    font-weight: 600;
    border-radius: 8px;
    height: auto;
    font-size: 0.875rem;
  }
`;

const AddButton = styled(Button)`
  background-color: #06b6d4 !important;
  color: white !important;
  border: none !important;

  &:hover {
    background-color: #0891b2 !important;
  }
`;

const SaveButton = styled(Button)`
  background-color: #10b981 !important;
  color: white !important;
  border: none !important;

  &:hover {
    background-color: #059669 !important;
  }
`;

const TabContainer = styled.div`
  margin-bottom: 1.5rem;

  .ant-tabs-nav {
    border-bottom: 2px solid #e5e7eb;
  }

  .ant-tabs-tab {
    font-weight: 600;
    font-size: 0.875rem;
    padding: 0.75rem 1rem;

    &.ant-tabs-tab-active {
      color: #3b82f6;
    }

    &.ant-tabs-tab-active .ant-tabs-tab-btn::after {
      background: #3b82f6;
    }
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background-color: #3b4563;
    color: white;
  }

  th {
    padding: 0.75rem;
    text-align: left;
    font-weight: 600;
    font-size: 0.875rem;
    border: 1px solid #e5e7eb;
  }

  td {
    padding: 0.75rem;
    border: 1px solid #e5e7eb;
    font-size: 0.875rem;
  }

  tbody tr {
    transition: all 0.3s ease;

    &:nth-child(even) {
      background-color: #f9fffe;
    }

    &:hover {
      background-color: #e8f7f4;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;

  button {
    padding: 0.5rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .edit-btn {
    background-color: #fbbf24;
    color: white;

    &:hover {
      background-color: #f59e0b;
    }
  }

  .delete-btn {
    background-color: #ef4444;
    color: white;

    &:hover {
      background-color: #dc2626;
    }
  }
`;

const AddMealMenu = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState("Breakfast");
  const [mealName, setMealName] = useState("");
  const [meals, setMeals] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Parcel"];

  const handleAddMeal = () => {
    if (mealName.trim()) {
      const newMeal = {
        id: Date.now(),
        type: selectedMealType,
        name: mealName,
      };
      setMeals([...meals, newMeal]);
      setMealName("");
    }
  };

  const handleAddAnother = () => {
    if (mealName.trim()) {
      const newMeal = {
        id: Date.now(),
        type: selectedMealType,
        name: mealName,
      };
      setMeals([...meals, newMeal]);
      setMealName("");
    }
  };

  const handleDeleteMeal = (id) => {
    setMeals(meals.filter((meal) => meal.id !== id));
  };

  const handleEditMeal = (id) => {
    const meal = meals.find((m) => m.id === id);
    if (meal) {
      setMealName(meal.name);
      setSelectedMealType(meal.type);
      setMeals(meals.filter((m) => m.id !== id));
    }
  };

  const filteredMeals =
    activeTab === "all"
      ? meals
      : meals.filter((meal) => meal.type === activeTab);

  const tabs = [
    { key: "all", label: "All" },
    { key: "Breakfast", label: "Breakfast" },
    { key: "Lunch", label: "Lunch" },
    { key: "Dinner", label: "Dinner" },
    { key: "Parcel", label: "Parcel" },
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
          <BackButton type="default" size="large">
            ← Back to Dashboard
          </BackButton>

          <LocationBadge>📍 Ajmer</LocationBadge>

          <PageHeader>
            <h1>Railway Running Room</h1>
            <p>Food Menu</p>
          </PageHeader>

          <ContentContainer>
            {/* Left Panel - Add New Meals */}
            <LeftPanel>
              <SectionTitle>Add New Meals</SectionTitle>

              <FormGroup>
                <label>Select Meal Type:</label>
                <MealTypeContainer>
                  {mealTypes.map((type) => (
                    <MealTypeButton
                      key={type}
                      className={selectedMealType === type ? "selected" : ""}
                      onClick={() => setSelectedMealType(type)}
                      type={selectedMealType === type ? "primary" : "default"}
                    >
                      {type}
                    </MealTypeButton>
                  ))}
                </MealTypeContainer>
              </FormGroup>

              <FormGroup>
                <label>Meal Name:</label>
                <input
                  type="text"
                  placeholder="Enter meal name"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddMeal();
                    }
                  }}
                />
              </FormGroup>

              <ButtonGroup>
                <AddButton onClick={handleAddAnother}>
                  + Add Another Meal
                </AddButton>
                <SaveButton onClick={handleAddMeal}>Save Meals</SaveButton>
              </ButtonGroup>
            </LeftPanel>

            {/* Right Panel - Current Menu Items */}
            <RightPanel>
              <SectionTitle>Current Menu Items</SectionTitle>

              <TabContainer>
                <Tabs
                  activeKey={activeTab}
                  onChange={setActiveTab}
                  items={tabs.map((tab) => ({
                    key: tab.key,
                    label: tab.label,
                  }))}
                />
              </TabContainer>

              <TableContainer>
                {filteredMeals.length > 0 ? (
                  <Table>
                    <thead>
                      <tr>
                        <th>TYPE</th>
                        <th>NAME</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMeals.map((meal) => (
                        <tr key={meal.id}>
                          <td>{meal.type}</td>
                          <td>{meal.name}</td>
                          <td>
                            <ActionButtons>
                              <button
                                className="edit-btn"
                                onClick={() => handleEditMeal(meal.id)}
                                title="Edit meal"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                className="delete-btn"
                                onClick={() => handleDeleteMeal(meal.id)}
                                title="Delete meal"
                              >
                                <Trash2 size={16} />
                              </button>
                            </ActionButtons>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                      color: "#9ca3af",
                    }}
                  >
                    No meals added yet
                  </div>
                )}
              </TableContainer>
            </RightPanel>
          </ContentContainer>

          {/* Footer */}
          <footer
            style={{
              marginTop: "2rem",
              paddingTop: "1rem",
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

export default AddMealMenu;
