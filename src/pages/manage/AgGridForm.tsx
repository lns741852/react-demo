//-----------------------------自定義select

// import React, { useState, useRef, useEffect, forwardRef } from 'react';
// import { AgGridProvider, AgGridReact, CustomCellEditorProps, useGridCellEditor } from 'ag-grid-react';
// import { AllCommunityModule, ColDef } from 'ag-grid-community';

// const modules = [AllCommunityModule];

// // 定義 API 回傳的價格資料結構
// interface PriceOption {
//   value: number;
//   label: string;
// }

// // 1. 模擬的 Mock API：依據目前的商品名稱，動態查詢可用的價格清單
// const fetchPriceOptionsFromApi = (productName: string): Promise<PriceOption[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       // 依據商品名稱給予不同的 Mock 價格下拉選單
//       if (productName === '蘋果') {
//         resolve([
//           { value: 25, label: '優惠價 $25' },
//           { value: 30, label: '一般價 $30' },
//           { value: 35, label: '進口價 $35' },
//         ]);
//       } else if (productName === '香蕉') {
//         resolve([
//           { value: 12, label: '促銷價 $12' },
//           { value: 15, label: '特選價 $15' },
//         ]);
//       } else {
//         resolve([
//           { value: 0, label: '請先輸入正確的商品名稱' },
//         ]);
//       }
//     }, 400); // 模擬 400 毫秒的網路延遲
//   });
// };

// // 2. 自訂的價格下拉選單編輯器元件 (Custom Cell Editor)
// const PriceSelectEditor = forwardRef((props: CustomCellEditorProps, ref) => {
//   const [options, setOptions] = useState<PriceOption[]>([]);
//   const [selectedValue, setSelectedValue] = useState(props.value || '');
//   const [loading, setLoading] = useState(true);

//   // 當元件掛載時，向 API 查詢該列資料（props.data）對應的價格
//   useEffect(() => {
//     const productName = props.data?.productName || '';
//     setLoading(true);

//     fetchPriceOptionsFromApi(productName).then((data) => {
//       setOptions(data);
//       setLoading(false);
//     });
//   }, [props.data]);

//   // 使用 AG Grid 官方 Hook 綁定編輯器的行為與回傳值
//   useGridCellEditor({
//     ref,
//     // 當使用者結束編輯（如點擊他處）時，AG Grid 要拿取什麼值存入 rowData
//     getValue() {
//       return Number(selectedValue);
//     },
//     // 開啟編輯時，是否自動將焦點放到這個元件上
//     isPopup() {
//       return false; // 直接內嵌在儲存格內，不彈出新視窗
//     }
//   });

//   return (
//     <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
//       {loading ? (
//         <span style={{ paddingLeft: '8px', fontSize: '12px', color: '#888' }}>載入中...</span>
//       ) : (
//         <select
//           value={selectedValue}
//           onChange={(e) => setSelectedValue(e.target.value)}
//           style={{ width: '100%', height: '100%', border: 'none', padding: '0 5px' }}
//         >
//           <option value="">請選擇價格</option>
//           {options.map((opt) => (
//             <option key={opt.value} value={opt.value}>
//               {opt.label}
//             </option>
//           ))}
//         </select>
//       )}
//     </div>
//   );
// });

// PriceSelectEditor.displayName = 'PriceSelectEditor';

// // 3. 主表單頁面元件
// export const GridForm: React.FC = () => {
//   const gridRef = useRef<AgGridReact>(null);

//   const [rowData, setRowData] = useState([
//     { id: '1', productName: '蘋果', quantity: 2, price: 30 },
//     { id: '2', productName: '香蕉', quantity: 5, price: 15 },
//   ]);

//   const [columnDefs] = useState<ColDef[]>([
//     {
//       headerName: '商品名稱',
//       field: 'productName',
//       editable: true
//     },
//     {
//       headerName: '數量',
//       field: 'quantity',
//       editable: true,
//       valueParser: p => Number(p.newValue) || 0
//     },
//     {
//       headerName: '單價（下拉 API）',
//       field: 'price',
//       editable: true,
//       // 關鍵設定：將此欄位的編輯器指定為我們寫好的自訂組件
//       cellEditor: PriceSelectEditor,
//       // 顯示格式化：讓表格沒在編輯時也能呈現錢字號
//       valueFormatter: p => p.value ? `$${p.value}` : '$0'
//     },
//     {
//       headerName: '總計',
//       valueGetter: (params) => (params.data.quantity || 0) * (params.data.price || 0),
//       valueFormatter: p => `$${p.value}`
//     }
//   ]);

