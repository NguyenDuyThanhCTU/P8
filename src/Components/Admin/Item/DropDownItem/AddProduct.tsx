import React, { useEffect, useState } from "react";
import {
  AiFillCloseCircle,
  AiOutlineCloudUpload,
  AiOutlineDelete,
} from "react-icons/ai";
import { FaCloudUploadAlt } from "react-icons/fa";

import { Drawer, Select, Space, notification } from "antd";

import Input from "../Input";
import { useStateProvider } from "../../../../Context/StateProvider";
import { useData } from "../../../../Context/DataProviders";
import { TypeProductItems } from "../../../../Utils/item";
import { uploadImage } from "../Handle";
import { addDocument } from "../../../../Config/Services/Firebase/FireStoreDB";
import TextEditor from "../../../Item/TextEditor";

const AddProduct = ({}) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [Title, setTitle] = useState<string | undefined>();
  const [Price, setPrice] = useState<string | undefined>();
  const [Content, setContent] = useState<string | undefined>();
  const [isType, setIsType] = useState<string | undefined>();
  const [describe, setDescribe] = useState("");
  const [isParent, setIsParent] = useState("Men");
  const [isChildren, setIsChildren] = useState<any>([]);
  const [ListSubImage, setListSubImage] = useState<any>([]);
  const { setDropDown, setIsRefetch } = useStateProvider();
  const { productTypes } = useData();
  const [open, setOpen] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  const { Option } = Select;

  const handleChange = (value: string[]) => {
    setIsChildren(value);
  };

  const handleDiscard = () => {
    setDropDown("");
    setTitle("");
    setPrice("");
    setImageUrl("");
    setContent("");
    setDescribe("");
    setListSubImage("");
  };
  const initial1 =
    "<p>Chất liệu: </p> <br/> <p>Màu sắc: </p> <br/> <p>Size: </p> <br/> <p>Chiều dài: </p> <br/> <p>Chiều rộng: </p> <br/> <p>Chiều cao: </p> <br/> <p>Trọng lượng: </p> <br/> <p>Thương hiệu: </p> <br/> <p>Xuất xứ: </p> <br/> <p>Chất liệu";
  const initDescribe = "<p> mô tả sản phẩm </p>";

  const HandleSubmit = () => {
    if (!Title || !Price || !imageUrl || !isType) {
      notification["error"]({
        message: "Lỗi !!!",
        description: `Vui lòng bổ sung đầy đủ thông tin !`,
      });
    } else {
      const data: any = {
        title: Title,
        content: Content,
        describe: describe,
        price: Price,
        image: imageUrl,
        type: isType,
        parent: isParent,
        state: "Còn hàng",
        sale: {
          discount: 0,
          newPrice: "0.000",
        },
        access: Math.floor(Math.random() * (10000 - 100 + 1)) + 100,
        subimage: ListSubImage,
        children: isChildren,
      };

      for (let key in data) {
        if (data[key] === undefined || data[key] === "") {
          delete data[key];
        }
      }

      addDocument("products", data).then(() => {
        notification["success"]({
          message: "Tải lên thành công!",
          description: `Sản phẩm của bạn đã được tải lên !`,
        });

        setIsRefetch("upload successful");
        handleDiscard();
      });
    }
  };

  const HandleUploadImage = (e: any, locate: string, type: string) => {
    if (type === "image") {
      uploadImage(e, locate).then((data: any) => {
        setImageUrl(data);
      });
    } else if (type === "color") {
      uploadImage(e, locate).then((data) => {
        setListSubImage((prevUrls: any) => [...prevUrls, data]);
      });
    }
  };

  const popValue = (indexToRemove: number, type: string) => {
    if (type === "color") {
      setListSubImage((prevUrls: any) =>
        prevUrls.filter((_: any, index: any) => index !== indexToRemove)
      );
    }
  };

  useEffect(() => {
    const sort = productTypes?.filter(
      (item: any) => item.parentName === isParent
    );
    if (sort) {
      setIsType(sort[0].name);
    }
  }, [isParent]);

  return (
    <div
      className={`bg-[rgba(0,0,0,0.3)] w-full 
       h-full
      z-50 absolute rounded-md duration-300 flex items-center justify-center`}
    >
      <div className="w-auto h-auto bg-white relative p-10  font-LexendDeca cursor-pointer rounded-sm flex flex-col justify-center">
        <p className="text-2xl font-bold text-center text-[30px] mb-5">
          Tải lên sản phẩm của bạn
        </p>
        <div className="flex d:flex-row p:flex-col">
          <div className="justify-center w-full flex items-center gap-20">
            <div className="">
              <div className="">
                <p className="text-md text-gray-400 mt-1">
                  Chọn ảnh cho sản phẩm của bạn
                </p>
              </div>
              <div className=" border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-5 w-[260px] h-[458px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
                <label className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col  items-center">
                      <label>
                        <p className="bg-[#0047AB] hover:bg-[#0000FF]  text-center rounded text-white text-md font-medium p-2 w-52 outline-none">
                          Chọn từ thiết bị
                        </p>
                        <input
                          type="file"
                          onChange={(e) =>
                            HandleUploadImage(e, "products", "image")
                          }
                          className="w-0 h-0"
                          id="fileInput"
                        />
                      </label>
                    </div>
                  </div>
                </label>

                <div className="overflow-y-auto border rounded-xl w-full  h-[200px] mt-5">
                  <div className="p-1">
                    <img src={imageUrl} alt="product" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-10">
              <div className=" w-[700px] flex flex-col  items-center">
                <div className="grid grid-cols-2 gap-5 w-full">
                  {" "}
                  <div className="  flex flex-col gap-3">
                    <Input
                      text="Tên sản phẩm"
                      Value={Title}
                      setValue={setTitle}
                    />
                    <Input
                      text="Giá sản phẩm"
                      Value={Price}
                      setValue={setPrice}
                      Input={true}
                    />
                    <div className="">
                      <label>Thông tin sản phẩm</label>
                      <div
                        className="bg-red-400 hover:bg-red-600 duration-300 mt-2 py-3 text-center hover:text-white cursor-pointer"
                        onClick={() => setOpen(true)}
                      >
                        Thêm thông tin sản phẩm
                      </div>
                    </div>
                    <div className="">
                      <label>Mô tả sản phẩm</label>
                      <div
                        className="bg-red-400 hover:bg-red-600 duration-300 mt-2 py-3 text-center hover:text-white cursor-pointer"
                        onClick={() => setOpenDescription(true)}
                      >
                        Thêm mô tả sản phẩm
                      </div>
                    </div>
                  </div>
                  <div className="  flex flex-col gap-3">
                    <div className="flex gap-2 w-full">
                      <div className="flex flex-col gap-2">
                        <label className="text-md font-medium ">
                          Mục bài viết:
                        </label>
                        <select
                          className="outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
                          onChange={(e) => setIsParent(e.target.value)}
                        >
                          {TypeProductItems.map((item, idx) => (
                            <option
                              key={idx}
                              className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                              value={item.label}
                            >
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-2 w-[190px]">
                        <label className="text-md font-medium ">
                          Loại bài viết
                        </label>
                        <select
                          className="outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
                          onChange={(e) => setIsType(e.target.value)}
                        >
                          {productTypes
                            ?.filter(
                              (item: any) => item.parentName === isParent
                            )
                            .map((item: any, idx: any) => (
                              <option
                                key={idx}
                                className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                                value={item.name}
                              >
                                {item.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-md font-medium ">
                        Loại bài viết
                      </label>

                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Chọn loại bài viết"
                        onChange={handleChange}
                        optionLabelProp="label"
                      >
                        {productTypes
                          ?.filter((item: any) => item.name === isType)
                          .map((item: any, idx: any) => (
                            <>
                              {item.children.map((items: any, idx: number) => (
                                <Option value={items.name} label={items.name}>
                                  <Space>{items.name}</Space>
                                </Option>
                              ))}
                            </>
                          ))}
                      </Select>
                    </div>

                    <div className="flex flex-col ">
                      <div className="overflow-y-auto border rounded-xl w-full  h-[100px] ">
                        <div className="p-1 grid grid-cols-4 ">
                          {ListSubImage.map((items: any, idx: number) => {
                            return (
                              <div className="my-2 relative w-[50px] h-[50px] group border flex justify-center items-center">
                                <img
                                  src={items}
                                  alt=""
                                  className="w-full h-full"
                                />

                                <div
                                  className="w-full h-full  group-hover:flex justify-center items-center bg-[rgba(0,0,0,0.3)] text-[40px] absolute top-0  z-10 text-redPrimmary hidden"
                                  onClick={() => popValue(idx, "color")}
                                >
                                  <AiOutlineDelete className="" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="mt-5">
                        <label>
                          <div className="bg-[#0047AB] hover:bg-[#0000FF]  text-center rounded text-white text-md font-medium p-2  outline-none flex gap-3 items-center justify-center">
                            <p>Thêm hình ảnh chi tiết</p>
                            <AiOutlineCloudUpload />
                          </div>
                          <input
                            type="file"
                            onChange={(e) =>
                              HandleUploadImage(e, "color", "color")
                            }
                            className="w-0 h-0"
                            id="fileInput"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 mt-10 ">
                  <button
                    onClick={() => handleDiscard()}
                    type="button"
                    className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                  >
                    Xóa
                  </button>
                  <button
                    onClick={() => HandleSubmit()}
                    type="button"
                    className="bg-[#df6cad] hover:bg-red-500 focus:outline-none focus:shadow-outline text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                  >
                    Tải lên
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AiFillCloseCircle
          className="absolute -top-5 -right-5 text-[40px] border-white border-4 bg-black rounded-3xl text-white "
          onClick={() => {
            setDropDown("");
          }}
        />
      </div>
      <>
        <Drawer
          title="Thêm thông tin sản phẩm"
          placement="right"
          onClose={() => setOpen(false)}
          open={open}
          width={800}
        >
          <TextEditor onChange={setContent} initialValue={initial1} />
        </Drawer>
      </>
      <>
        <Drawer
          title="Thêm mô tả sản phẩm"
          placement="right"
          onClose={() => setOpenDescription(false)}
          open={openDescription}
          width={800}
        >
          <TextEditor onChange={setDescribe} initialValue={initDescribe} />
        </Drawer>
      </>
    </div>
  );
};

export default AddProduct;