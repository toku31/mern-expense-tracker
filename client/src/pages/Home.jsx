import {useState, useEffect} from 'react'
import AddEditTransaction from '../components/AddEditTransaction'
import EditTransaction from '../components/EditTransaction'
import Layout from '../components/Layout'
import '../resources/transaction.css'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import TransactionsTable from '../components/TransactionsTable'
import Form from 'react-bootstrap/Form';
// 以下はカレンダー機能
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from "date-fns" // 日付のフォーマット
import ja from 'date-fns/locale/ja'
// icons
import { AiOutlineUnorderedList, AiOutlineAreaChart } from "react-icons/ai"
import Button from 'react-bootstrap/Button';
import Analytics from '../components/Analytics'

function Home() {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [transactionsData, setTransactionsData] = useState([])
  const [frequency, setFrequency] = useState('7')
  const [type, setType] = useState('all')
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",  // 必要
    },
  ]);
  // const [openDate, setOpenDate] = useState(false);
  // const [viewType, setViewType] = useState('analytics')
  const [viewType, setViewType] = useState('table')
  const [selectedItemForEdit, setSelectedItemForEdit] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  //カレンダーの窓枠の開閉
  const [openDate, setOpenDate] = useState(false)
  const weekday = {'Mon':'月','Tue':'火','Wed':'水','Thu':'木','Fri':'金','Sat':'土','Sun':'日',}

  const getTransactions = async ()=> {
    setLoading(true)
    try {
      const user = JSON.parse(localStorage.getItem('expense-tracker-user'))
      console.log('user:', user)
      // console.log('user._id:', user._id)
      // const response = await axios.get('/api/transactions/get-all-transactions')
      // const response = await axios.get('/api/transactions/get-all-transactions', {params: {userid: user._id}})
     const response = await axios.post('/api/transactions/get-all-transactions', {
        userid: user._id, 
        frequency,   //  frequency: frequency
        ...(frequency==='custom' && {
          dateRange: {
            startDate:date[0].startDate,
            endDate:date[0].endDate
          },
        }),
        type: type,
      },
     )
      console.log('get-all-transactions', response.data) ;
      setTransactionsData(response.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error('Something went wrong!', {theme: "colored"})
    }
  }

  const handleDeleteClick = async (id)=> {
    console.log('delete', id)
    try {
     setLoading(true)
     await axios.post('/api/transactions/delete-transaction', {
        transactionId: id
      }
     )
     console.log('deleted!!!!!')
      // console.log('handleDeleteClick', response.data) ;
      toast.success('Transaction Deleted Successfully', {theme: "colored"})
      getTransactions()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error('Something went wrong!', {theme: "colored"})
    }
  }

  useEffect(() => {
    getTransactions()
    // console.log('date', date)
    // console.log('startdate:', date[0].startDate)
    // console.log('enddate:', date[0].endDate)
  }, [frequency, date, type])

  const handleEditClick = (transaction)=> {
    console.log('transaction.id', transaction._id)
    console.log('transaction', transaction)
    // console.log('selectedItem1:', selectedItemForEdit)
    setSelectedItemForEdit({...selectedItemForEdit, transaction})
    setIsEditing(true)
    // console.log('selectedItem2:', selectedItemForEdit)
  }

  if (loading){
    return <Spinner />
  }
  // console.log('viewType:', viewType)
  // console.log('selectedItemForEdit1:', selectedItemForEdit)
  // console.log('isEditing', isEditing)

  return (
    <Layout>
      <div className="filter d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex">
          <div className="d-flex flex flex-column">
            <Form.Group className="mb-1" controlId="frequency">
              <Form.Label className='text-secondary fs-6'>期間を選択</Form.Label>
              <Form.Select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                <option value='7'>過去１週間</option>
                <option value='30'>過去１ヶ月</option>
                <option value='365'>過去１年</option>
                <option value='custom'>範囲選択</option>
              </Form.Select>
              {frequency === 'custom' && (
                <div className="mt-2">
                  <span onClick={()=>setOpenDate(!openDate)} 
                  // ${format(date[0].endDate, "M月dd日(ccc)")}
                    className='headerSearchText border p-2'>{`${format(date[0].startDate, "M月dd日")}(${weekday[format(date[0].startDate, "ccc")]})〜 ${format(date[0].endDate, "M月dd日")}(${weekday[format(date[0].endDate, "ccc")]})`}</span>
                  {openDate &&
                    <div className="mt-2">
                      <DateRange
                        editableDateInputs={true}
                        onChange={item => setDate([item.selection])}
                        // onChange={() => setDate(date)}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        className="date"
                        // minDate={new Date()} 
                        locale={ja} // 言語設定
                      />
                    </div>
                  }
                </div>
              )}
            </Form.Group>
          </div>

          <div className="d-flex flex flex-column mx-5">
            <Form.Group className="mb-1" controlId="frequency">
              <Form.Label className='text-secondary fs-6'>タイプを選択</Form.Label>
              <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                <option value='all'>収入&支出</option>
                <option value='収入'>収入</option>
                <option value='支出'>支出</option>
              </Form.Select>
            </Form.Group>
          </div>
        </div>

        <div  className="d-flex">
          <div >
            <div className="view-switch mx-5">
                <AiOutlineUnorderedList 
                  size={30} 
                  // color={'#808080'} 
                  className={`${
                    viewType === "table" ? "active-icon mx-3": "inactive-icon mx-3"
                  }`}
                  onClick={()=>setViewType('table')}
                />
                <AiOutlineAreaChart 
                  size={30} 
                  // color={'#808080'}
                  className={`${
                  viewType === "analytics" ? "active-icon": "inactive-icon"
                  }`}
                onClick={()=>setViewType('analytics')}
                />
            </div>

          </div>
            <Button className='primary' size="sm" onClick={()=>setShowAddEditTransactionModal(true)}>新規追加</Button>
        </div>

      </div>
      <div className="table-analytics">
        {viewType==="table" ? 
          <div className="table">
            <TransactionsTable  
              transactionsData={transactionsData} 
              // handleEditClick={(transaction)=>console.log(transaction)} 
              // handleEditClick={(transaction)=>setSelectedItemForEdit(transaction)}
              handleEditClick = {handleEditClick}
              handleDeleteClick = {handleDeleteClick}
            />
          </div> : 
            <Analytics transactions={transactionsData} />}
      </div>

      {(showAddEditTransactionModal ) && (
    <AddEditTransaction 
      showAddEditTransactionModal={showAddEditTransactionModal} setShowAddEditTransactionModal = {setShowAddEditTransactionModal}
      getTransactions = {getTransactions}
    /> )}

      {(isEditing ) && (
    <EditTransaction
      selectedItemForEdit = {selectedItemForEdit}
      isEditing = {isEditing}
      setIsEditing = {setIsEditing}
      getTransactions = {getTransactions}
      setSelectedItemForEdit = {setSelectedItemForEdit}
    /> )}
  


    </Layout>
  )
}

export default Home