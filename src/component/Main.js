import React from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState, useEffect, useMemo } from "react";
import products from "../data/products";
import 'ag-grid-enterprise';

function Main() {

  const [rowData, setRowData] = useState(products);

  const [columnDefs, setColumnDefs] = useState([
    { field: "productType",
    keyCreator: params => params.value.sno,
    hide : true,
    rowGroup:true
  },
    { field: "sno", hide:true},
    { field: "prodName",
    aggFunc: (params) => {      
      return "Smartphone";
    },
  },
    { field: "description" },
    { field: "qty" }
  ]);

  const aggFunc = {
    'myFunc': params => {
        return "Smartphone";
    }
};

  const defaultColDef = useMemo(() => ({
    resizable: true
  }));

  const gridOptions = {
    groupRowRendererParams: {
      suppressCount : true
    }
  }

  const autoGroupColumnDef = {
    field : 'sno',
    headerName : 'Sno',
    checkboxSelection :true, 
    // headerCheckboxSelection:true,
    // cellRenderer : 'agGroupCellRenderer',
    cellRendererParams: {
      suppressCount: true,
    }
  }

  const defaultColDe = {
    checkboxSelection: function (params) {
      const displayedColumns = params.columnGridApi.getSelectedRows()
    }
  }

  const rowSelectionType = 'multiple'
  const onSelectionChanged = (event) =>{
    console.log(event.api.getSelectedRows())
  }

  const groupDisplayType = 'groupRows';
  return (
    <div className="ag-theme-alpine" style={{ height: 700, width: 1200 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        autoGroupColumnDef={autoGroupColumnDef}
        // groupDisplayType={groupDisplayType}
        defaultColDef={defaultColDef}
        rowSelection={rowSelectionType}
        onSelectionChanged={onSelectionChanged}
        // rowMultiSelectWithClick={true}
        suppressRowClickSelection={true}
        animateRows={true}
        // gridOptions={gridOptions}
        suppressAggFuncInHeader ={true}
      ></AgGridReact>
    </div>
  );
}

export default Main;
