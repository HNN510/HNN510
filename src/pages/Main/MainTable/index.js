import { Pagination, Table, message, Space, Tag } from "antd";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import SampleApi from "../../../apis/sample";
import { useNavigate } from "react-router-dom";

const MainTable = forwardRef((props, ref) => {
  const [dataTable, setDataTable] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [params, setParams] = useState({
    number: 10,
    page: 1,
  });
  const handleChangePage = (page) => {
    setParams({ ...params, page: page });
  };

  const paginationConfig = {
    current: params.page,
    total: dataTable.total_samples,
    pageSize: 10,
    onChange: handleChangePage,
  };
  useImperativeHandle(ref, () => ({
     reFetch: fetchData
  }));
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await SampleApi.getAll(params);
      if (res.status === 200) {
        setDataTable(res.data);
        setIsLoading(false);
      } else message.error("Lôĩ khi tải dữ liệu bảng");
    } catch (error) {
      setIsLoading(false);
      message.error("Lỗi khi tải dữ liệu bảng");
    }
  };
  const handleRowClick = (record) => {
    navigate(`/file/${record.hash}`);
  };
  useEffect(() => {
    fetchData();
  }, [params]);
  const columns = [
    {
      key: 1,
      title: "STT",
      render: (_, record, index) => {
        return index + 1;
      },
    },
    {
      key: 2,
      title: "Hash",
      dataIndex: "hash",
    },
    {
      key: 3,
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => (
        <>
          {status === "done" ? (
            <Tag color="green">{status}</Tag>
          ) : (
            <Tag color="red">{status}</Tag>
          )}
        </>
      ),
    },
  ];
  return (
    <div style={{ marginTop: "20px" }}>
      <Table
        columns={columns}
        dataSource={dataTable.samples}
        pagination={false}
        loading={isLoading}
        onRow={(record, rowIndex) => ({
          onClick: () => handleRowClick(record), // Xử lý sự kiện khi click vào một hàng
        })}
      />
      <Space
        style={{ marginTop: "10px", justifyContent: "end", display: "flex" }}
      >
        <Pagination {...paginationConfig} />
      </Space>
    </div>
  );
});
export default MainTable;
