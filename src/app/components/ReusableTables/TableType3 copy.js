import React from "react";
import styles from "./TableType3.module.css";
import EditableField from "../EditableField/EditableField";

const TableType1 = ({
  items,
  folderName,
  fileName,
  formSetting,
  myStyle,
  onEdit,
}) => {
  const tableName = formSetting.tableName;
  const tableData = formSetting.tableData;
  let updateJson = { ...items };
  const handleChange = (event) => {
    updateJson[event.target.name] = event.target.value;
    //TODO: Json with flag
    // updateJson[event.target.name][0] = event.target.value;
    // updateJson[event.target.name][3] = 2;
    onEdit(updateJson);
  };

  return (
    <div style={myStyle}>
      {tableName && <div className={styles.title}>{tableName}</div>}
      <div className={styles.myTable}>
        {tableData.map((data, index) => {
          return (
            <div key={index} className={styles.keyPair}>
              <div className={styles.fieldName}>{data.fieldName}</div>

              <EditableField
                isFlag=""
                //TODO: items[data.key][3] for TAN's json version
                // isFlag={items[data.key][3]}
                fieldName={data.key}
                fieldValue={items[data.key]}
                //TODO: items[data.key][0] for TAN's json version
                // fieldValue={items[data.key][0]}
                handleChange={handleChange}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableType1;
