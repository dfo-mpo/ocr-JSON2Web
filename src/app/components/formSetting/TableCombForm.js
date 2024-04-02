import { useState, useRef } from "react";
import styles from "./TableCombForm.module.css";
import Table1Form from "./TableCombine/Table1Form";
import Table2Form from "./TableCombine/Table2Form";
import FormSettingButton from "./FormSettingButton";
import CommonFields from "./CommonFields";
import SaveButtonComb from "./TableCombine/SaveButtonComb";
const TableCombForm = ({ folderName, onRemove, onSave }) => {
  const [tableType, setTableType] = useState("");
  const [insideFormSetting, setInsideFormSetting] = useState([]);
  //   const [isInsideFormSaved, setIsInsideFormSaved] = useState(false);
  //   const [insideFormSettingNotEmpty, setInsideFormSettingNotEmpty] =
  //     useState(false);

  const [CommonFieldsValue, setCommonFieldsValue] = useState({
    folderName: folderName,
    tableType: "TableTypeComb",
    tableName: "",
    insideTableName: "",
    style: {
      display: "grid",
      gridColumnStart: null,
      gridColumnEnd: null,
      gridRowStart: null,
      gridRowEnd: null,
      alignSelf: "",
      justifySelf: "",
    },
    insideStyle: {
      borderTop: "",
      borderBottom: "",
      borderLeft: "",
      borderRight: "",
    },
  });
  //getting the common fields value for combine table main fields
  const commonFiledHandler = (data) => {
    setCommonFieldsValue(data);
  };
  //getting the table type value from the select option
  const changeHandler = (e) => {
    setTableType(e.target.value);
  };
  //adding the table type to the inside form setting when the add button is clicked
  const addTableHandler = () => {
    setInsideFormSetting([...insideFormSetting, { tableType: tableType }]);
    setTableType("");
  };
  // removing the table type object from the inside form setting (include enter values) when the remove button is clicked
  const removeTableHandler = (index) => {
    const newInsideFormSetting = [...insideFormSetting];
    newInsideFormSetting.splice(index, 1);
    setInsideFormSetting(newInsideFormSetting);
  };
  //saving the inside form setting values when the save button is clicked
  const onSaveHandler = (data, index) => {
    const newInsideFormSetting = [...insideFormSetting];
    newInsideFormSetting[index] = { ...data };
    setInsideFormSetting(newInsideFormSetting);
  };
  // if the tableCom is inside of the tableCom then the save button will be used
  const onSaveInsideCombHandler = () => {
    let isInsideFormSaved = false;
    let insideFormSettingNotEmpty = false;
    if (insideFormSetting.length === 0) {
      alert("Please add a table");
      return;
    } else {
      insideFormSettingNotEmpty = true;
    }

    // Check if all tables are saved
    const allTablesSaved = insideFormSetting.every((table) => table.isSaved);

    if (allTablesSaved) {
      isInsideFormSaved = true;
    } else {
      isInsideFormSaved = false;
      alert("Please save all the tables");
    }

    if (isInsideFormSaved && insideFormSettingNotEmpty) {
      onSave({
        ...CommonFieldsValue,
        isSaved: true,
        insideFormSetting: insideFormSetting,
      });
    }
  };
  const onSubmitHandler = async () => {
    let isInsideFormSaved = false;
    let insideFormSettingNotEmpty = false;
    if (insideFormSetting.length === 0) {
      alert("Please add a table");
      return;
    } else {
      insideFormSettingNotEmpty = true;
    }

    // Check if all tables are saved
    const allTablesSaved = insideFormSetting.every((table) => table.isSaved);

    if (allTablesSaved) {
      isInsideFormSaved = true;
    } else {
      isInsideFormSaved = false;
      alert("Please save all the tables");
    }

    if (isInsideFormSaved && insideFormSettingNotEmpty) {
      const submitData = {
        ...CommonFieldsValue,
        insideFormSetting: insideFormSetting,
      };

      console.log(submitData);
    }
  };

  const editHandler = (index) => {
    const newInsideFormSetting = [...insideFormSetting];
    newInsideFormSetting[index] = {
      ...newInsideFormSetting[index],
      isSaved: false,
    };
    setInsideFormSetting(newInsideFormSetting);
  };

  const insideFormSettingComponents = insideFormSetting.map((table, index) => {
    if (table.tableType === "TableType1") {
      const isSave = table.isSaved;
      const backdrop = table.isSaved ? styles.backdrop : styles.notSaved;
      return (
        <div key={index} className={styles.backdropParent}>
          {isSave && (
            <>
              <div className={styles.successSave}>
                The form has been successfully saved.{" "}
              </div>
              <button
                className={styles.editButton}
                onClick={() => editHandler(index)}
              >
                Edit
              </button>
            </>
          )}
          <div className={backdrop}></div>
          <Table1Form
            key={index}
            onRemove={() => removeTableHandler(index)}
            onSave={(data) => onSaveHandler(data, index)}
          />
        </div>
      );
    } else if (table.tableType === "TableType2") {
      return (
        <Table2Form
          key={index}
          onRemove={() => removeTableHandler(index)}
          onSave={(data) => onSaveHandler(data, index)}
        />
      );
    } else if (table.tableType === "TableTypeComb") {
      const isSave = table.isSaved;
      const backdrop = table.isSaved ? styles.backdrop2 : styles.notSaved;
      return (
        <div key={index} className={styles.backdropParent}>
          {isSave && (
            <>
              <div className={styles.successSave}>
                
                The form has been successfully saved.{" "}
              </div>
              <button
                className={styles.editButton2}
                onClick={() => editHandler(index)}
              >
                Edit
              </button>
            </>
          )}
          <div className={backdrop}></div>
          <TableCombForm
            key={index}
            onRemove={() => removeTableHandler(index)}
            onSave={(data) => onSaveHandler(data, index)}
          />
        </div>
      );
    }
  });

  const removeTable = () => {
    onRemove();
  };

  return (
    <div className={styles.container}>
      {onRemove && (
        <button onClick={removeTable} type="button">
          Remove
        </button>
      )}
      <div className={styles.title}>Table Type Combine Form</div>
      <input type="hidden" name="tableType" value="TableTypeComb" />

      <select
        name="tableName"
        id="tableName"
        onChange={changeHandler}
        value={tableType}
      >
        <option value="">Chose One</option>
        <option value="TableType1">Table type1</option>
        <option value="TableType2">Table type2</option>
        <option value="TableType3">Table type3</option>
        <option value="TableType4">Table type4</option>
        <option value="TableType5">Table type5</option>
        <option value="TableType6">Table type6</option>
        <option value="TableType7">Table type7</option>
        <option value="TableType8">Table type8</option>
        <option value="TableTypeComb">Table combine</option>
      </select>
      <button type="button" onClick={addTableHandler}>
        Add
      </button>

      <div className={styles.container2}>
        <CommonFields
          folderName={folderName}
          onCommonFiled={(data) => commonFiledHandler(data)}
        />

        {insideFormSettingComponents}
      </div>

      {onSave ? (
        <SaveButtonComb onSaveInsideComb={onSaveInsideCombHandler} />
      ) : (
        <FormSettingButton onSubmit={onSubmitHandler} />
      )}
    </div>
  );
};

export default TableCombForm;
