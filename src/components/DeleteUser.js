import React, { useContext } from 'react'
import { Button, Row, Col, Tooltip, Popconfirm, message } from 'antd'
import { UserContext } from './UserContext'

export default function DeleteUser() {

    const { users, selectedRow } = useContext(UserContext)
    const [user, setUser] = users
    const [selectedRowKeys, setSelectedRowKeys] = selectedRow

    const isSelected = selectedRowKeys.length > 0

    const deleteUser = (itemId) => {
        const newUserList = [...user]
        itemId.sort((a, b) => b - a) //descending order, to avoid the influence of index change when removing multiple values from an array
        itemId.forEach((id) => { newUserList.splice(id, 1) })
        console.log(newUserList);
        setUser(newUserList)
        setSelectedRowKeys([])  //deselect the index of users 
        message.success("Selected items are deleted")

    }

    
    const handleCancel = () => {
        message.error("Cancelled")
    }
    return (
        <div>
            <Tooltip
                placement="top"
                title="Select above first"
                // visible={ isSelected?false:true}  
                trigger="hover"
            >
                <Popconfirm
                    title={"Are you sure you want to delete these " +selectedRowKeys.length+ " users?"}
                    onConfirm={() => deleteUser(selectedRowKeys)}
                    onCancel={handleCancel}
                    okText="Yes"
                    CancelText="No"
                    disabled={!isSelected}
                >
                    <Button type="danger" disabled={!isSelected}>
                        Delete
                    </Button>

                </Popconfirm>

            </Tooltip>
            <p style={{ width: '200px' }}>
                {isSelected ? `Selected ${selectedRowKeys.length} Users` : ""}
            </p>
        </div>
    )
}

