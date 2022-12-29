import { Button, Table } from 'react-bootstrap';
import moment from 'moment';
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'
import { useState } from 'react';

function TransactionsTable({transactionsData, handleEditClick, handleDeleteClick}) {
//   const [selectedItemForEdit, setSelectedItemForEdit] = useState(null)
  // const handleEditClick = (transaction)=> {
  //   console.log(transaction)
  // }

  return (
    <div>
        <Table hover striped bordered>
          <thead>
              <tr>
                  <th>日付</th>
                  <th>詳細</th>
                  <th>メモ</th>
                  <th>金額</th>
                  <th>カテゴリー</th>
                  <th>収入/支出</th>
                  <th>編集/削除</th>
              </tr>
          </thead>
          <tbody>
              {transactionsData.map((transaction) => 
                  <tr key={transaction._id}>
                      <td>{moment(transaction.date).format('YYYY-MM-DD')}</td>
                      <td>{transaction.description}</td>
                      <td>{transaction.reference}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.category}</td>
                      <td>{transaction.type}</td>
                      <td className='d-flex'>
                        <div role="button">
                            <AiOutlineEdit 
                              size="1.3rem" 
                              onClick={()=>{handleEditClick(transaction)}}
                            />
                        </div>
                        <div role="button" className='mx-3'>
                            <AiOutlineDelete 
                              size="1.3rem"
                              onClick={()=>{handleDeleteClick(transaction._id)}}
                            />
                        </div>
                        
                          {/* <Button variant="outline-secondary">編集</Button>
                          <Button variant="outline-danger">削除</Button> */}
                      </td>
                  </tr>
              )}
          </tbody>
        </Table>
    </div>
  )
}

export default TransactionsTable