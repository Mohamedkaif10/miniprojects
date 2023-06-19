import React, { Fragment, useState } from "react";

const Mainpage = () => {
  const [tables, setTables] = useState([
    {
      id: Date.now(),
      rows: [{ length: "", breadth: "", area: 0, dividedArea: 0, rate: "", price: 0 }]
    }
  ]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addRow = (tableId) => {
    setTables((prevTables) =>
      prevTables.map((table) => {
        if (table.id === tableId) {
          const newRow = {
            length: "",
            breadth: "",
            area: 0,
            dividedArea: 0,
            rate: "",
            price: 0
          };
          return {
            ...table,
            rows: [...table.rows, newRow]
          };
        }
        return table;
      })
    );
  };

  const deleteRow = (tableId, rowIndex) => {
    setTables((prevTables) =>
      prevTables.map((table) => {
        if (table.id === tableId) {
          return {
            ...table,
            rows: table.rows.filter((_, index) => index !== rowIndex)
          };
        }
        return table;
      })
    );
  };

  const updateCellValue = (tableId, rowIndex, colIndex, value) => {
    setTables((prevTables) =>
      prevTables.map((table) => {
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
    );
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
          <button onClick={() => addRow(table.id)}>Add Row</button>
          <table>
            <thead>
              <tr>
                <th>Length</th>
                <th>Breadth</th>
                <th>Area</th>
                <th>Divided by 12</th>
                <th>Rate</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>
                    <input
                      type="number"
                      value={row.length}
                      onChange={(e) => updateCellValue(table.id, rowIndex, "length", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.breadth}
                      onChange={(e) => updateCellValue(table.id, rowIndex, "breadth", e.target.value)}
                    />
                  </td>
                  <td>{row.area}</td>
                  <td>{row.dividedArea}</td>
                  <td>
                    <input
                      type="number"
                      value={row.rate}
                      onChange={(e) => updateCellValue(table.id, rowIndex, "rate", e.target.value)}
                    />
                  </td>
                  <td>{row.price}</td>
                  <td>
                    <button onClick={() => deleteRow(table.id, rowIndex)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <div>
        <h3>Total Price: {totalPrice}</h3>
        <button onClick={updateTotalPrice}>Calculate Total Price</button>
      </div>
    </Fragment>
  );
};

export default Mainpage;