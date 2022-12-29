import {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { toast } from 'react-toastify'
import Spinner from './Spinner'
// import moment from 'moment';

function AddEditTransaction(props) {
  const {
        // showAddEditTransactionModal, 
        // setShowAddEditTransactionModal,
        getTransactions,
        selectedItemForEdit,
        isEditing,
        setIsEditing,
        setSelectedItemForEdit,
        } = props
  console.log('編集中', isEditing)
  console.log('編集項目', selectedItemForEdit)
  // console.log('追加中', showAddEditTransactionModal)
  // console.log('追加中2', selectedItemForEdit.transaction.type)
  
  const [loading, setLoading] = useState(false)
  // const [formData, setFormData] = useState({
  //   amount: "",
  //   type: "",
  //   category: "",
  //   date: undefined,
  //   reference:  "",
  //   description: "",
  // })

  const [formData, setFormData] = useState({
    amount: selectedItemForEdit.transaction.amount,
    type:  selectedItemForEdit.transaction.type,
    category: selectedItemForEdit.transaction.category,
    date: selectedItemForEdit.transaction.date,
    reference: selectedItemForEdit.transaction.reference,
    description: selectedItemForEdit.transaction.description,
  })
  console.log('selectedItemForEdit.transaction._id', selectedItemForEdit.transaction._id)
  // const navigate = useNavigate()
  const {amount, type, category, date, reference, description} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleHide = ()=> {
    // setShowAddEditTransactionModal(false)
    setIsEditing(false)
  }

  const handleSubmit=async (e)=> {
    e.preventDefault()
    setLoading(true)
    const values ={
      amount: amount,
      type: type,
      category: category,
      date: date,
      reference: reference,
      description: description,
    }
    console.log('editValues:', values)
  
    try {
      const user = JSON.parse(localStorage.getItem('expense-tracker-user'))
      setLoading(true)
      await axios.post('/api/transactions/edit-transaction', {
          payload: {
            ...values, 
            userid: user._id,
          },
          transactionId: selectedItemForEdit.transaction._id,
      })
      getTransactions()
      // console.log("transaction updated successfully:", response.data) ;
      toast.success("transaction updated successfully", {theme: "colored"})
      setIsEditing(false)
      setSelectedItemForEdit({})
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error('transaction failed', {theme: "colored"})
      // throw new Error(`Something went wrong! ${error.message}`);
    }

    // setFormData({
    //   amount: "",
    //   type: "",
    //   category: "",
    //   date: "",
    //   reference: "",
    //   description: "",
    // })
  }

  const capitalize = function(str) {
    if (typeof str !== 'string' || !str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  if (loading){
    return <Spinner />
  }

  return (
    // <Modal show={showAddEditTransactionModal | isEditing} onHide={()=>setShowAddEditTransactionModal(false)}>
    <Modal show={isEditing} onHide={handleHide}>
    <Modal.Header closeButton >
      <Modal.Title>勘定項目の編集</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <div>
        <Form className='transaction-form' onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>金額</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="" 
              value={amount} 
              onChange={handleChange} 
              name="amount"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="type">
            <Form.Label>タイプ</Form.Label>
            <Form.Select id="type" name="type" onChange={handleChange}>
            <option value="">{type}</option>
              <option value="収入">収入</option>
              <option value="支出">支出</option>
              {/* { <option value=""></option> } */}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>カテゴリー</Form.Label>
            <Form.Select id="category" name="category" onChange={handleChange}>
            <option value='給料'>{category}</option>
            <option value='給料'>給料</option>
            <option value='住宅費'>住宅費</option>
            <option value='食料'>食料</option>
            <option value='投資'>投資</option>
            <option value='娯楽'>娯楽</option>
            <option value='旅行'>交通費</option>
            <option value='習い事'>習い事</option>
            <option value='医療費'>医療費</option>
            <option value='税金'>税金</option>
          </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" placeholder="" value={date} name="date" onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>詳細</Form.Label>
            <Form.Control type="text" name="description" placeholder="" value={description} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="reference">
            <Form.Label>メモ</Form.Label>
            <Form.Control type="text" placeholder="" name="reference" value={reference} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3 d-flex justify-content-end" controlId="description">
          <Button className="primary" type="submit">更新</Button>
          </Form.Group>
        </Form>
      </div>
    </Modal.Body>
  </Modal>
  )
}

export default AddEditTransaction