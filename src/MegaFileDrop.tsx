import React, { Fragment } from "react";
import DropZone from "react-dropzone";
import { MdCloudUpload } from "react-icons/md";
import RenderImagePreview from "./renderImagePreview";

export default ({
  handleOnDrop,
  input,
  imagefile,
  meta: { error, touched },
}) => (
  <div>
    <DropZone
      accept="image/jpeg, image/png, image/gif, image/bmp"
      className="upload-container"
      onDrop={handleOnDrop}
      onChange={(file) => input.onChange(file)}
    >
      <div className="dropzone-container">
        <div className="dropzone-area">
          {imagefile && imagefile.length > 0 ? (
            <RenderImagePreview imagefile={imagefile} />
          ) : (
            <Fragment>
              <MdCloudUpload style={{ fontSize: 100, marginBottom: 0 }} />
              <p>Click or drag image file to this area to upload.</p>
            </Fragment>
          )}
        </div>
      </div>
    </DropZone>
    {touched && error && <div style={{ color: "red" }}>{error}</div>}
  </div>
);
