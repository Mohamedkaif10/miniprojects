import React, { Fragment, useState } from "react";
import classes from "./Mainpage.module.css"
import Button from "./Assets/Button";
const Mainpage = (props) => {
    const Intialvalues = () => ({
        id: Math.random().toString(),
        rows: [{ length: "", breadth: "", area: 0, dividedArea: 0, rate: "", price: 0 }]
      });
  const [tables, setTables] = useState([Intialvalues()]);
  const [totalPrice, setTotalPrice] = useState(0);
      const addRow = (tableId) => {
            const updatedTables = tables.map((table) => {
             if (table.id === tableId) {
            const newRow = {};
               return {
                   ...table,
                   rows: [...table.rows, newRow]
                      };
                }
               return table;
              });
  
               setTables(updatedTables);
             };
  
  const deleteRow = (tableId, rowIndex) => {
    const updatedTablesdeleted=tables.map((table) => {
        if (table.id === tableId) {
          return {
            ...table,
            rows: table.rows.filter((_, index) => index !== rowIndex)
          };
        }
        return table;
      })
    setTables(updatedTablesdeleted) 
     
  };
const updateCellValue = (tableId, rowIndex, colIndex, value) => {
    const updatedtablevalues=tables.map((table) => {
        if (table.id === tableId) {
          const updatedRows = table.rows.map((row, index) => {
            if (index === rowIndex) {
              const updatedRow = {
                ...row,
                [colIndex]: value
              };
              updatedRow.area = parseFloat(updatedRow.length) * parseFloat(updatedRow.breadth);
              updatedRow.dividedArea = updatedRow.area / 12;
              updatedRow.price = parseFloat(updatedRow.dividedArea) * parseFloat(updatedRow.rate);
              return updatedRow;
            }
            return row;
          });
          return {
            ...table,
            rows: updatedRows
          };
        }
        return table;
      })
    
    setTables(updatedtablevalues) 
      
  };
  
 
  const updateTotalPrice = () => {
    let totalPrice = 0;
    tables.forEach((table) => {
      table.rows.forEach((row) => {
        totalPrice += row.price;
      });
    });
    setTotalPrice(totalPrice);
  };

  return (
    <Fragment>
      {tables.map((table) => (
        <div key={table.id}>
          <Button className={classes.addbtn} onClick={() => addRow(table.id)}>Add Row</Button>
          <table>
           
              <tr>
                <th>Length</th>
                <th>Breadth</th>
                <th>Area</th>
                <th>/12</th>
                <th>Rate</th>
                <th>Price</th>
                <th>Delete</th>
              </tr>
            {table.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>
                    <input
                      type="number"
                      value={row.length}
                      onChange={(event) => updateCellValue(table.id, rowIndex, "length", event.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.breadth}
                      onChange={(event) => updateCellValue(table.id, rowIndex, "breadth", event.target.value)}
                    />
                  </td>
                  <td>{row.area}</td>
                  <td>{row.dividedArea}</td>
                  <td>
                    <input
                      type="number"
                      value={row.rate}
                      onChange={(event) => updateCellValue(table.id, rowIndex, "rate", event.target.value)}
                    />
                  </td>
                  <td>{row.price}</td>
                  <td>
                    <button onClick={() => deleteRow(table.id, rowIndex)}>Delete</button>
                  </td>
                </tr>
              ))}
          </table>
        </div>
      ))}

      <div className={classes.TP}>
        <h3>Total Price: {totalPrice}</h3>
        <Button className={classes.tpbtn} onClick={updateTotalPrice}>Calculate Total Price</Button>
      </div>
    </Fragment>
  );
};

export default Mainpage;