import React from "react";
import styles from "./Form.module.css";
// import formSetting from "../formSetting.json";
import TableType1 from "./ReableTables/TableType1";
import TableType2 from "./ReableTables/TableType2";
import TableType3 from "./ReableTables/TableType3";
import TableType4 from "./ReableTables/TableType4";

const Form = ({ items, folderName, fileName, formSetting }) => {
  const title = formSetting.title;
  const subtitle = formSetting.subtitle;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {title && <div className={styles.header1}>{title}</div>}
        {subtitle && <div className={styles.header2}>{subtitle}</div>}
      </div>
      <div style={formSetting.style && formSetting.style}>
        {formSetting[folderName].map((formSettingItem, index) => {
          if (formSettingItem.tableType === "TableType1") {
            // console.log("formSettingItem", formSettingItem.style);
            return (
              <TableType1
                myStyle={formSettingItem.style}
                key={index}
                items={items}
                folderName={folderName}
                fileName={fileName}
                formSetting={formSettingItem}
              />
            );
          } else if (formSettingItem.tableType === "TableType2") {
            return (
              <TableType2
                myStyle={formSettingItem.style}
                key={index}
                items={items}
                folderName={folderName}
                fileName={fileName}
                formSetting={formSettingItem}
              />
            );
          } else if (formSettingItem.tableType === "TableType3") {
            return (
              <TableType3
                myStyle={formSettingItem.style}
                key={index}
                items={items}
                folderName={folderName}
                fileName={fileName}
                formSetting={formSettingItem}
              />
            );
          } else if (formSettingItem.tableType === "TableType4") {
            return (
              <TableType4
                myStyle={formSettingItem.style}
                key={index}
                items={items}
                folderName={folderName}
                fileName={fileName}
                formSetting={formSettingItem}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Form;
