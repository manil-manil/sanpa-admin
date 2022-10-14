import React, { useState, useEffect } from "react";
import { BASIC_CONSTANT } from "../../variables/basic.constants";
import { useFetchWrapper } from "../../helpers";
import JSONInput from "react-json-editor-ajrm";

function CategoryEdit({ inputs: { name, image, isActive, nodes }, onChange }) {
    const fetchWrapper = useFetchWrapper();
    const [categoryImage, setCategoryImage] = React.useState(image);
    const onLoadFile = (e) => {
        const formData = new FormData();
        formData.append("multipartFile", e.target.files[0]);
        fetchWrapper
            .post(`${BASIC_CONSTANT.BACKEND_URL}/image`, formData, "formData")
            .then((response) => {
                if (response[0]) {
                    setCategoryImage(
                        `https://api.sanpa.co.kr/image?name=${response[0]}`
                    );
                    onChange({
                        target: {
                            name: "image",
                            value: `https://api.sanpa.co.kr/image?name=${response[0]}`,
                        },
                    });
                }
            });
    };
    return (
        <div className="card-body">
            <form>
                <div className="form-group">
                    <label>활성화 여부</label>
                    <div className="row">
                        <div className="ml-4">
                            <label className="mr-2">활성화</label>
                            <input
                                type="radio"
                                name="isActive"
                                value="1"
                                defaultChecked={isActive}
                            />
                        </div>
                        <div className="ml-4">
                            <label className="mr-2">비활성화</label>
                            <input
                                type="radio"
                                name="isActive"
                                value="0"
                                defaultChecked={!isActive}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>카테고리명</label>
                    <input
                        name="name"
                        type="text"
                        placeholder="카테고리명을 입력해주세요."
                        onChange={onChange}
                        value={name}
                        className={`form-control`}
                    />
                </div>
                <div className="form-group">
                    <label>카테고리 이미지</label>
                    <input
                        type="file"
                        style={{ display: "block" }}
                        accept="img/*"
                        onChange={onLoadFile}
                    />
                    <img style={{ marginTop: `${10}px` }} src={image} />
                </div>
                <div className="form-group">
                    <label>노드</label>
                    <div className="node-wrap">
                        <JSONInput
                            placeholder={nodes}
                            onChange={onChange}
                            style={{
                                container: {
                                    width: "100%",
                                },
                                body: {
                                    width: undefined,
                                    display: "flex",
                                },
                                outerBox: {
                                    width: "100%",
                                },
                                contentBox: {
                                    width: undefined,
                                    flex: 1,
                                },
                                warningBox: {
                                    width: "100%",
                                },
                            }}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CategoryEdit;
