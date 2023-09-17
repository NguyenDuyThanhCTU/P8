import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Modal,
  Switch,
  Table,
  notification,
} from "antd";
import { BsPersonPlus } from "react-icons/bs";
import { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlineAppstoreAdd, AiOutlineFieldTime } from "react-icons/ai";
import { type } from "os";
import moment from "moment";
import { updateDocument } from "../../../../Config/Services/Firebase/FireStoreDB";
import { useData } from "../../../../Context/DataProviders";
import { useStateProvider } from "../../../../Context/StateProvider";
import TimeSale from "../../../Item/TimeSale";

import AddSaleList from "./Section/AddSaleList";
interface DataType {
  id: React.Key;
  title: string;
  image: string;

  type: string;
  price: string;
  newPrice: string;
  discount: number;
}

type FormType = {
  start: string;
  end: string;
};

const Sale: React.FC = () => {
  const [selectId, setSelectId] = useState<any>("");
  const [detail, setDetal] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { Sale } = useData();
  const { setIsRefetch } = useStateProvider();

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
      width: "15%",
      fixed: "left",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      width: "10%",
      render: (photoURL) => (
        <img
          src={photoURL}
          alt="avatar"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },
    // {
    //   title: "Loại sản phẩm",
    //   dataIndex: "type",
    //   key: "type",
    //   width: "10%",
    //   fixed: "left",
    // },
    {
      title: "Giá sản phẩm",
      dataIndex: "price",
      key: "price",
      width: "10%",
      fixed: "left",
    },
    {
      title: "Giá khuyến mãi",
      dataIndex: "newPrice",
      key: "newPrice",
      width: "10%",
      fixed: "left",
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      key: "discount",
      width: "10%",
      fixed: "left",
    },
  ];
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const data: DataType[] = [
    // {
    //   id: "1",
    //   username: "John Brown",
    // },
    // {
    //   id: "2",
    //   username: "Jim Green",
    // },
  ];

  const onFinish = (values: any) => {
    const currentTime = new Date();
    const formatCurrentTime = moment(currentTime).format("YYYY-MM-DD");
    const formattedStartDate: any = values.start
      ? moment(values.start.$d).format("YYYY-MM-DD")
      : null;
    const formattedEndDate: any = values.end
      ? moment(values.end.$d).format("YYYY-MM-DD")
      : null;

    if (formattedStartDate > formattedEndDate) {
      return notification.error({
        message: "Ngày bắt đầu không được sau ngày kết thúc",
      });
    } else if (formattedStartDate < formatCurrentTime) {
      return notification.error({
        message: "Ngày bắt đầu không được trước ngày hiện tại",
      });
    } else {
      //caculate discount days based on start and end date
      const startDate = moment(values.start.$d);
      const endDate = moment(values.end.$d);
      const discountDays = endDate.diff(startDate, "days");

      values.start = formattedStartDate;
      values.end = formattedEndDate;
      values.discountDays = discountDays;

      updateDocument("website", "Sale", values).then(() => {
        notification.success({
          message: "Cập nhật thành công",
        });

        setIsRefetch("Sale");
        setIsModalOpen(false);
      });
    }
  };

  return (
    <>
      <Table
        onRow={(record) => {
          return {
            onClick: () => {
              setSelectId(record.id);
            },
          };
        }}
        bordered={true}
        pagination={false}
        columns={columns}
        dataSource={data}
        onChange={onChange}
        scroll={{ y: 240 }}
        title={() => (
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <div className="font-bold text-[20px]">
                Danh sách sản phẩm đang SALE
              </div>
            </div>
            <Switch
              checked={detail}
              onChange={() => setDetal(!detail)}
              checkedChildren="Empty"
              unCheckedChildren="Empty"
            />
          </div>
        )}
        //add account footer
        footer={() => (
          <div className="w-full justify-between">
            <div>
              <TimeSale />
            </div>
            <div className="flex justify-end items-center gap-3">
              <Button
                style={{
                  color: "white",
                }}
                className="bg-[#4da3ff]  hover:bg-blue-600 duration-300 border-none"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="flex items-center gap-2">
                  <p> Thời gian SALE</p>
                  <AiOutlineFieldTime />
                </div>
              </Button>
              <Button
                style={{
                  color: "white",
                }}
                className="bg-[#ff4d4f]  hover:bg-red-600 duration-300 border-none"
                onClick={() => setOpen(true)}
              >
                <div className="flex items-center gap-2">
                  <p> Thêm sản phẩm</p>
                  <AiOutlineAppstoreAdd />
                </div>
              </Button>
            </div>
          </div>
        )}
      />

      <>
        <Modal
          title="Thời gian SALE"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={false}
        >
          <Form onFinish={onFinish} labelCol={{ span: 6 }} labelAlign="left">
            <Form.Item<FormType>
              name="start"
              label="Ngày bắt đầu"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày bắt đầu",
                },
              ]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item<FormType>
              name="end"
              label="Ngày kết thúc"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày kết thúc",
                },
              ]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
            <div className="w-full justify-center flex mt-3">
              <Form.Item>
                <div className="flex gap-3">
                  <Button
                    style={{
                      backgroundColor: "#ff4d4f",
                      color: "white",
                    }}
                    htmlType="submit"
                  >
                    Tiếp tục
                  </Button>
                  <Button
                    htmlType="button"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Hủy
                  </Button>
                </div>
              </Form.Item>
            </div>
          </Form>
        </Modal>
      </>

      <>
        <Drawer
          title="Thêm sản phẩm vào danh sách SALE"
          placement="right"
          onClose={() => setOpen(false)}
          width={800}
          open={open}
        >
          <AddSaleList />
        </Drawer>
      </>
    </>
  );
};

export default Sale;
