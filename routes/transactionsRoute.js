const express = require('express')
const router = express.Router()
const Transaction = require('../models/transaction')
const moment = require('moment')

router.post('/add-transaction', async function(req, res){
  try {
    const newTransaction = new Transaction(req.body);
    const transaction = await newTransaction.save()
    res.status(200).json(transaction)
    // res.send('User Registered Successfully')
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/edit-transaction', async function(req, res){
  try {
    // console.log('req.body:', req.body)
    // console.log('req.body.transactionId:', req.body.transactionId)
    const transaction = await Transaction.findOneAndUpdate({_id: req.body.transactionId}, req.body.payload)
    // res.status(200).json(transaction)
    res.send('Transaction Updated Successfully')
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/delete-transaction', async function(req, res){
  console.log('req.body:', req.body)
  console.log('req.body.transactionId:', req.body.transactionId)
  try {
   await Transaction.findOneAndDelete({_id: req.body.transactionId})
    // res.status(200).json(transaction)
    res.send('Transaction Deleted Successfully')
    console.log('delete completed')
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/get-all-transactions', async(req, res) =>{
  
  console.log('req.body:', req.body)
  // console.log('Date::', req.body[0])
  // console.log('Type::', typeof(req.body.date(0)))
  // console.log('Date2', req.body.date["startDate"])
  const { frequency, userid, dateRange, type } = req.body
  // console.log('user._id', user._id)
  now = moment()
  // console.log('moment', now.format() )
  try {
    const transactions = await Transaction.find({
      ...(frequency !== 'custom' ? { 
          date: {
            $gt : moment().subtract(Number(frequency), 'd').toDate(),
          },
        } : {
          date: {
            $gte : dateRange.startDate,
            $lte : dateRange.endDate,
          }
        }),
      userid: userid,
      ...(type!=='all' && {type}) // 条件文の書き方
    });

    res.status(200).json(transactions)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router