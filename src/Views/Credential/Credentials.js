import React, {useContext, useEffect, useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import './Credentials.css'
import { Space, Table, Tag, Button, Form, Input, Popconfirm  } from 'antd';
import "antd/dist/antd.css";
import { AddCredentialsData, RemoveCredential, GetCredentialData } from "../../Services/AuthenticationService";
// import type { ColumnsType } from 'antd/es/table';

export function Credentials(){
    const location =  new useLocation();
    console.log("location", location, location.state[0], location.state[1]);
    const [userHash, setUserHash] = new useState(location.state);

    return (
        <React.Fragment>
            <h1>Credentials Page</h1>
            <AddCredentials hash={userHash}/>
            <GetCredentials hash={userHash}/>
        </React.Fragment>
    )
}


function GetCredentials(prop){
  console.log("GetCredentials called");
    return (
        <div>
            <GetTable hashKey={prop.hash}/>
        </div>
    )
}

function AddCredentials({hash}){
    const [website, setWebsite] = new useState("");
    const [userName, setUserName] = new useState("");
    const [password, setPassword] = new useState("");
    const [data, setData] = new useState(null);
    const nav = useNavigate();
    useEffect(() => {
       if(data == true){
        window.location.reload(false);
       }
    }, [data]);
    return (
        <React.Fragment>
          <section>
            <input type="text" value={website} placeholder="Website" onChange={(event) => {console.log(event.target.value);setWebsite(event.target.value)}}/>&nbsp;&nbsp;
            <input type="text" value={userName} placeholder="User Name" onChange={(event) => {setUserName(event.target.value)}}/>&nbsp;&nbsp;
            <input type="text" value={password} placeholder="Password" onChange={(event) => {setPassword(event.target.value)}}/>&nbsp;&nbsp;
            <button onClick={ async () =>{
                var val = await AddCredentialsData(hash, website, userName, password);
                setData(val); 
            }}>Add</button>&nbsp;&nbsp;
            <label>{(data === null) ? "" : (data == true) ? "Added Successfully" : "Credentials already exists!."}</label>
          </section>
        </React.Fragment>

    )
}


function GetTable({hashKey}) {

  const defaultColumns = [
    // {
    //   title: 'Index',
    //   dataIndex: 'Index',
    //   key: 'Index',
    //   editable: false,
    //   show : false
    // },
    {
      title: 'User Name',
      dataIndex: 'UserName',
      key: 'UserName',
      editable: true,
    },
    {
      title: 'Password',
      dataIndex: 'Password',
      key: 'Password',
      editable:true,
    },
    {
      title: 'WebSite',
      dataIndex: 'WebSite',
      key: 'WebSite',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_,  key) =>
        dataSet.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleDelete = (key) => {
    console.log(key);
    RemoveCredential(hashKey, key.WebSite, key.UserName, key.Password);
    const newData = dataSet.filter(item => item.key !== key);
    window.location.reload();
  };
  const [dataSet, setDataSet] = new useState([]);
  useEffect(() => {
    const getData = async () => {
            console.log("UseEffect called");
          const dataTemp = await GetCredentialData(hashKey);
          const arr = [];
          for (let i = 0; i < dataTemp.length; i++) {
            dataTemp[i].Index = i+1;
            arr.push(dataTemp[i]);
          }
          arr.sort((a, b) => {
            let fa = a.UserName.toLowerCase(),
                fb = b.UserName.toLowerCase();
        
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
        setDataSet(arr);
     }
    getData();
 }, []);

  const handleSave = (row) => {
    console.log(row);
    var index = dataSet.findIndex(element => element.Index == row.Index);
    var item = dataSet[index];
    RemoveCredential(hashKey, item.WebSite, item.UserName, item.Password);
    AddCredentialsData(hashKey, row.WebSite, row.UserName, row.Password);
    var temp = dataSet;
    temp[index] = row;
    setDataSet(temp);
    window.location.reload();
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  
  const EditableContext = React.createContext(null);

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
  
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
  
    let childNode = children;
  
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
  
    return <td {...restProps}>{childNode}</td>;
  };
  
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  return (<Table bordered components={components} dataSource={dataSet} columns={columns} />)
}
