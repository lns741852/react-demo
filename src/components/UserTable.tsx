// components/UserTable/index.tsx

import React, { FC, useMemo } from "react";
import { Table } from "antd";

import type { UserItem } from "@/types/user";
import { getUserColumns } from "./User/getUserColumns";

/**
 * Props 定義
 */
interface Props {
  list: UserItem[];
  onEdit: (record: UserItem) => void;
  onDelete: (id: number) => void;
}

/**
 * 桌面版 Table
 */
const UserTable: FC<Props> = ({ list, onEdit, onDelete }) => {
  const columns = useMemo(() => {
    return getUserColumns({
      list,
      onEdit,
      onDelete,
    });
  }, [list]);

  return (
    <Table<UserItem>
      rowKey="id"
      columns={columns}
      dataSource={list}
      pagination={{
        pageSize: 5,
      }}
    />
  );
};

export default UserTable;
