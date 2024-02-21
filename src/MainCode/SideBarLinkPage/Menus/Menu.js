import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Tag,
  Form,
  Modal,
  Select,
  Alert,
  message,
} from "antd";
import {
  CreateMenu,
  UpdateMenu,
  DeleteMenu,
  GetKitchenMenus,
  setIsModalVisible,
} from "../../../Features/kitchenSlice";
import moment from "moment";
import {
  selectKitchen,
  useAppSelector,
  useAppDispatch,
} from "../../../Store/store";

const { Column } = Table;
const { Search } = Input;

const MenuScreen = () => {
  const dispatch = useAppDispatch();
  const { userData, isLoading, menus, isModalVisible } =
    useAppSelector(selectKitchen);
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuAlertVisible, setNewMenuAlertVisible] = useState(false);
  const [editMenuAlertVisible, setEditMenuAlertVisible] = useState(false);
  const [deleteMenuAlertVisible, setDeleteMenuAlertVisible] = useState(false);
  const [stage, setStage] = useState(0);
  const [editItem, setEditItem] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [formData, setFormData] = useState({
    KitchenId: userData.Id,
    FoodName: "",
    Category: "",
    Class: "",
    TotalQuantity: "",
    Status: "",
    Price: "",
  });

  useEffect(() => {
    // if (!menus) {
    const isBasicStaff = userData.Role === "basic";
    const kitchenId = isBasicStaff ? userData.KitchenId : userData.Id;
    dispatch(GetKitchenMenus(kitchenId));
    // }
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  useEffect(() => {
    setMenuItems(menus);
  }, []);

  const fetchMenus = async () => {
    const isBasicStaff = userData.Role === "basic";
    const kitchenId = isBasicStaff ? userData.KitchenId : userData.Id;
    dispatch(GetKitchenMenus(kitchenId));
  };

  useEffect(() => {
    const intervalId = setInterval(fetchMenus, 2000);
    return () => clearInterval(intervalId);
  }, []);

  //Items to show in a table not to cause TMI
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFormSubmit = async (values) => {
    const isBasicStaff = userData.Role === "basic";
    const kitchenId = isBasicStaff ? userData.KitchenId : userData.Id;
    const newValues = {
      ...formData,
      KitchenId: kitchenId,
      Status: formData.TotalQuantity > 0 ? "available" : "finished",
      // CreatedAt: moment().toISOString(),
    };

    dispatch(CreateMenu(userData, newValues));
    dispatch(setIsModalVisible(false));
    setStage(0);
  };

  const handleEdit = (record) => {
    setEditItem(record);
    setEditModalVisible(true);
  };

  const handleDelete = async (record) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this menu item?",
      okText: "Yes",
      cancelText: "No",
      okButtonProps: {
        type: "danger",
      },
      onOk: async () => {
        const isBasicStaff = userData.Role === "basic";
        const kitchenId = isBasicStaff ? userData.KitchenId : userData.Id;
        dispatch(DeleteMenu(record.Id, kitchenId));
      },
    });
  };

  const handleEditFormSubmit = async (values) => {
    const menuId = editItem ? editItem.key : null;
    if (!menuId) {
      console.error("MenuId is undefined or null.");
      return;
    }

    const payload = {
      TotalQuantity: values.TotalQuantity,
      Price: values.Price,
      Status: values.TotalQuantity > 0 ? "available" : "finished",
    };

    const isBasicStaff = userData.Role === "basic";
    const kitchenId = isBasicStaff ? userData.KitchenId : userData.Id;
    dispatch(UpdateMenu(menuId, kitchenId, payload));
    setEditModalVisible(false);
  };

  const filteredMenuItems = menus
    ? menus
        .filter(
          (item) =>
            item.FoodName &&
            item.FoodName.toLowerCase().includes(searchText.toLowerCase())
        )
        .sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt))
        .map((item) => ({ ...item, key: item.Id }))
    : [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div style={{ marginLeft: "2%" }}>
      <div
        style={{ display: "flex", flexDirection: "row", marginLeft: "auto" }}
      >
        <h1 style={{ fontFamily: "sans-serif, OpenSans", marginTop: "1rem" }}>
          Menus
        </h1>
        <div
          style={{ display: "flex", flexDirection: "row", marginLeft: "auto" }}
        >
          <Search
            placeholder="Search for menus"
            style={{ width: "20rem", marginRight: "1rem", marginTop: "1rem" }}
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            type="primary"
            style={{ marginLeft: "auto", marginTop: "1rem" }}
            onClick={() => {
              dispatch(setIsModalVisible(true));
            }}
          >
            Add a new menu
          </Button>
        </div>
      </div>
      <Table
        dataSource={filteredMenuItems}
        style={{ width: "60rem", marginLeft: "5rem" }}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: menuItems ? menuItems.length : 0,
          onChange: handlePageChange,
        }}
      >
        <Column title="Food Name" dataIndex="FoodName" key="key" />
        <Column title="Food Category" dataIndex="Category" key="key" />
        <Column title="Food Price (Naira)" dataIndex="Price" key="key" />
        <Column title="Food Quantity" dataIndex="TotalQuantity" key="key" />
        <Column title="Food Class" dataIndex="Class" key="key" />

        <Column
          title="Food Status"
          dataIndex="TotalQuantity"
          key="key"
          render={(quantity, record) => (
            <Tag color={quantity > 0 ? "green" : "red"}>
              {quantity > 0 ? "available" : "finished"}
            </Tag>
          )}
        />

        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button type="primary" onClick={() => handleEdit(record)}>
                Edit
              </Button>
              <Button type="danger" onClick={() => handleDelete(record)}>
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>

      <Modal
        title="Add a new menu"
        open={isModalVisible}
        onCancel={() => dispatch(setIsModalVisible(false))}
        footer={null}
      >
        <Form onFinish={handleFormSubmit}>
          <Form.Item name="FoodName">
            <div style={{ justifyContent: "flex-start" }}>
              <label htmlFor="foodName">Name</label>
              <input
                type="text"
                id="FoodName"
                name="FoodName"
                placeholder="Input name of the item"
                style={{ width: "70%", height: "10px", borderRadius: 5 }}
                value={formData.FoodName}
                onChange={handleInputChange}
                required
              />
            </div>
          </Form.Item>
          <Form.Item
            label="Category"
            name="Category"
            rules={[
              {
                required: true,
                message: "Please select a category",
              },
            ]}
          >
            <Select
              style={{ width: "60%" }}
              onChange={(value) =>
                setFormData({ ...formData, Category: value })
              }
            >
              <Select.Option value="Food">Food</Select.Option>
              <Select.Option value="Snacks">Snacks</Select.Option>
              <Select.Option value="Drinks">Drinks</Select.Option>
              <Select.Option value="Package">Package</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Class"
            name="Class"
            rules={[
              {
                required: true,
                message: "Please select a class",
              },
            ]}
          >
            <Select
              style={{ width: "60%" }}
              onChange={(value) => setFormData({ ...formData, Class: value })}
            >
              {formData.Category === "Food" && (
                <>
                  <Select.Option value="Rice">Rice</Select.Option>
                  <Select.Option value="Beans">Beans</Select.Option>
                  <Select.Option value="Yam">Yam</Select.Option>
                  <Select.Option value="Swallows">Swallows</Select.Option>
                  <Select.Option value="Spaghetti">Spaghetti</Select.Option>
                  <Select.Option value="Proteins">Proteins</Select.Option>
                  <Select.Option value="Sauce">Sauce</Select.Option>
                  <Select.Option value="Others">Others</Select.Option>
                  <Select.Option value="Stew">Stew</Select.Option>
                </>
              )}

              {formData.Category === "Snacks" && (
                <>
                  <Select.Option value="Doughnuts">Doughnuts</Select.Option>
                  <Select.Option value="Meatpie">Meatpie</Select.Option>
                  <Select.Option value="Cake">Cake</Select.Option>
                  <Select.Option value="Sausage Roll">
                    Sausage Roll
                  </Select.Option>
                  <Select.Option value="Salad">Salad</Select.Option>
                  <Select.Option value="Others">Others</Select.Option>
                </>
              )}

              {formData.Category === "Drinks" && (
                <>
                  <Select.Option value="Soft Drinks">Soft Drinks</Select.Option>
                  <Select.Option value="Energy Drinks">
                    Energy Drinks
                  </Select.Option>
                  <Select.Option value="Yoghurt">Yoghurt</Select.Option>
                  <Select.Option value="Bottle Water">
                    Bottle Water
                  </Select.Option>
                  <Select.Option value="Others">Others</Select.Option>
                </>
              )}

              {formData.Category === "Package" && (
                <>
                  <Select.Option value="Takeaway">Takeaway</Select.Option>
                </>
              )}
            </Select>
          </Form.Item>
          <Form.Item name="Price">
            <div style={{ justifyContent: "flex-start" }}>
              <label>Price of Item (Naira)</label>
              <input
                type="number"
                placeholder="Input food price"
                style={{ width: "70%", height: "10px", borderRadius: 5 }}
                name="Price"
                value={formData.Price}
                onChange={(e) =>
                  setFormData({ ...formData, Price: e.target.value })
                }
                required
              />
            </div>
          </Form.Item>
          <Form.Item name="TotalQuantity">
            <div style={{ justifyContent: "flex-start" }}>
              <label>Quantity of Item</label>
              <input
                type="number"
                placeholder="Input food quantity"
                style={{ width: "70%", height: "10px", borderRadius: 5 }}
                name="TotalQuantity"
                value={formData.TotalQuantity}
                onChange={(e) =>
                  setFormData({ ...formData, TotalQuantity: e.target.value })
                }
                required
              />
            </div>
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              marginLeft: "20rem",
              width: "10rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            loading={stage === 1 ? true : false}
            onClick={() => setStage(1)}
          >
            Add
          </Button>
        </Form>
      </Modal>
      {newMenuAlertVisible && (
        <Alert
          message="Menu Item Added successfully"
          type="success"
          showIcon
          style={{ marginTop: "20px" }}
          closable
          onClose={() => setNewMenuAlertVisible(false)}
        />
      )}
      {editMenuAlertVisible && (
        <Alert
          message="Menu Item Edited successfully"
          type="success"
          showIcon
          style={{ marginTop: "20px" }}
          closable
          onClose={() => setEditMenuAlertVisible(false)}
        />
      )}
      {deleteMenuAlertVisible && (
        <Alert
          message="Menu Item Deleted successfully"
          type="success"
          showIcon
          style={{ marginTop: "20px" }}
          closable
          onClose={() => setDeleteMenuAlertVisible(false)}
        />
      )}
      {/* Edit Modal */}
      <Modal
        title="Edit Menu Item"
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          setEditItem(null);
        }}
        footer={null}
      >
        <Form
          onFinish={handleEditFormSubmit}
          initialValues={{
            FoodName: editItem ? editItem.FoodName : "",
            Price: editItem ? editItem.Price : undefined,
            TotalQuantity: editItem ? editItem.TotalQuantity : undefined,
          }}
        >
          <Form.Item
            label="Food Price (Naira)"
            name="Price"
            rules={[
              {
                required: true,
                message: "Please input the price of your food",
              },
            ]}
          >
            <Input
              placeholder="input price"
              type="number"
              style={{ height: "45px", bottom: "10px" }}
            />
          </Form.Item>
          <Form.Item
            label="Food Quantity"
            name="TotalQuantity"
            rules={[
              {
                required: true,
                message: "Please input the quantity of your food",
              },
            ]}
          >
            <Input
              placeholder="input quantity"
              style={{ height: "45px", bottom: "10px" }}
              type="number"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              marginLeft: "20rem",
              width: "10rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            loading={isLoading}
          >
            Save
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default MenuScreen;