//   return (
//     <AgGridProvider modules={modules}>
//       <div style={{ padding: '20px' }}>
//         <h3>AG Grid 表單 - 聯動 API 下拉選單</h3>
//         <p style={{ color: '#666', fontSize: '14px' }}>
//           💡 點擊「單價」儲存格，元件會根據左側的「商品名稱（蘋果/香蕉）」非同步調用 Mock API 查詢價格清單。
//         </p>

//         <div style={{ height: '250px', width: '100%', marginTop: '10px' }}>
//           <AgGridReact
//             ref={gridRef}
//             rowData={rowData}
//             columnDefs={columnDefs}
//             singleClickEdit={true}
//             stopEditingWhenCellsLoseFocus={true}
//           />
//         </div>
//       </div>
//     </AgGridProvider>
//   );
// };

// import React, { FC, useState, useMemo } from "react";
// import { AgGridProvider, AgGridReact } from "ag-grid-react";
// import { Button, Select, MenuItem, CircularProgress } from "@mui/material";
// import {
//   ColDef,
//   GridReadyEvent,
//   GridApi,
//   AllCommunityModule,
// } from "ag-grid-community";

// const modules = [AllCommunityModule];

// interface DepartmentOption {
//   label: string;
//   value: string;
// }

// interface RowData {
//   id: number;
//   name: string;
//   department: string;
// }

// const GridForm: FC = () => {
//   // 1. 用 useState 儲存 AG-Grid 原生的 API 實例
//   const [gridApi, setGridApi] = useState<GridApi<RowData> | null>(null);

//   const [rowData, setRowData] = useState<RowData[]>([
//     { id: 1, name: "John", department: "" },
//     { id: 2, name: "", department: "" },
//     { id: 3, name: "Tom", department: "" },
//   ]);

//   /**
//    * Mock API
//    */
//   const fetchDepartments = (): Promise<DepartmentOption[]> => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve([
//           { label: "研發部", value: "RD" },
//           { label: "人資部", value: "HR" },
//           { label: "業務部", value: "SALES" },
//         ]);
//       }, 1000);
//     });
//   };

//   /**
//    * 2. 當表格準備就緒時，觸發此原生事件並取得 api
//    */
//   const onGridReady = (params: GridReadyEvent<RowData>) => {
//     setGridApi(params.api);
//   };

//   /**
//    * 3. 提交按鈕事件：透過原生的 gridApi 讀取資料
//    */
//   const handleSubmit = () => {
//     if (!gridApi) {
//       alert("表格尚未準備就緒");
//       return;
//     }

//     const latestData: RowData[] = [];

//     // 使用原生的 api.forEachNode 遍歷所有行資料
//     gridApi.forEachNode((node) => {
//       if (node.data) {
//         latestData.push(node.data);
//       }
//     });

//     console.log("提交的原生 Table 資料：", latestData);
//   };

//   /**
//    * Select Cell
//    */
//   const DepartmentCellRenderer = (props: any) => {
//     const [options, setOptions] = useState<DepartmentOption[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [loaded, setLoaded] = useState(false);

//     const handleOpen = async () => {
//       if (loaded) return;
//       setLoading(true);
//       const result = await fetchDepartments();
//       setOptions(result);
//       setLoaded(true);
//       setLoading(false);
//     };

//     const handleChange = (event: any) => {
//       props.node.setDataValue("department", event.target.value);
//     };

//     return (
//       <Select
//         size="small"
//         fullWidth
//         value={props.value || ""}
//         displayEmpty
//         onOpen={handleOpen}
//         onChange={handleChange}
//         style={{ marginTop: "4px" }}
//       >
//         <MenuItem value="" disabled>
//           請選擇部門
//         </MenuItem>
//         {loading ? (
//           <MenuItem disabled>
//             <CircularProgress size={18} />
//           </MenuItem>
//         ) : (
//           options.map((item) => (
//             <MenuItem key={item.value} value={item.value}>
//               {item.label}
//             </MenuItem>
//           ))
//         )}
//       </Select>
//     );
//   };

//   const columnDefs = useMemo<ColDef<RowData>[]>(
//     () => [
//       { field: "id", width: 100 },
//       {
//         field: "name",
//         flex: 1,
//         // 顯示格式化：讓表格沒在編輯時也能呈現錢字號
//         valueFormatter: (p) => (p.value ? `_${p.value}_` : "--"),
//       },
//       {
//         headerName: "部門",
//         field: "department",
//         flex: 1,
//         cellRenderer: DepartmentCellRenderer,
//       },
//     ],
//     [],
//   );

//   return (
//     <div
//       style={{
//         width: "100%",
//         display: "flex",
//         flexDirection: "column",
//         gap: "16px",
//       }}
//     >
//       <AgGridProvider modules={modules}>
//         <div
//           className="ag-theme-quartz"
//           style={{
//             height: 400,
//             width: "100%",
//           }}
//         >
//           {/* 4. 綁定原生的 onGridReady 事件 */}
//           <AgGridReact
//             rowData={rowData}
//             columnDefs={columnDefs}
//             rowHeight={45}
//             onGridReady={onGridReady}
//           />
//         </div>
//       </AgGridProvider>

