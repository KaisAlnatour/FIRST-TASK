import React, { useEffect, useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { Root } from '../src/store'
import { Todo } from './types/models';
import { delet, set, changeType, edit } from './reducers/todoSlice';
import { Button, Tooltip, List, Modal, Input, Space, Col, PageHeader, Layout } from 'antd';
import { EditFilled, DeleteTwoTone, PlusCircleFilled, CloseCircleFilled, CheckCircleFilled, PicCenterOutlined, EditTwoTone, DeleteFilled, CheckCircleTwoTone, CheckSquareTwoTone, CheckOutlined, EditOutlined } from '@ant-design/icons';
import _default from 'rc-trigger';
import { relative } from 'path';
import { SSL_OP_PKCS1_CHECK_1, SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { Content, Header } from 'antd/lib/layout/layout';
import { type } from 'os';
import Sider from 'antd/lib/layout/Sider';


function App() {

  const s = useSelector((state: Root) => state.todo)
  const [name, setName] = useState<String>()
  const dispatch = useDispatch()
  const [todo, setTodo] = useState<Todo[]>([])
  const [curIndex, setCurIndex] = useState<number>(0)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  var date = Date().toLocaleString();
  useEffect(() => {
    setTodo(s)
  }, [s])

  const deleteItem = (index: number) => {
    dispatch(delet({ index: index }))
  }

  const change = (id: number, type: number) => {
    dispatch(changeType({ id: id, type: type }))
  }
  const showModal = () => {
    setIsModalVisible(true);
  };

  const showModalUpdate = (index: number) => {
    setIsModalUpdateVisible(true);
    setCurIndex(index)
  };

  const handleOk = () => {
    dispatch(set({ text: name, date: date, type: 0 }))
    setIsModalVisible(false);
  };

  const handleOkUpdate = (index: number) => {
    dispatch(edit({ index: index, name: name }))
    setIsModalUpdateVisible(false);
    console.log(index)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdateCancel = () => {
    setIsModalUpdateVisible(false);
  };


  return (

    <div className="app"  >

      <h1 style={{ textAlign: 'center', marginTop: 12, overflow: 'auto', }}>
        Todo List
      </h1>

      <div className="content">
        <Content >

          <div
            className="todo"
            id="scrollableDiv"
            style={{
              textAlign: 'left',
              marginTop: 12,
              marginLeft: 150,
              marginRight: 150,
              lineHeight: '32px',
              height: 350,
              overflow: 'auto',
              padding: '5px 16px',
              border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
          >
            <List 
              dataSource={todo}
              renderItem={(item, index) => {
                return (

                  <div className="list-iteddm" style={
                    item.type == 2 ? { backgroundColor: 'lime' } : item.type == 1 ? { backgroundColor: 'red' } : {}}>
                    <List.Item >
                      <List.Item.Meta
                        title={item.text}
                        description={item.date}
                      />

                      <Space size={12}>

                        {(item.type == 1 || item.type == 2) ? <Tooltip title="delete"  >
                          <Button shape="circle" danger onClick={() => deleteItem(index)} size="small" icon={<DeleteFilled />} />
                        </Tooltip> : <>

                          <Tooltip title="delete"  >
                            <Button shape="circle" danger onClick={() => deleteItem(index)} size="small" icon={<DeleteFilled />} />
                          </Tooltip>

                          < Tooltip title="edit"  >
                            <Button shape="circle" size="small" onClick={() => showModalUpdate(index)} icon={<EditTwoTone />} />
                          </Tooltip>

                          <Tooltip title="close"  >
                            <Button shape="circle" onClick={() => change(index, 1)} danger size="small" icon={<CloseCircleFilled />} />
                          </Tooltip>

                          <Tooltip title="complete"  >
                            <Button shape="circle" onClick={() => change(index, 2)} size="small" icon={<CheckCircleTwoTone twoToneColor="#52c41a" />} />
                          </Tooltip>

                        </>}

                      </Space>
                    </List.Item>
                  </div>
                )
              }}
              style={{
                color: 'green',
                position: 'relative',
                listStyleType: 'circle',
                margin: 40,
                padding: 0
              }}

            />


          </div>

          <Modal title="update Modal" visible={isModalUpdateVisible} onOk={() => handleOkUpdate(curIndex)} onCancel={handleUpdateCancel}>
            <Input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} className="form-control" />
          </Modal>

          <div style={{ textAlign: 'center', marginTop: 12, lineHeight: '32px', overflow: 'auto', }}>
            <Tooltip title="add">
              <Button shape="circle" onClick={showModal} style={{ color: 'green'  }} icon={<PlusCircleFilled />} />
            </Tooltip>
          </div>

          <Modal title="Add Modal" visible={isModalVisible} onOk={() => handleOk()} onCancel={handleCancel}>
            <Input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} className="form-control" />
          </Modal>
        </Content>
      </div>

    </div >
  );

}

export default App;
