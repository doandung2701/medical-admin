import { Button, Card, Col, message, Modal, Popconfirm, Row, Upload, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    SaveOutlined,
    LoadingOutlined,
    PlusOutlined,
    UploadOutlined
} from '@ant-design/icons';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import * as productGalleryApi from '../../api/productGalleryApi';
import request from '../../api/baseApi';
import './Style.less';
export default function ProductImage(props) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewTitle, setPreviewTitle] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const { id } = props;
    const handleSave = async () => {
        const request = [];
        if (data.find(x => x.selected) == null) {
            message.error("Bạn chưa chọn 1 ảnh làm thumbail");
            return;
        }
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            request.push({
                uri: element.url,
                isThumbnail: element.selected ? 1 : 0
            });
        }
        try {
            setLoading(true);
            const response = await productGalleryApi.createBatch(id, request);
            if (response.status === 200) {
                message.success('Update product gallery success');
            }
        } catch (e) {
            if (e.response.data?.message) {
                message.error(e.response.data.message);
            } else {
                message.error('Update product gallery banner error');
            }
        } finally {
            setLoading(false);
        }
    }
    const uploadImage = async options => {
        const { onSuccess, onError, file, onProgress } = options;

        const fmData = new FormData();
        const config = {
            headers: { "content-type": "multipart/form-data" },
        };
        fmData.append("file", file);
        try {
            const res = await request().post(
                "/file/upload",
                fmData,
                config
            );
            // console.log("server res: ", res);

            onSuccess(res.data.data);
        } catch (err) {
            // console.log("Eroor: ", err);
            const error = new Error("Some error");
            onError({ err });
        }
    };
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const convertData = (dataRaw) => {
        return dataRaw.map(data => {
            return {
                ...data,
                status: 'done',
                url: data.uri,
                uid: data.id,
                selected: data.isThumbnail? true : false,
                uri : data.uri,
            }
        })
    }
    useEffect(() => {
        async function getProductImage() {
            try {
                setLoading(true);
                const response = await productGalleryApi.getAllByProductId(id);
                if (response.status === 200) {
                    if (response.data.data) {
                        setData(convertData(response.data.data));
                    }
                }
            } catch (e) {

            } finally {
                setLoading(false);
            }
        }
        if (id) {
            getProductImage();
        }
    }, [id]);
    const handleCancel = () => setPreviewVisible(false);
    const handleChange = ({ file, fileList, event }) => {
        if (file.status === 'done') {
            const currentFileIndx = fileList.findIndex(x => x.uid === file.uid);
            if (currentFileIndx != -1) {
                fileList[currentFileIndx].url = file.response;
                fileList[currentFileIndx].selected = false;
            }
        }
        setData(fileList);
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const setThumbnail = (file, index) => {
        data.forEach(x => x.selected = false);
        data[index].selected = true;
        setData([...data]);
    }
    const renderImagePreview = (originNode, file, currFileList) => {
        // console.log(currFileList);
        const index = data.indexOf(file);
        const isSelected = data[index]?.selected;
        const ref = React.useRef();
        const errorNode = <Tooltip title="Upload Error">{originNode.props.children}</Tooltip>;
        return (<div
            ref={ref} onClick={() => setThumbnail(file, index)}
            className={isSelected ? 'selected' : ''}
        >
            {file.status === 'error' ? errorNode : originNode}
        </div>)
    }
    return (
        <>

            <Card title="Product image" loading={loading}>
                <Row>
                    <Col span={24} flex="auto">
                        <Popconfirm style={{ float: 'right', marginRight: 12 }}
                            title="Bạn có chắc chắn lưu lại những thay đổi?"
                            onConfirm={handleSave}
                            // onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                            icon={<SaveOutlined />}
                        >
                            <Button
                                type="primary"
                                style={{ float: 'right' }}
                            >
                                Save
                            </Button>
                        </Popconfirm>

                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Upload
                            listType="picture-card"
                            fileList={data}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            customRequest={uploadImage}
                            multiple={true}
                            accept={'.jpg,.png'}
                            itemRender={renderImagePreview}
                        >
                            {uploadButton}
                        </Upload>
                        <Modal
                            visible={previewVisible}
                            title={previewTitle}
                            footer={null}
                            onCancel={handleCancel}
                        >
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Col>
                </Row>
            </Card>
        </>
    )
}