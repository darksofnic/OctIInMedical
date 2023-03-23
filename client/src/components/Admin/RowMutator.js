import React from "react";
const RowMutator = ({
    updateData,
    handleEditFormChange,
    handleCancelClick
}) => {
    return (
        <tr>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder=""
                    name="age"
                    value={updateData.age}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder=""
                    name="sex"
                    value={updateData.sex}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder=""
                    name="zipCode"
                    value={updateData.zipCode}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder=""
                    name="bmi"
                    value={updateData.bmi}
                    onChange={handleEditFormChange}
                ></input>
                
                <input
                    type="text"
                    required="required"
                    placeholder=""
                    name="exams"
                    value={updateData.exams}
                    onChange={handleEditFormChange}
                ></input>
              
            </td>
            <td>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>
                    Cancel
                </button>
            </td>
        </tr>
    );
};

export default RowMutator;