//       <div style={{ display: "flex", justifyContent: "flex-end" }}>
//         <Button variant="contained" color="primary" onClick={handleSubmit}>
//           Submit 提交資料
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default GridForm;

//-----------------------------企業版方案

// import React, { FC, useState, useMemo } from "react";
// import { AgGridProvider, AgGridReact } from "ag-grid-react";
// import { Button } from "@mui/material";
// import {
//   ColDef,
//   GridReadyEvent,
//   GridApi,
//   AllCommunityModule,
// } from "ag-grid-community";

// import { RichSelectModule } from "ag-grid-enterprise";

// // 註冊模組
// const modules = [AllCommunityModule,RichSelectModule];

// interface DepartmentOption {
//   label: string;
//   value: string;
// }

// interface RowData {
//   id: number;
//   name: string;
//   department: string;
// }

// // 模擬 API
// const fetchDepartments = (): Promise<DepartmentOption[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve([
//         { label: "研發部", value: "RD" },
//         { label: "人資部", value: "HR" },
//         { label: "業務部", value: "SALES" },
//       ]);
//     }, 1000);
//   });
// };

// const GridForm: FC = () => {
//   const [gridApi, setGridApi] = useState<GridApi<RowData> | null>(null);

//   // 3. 直接交由 rowData 管理狀態，當使用者編輯完表格，rowData 會同步更新
//   const [rowData, setRowData] = useState<RowData[]>([
//     { id: 1, name: "John", department: "" },
//     { id: 2, name: "Mary", department: "HR" }, // 支援預設值
//     { id: 3, name: "Tom", department: "" },
//   ]);

//   const onGridReady = (params: GridReadyEvent<RowData>) => {
//     setGridApi(params.api);
//   };

//   /**
//    * 提交按鈕事件：直接讀取 React 的 rowData 狀態即可
//    */
//   const handleSubmit = () => {
//     console.log("提交的最新資料：", rowData);
//   };

//   /**
//    * 當儲存格編輯完成時，同步更新 React 狀態
//    */
//   const onCellValueChanged = (event: any) => {
//     // 這裡可以拿到整張表格更新後的最新陣列資料
//     const updatedRows: RowData[] = [];
//     event.api.forEachNode((node) => {
//       if (node.data) updatedRows.push(node.data);
//     });
//     setRowData(updatedRows);
//   };

//   const columnDefs = useMemo<ColDef<RowData>[]>(
//     () => [
//       { field: "id", width: 100 },
//       { field: "name", flex: 1 },
//       {
//         headerName: "部門",
//         field: "department",
//         flex: 1,
//         editable: true, // 1. 開啟編輯功能
//         cellEditor: "agRichSelectCellEditor", // 2. 使用原生的 Rich Select 編輯器
//         cellEditorParams: {
//           // 3. 異步加載：values 可以直接給一個回傳陣列的函數或 Promise
//           values: async () => {
//             const data = await fetchDepartments();
//             return data.map((item) => item.value); // 這裡回傳儲存的值 (e.g. ['RD', 'HR'])
//           },
//           // 4. 格式化選單中顯示的文字 (把 'RD' 轉成 '研發部')
//           valueListGap: 4,
//           formatValue: (value: string) => {
//             const mapping: Record<string, string> = {
//               RD: "研發部",
//               HR: "人資部",
//               SALES: "業務部",
//             };
//             return mapping[value] || value || "請選擇部門";
//           },
//         },
//         // 5. 格式化非編輯狀態下（平常畫面顯示）的文字
//         valueFormatter: (params) => {
//           const mapping: Record<string, string> = {
//             RD: "研發部",
//             HR: "人資部",
//             SALES: "業務部",
//           };
//           return mapping[params.value] || "請選擇部門";
//         },
//       },
//     ],
//     []
//   );

//   return (
//     <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
//       <AgGridProvider modules={modules}>
//         <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>
//           <AgGridReact
//             rowData={rowData}
//             columnDefs={columnDefs}
//             rowHeight={45}
//             onGridReady={onGridReady}
//             onCellValueChanged={onCellValueChanged} // 監聽儲存格變更
//             singleClickEdit={true} // 選配：改成單擊就打開下拉選單（預設是雙擊）
//           />
//         </div>
//       </AgGridProvider>

//       <div style={{ display: "flex", justifyContent: "flex-end" }}>
//         <Button variant="contained" color="primary" onClick={handleSubmit}>
//           Submit 提交資料
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default GridForm;
