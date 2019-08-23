import React, { useState } from "react";
// import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (color, e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    // console.log(color.id)
    axiosWithAuth()
      // .put(`http://localhost:5000/api/colors/${color.id}`, color)
      // .then(res => {
      //   updateColors(colors.res.data);
      //   console.log('Save Edit', res.data)
      // })
      // .catch(err => console.log('Oh no! Could not save this edit', err.response))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
        .delete(`http://localhost:5000/api/colors/${color.id}`)
        .then(res => {
          updateColors(colors.filter(oneColor => oneColor.id !== res.data))
          // updateColors(res.data)//does not work. recieve map error
          console.log('Delete Color', res.data)
        })
        .catch(err => console.log('Opps, could not delete color', err.response));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit" onClick={() => saveEdit(colors.id)} >save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
